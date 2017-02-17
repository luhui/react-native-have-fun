import React from 'react';
import { Scene } from 'react-native-router-flux';
import app from './app'
import caculator from './caculator'

export default (
    <Scene key='root'>
        {app}
        {caculator}
    </Scene>
)
