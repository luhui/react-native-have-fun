import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.demos.map(data => (
          <TouchableOpacity
            key={data.title}
            onPress={this.props[data.action]}>
            <View>
              <Text style={styles.text}>
                {data.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    height: 33,
    width: 200,
  }
})
