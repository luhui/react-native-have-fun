import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import {markTodo} from 'actions/todo'
import styles from './styles'

export default class Todo extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.todos.map(data => (
          <TouchableOpacity
            key={data.id}
            onPress={() => this.props.dispatch(markTodo(data.id))}>
            <View>
              <Text
                style={{textDecorationLine:data.mark?'line-through':'none'}}>
                {data.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => this.props.addTodo && this.props.addTodo(new Date().toString())}>
          <View style={styles.button}>
            <Text>
              添加
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
