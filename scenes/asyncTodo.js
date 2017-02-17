import React, {PropTypes} from 'react';
import {Scene} from 'react-native-router-flux';
import Todo from 'components/todo/asyncTodo'

export default (
    <Scene
      key='todoAsync'
      component={Todo}
      title="Saga-Todo">
    </Scene>
)
