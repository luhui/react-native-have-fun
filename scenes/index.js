import React from 'react';
import { Scene } from 'react-native-router-flux';
import app from './app'
import caculator from './caculator'
import todo from './todo'
import asyncTodo from './asyncTodo'

export default (
    <Scene key='root'>
        {app}
        {caculator}
        {todo}
        {asyncTodo}
    </Scene>
)
