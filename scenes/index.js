import React from 'react';
import { Scene } from 'react-native-router-flux';
import app from './app'
import caculator from './caculator'
import todo from './todo'

export default (
    <Scene key='root'>
        {app}
        {caculator}
        {todo}
    </Scene>
)
