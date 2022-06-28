import {SafeAreaView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import ListOrderedDresses from '../../components/warehouse/ListOrderedDresses';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WareHouseScreen from './WareHouseScreen';

const WareHouseMainScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Stack.Navigator>
        <Stack.Screen
          name="ListOrderedDresses"
          component={ListOrderedDresses}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="WareHouseScreen"
          component={WareHouseScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default WareHouseMainScreen;
