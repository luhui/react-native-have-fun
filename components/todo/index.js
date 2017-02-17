import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Todo from './Todo'
import { addTodo, markTodo } from 'actions/todo'

const getTodo = (todos) => Object.values(todos)
const mapStateToProps = (state) => ({
  todos: getTodo(state.todo),
})
const mapDisaptchToProps = (dispatch) => ({
  addTodo: bindActionCreators(addTodo, dispatch),
  markTodo: bindActionCreators(markTodo, dispatch),
})
export default connect(mapStateToProps, mapDisaptchToProps)(Todo)
