'use strics';
import {createAction, handleAction, handleActions, combineActions} from 'redux-actions';
import reduceReducers from 'reduce-reducers';
import {put, call} from 'redux-saga/effects';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const PROCESSING = 'PROCESSING';
const HANDLE_ERROR = 'HANDLE_ERROR'

const createAsyncTypes = function (base) {
    return [REQUEST, SUCCESS, FAILURE, PROCESSING, HANDLE_ERROR].reduce((acc, type) => {
        acc[type] = `${base}.${type}`
        return acc;
    }, {});
};

export const createAsyncActions = function (type, request, success, failure, handleError) {
    let types = createAsyncTypes(type);
    let actions = {
        request: createAction(types.REQUEST, request, (...args) => args),
        processing: createAction(types.PROCESSING, request, (...args) => args),
        success: createAction(types.SUCCESS, success, (result, requestPayload) => requestPayload),
        failure: createAction(types.FAILURE, failure, (result, requestPayload) => requestPayload),
        handleError: createAction(types.HANDLE_ERROR, handleError)
    }
    actions.toString = _ => type;
    return actions;
}

const asyncReducer = (reducer) => (state, action) => {
    let newState = {...state};
    newState.timeStamp = new Date();
    newState.isFetching = action.type.endsWith(PROCESSING)
    if (!newState.isFetching) {
        if (typeof state.isFetching !== 'boolean') {
            newState.lastFetched = state.isFetching
        }
        if (action.type.endsWith(SUCCESS)) {
            if (reducer) {
                newState.value = reducer(state && state.value, action)
            } else {
                newState.value = action.payload
            }
            delete newState.error;
        } else {
            if (reducer) {
                newState.error = reducer(state && state.error, action);
            } else {
                let error = action.payload
                if (typeof error === 'object') {
                    error.fetch = state.isFetching
                }
                newState.error = error;
            }
        }
    } else {
        if (reducer) {
            newState.isFetching = reducer(state && state.isFetching, action)
        }
    }
    return newState;
}

const createReduerMap = (processing, success, failure, handleError, ...mapOrFunction) => {
    if (mapOrFunction.length <= 2 && typeof mapOrFunction[0] === 'object') {
        const {isFetching, value, error} = mapOrFunction[0];
        return {
            [processing]: asyncReducer(isFetching),
            [success]: asyncReducer(value),
            [failure]: asyncReducer(error),
            [handleError]: (state, action) => {
                let newState = {...state}
                delete newState.error
                return newState
            },
        };
    } else {
        return {
            [processing]: mapOrFunction[0] || asyncReducer(),
            [success]: mapOrFunction[1] || asyncReducer(),
            [failure]: mapOrFunction[2] || asyncReducer(),
            [handleError]: (state, action) => {
                let newState = {...state}
                delete newState.error
                return newState
            },
        }
    }
}

/*
 这里可以传 object或者是function，如果是object，形式则为:
 {
 value: valueReducer,
 error: errorReducer,
 isFetching: fetchingReducer,
 }, 将会默认把这几个reducer分别映射到value，error，isFetching的值中。如果是function，则可以传3个，以此为request，success，failure对应的reducer
 */
exports.handleAsyncAction = function (actions, ...mapOrFunction) {
    const processing = actions.processing;
    const success = actions.success;
    const failure = actions.failure;
    const handleError = actions.handleError
    let defaultState = {}
    if (mapOrFunction.length >= 4) {
        defaultState = mapOrFunction[3];
    } else if (mapOrFunction.length == 2 && (typeof mapOrFunction[0] === 'object')) {
        defaultState = mapOrFunction[1]
    }
    return handleActions(createReduerMap(processing, success, failure, handleError, ...mapOrFunction), defaultState);
}

exports.handleAsyncActions = function (reducerMap, defaultState) {
    let reducers = {};
    for (var key in reducerMap) {
        if (reducerMap.hasOwnProperty(key)) {
            let typeValue = typeof key === 'function' ? key.toString() : key;
            let types = createAsyncTypes(typeValue);
            let mapOrFunction = reducerMap[key];
            if (!Array.isArray(mapOrFunction)) {
                mapOrFunction = [mapOrFunction];
            }
            reducers = {
                ...reducers,
                ...createReduerMap(types.PROCESSING, types.SUCCESS, types.FAILURE, types.HANDLE_ERROR,...mapOrFunction),
            }
        }
    }
    return handleActions(reducers, defaultState);
}

exports.combineAsyncActions = function (...action) {
    return ({
        processing: combineActions(...action.map((a) => a.processing)),
        success: combineActions(...action.map((a) => a.success)),
        failure: combineActions(...action.map((a) => a.failure)),
        handleError: combineActions(...action.map((a) => a.handleError)),
    })
};

exports.dispatchAsyncAction = function*(asyncAction, apiFn, meta, ...fnParams) {
    try {
        if (meta && Array.isArray(meta)) {
            yield put(asyncAction.processing(...meta))
        } else {
            yield put(asyncAction.processing(meta));
        }
        const response = yield call(apiFn, ...fnParams);
        yield put(asyncAction.success(response, meta))
    } catch (e) {
        yield put(asyncAction.failure(e, meta))
    }
}
