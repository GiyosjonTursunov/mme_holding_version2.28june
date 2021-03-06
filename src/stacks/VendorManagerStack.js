import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VendorScreen_Manager from '../screens/vendor_Manager/VendorScreen_Manager';
import SaleDress from '../components/vendor_Manager/SaleDress';
import ReportSales from '../components/vendor_Manager/ReportSales';
import DebtorsScreen from '../screens/vendor_Manager/DebtorsScreen';
import {useDispatch, useSelector} from 'react-redux';
import {setWsVendorManagerSale} from '../redux/actions';
import {wsSaleManager} from '../config/apiUrl';
import {AppState} from 'react-native';
import CostsRegister from '../screens/directorAndManager/CostsRegister';

const Stack = createNativeStackNavigator();

const VendorManagerStack = () => {
  const {wsVendorManagerSale} = useSelector(state => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWsVendorManagerSale(new WebSocket(wsSaleManager)));
  }, [dispatch]);

  useEffect(() => {
    if (wsVendorManagerSale) {
      // wsVendorManagerSale.onopen = () => {
      //   console.error('wsVendorManagerSales open');
      // };
      AppState.addEventListener('change', nextAppState => {
        // console.error('nextAppState', nextAppState);
        if (nextAppState === 'background') {
          // close connection
          console.warn(nextAppState);
          console.error('close connection');
          return wsVendorManagerSale.close();
        } else if (nextAppState === 'active') {
          // open connection
          console.warn(nextAppState);
          console.error('open connectionmanager');
          // wsVendorManagerSale.open();
        }
      });
    }
  }, [wsVendorManagerSale]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VendorScreen_Manager"
        component={VendorScreen_Manager}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SaleDress" component={SaleDress} />
      <Stack.Screen name="ReportSales" component={ReportSales} />
      <Stack.Screen name="DebtorsScreen" component={DebtorsScreen} />
      <Stack.Screen name="CostsRegister" component={CostsRegister} />
    </Stack.Navigator>
  );
};

export default VendorManagerStack;
