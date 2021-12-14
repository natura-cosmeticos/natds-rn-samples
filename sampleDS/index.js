/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ThemeProvider} from 'styled-components/native';
import {buildTheme} from '@naturacosmeticos/natds-rn';

const Main = () => {
  const theme = buildTheme('natura', 'light');

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
