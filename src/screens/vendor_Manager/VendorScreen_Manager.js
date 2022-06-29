import {SafeAreaView, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import Header from '../../components/global/Header';
import DailySalesOrders from '../../components/vendor_Manager/DailySalesOrders';
import OrderDress from '../../components/vendor_Manager/order/OrderDress';
import ThreeBtn from '../../components/global/ThreeBtn';
import tw from 'twrnc';

import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function VendorScreen_Manager() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header headerName={'Sotuvchi'} isRegister={true} />
      <ThreeBtn
        firstBtnName={'Hammasi'}
        firstBtnNavigation={() => navigation.navigate('DailySalesOrders')}
        secondBtnName={'Sotish'}
        secondBtnNavigation={() => navigation.navigate('SaleDress')}
        thirdBtnName={'Zakaz'}
        thirdBtnNavigation={() => navigation.navigate('OrderDress')}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="DailySalesOrders"
          component={DailySalesOrders}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="OrderDress"
          component={OrderDress}
          options={{headerShown: false}}
        />
      </Stack.Navigator>

      <TouchableOpacity
        onPress={() => navigation.navigate('CostsRegister')}
        style={tw`w-15 h-15 absolute bottom-[23%] right-2`}>
        <Text style={tw`text-6xl m-auto`}>💸</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('DebtorsScreen')}
        style={tw`w-15 h-15 absolute bottom-[13%] right-2`}>
        <Text style={tw`text-6xl m-auto`}>💰</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ReportSales')}>
        <Image
          source={require('../../../assets/reportIcon.png')}
          style={tw`w-15 h-15 absolute bottom-0 right-2`}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default VendorScreen_Manager;
