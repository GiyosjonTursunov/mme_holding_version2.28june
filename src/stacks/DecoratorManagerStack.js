import React from 'react';
import {SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import tw from 'twrnc';
import ListOrderedDresses from '../components/warehouse/ListOrderedDresses';
import OrdersById from '../screens/wareHouseManager/OrdersById';
import CostsRegister from '../screens/directorAndManager/CostsRegister';

const Stack = createNativeStackNavigator();

const DecoratorManagerStack = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Stack.Navigator>
        <Stack.Screen
          name="ListOrderedDresses"
          component={ListOrderedDresses}
          options={{headerShown: false}}
        />
        <Stack.Screen name="OrdersById" component={OrdersById} />
        <Stack.Screen name="CostsRegister" component={CostsRegister} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default DecoratorManagerStack;
