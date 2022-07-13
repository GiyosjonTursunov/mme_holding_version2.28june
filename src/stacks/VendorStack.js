import React from 'react';
import {SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import tw from 'twrnc';
import DebtorsScreen from '../screens/vendor_Manager/DebtorsScreen';
import VendorMainScreen from '../screens/vendor/VendorMainScreen';

const Stack = createNativeStackNavigator();

const VendorStack = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Stack.Navigator>
        <Stack.Screen
          name="VendorMainScreen"
          component={VendorMainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="DebtorsScreen" component={DebtorsScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default VendorStack;
