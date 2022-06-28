import React, {useEffect} from 'react';
import {AppState, SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import tw from 'twrnc';
import ListOrderedDresses from '../components/warehouse/ListOrderedDresses';
import OrdersById from '../screens/wareHouseManager/OrdersById';
import WareHouseScreen from '../screens/wareHouseManager/WareHouseScreen';
import {useDispatch, useSelector} from 'react-redux';
import {setWsVendorManagerSale} from '../redux/actions';
import {wsSaleManager} from '../config/apiUrl';

const Stack = createNativeStackNavigator();

const WareHouseManagerStack = () => {
  // const {wsVendorManagerSale} = useSelector(state => state.userReducer);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setWsVendorManagerSale(new WebSocket(wsSaleManager)));
  // }, [dispatch]);

  // useEffect(() => {
  //   if (wsVendorManagerSale) {
  //     // wsVendorManagerSale.onopen = () => {
  //     //   console.error('wsVendorManagerSales open');
  //     // };
  //     AppState.addEventListener('change', nextAppState => {
  //       // console.error('nextAppState', nextAppState);
  //       if (nextAppState === 'background') {
  //         // close connection
  //         return wsVendorManagerSale.close();
  //       }
  //     });
  //   }

  //   // return () => {
  //   //   AppState.removeEventListener('change', () => {
  //   //     console.error('nima gap');
  //   //   });
  //   // };
  // }, [wsVendorManagerSale]);

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
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default WareHouseManagerStack;
