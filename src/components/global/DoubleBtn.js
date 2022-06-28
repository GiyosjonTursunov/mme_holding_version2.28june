/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const DoubleBtn = ({
  firstBtnName,
  firstBtnFunction,
  secondBtnName,
  secondBtnFunction,
}) => {
  const [isAll, setIsAll] = useState(true);
  const [isSale, setIsSale] = useState(false);

  return (
    <View style={tw`flex-col justify-around`}>
      <View
        style={tw`w-5/6 h-14 mx-auto flex-row border rounded-xl p-1 bg-[#323054]`}>
        <TouchableOpacity
          onPress={() => {
            setIsAll(true);
            setIsSale(false);
            firstBtnFunction ? firstBtnFunction() : null;
          }}
          style={tw`flex-1 rounded-xl ${isAll ? 'bg-white' : null}`}>
          <Text
            style={tw`m-auto  ${isAll ? 'text-black' : 'text-white'} text-xl`}>
            {firstBtnName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsAll(false);
            setIsSale(true);
            secondBtnFunction ? secondBtnFunction() : null;
          }}
          style={tw`flex-1 rounded-xl ${isSale ? 'bg-white' : null}`}>
          <Text
            style={tw`m-auto ${isSale ? 'text-black' : 'text-white'} text-xl`}>
            {secondBtnName}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoubleBtn;
