import React, { Component } from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native'

export default class Caculator extends Component {
  constructor() {
    super()
    this.state = {
      b: 0,
      c: 0,
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            value={this.state.b.toString()}
            keyboardType='numeric'
            onChange={({nativeEvent: {text}}) => this.setState({b: parseInt(text || 0)})}/>
        </View>
        <Text> + </Text>
        <View>
          <TextInput
            style={styles.textInput}
            value={this.state.c.toString()}
            keyboardType='numeric'
            onChange={({nativeEvent: {text}}) => this.setState({c: parseInt(text || 0)})}/>
        </View>
        <Text>
           = {this.state.b + this.state.c}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    width: 100,
    height: 30,
    textAlign: 'center',
  }
})
