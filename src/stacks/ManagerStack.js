import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CostsRegister from '../screens/directorAndManager/CostsRegister';

const Stack = createNativeStackNavigator();

const ManagerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CostsRegister"
        component={CostsRegister}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ManagerStack;
