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
