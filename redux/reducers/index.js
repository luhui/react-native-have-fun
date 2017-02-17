import { combineReducers } from 'redux'
import todo from './todo'
import route from './route'

const appReducer = combineReducers({
  route,
  todo,
});

export default appReducer
