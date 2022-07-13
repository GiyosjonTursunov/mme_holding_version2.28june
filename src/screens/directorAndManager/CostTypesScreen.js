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
} from 'react-native';
import tw from 'twrnc';
import directorGController from '../../controllers/directorManager/get';
import ThreeBtn from '../../components/global/ThreeBtn';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/global/Header';
import CostDatePicker from '../../components/global/CostDatePicker';

const CostTypesScreen = ({route}) => {
  const navigation = useNavigation();
  const [serioList, setSerioList] = useState([]);
  const [isSerio, setIsSerio] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    directorGController.getCosts(setSerioList, true);
  }, []);

  const ItemSalon = ({item}) => (
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
      <Text style={tw`text-base`}>{item.name}</Text>
      <Text style={tw`text-base`}>{item.number} ta</Text>
      <Text style={tw`text-base`}>{item.price} sum</Text>
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
        firstBtnName={'SERIO'}
        firstBtnNavigation={() => {
          directorGController.getCosts(setSerioList, true);
          setIsSerio(true);
        }}
        secondBtnName={'PROCHI'}
        secondBtnNavigation={() => {
          directorGController.getCosts(setSerioList, false);
          setIsSerio(false);
        }}
        thirdBtnName={
          <Image
            source={require('../../../assets/plus.png')}
            resizeMode="contain"
            style={tw`w-11 h-11 m-auto`}
          />
        }
        thirdBtnNavigation={() => navigation.navigate('CostsRegister')}
        fourth
      />

      {/* <CostDatePicker isSerio={isSerio} /> */}
      <View>
        <View
          style={tw`w-11.6/12 mx-auto flex-row justify-between px-2 items-center border-b h-10`}>
          <Text style={tw`text-lg`}>Nomi</Text>
          <Text style={tw`text-lg`}>Soni</Text>
          <Text style={tw`text-lg`}>Narxi</Text>
        </View>
        <View style={tw`h-[${Dimensions.get('screen').height / 1.9}px]`}>
          <FlatList
            data={serioList}
            renderItem={renderItemSalon}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  directorGController.getCosts(setSerioList, isSerio);
                  // console.log(isSerio);
                  setRefreshing(false);
                }}
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CostTypesScreen;
