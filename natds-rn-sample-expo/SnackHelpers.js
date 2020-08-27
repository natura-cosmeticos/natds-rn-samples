import { Platform } from 'react-native';
import * as Font from 'expo-font';

export const loadFontsForWeb = async (isFontLoaded, fontsLoaded) => {
  // natds-rn is uses the standard system font for ios and android
  // but in the browser we dont have those fonts available so have to install it

  if (!isFontLoaded) {
    const something = await Font.loadAsync({
      'Roboto': require('./assets/Roboto-Bold.ttf'),
      'natds-icons': 'https://cdn.jsdelivr.net/npm/@naturacosmeticos/natds-icons/dist/fonts/natds-icons.ttf'
    });
  }

  fontsLoaded(true);
}
