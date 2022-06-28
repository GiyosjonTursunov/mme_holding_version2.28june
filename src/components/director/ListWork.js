import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
import {workNames} from './workNames';

const ListWork = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`w-full h-35 flex-row`}>
      <FlatList
        contentContainerStyle={tw`flex-1 justify-around`}
        horizontal
        data={workNames}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.link)}
            style={tw`w-30 h-[70%] bg-[${item.color}] rounded-[30px] items-center justify-center self-end relative`}>
            <View style={tw`w-5.5/12 h-[55%] rounded-full absolute top-[-20%]`}>
              <Image
                source={require('../../../assets/magazin2.png')}
                style={tw`w-full h-full rounded-full`}
              />
            </View>
            <Text style={tw`mx-auto mt-8 font-bold`}>{item.number}</Text>
            <Text style={tw`mx-auto mt-1 text-[rgba(0,0,0,0.5)]`}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ListWork;
