/* eslint-disable react-native/no-inline-styles */
import {View, Modal} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';

const LoadingLottie = ({showLoading, setShowLoading, animation}) => {
  return showLoading ? (
    <Modal
      transparent={true}
      animationType="fade"
      visible={showLoading}
      onRequestClose={() => {
        // console.log('Modal has been closed.');
        setShowLoading(false);
      }}>
      <View style={tw`flex-1 bg-[rgba(0,0,0,0.5)]`}>
        <LottieView
          source={animation}
          style={[tw`w-full m-auto`, {aspectRatio: 1}]}
          autoPlay
          loop
        />
      </View>
    </Modal>
  ) : null;
};

export default LoadingLottie;
