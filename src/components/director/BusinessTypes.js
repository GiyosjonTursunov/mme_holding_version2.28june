/* eslint-disable no-lone-blocks */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
import {businessName} from './businessName';

const BusinessTypes = ({ishHaqida}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate(businessName.link);
        {
          businessName.name === 'LaStoria' && ishHaqida
            ? navigation.navigate('AboutLaStoriaScreen')
            : navigation.navigate('CostTypesScreen');
        }
      }}
      style={tw`w-26 bg-[#FFFCE3] rounded-3xl items-center justify-center h-30 rounded-tr-[18] relative mx-10`}>
      <View style={tw`absolute top-[6%] left-[8%] p-2 rounded-full bg-white`}>
        <Image source={require('../../../assets/lastoria.png')} />
      </View>
      <Text
        style={tw`text-base mt-[40%] text-[${
          businessName.name === 'LaStoria' ? '#7F288E' : '#000'
        }]`}>
        {businessName.name}
      </Text>
    </TouchableOpacity>
  );
};

export default BusinessTypes;
