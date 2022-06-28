import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SalonScreen from '../screens/salon/SalonScreen';
import LaStoriaNewsScreen from '../screens/salon/LaStoriaNewsScreen';

const Stack = createNativeStackNavigator();

const SalonStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SalonScreen"
        component={SalonScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="LaStoriaNewsScreen" component={LaStoriaNewsScreen} />
    </Stack.Navigator>
  );
};

export default SalonStack;
