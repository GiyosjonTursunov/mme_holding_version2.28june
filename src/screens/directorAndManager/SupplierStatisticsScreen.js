/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import tw from 'twrnc';
import Header from '../../components/global/Header';
import directorGController from '../../controllers/directorManager/get';

import {mainUrl} from '../../config/apiUrl';
import {useNavigation} from '@react-navigation/native';

const SupplierStatisticsScreen = () => {
  const navigation = useNavigation();
  const [salonList, setSalonList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    directorGController.getAllSales(setSalonList);
  }, []);

  const Item = ({
    id,
    name,
    given_price,
    salon_given_price,
    date_created,
    image,
  }) => {
    const newLocal = '#000';
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DressById', {
            saleId: id,
            director: true,
          })
        }
        style={[
          tw`w-11/12 h-18 bg-[#F7F7F7] mx-auto my-2 flex-row items-center px-2 rounded-xl`,
          {
            shadowColor: newLocal,
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 3,
          },
        ]}>
        {image?.length > 1 ? (
          <Image
            source={{uri: mainUrl + 'media/' + image}}
            style={tw`w-13 h-13 rounded-full`}
          />
        ) : (
          <Image
            source={require('../../../assets/wedding-dress.png')}
            style={tw`w-10 h-10 m-auto`}
          />
        )}

        <View style={tw`w-8/12 h-[80%] items-start px-3 justify-around `}>
          <Text style={tw`text-base font-bold`}>{name}</Text>
          <View style={tw`flex-row w-9/12 justify-between`}>
            <Text style={tw`text-[#49CD22] font-bold`}>
              {given_price ? given_price : salon_given_price}
            </Text>
            <Text style={tw`text-[#FFC029] font-bold`}>{date_created}</Text>
          </View>
        </View>
        <Image
          source={require('../../../assets/arrow-right.png')}
          style={tw`w-8 h-8`}
        />
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => (
    <Item
      id={item.id}
      name={item.salon}
      given_price={item.given_price}
      salon_given_price={item.salon_given_price}
      date_created={item.date_created}
      image={item.dress?.img}
    />
  );

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Header headerName={"Salonlar ro'yhati"} />
      <View
        style={tw`flex-row border-b border-gray-500 shadow-lg shadow-indigo-500/40 justify-between w-11/12 mx-auto mt-[5%]`}>
        <Text style={tw`font-bold text-base text-gray-700`}>
          Kutishdagi maxsulotlar
        </Text>
      </View>

      <View style={tw`h-${Dimensions.get('screen').height / 5.5}`}>
        <FlatList
          data={salonList}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() =>
                directorGController.getAllSales(setSalonList, setRefreshing)
              }
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default SupplierStatisticsScreen;
