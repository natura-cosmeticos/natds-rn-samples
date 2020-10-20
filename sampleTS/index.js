import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {buildTheme} from '@naturacosmeticos/natds-rn';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

const Main = () => {
  const theme = buildTheme('natura', 'light');

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
