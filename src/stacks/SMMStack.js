import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SMMScreen from '../screens/smm/SMMScreen';
import CreateAdScreen from '../screens/smm/CreateAdScreen';

const Stack = createNativeStackNavigator();

const SMMStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SMMScreen"
        component={SMMScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CreateAdScreen" component={CreateAdScreen} />
    </Stack.Navigator>
  );
};

export default SMMStack;
