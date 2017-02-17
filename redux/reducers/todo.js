export default (state = {}, action = {}) => ({
  ...state,
  ...action.payload,
})
