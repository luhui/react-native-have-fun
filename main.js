import React from 'react'
import { Provider } from 'react-redux'
import createStore from './redux/store'
import scenes from 'scenes'
import { connect } from 'react-redux'
import { Router } from 'react-native-router-flux'

const store = createStore()
const RouterWithRedux = connect()(Router)

export default () => (
  <Provider store={store}>
    <RouterWithRedux>
      {scenes}
    </RouterWithRedux>
  </Provider>
)


function* idMaker() {
  var index = 0
  console.log('run?');
  while (index < 3)
    yield index++
  return 999
}

var gen = idMaker();

console.log('start generator');
console.log(gen.next()); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next()); // undefined
