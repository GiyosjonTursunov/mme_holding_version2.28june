/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/global/Header';
// import CostDatePicker from '../../components/global/CostDatePicker';
import DoubleBtn from '../../components/global/DoubleBtn';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';
import {spacify} from '../../helpers/spacify';
import ThreeBtn from '../../components/global/ThreeBtn';

const CostTypesScreen = ({route}) => {
  const {token, userId} = useSelector(state => state.userReducer);
  const navigation = useNavigation();
  const [serioList, setSerioList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [balanceByUser, setBalanceByUser] = useState([]);

  const getBalanceById = async () => {
    setRefreshing(true);
    const resultBalance = await axios(
      mainUrl + `dashboard/balance/list/by/user/${userId}/`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );

    if (resultBalance.status === 200) {
      setBalanceByUser(resultBalance.data);
      // console.log(resultBalance.data);
      setRefreshing(false);
    } else {
      Alert.alert('Error', 'Bazaga ulanishda xatolik yuz berdi');
      setRefreshing(false);
    }
  };

  const getCostsByBalanceId = async () => {
    setRefreshing(true);
    const resultCosts = await axios.get(
      mainUrl + `dashboard/balance/history/filter/${balanceByUser[0]?.id}/`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );

    if (resultCosts.status === 200) {
      setSerioList(resultCosts.data);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    if (token && userId) {
      getBalanceById();
    }
  }, [token, userId]);

  useEffect(() => {
    if (token && balanceByUser[0]?.id) {
      getCostsByBalanceId();
    }
  }, [balanceByUser, token]);

  const ItemSalon = ({item}) =>
    item?.add_balance_uz || item?.add_balance_us ? (
      <View
        style={[
          tw`flex-row justify-between items-center p-[4%] m-auto w-11/12 bg-[#FEF6E1] rounded-xl my-2`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.16,
            shadowRadius: 2.5,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 2,
          },
        ]}>
        <Text style={tw`text-blue-600 text-base font-bold`}>
          Balans qoshildi
        </Text>
        <Text>{spacify(item?.add_balance_uz)} sum</Text>
        <Text>{spacify(item?.add_balance_us)} 💵</Text>
      </View>
    ) : (
      <View
        style={[
          tw`flex-row justify-between items-center p-[4%] m-auto w-11/12 bg-[#FEF6E1] rounded-xl my-2`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.16,
            shadowRadius: 2.5,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 2,
          },
        ]}>
        <Text style={tw`text-base`}>{item?.name}</Text>
        <Text style={tw`text-base`}>
          {item?.count} {item?.amount}
        </Text>
        <Text style={tw`text-base`}>{spacify(item?.price_uz)} sum</Text>
        <Text style={tw`text-base`}>{spacify(item?.price_us)} 💵</Text>
      </View>
    );

  const renderItemSalon = ({item}) => <ItemSalon item={item} />;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header
        headerName={
          route.params?.director ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../../assets/back.png')}
                style={tw`w-9 h-9`}
              />
            </TouchableOpacity>
          ) : (
            'Xarajatlar'
          )
        }
      />
      <ThreeBtn
        firstBtnName={'Xarajatlar'}
        firstBtnNavigation={getCostsByBalanceId}
        secondBtnName={
          <Image
            source={require('../../../assets/plus.png')}
            resizeMode="contain"
            style={tw`w-10.5 h-10.5 m-auto`}
          />
        }
        secondBtnNavigation={() => navigation.navigate('CostsRegister')}
        thirdBtnName={'TexnoStyle'}
        thirdBtnNavigation={() =>
          navigation.navigate('ManagerTexnoStyleScreen')
        }
      />
      {/* <DoubleBtn
        firstBtnName={'Xarajatlar'}
        firstBtnFunction={getCostsByBalanceId}
        secondBtnName={
          <Image
            source={require('../../../assets/plus.png')}
            resizeMode="contain"
            style={tw`w-10.5 h-10.5 m-auto`}
          />
        }
        secondBtnFunction={() => navigation.navigate('CostsRegister')}
        isImageSecond
      /> */}

      <View style={tw`mb-2`} />

      {/* <CostDatePicker isSerio={isSerio} /> */}
      {/* <View> */}
      {/* <View
          style={tw`w-11.6/12 mx-auto flex-row justify-between px-2 items-center border-b h-10`}>
          <Text style={tw`text-lg`}>Nomi</Text>
          <Text style={tw`text-lg`}>Soni</Text>
          <Text style={tw`text-lg`}>Narxi</Text>
        </View> */}
      {/* <View style={tw`h-[${Dimensions.get('screen').height / 1.9}px]`}> */}
      <FlatList
        data={serioList}
        renderItem={renderItemSalon}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getCostsByBalanceId}
          />
        }
      />
      {/* </View> */}
      {/* </View> */}
    </SafeAreaView>
  );
};

export default CostTypesScreen;
