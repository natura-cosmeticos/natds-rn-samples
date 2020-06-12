import { Platform } from 'react-native';
import * as Font from 'expo-font';

export const loadFontsForWeb = async (isFontLoaded, fontsLoaded) => {
  // natds-rn is uses the standard system font for ios and android
  // but in the browser we dont have those fonts available so have to install it

  if (Platform.OS === 'web' && !isFontLoaded) {
    const something = await Font.loadAsync({
      'Roboto-Bold': require('./assets/Roboto-Bold.ttf'),
      'Roboto-Regular': require('./assets/Roboto-Regular.ttf'),
    });
  }

  fontsLoaded(true);
}
