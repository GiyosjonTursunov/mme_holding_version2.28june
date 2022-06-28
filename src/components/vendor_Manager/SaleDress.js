import {View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Header from '../global/Header';
import DoubleBtn from '../global/DoubleBtn';
import SimpleSale from './sale/SimpleSale';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import FiftySale from './sale/FiftySale';
const Stack = createNativeStackNavigator();

const SaleDress = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1 bg-white`}>
      <Header headerName={'Sotuvchi'} />

      <DoubleBtn
        firstBtnName={'Sotuv'}
        firstBtnFunction={() => navigation.navigate('SimpleSale')}
        secondBtnName={'50/50'}
        secondBtnFunction={() => navigation.navigate('FiftySale')}
      />

      <Stack.Navigator>
        <Stack.Screen
          name="SimpleSale"
          component={SimpleSale}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FiftySale"
          component={FiftySale}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </View>
  );
};

export default SaleDress;
