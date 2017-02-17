import {createStore, applyMiddleware, compose} from 'redux';
import reducers from 'reducers';
import createSagaMiddleware, {END} from 'redux-saga';
import sagas from 'sagas';

export default (data = {}) => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = applyMiddleware(sagaMiddleware);
    const enhancer = compose(middleware, global.reduxNativeDevTools ? global.reduxNativeDevTools() : nope => nope);
    const store = createStore(reducers, data, enhancer);
    global.reduxNativeDevTools && global.reduxNativeDevTools.updateStore(store)
    sagaMiddleware.run(sagas)
    store.close = () => store.dispatch(END);
    return store;
}
