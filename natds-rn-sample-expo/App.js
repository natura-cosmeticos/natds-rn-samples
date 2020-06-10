import React, { useState } from 'react';
import { Platform } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import { tokens } from '@naturacosmeticos/natds-styles';
import { buildTheme } from '@naturacosmeticos/natds-rn';
import { Button } from '@naturacosmeticos/natds-rn';

export default function Main() {
  const theme = buildTheme('avon', 'light');
  const [isFontLoaded, fontsLoaded] = useState(false);

  // load fonts to preview this snack on the browser correctly
  loadFontsForWeb(isFontLoaded, fontsLoaded);

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

const loadFontsForWeb = async (isFontLoaded, fontsLoaded) => {
  // natds-rn is uses the standard system font for ios and android
  // but in the browser we dont have those fonts available so have to install it

  if (Platform.OS === 'web' && !isFontLoaded) {
    const something = await Font.loadAsync({
      'Roboto-Bold': require('./node_modules/@naturacosmeticos/natds-rn/build/lib/assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Regular': require('./node_modules/@naturacosmeticos/natds-rn/build/lib/assets/fonts/Roboto-Regular.ttf'),
    });
  }

  fontsLoaded(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 10
  }
});
