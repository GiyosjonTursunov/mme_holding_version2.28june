import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListEmployees from '../screens/marketing/ListEmployees';
import CostsRegister from '../screens/directorAndManager/CostsRegister';

const Stack = createNativeStackNavigator();

const MarketologStack = () => {
  return (
    <Stack.Navigator>
      {/* <Text>MarketologStack</Text> */}

      <Stack.Screen
        name="ListEmployees"
        component={ListEmployees}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CostsRegister"
        component={CostsRegister}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MarketologStack;
