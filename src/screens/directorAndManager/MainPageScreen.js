/* eslint-disable react-native/no-inline-styles */
import {View, SafeAreaView, FlatList, Image, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import DoubleBtn from '../../components/global/DoubleBtn';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AboutWorkSubScreen from './AboutWorkSubScreen';
import CostSubScreen from './CostSubScreen';
import Header from '../../components/global/Header';
import axios from 'axios';
import {baseUrl, mainUrl} from '../../config/apiUrl';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const MainPageScreen = () => {
  const navigation = useNavigation();
  const [companies, setCompanies] = useState([]);
  const [isAbout, setIsAbout] = useState(true);
  const {token} = useSelector(state => state.userReducer);

  useEffect(() => {
    if (token) {
      axios({
        url: `${mainUrl}dashboard/companies/`,
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then(res => {
          setCompanies(res.data);
          // console.warn(res.data, 'error ham shu res ham');
        })
        .catch(_err => {
          return;
          // console.error(_err, 'error ham shu res ham');
        });
    }
  }, [token]);

  const Item = ({img}) => (
    <TouchableOpacity
      onPress={() => {
        isAbout
          ? navigation.navigate('AboutWorkScreen')
          : navigation.navigate('CostTypesScreen', {director: true});
      }}
      style={[
        tw`w-30 h-30 m-auto mx-1 rounded-xl p-1`,
        {
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 3,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          elevation: 3,
          backgroundColor: '#ffff',
        },
      ]}>
      <Image
        source={{uri: baseUrl + img}}
        resizeMode="contain"
        style={tw`w-full h-full`}
      />
    </TouchableOpacity>
  );

  const renderItem = ({item}) => <Item img={item.img} />;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header headerName={'Asosiy sahifa'} />
      <DoubleBtn
        firstBtnName={'Ish haqida'}
        secondBtnName={'Xarajatlar'}
        firstBtnFunction={() => {
          navigation.navigate('AboutWorkSubScreen');
          setIsAbout(true);
        }}
        secondBtnFunction={() => {
          navigation.navigate('CostSubScreen', {
            director: true,
            companies: companies,
          });
          setIsAbout(false);
        }}
      />

      <View style={tw`h-35`}>
        <FlatList
          horizontal
          data={companies}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <Stack.Navigator initialRouteName="AboutWorkSubScreen">
        <Stack.Screen
          name="AboutWorkSubScreen"
          component={AboutWorkSubScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CostSubScreen"
          component={CostSubScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MainPageScreen;
