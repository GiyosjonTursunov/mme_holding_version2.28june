import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPageScreen from '../screens/directorAndManager/MainPageScreen';
import AboutWorkScreen from '../screens/directorAndManager/AboutWorkScreen';
import ListOrderedDresses from '../components/warehouse/ListOrderedDresses';
import Product from '../components/warehouse/Product';
import AboutShopsScreen from '../screens/directorAndManager/AboutShopsScreen';
import AboutSalonScreen from '../screens/directorAndManager/AboutSalonScreen';
import ReportScreen from '../screens/directorAndManager/ReportScreen';
import DailySalesStatisticsScreen from '../screens/directorAndManager/DailySalesStatisticsScreen';
import OrdersById from '../screens/wareHouseManager/OrdersById';
// import CostsRegister from '../screens/directorAndManager/CostsRegister';
import AddBalanceToUsers from '../screens/directorAndManager/AddBalanceToUsers';
import BalancedUsersList from '../screens/directorAndManager/BalancedUsersList';
import CostsListsByBalanceId from '../screens/directorAndManager/CostsListsByBalanceId';
import ReportedBalancesList from '../screens/directorAndManager/ReportedBalancesList';
// import DailySalesOrders from '../components/vendor_Manager/DailySalesOrders';

const Stack = createNativeStackNavigator();

const DirectorStack = () => {
  // DailySalesOrders
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainPageScreen"
        component={MainPageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="AboutWorkScreen" component={AboutWorkScreen} />
      <Stack.Screen name="ListOrderedDresses" component={ListOrderedDresses} />
      <Stack.Screen name="OrdersById" component={OrdersById} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="AboutShopsScreen" component={AboutShopsScreen} />
      <Stack.Screen name="AboutSalonScreen" component={AboutSalonScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen
        name="DailySalesStatisticsScreen"
        component={DailySalesStatisticsScreen}
      />
      <Stack.Screen name="AddBalanceToUsers" component={AddBalanceToUsers} />
      <Stack.Screen name="BalancedUsersList" component={BalancedUsersList} />
      <Stack.Screen
        name="ReportedBalancesList"
        component={ReportedBalancesList}
      />
      <Stack.Screen
        name="CostsListsByBalanceId"
        component={CostsListsByBalanceId}
      />
      {/* <Stack.Screen name="DailySalesOrders" component={OrdersById} /> */}
    </Stack.Navigator>
  );
};

export default DirectorStack;
