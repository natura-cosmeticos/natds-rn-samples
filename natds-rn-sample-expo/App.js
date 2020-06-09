import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { tokens } from '@naturacosmeticos/natds-styles';
import { buildTheme } from '@naturacosmeticos/natds-rn';
import { Button } from '@naturacosmeticos/natds-rn';

export default function Main() {
  const theme = buildTheme(tokens, 'avon', 'light');

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

const App = () => {
  const onPress = () => console.log('I am pressed!');

  return (
    <View style={styles.container}>
      <Text style={styles.button}>Button sample</Text>
      <Button onPress={onPress} text="default" type="contained" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    marginBottom: 10
  }
});
