import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogIn} from '../pages/LogIn';

const Root = createNativeStackNavigator();

export default function RootStackScreen() {
  return (
    <Root.Navigator initialRouteName="LogIn">
      <Root.Screen
        name="Auth"
        component={LogIn}
        options={{title: 'LogIn', headerTitle: 'Faça seu login'}}
      />
    </Root.Navigator>
  );
}
