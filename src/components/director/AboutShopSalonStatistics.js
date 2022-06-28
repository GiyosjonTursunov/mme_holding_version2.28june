import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

const AboutShopSalonStatistics = ({name, number, children}) => {
  return (
    <View
      style={tw`w-10/12 h-15 border-b border-[rgba(0,0,0,0.5)] mx-auto flex-row my-1`}>
      <View style={tw`w-1.7/12 h-[80%] my-auto rounded-full`}>
        {/* Rasm */}
        {children}
      </View>
      <View style={tw`w-5.5/12 h-full items-start justify-center pl-[1%]`}>
        <Text style={tw`text-base font-semibold`}>{name}</Text>
      </View>
      <View
        style={tw`w-5/12 h-full border-l border-[rgba(0,0,0,0.5)] items-start justify-center pl-[1%]`}>
        <Text style={tw`text-base font-semibold ml-3`}>{number || 0}</Text>
      </View>
    </View>
  );
};

export default AboutShopSalonStatistics;
