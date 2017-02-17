import React from 'react';
import { connect } from 'react-redux';
import component from './component'
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
    }
  ]
})
const mapDispatchToProps = (dispatch) => ({
  showCaculator: () => Actions.caculator(),
  showTodo: () => Actions.todo(),
})
export default connect(mapStateToProps, mapDispatchToProps)(component)
