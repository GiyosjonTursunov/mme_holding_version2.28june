/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const HeaderThreeBtn = ({
  firstBtnName,
  firstBtnNavigation,
  secondBtnName,
  secondBtnNavigation,
  thirdBtnName,
  thirdBtnNavigation,
}) => {
  const navigation = useNavigation();
  const [isAll, setIsAll] = React.useState(true);
  const [isSale, setIsSale] = React.useState(false);
  const [isFifty, setIsFifty] = React.useState(false);

  return (
    <View style={tw`flex-col justify-around mb-[3%]`}>
      <View
        style={[
          tw`w-5/6 h-12 mx-auto mt-[8%] flex-row border rounded-2xl p-1`,
          {backgroundColor: '#242424'},
        ]}>
        <TouchableOpacity
          onPress={() => {
            firstBtnNavigation ? navigation.navigate(firstBtnNavigation) : null;
            setIsAll(true);
            setIsSale(false);
            setIsFifty(false);
          }}
          style={tw`flex-1 rounded-2xl ${isAll ? 'bg-white' : null}`}>
          <Text style={tw`m-auto  ${isAll ? 'text-black' : 'text-white'}`}>
            {/* Ish haqida */}
            {firstBtnName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            secondBtnNavigation
              ? navigation.navigate(secondBtnNavigation)
              : null;
            setIsAll(false);
            setIsSale(true);
            setIsFifty(false);
          }}
          style={tw`flex-1 rounded-2xl ${isSale ? 'bg-white' : null}`}>
          <Text style={tw`m-auto ${isSale ? 'text-black' : 'text-white'}`}>
            {secondBtnName}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(thirdBtnNavigation);
            setIsAll(false);
            setIsSale(false);
            setIsFifty(true);
          }}
          style={tw`flex-1 rounded-2xl ${isFifty ? 'bg-white' : null}`}>
          <Text style={tw`m-auto ${isFifty ? 'text-black' : 'text-white'}`}>
            {thirdBtnName}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderThreeBtn;
