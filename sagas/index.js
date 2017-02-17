import watchTodo from './todo'
import { call } from 'redux-saga/effects'

export default function* watchDog() {
  yield call(watchTodo)
}
