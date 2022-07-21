import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CostsRegister from '../screens/directorAndManager/CostsRegister';
import CostTypesScreen from '../screens/directorAndManager/CostTypesScreen';
import ManagerTexnoStyleScreen from '../screens/TexnoStyle/manager/ManagerTexnoStyleScreen';
import TexnoStyleCreateDoorsScreen from '../screens/TexnoStyle/manager/TexnoStyleCreateDoorsScreen';

const Stack = createNativeStackNavigator();

const ManagerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CostTypesScreen"
        component={CostTypesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CostsRegister"
        component={CostsRegister}
        // options={{headerShown: false}}
      />

      <Stack.Screen
        name="ManagerTexnoStyleScreen"
        component={ManagerTexnoStyleScreen}
        // options={{headerShown: false}}
      />

      <Stack.Screen
        name="TexnoStyleCreateDoorsScreen"
        component={TexnoStyleCreateDoorsScreen}
        options={{headerTitle: "Eshik qo'shish"}}
      />
    </Stack.Navigator>
  );
};

export default ManagerStack;
