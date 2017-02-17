let todoID = 0
export default (state = {}, action = {}) => {
  if (action.type === 'TODO.ADD') {
    ++todoID
    return {
      ...state,
      [todoID]: {
        name: action.payload,
        id: todoID,
        mark: false,
      }
    }
  } else if (action.type === 'TODO.MARK') {
    const data = state[action.payload]
    return {
      ...state,
      [action.payload]: {
        ...data,
        mark: !data.mark
      }
    }
  }
  return state
}
