/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const ThreeBtn = ({
  firstBtnName,
  firstBtnNavigation,
  secondBtnName,
  secondBtnNavigation,
  thirdBtnName,
  thirdBtnNavigation,
  fourth,
}) => {
  const [isAll, setIsAll] = useState(true);
  const [isSale, setIsSale] = useState(false);
  const [isFifty, setIsFifty] = useState(false);

  return (
    <View
      style={tw`w-10.5/12 h-14 mx-auto flex-row rounded-xl p-1 bg-[#323054]`}>
      <TouchableOpacity
        onPress={() => {
          firstBtnNavigation ? firstBtnNavigation() : null;
          setIsAll(true);
          setIsSale(false);
          setIsFifty(false);
        }}
        style={tw`flex-1 rounded-xl ${isAll ? 'bg-white' : null}`}>
        <Text style={tw`m-auto ${isAll ? 'text-black' : 'text-white'} text-lg`}>
          {firstBtnName}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          secondBtnNavigation ? secondBtnNavigation() : null;
          setIsAll(false);
          setIsSale(true);
          setIsFifty(false);
        }}
        style={tw`flex-1 rounded-xl ${isSale ? 'bg-white' : null}`}>
        <Text
          style={tw`m-auto ${isSale ? 'text-black' : 'text-white'} text-lg`}>
          {secondBtnName}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          thirdBtnNavigation ? thirdBtnNavigation() : null;
          setIsAll(false);
          setIsSale(false);
          setIsFifty(true);
        }}
        style={tw`flex-1 rounded-xl ${isFifty ? 'bg-white' : null}`}>
        {fourth ? (
          thirdBtnName
        ) : (
          <Text
            style={tw`m-auto ${isFifty ? 'text-black' : 'text-white'} text-lg`}>
            {thirdBtnName}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ThreeBtn;
