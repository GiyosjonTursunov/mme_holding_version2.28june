import {SafeAreaView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Header from '../../../components/global/Header';
import ThreeBtn from '../../../components/global/ThreeBtn';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TexnoStyleMainScreen from './TexnoStyleMainScreen';
import TexnoStyleSaleDoors from './TexnoStyleSaleDoors';
import TexnoStyleBuyScreen from './TexnoStyleBuyScreen';

const Stack = createNativeStackNavigator();

const ManagerTexnoStyleScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* <Header headerName={'TexnoStyle'} /> */}
      <ThreeBtn
        firstBtnName={'Asosiy'}
        firstBtnNavigation={() => navigation.navigate('TexnoStyleMainScreen')}
        secondBtnName={'Sotish'}
        secondBtnNavigation={() => navigation.navigate('TexnoStyleSaleDoors')}
        thirdBtnName={'Olish'}
        thirdBtnNavigation={() => navigation.navigate('TexnoStyleBuyScreen')}
      />
      <Stack.Navigator initialRouteName="TexnoStyleMainScreen">
        <Stack.Screen
          name="TexnoStyleMainScreen"
          component={TexnoStyleMainScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TexnoStyleSaleDoors"
          component={TexnoStyleSaleDoors}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TexnoStyleBuyScreen"
          component={TexnoStyleBuyScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default ManagerTexnoStyleScreen;
