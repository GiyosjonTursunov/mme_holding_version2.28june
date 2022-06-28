import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/account/LoginScreen';
import RegisterScreen from '../screens/account/RegisterScreen';
import ChooseCompanyScreen from '../screens/account/ChooseCompanyScreen';

const Stack = createNativeStackNavigator();

const NotLoggedIn = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChooseCompanyScreen"
        component={ChooseCompanyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default NotLoggedIn;
