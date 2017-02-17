import {createStore, applyMiddleware, compose} from 'redux';
import reducers from 'reducers';
import createSagaMiddleware, {END} from 'redux-saga';
import sagas from 'sagas';

export default (data = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = applyMiddleware(sagaMiddleware)
  const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose
  const enhancer = composeEnhancers(middleware)
  const store = createStore(reducers, data, enhancer)
  sagaMiddleware.run(sagas)
  store.close = () => store.dispatch(END)
  return store
}
