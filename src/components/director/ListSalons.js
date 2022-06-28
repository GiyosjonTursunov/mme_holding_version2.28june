/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {baseUrl} from '../../config/apiUrl';

const ListSalons = ({dataList}) => {
  const navigation = useNavigation();

  const ItemSalon = ({salon_name, salon_address, salon_id, image}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('AboutSalonScreen', {
          name: salon_name,
          id: salon_id,
        })
      }
      style={[
        tw`w-90 h-20 flex-row justify-center items-center rounded-xl bg-white mx-4 mt-1`,
        {
          shadowColor: '#000',
          shadowOpacity: 0.17,
          shadowRadius: 3,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          elevation: 2,
        },
      ]}>
      {image ? (
        <Image
          source={{uri: baseUrl + image}}
          style={tw`w-15 h-15 rounded-xl m-auto`}
        />
      ) : (
        <Image
          source={require('../../../assets/magazin1.png')}
          style={tw`w-15 h-15 rounded-xl m-auto`}
        />
      )}

      <View style={tw`w-7/12 h-full pl-3 justify-around`}>
        <Text style={tw`text-lg font-bold`}>{salon_name}</Text>
        <View style={tw`flex-row w-12/12 justify-around`}>
          <Text style={tw`text-[#49CD22] text-base`}>Manzil</Text>
          <Text style={tw`text-[#FFC029] text-base`}>{salon_address}</Text>
        </View>
      </View>

      <Image
        source={require('../../../assets/arrow-right.png')}
        style={tw`w-8 h-8 mr-[5%]`}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const renderItemSalon = ({item}) => (
    <ItemSalon
      salon_name={item.salon_name}
      salon_address={item.address}
      salon_id={item.id}
      image={item.img}
    />
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      pagingEnabled
      data={dataList}
      renderItem={renderItemSalon}
      keyExtractor={item => item.id}
    />
  );
};

export default ListSalons;
