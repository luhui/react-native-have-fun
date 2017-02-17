import {ActionConst} from 'react-native-router-flux'
export default function router(state = {}, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...action.scene,
      }
    default:
      return state
  }
}
