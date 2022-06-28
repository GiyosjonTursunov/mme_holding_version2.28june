import {SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../components/global/Header';
// import DailySalesOrders from '../../components/vendor_Manager/DailySalesOrders';
// import OrderDress from '../../components/vendor_Manager/order/OrderDress';
import ThreeBtn from '../../components/global/ThreeBtn';
import tw from 'twrnc';

import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DebtorsSales from '../../components/vendor_Manager/DebtorsSales';
import DebtorsFifty from '../../components/vendor_Manager/DebtorsFifty';
import DebtorsOrders from '../../components/vendor_Manager/DebtorsOrders';
import DoubleBtn from '../../components/global/DoubleBtn';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();

function DebtorsScreen({route}) {
  const navigation = useNavigation();

  const {role} = useSelector(state => state.userReducer);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header headerName={'Sotuvchi'} isRegister={true} />
      {role === 'VENDOR' ? (
        <DoubleBtn
          firstBtnName={'50/50'}
          firstBtnFunction={() => navigation.navigate('DebtorsFifty')}
          secondBtnName={'Zakaz'}
          secondBtnFunction={() => navigation.navigate('DebtorsOrders')}
        />
      ) : (
        <ThreeBtn
          firstBtnName={'Oddiy sotuv'}
          firstBtnNavigation={() => navigation.navigate('DebtorsSales')}
          secondBtnName={'50/50'}
          secondBtnNavigation={() => navigation.navigate('DebtorsFifty')}
          thirdBtnName={'Zakaz'}
          thirdBtnNavigation={() => navigation.navigate('DebtorsOrders')}
        />
      )}

      <Stack.Navigator
        initialRouteName={role === 'VENDOR' ? 'DebtorsFifty' : 'DebtorsSales'}>
        <Stack.Screen
          name="DebtorsSales"
          component={DebtorsSales}
          options={{headerShown: false}}
          initialParams={{key: 'vendor'}}
        />

        <Stack.Screen
          name="DebtorsFifty"
          component={DebtorsFifty}
          options={{headerShown: false}}
          initialParams={{key: 'vendor'}}
        />

        <Stack.Screen
          name="DebtorsOrders"
          component={DebtorsOrders}
          options={{headerShown: false}}
          initialParams={{key: 'vendor'}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

export default DebtorsScreen;
