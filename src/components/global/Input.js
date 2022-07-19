import React from 'react';
import {TextInput} from 'react-native';
import tw from 'twrnc';

const Input = ({placeH, onChangeText, value, kboard, secure}) => {
  return (
    <TextInput
      secureTextEntry={secure}
      value={value}
      placeholder={placeH}
      onChangeText={onChangeText}
      keyboardType={kboard}
      style={tw`w-10/12 h-10 border border-b border-t-0 border-r-0 border-l-0 mx-auto pl-3 text-base border-gray-500 text-black`}
    />
  );
};

export default Input;
