import React from 'react';
import {SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import tw from 'twrnc';
import ListOrderedDresses from '../components/warehouse/ListOrderedDresses';
import OrdersById from '../screens/wareHouseManager/OrdersById';
import WareHouseScreen from '../screens/wareHouseManager/WareHouseScreen';
import CostsRegister from '../screens/directorAndManager/CostsRegister';
import ListEmployees from '../screens/marketing/ListEmployees';

const Stack = createNativeStackNavigator();

const WareHouseManagerStack = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Stack.Navigator>
        <Stack.Screen
          name="ListOrderedDresses"
          component={ListOrderedDresses}
          options={{headerShown: false}}
        />
        <Stack.Screen name="WareHouseScreen" component={WareHouseScreen} />
        <Stack.Screen name="OrdersById" component={OrdersById} />
        <Stack.Screen name="CostsRegister" component={CostsRegister} />
        <Stack.Screen name="ListEmployees" component={ListEmployees} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default WareHouseManagerStack;
