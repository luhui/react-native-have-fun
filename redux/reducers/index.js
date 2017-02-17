import { combineReducers } from 'redux'
import todo from './todo'
import route from './route'
import asyncTodo from './asyncTodo'

const appReducer = combineReducers({
  route,
  todo,
  asyncTodo,
});

export default appReducer
