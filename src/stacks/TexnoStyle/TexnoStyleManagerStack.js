import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ManagerTexnoStyleScreen from '../../screens/TexnoStyle/manager/ManagerTexnoStyleScreen';
import TexnoStyleCreateDoorsScreen from '../../screens/TexnoStyle/manager/TexnoStyleCreateDoorsScreen';

const Stack = createNativeStackNavigator();

const TexnoStyleManagerStack = () => {
  return (
    <Stack.Navigator initialRouteName="ManagerTexnoStyleScreen">
      <Stack.Screen
        name="ManagerTexnoStyleScreen"
        component={ManagerTexnoStyleScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="TexnoStyleCreateDoorsScreen"
        component={TexnoStyleCreateDoorsScreen}
        options={{headerTitle: "Eshik qo'shish"}}
      />
    </Stack.Navigator>
  );
};

export default TexnoStyleManagerStack;
