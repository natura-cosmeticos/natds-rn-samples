import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { buildTheme } from '@naturacosmeticos/natds-rn';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

export const App = () => {
  const theme = buildTheme('natura', 'light');

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
};
