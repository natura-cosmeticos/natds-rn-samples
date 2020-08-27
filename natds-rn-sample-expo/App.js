import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, withTheme } from 'styled-components/native';
import { tokens } from '@naturacosmeticos/natds-styles';
import {
  buildTheme,
  Button,
  Tab,
  Divider,
  Card,
  IconButton,
} from '@naturacosmeticos/natds-rn';
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
  const brand = 'natura';
  const mode = 'light';

  const theme = buildTheme(brand, mode);
  const [isFontLoaded, fontsLoaded] = useState(false);

  useEffect(() => {
    // load fonts to preview this snack on the browser correctly
    loadFontsForWeb(isFontLoaded, fontsLoaded);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {
        isFontLoaded
          ? <App />
          : <Text>Loading</Text>
      }
    </ThemeProvider>
  );
}

const AppComponent = ({ theme }) => {
  console.log(theme);
  const onPress = () => console.log('I am pressed!');
  const tabOptions = [
    {
      key: 'itemOne',
      label: 'One',
    },
    {
      key: 'itemTwo',
      label: 'Two',
    },
    {
      key: 'itemThree',
      label: 'Three',
    },
  ];

  return (
    <View style={styles.wrapper}>
      <View>
        <Tab tabOptions={tabOptions} onChange={() => { }} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>Divider sample</Text>
        <Divider />
        <IconButton
          color="primary"
          icon="outlined-finance-bank"
          size="small"
          onPress={() => Function.prototype()}
        />
      </View>

      <View style={styles.container}>
        <Card type="base">
          <Text>Button sample</Text>
          <View style={styles.row}>
            <Button onPress={onPress} text="default" type="outlined" />
            <Button onPress={onPress} text="default" type="contained" />
          </View>
        </Card>
      </View>
    </View>
  );
};

const App = withTheme(AppComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
});
