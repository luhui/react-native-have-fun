import { handleAsyncActions } from 'redux-async-actions'
import { addTodoAsync, markTodoAsync } from 'actions/asyncTodo'

export default handleAsyncActions({
  [addTodoAsync]: {
    value: (state, action) => ({
      ...state,
      [action.payload.id]: action.payload,
    })
  },
  [markTodoAsync]: {
    value: (state, action) => ({
      ...state,
      [action.payload.id]: {
        ...state[action.payload.id],
        mark: !state[action.payload.id],
      }
    })
  }
}, {value: {}})
