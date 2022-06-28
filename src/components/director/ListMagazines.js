import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import tw from 'twrnc';
import {mainUrl} from '../../config/apiUrl';

const Item = ({
  name,
  address,
  navigation,
  money,
  left_money,
  saled_dresses,
  imgUrl,
  id,
}) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('AboutShopsScreen', {
        id: id,
        name: name,
      })
    }
    style={[
      tw`w-38 h-46 flex-col bg-[#F6F8FA] rounded-xl m-auto mx-2.2 bg-white rounded-tr-3xl rounded-tl-3xl`,
      // eslint-disable-next-line react-native/no-inline-styles
      {
        shadowColor: '#000',
        shadowOpacity: 0.17,
        shadowRadius: 5,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        elevation: 4,
      },
    ]}>
    {imgUrl ? (
      <Image
        source={{
          uri: `${mainUrl + imgUrl.substring(1)}`,
        }}
        style={tw`w-full h-30 mx-auto rounded-3xl`}
        resizeMode="cover"
      />
    ) : (
      <Image
        source={require('../../../assets/icon.png')}
        style={tw`w-11/12 h-22 mx-auto rounded-3xl mt-1.1`}
      />
    )}
    <View style={tw`flex-col m-auto w-full pl-1`}>
      <Text style={tw`font-bold italic text-[#2296F3] mx-auto`}>{name}</Text>
      <Text style={tw`text-sm mx-auto`}>{address || '---'}</Text>
    </View>
  </TouchableOpacity>
);

const ListMagazines = ({magazineList}) => {
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <Item
      name={item.name}
      address={item.address}
      navigation={navigation}
      money={item.money}
      saled_dresses={item.saled_dresses}
      left_money={item.left_money}
      id={item.id}
      imgUrl={item.img}
    />
  );

  return (
    <View style={tw`w-11.5/12 h-48 mx-auto`}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={magazineList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ListMagazines;
