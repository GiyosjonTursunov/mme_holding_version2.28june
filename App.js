import * as React from 'react';
// import {Platform, KeyboardAvoidingView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import RegisterScreen from './src/screens/account/RegisterScreen';
// import LoginScreen from './src/screens/account/LoginScreen';
// import ChooseScreen from './src/screens/ChooseScreen';
// import ChooseCompanyScreen from './src/screens/account/ChooseCompanyScreen';
// import VendorScreen_Manager from './src/screens/vendor_Manager/VendorScreen_Manager';
// import SaleDress from './src/components/vendor_Manager/SaleDress';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
// import AdminScreen from './src/screens/admin/AdminScreen';
// import RegisterResidenceScreen from './src/screens/admin/RegisterResidenceScreen';
// import AboutWorkScreen from './src/screens/directorAndManager/AboutWorkScreen';
// import SupplierStatisticsScreen from './src/screens/directorAndManager/SupplierStatisticsScreen';
// import LaStoriaWareHouseScreen from './src/screens/directorAndManager/LaStoriaWareHouseScreen';
// import AboutShopsScreen from './src/screens/directorAndManager/AboutShopsScreen';
// import AboutSalonScreen from './src/screens/directorAndManager/AboutSalonScreen';
// import CostsRegister from './src/screens/directorAndManager/CostsRegister';
// import CostTypesScreen from './src/screens/directorAndManager/CostTypesScreen';
// import DressById from './src/components/vendor/DressById';
// import SupplierScreen from './src/screens/supplier/SupplierScreen';
// import WareHouseScreen from './src/screens/warehouse/WareHouseScreen';
// import SalonScreen from './src/screens/salon/SalonScreen';
// import LaStoriaNewsScreen from './src/screens/salon/LaStoriaNewsScreen';
// import MainPageScreen from './src/screens/directorAndManager/MainPageScreen';
// import OrdersListScreen from './src/screens/warehouse/OrdersListScreen';
// import OrdersById from './src/components/warehouse/OrdersById';
// import ReportScreen from './src/screens/directorAndManager/ReportScreen';
// import ReportOrders from './src/components/vendor/ReportOrders';
import ChooseScreen from './src/ChooseScreen';

// const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        {/* <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}> */}
        <ChooseScreen />
        {/* </KeyboardAvoidingView> */}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
