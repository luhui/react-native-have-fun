import React from 'react';
import { connect } from 'react-redux';
import App from './App'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = (state) => ({
  demos: [
    {
      title: "计算器",
      action: 'showCaculator'
    },
    {
      title: "Todo",
      action: 'showTodo'
    },
    {
      title: 'AsyncTodo',
      action: 'showAsyncTodo',
    }
  ]
})
const mapDispatchToProps = (dispatch) => ({
  showCaculator: () => Actions.caculator(),
  showTodo: () => Actions.todo(),
  showAsyncTodo: () => Actions.todoAsync()
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
