import React, {useEffect} from 'react';
import {AppState, SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import tw from 'twrnc';
import DebtorsScreen from '../screens/vendor_Manager/DebtorsScreen';
import VendorMainScreen from '../screens/vendor/VendorMainScreen';
import {useDispatch, useSelector} from 'react-redux';
import {setWsVendorManagerSale} from '../redux/actions';
import {wsSaleManager} from '../config/apiUrl';

const Stack = createNativeStackNavigator();

const VendorStack = () => {
  // const {wsVendorSale, userId} = useSelector(state => state.userReducer);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(
  //       setWsVendorManagerSale(
  //         new WebSocket(wsSaleManager + '?user_id' + `${userId}`),
  //       ),
  //     );
  //   }
  // }, [dispatch, userId]);

  // useEffect(() => {
  //   if (wsVendorSale) {
  //     AppState.addEventListener('change', nextAppState => {
  //       if (nextAppState === 'background') {
  //         // close connection
  //         return wsVendorSale.close();
  //       }
  //     });
  //   }
  // }, [wsVendorSale]);
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
