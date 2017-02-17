import React, {PropTypes} from 'react';
import {Scene} from 'react-native-router-flux';
import Todo from 'components/todo'

export default (
    <Scene
      key='todo'
      component={Todo}
      title="Redux-Todo">
    </Scene>
)
