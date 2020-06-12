import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { tokens } from '@naturacosmeticos/natds-styles';
import { buildTheme } from '@naturacosmeticos/natds-rn';
import { Button } from '@naturacosmeticos/natds-rn';
import { loadFontsForWeb } from './SnackHelpers';

export default function Main() {
  /**
   * You can change the brand and mode here to preview different color themes
   * 
   * brands: natura | avon | theBodyShop
   * modes: light | dark
   * 
   * edit here:
   */
  const brand = 'avon'
  const mode = 'light'

  const theme = buildTheme(brand, mode);
  const [isFontLoaded, fontsLoaded] = useState(false);

  useEffect(() => {
    // load fonts to preview this snack on the browser correctly
    loadFontsForWeb(isFontLoaded, fontsLoaded);
  }, []);

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
      <Text>Button sample</Text>
      <View style={styles.row}>
        <Button onPress={onPress} text="default" type="outlined" />
        <Button onPress={onPress} text="default" type="contained" />
      </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  }
});
