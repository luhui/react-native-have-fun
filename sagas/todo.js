import {
  take,
  call,
  fork,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { addTodoAsync, markTodoAsync } from 'actions/asyncTodo'
import { dispatchAsyncAction } from 'redux-async-actions'

let todoID = 0
export default function* watchTodo() {
  yield [
    call(watchAdd),
    call(watchMark)
  ]
}

function* watchAdd() {
  while (true) {
    const action = yield take(addTodoAsync.request)
    yield call(dispatchAsyncAction, addTodoAsync, mockServerwithAddRequest, action.meta, action.payload)
  }
}

function* watchMark() {
  while (true) {
    const action = yield take(markTodoAsync.request)
    yield call(dispatchAsyncAction, markTodoAsync, mockServerwithMarkRequest, action.meta, action.payload)
  }
}

function* mockServerwithAddRequest(name) {
  yield call(delay, 3000)
  return {
    name,
    id: ++todoID,
    mark: false,
  }
}

function* mockServerwithMarkRequest(id) {
  yield call(delay, 3000)
  return id
}
