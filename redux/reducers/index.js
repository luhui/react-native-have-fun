import { combineReducers } from 'redux'
import todo from './todo'

const appReducer = combineReducers({
    todo
});

export default appReducer
