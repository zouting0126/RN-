import React from 'react'
import { AppRegistry } from 'react-native';
import Main from './Main';
import { name as appName } from './app.json';

const Cartoon = () => {
  return (
    <Main />
  )
}

AppRegistry.registerComponent(appName, () => Cartoon);
