import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Todo from './Todo'
import { addTodoAsync, markTodoAsync } from 'actions/asyncTodo'

const getTodo = (todos) => Object.values(todos)
const mapStateToProps = (state) => ({
  todos: getTodo(state.asyncTodo.value),
})
const mapDisaptchToProps = (dispatch) => ({
  addTodo: bindActionCreators(addTodoAsync.request, dispatch),
  markTodo: bindActionCreators(markTodoAsync.request, dispatch),
})
export default connect(mapStateToProps, mapDisaptchToProps)(Todo)
