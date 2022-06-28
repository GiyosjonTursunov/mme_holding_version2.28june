import React from 'react';
import Header from '../../components/global/Header';
import HeaderThreeBtn from '../../components/global/HeaderThreeBtn';
import Product from '../../components/warehouse/Product';
import AddProduct from '../../components/warehouse/AddProduct';
import UseProduct from '../../components/warehouse/UseProduct';
import {SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import tw from 'twrnc';

const Stack = createNativeStackNavigator();

const WareHouseScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header headerName={'Omborchi'} />
      <HeaderThreeBtn
        firstBtnName={'Maxsulot'}
        firstBtnNavigation={'Product'}
        secondBtnName={'Ishlatish'}
        secondBtnNavigation={'UseProduct'}
        thirdBtnName={'Qo`shish'}
        thirdBtnNavigation={'AddProduct'}
      />

      <Stack.Navigator>
        <Stack.Screen
          name="Product"
          component={Product}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UseProduct"
          component={UseProduct}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default WareHouseScreen;
