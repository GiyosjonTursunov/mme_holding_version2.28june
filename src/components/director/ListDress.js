import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import tw from 'twrnc';

const ListDress = ({dataDress, navigation}) => {
  const Item = ({name, date, price}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AboutSalonScreen')}
      style={tw`w-11/12 h-20 mx-auto mt-[2%] flex-row justify-center items-center rounded-xl bg-[#F7F7F7]`}>
      <View style={tw`w-2.6/12 h-[90%] rounded-xl`}>
        <Image
          source={require('../../../assets/magazin1.png')}
          style={tw`w-9/12 h-10/12 rounded-xl m-auto`}
        />
      </View>

      <View style={tw`w-7/12 h-full pl-3 justify-around`}>
        <Text style={tw`text-lg font-bold`}>{name}</Text>
        <View style={tw`flex-row w-12/12`}>
          <Text style={tw`text-[#49CD22] text-base`}>{date}</Text>
        </View>
      </View>
      <Text style={tw`text-base font-bold`}>{price}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({item}) => (
    <Item name={item.name} date={item.date} price={item.price} />
  );
  return (
    <FlatList
      data={dataDress}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default ListDress;
