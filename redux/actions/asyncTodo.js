import { createAsyncActions } from 'redux-async-actions'
import { createActionTypes } from 'redux-action-type'

const types = createActionTypes(
  'TODO',
  'ADD',
  'MARK',
)

const { ADD, MARK } = types

export const addTodoAsync = createAsyncActions(ADD)
export const markTodoAsync = createAsyncActions(MARK)
