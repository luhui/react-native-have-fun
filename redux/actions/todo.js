import {createAction} from 'redux-actions'

export const addTodo = (name) => ({
  type: 'TODO.ADD',
  payload: name,
})
export const markTodo = createAction('TODO.MARK')
