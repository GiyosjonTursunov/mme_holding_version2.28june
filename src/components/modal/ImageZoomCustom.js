import {View, Modal, Dimensions, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ImageZoom from 'react-native-image-pan-zoom';
// import FastImage from 'react-native-fast-image';

import tw from 'twrnc';
// import ImageOptimize from '../global/CustomImage';

const ImageZoomCustom = ({
  selectedDressImgModalVisible,
  setSelectedDressImgModalVisible,
  selectedDressImg,
}) => {
  // console.error('imgkuu ', selectedDressImg);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={selectedDressImgModalVisible}
      onRequestClose={() => {
        setSelectedDressImgModalVisible(false);
      }}>
      <View style={tw`flex-1 bg-white`}>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height}>
          <Image
            source={{uri: selectedDressImg}}
            style={tw`w-full h-full`}
            resizeMode="contain"
          />
        </ImageZoom>
        <TouchableOpacity
          style={tw`absolute top-0 left-0 mt-13 ml-3`}
          onPress={() => {
            setSelectedDressImgModalVisible(false);
          }}>
          <Image
            source={require('../../../assets/back.png')}
            style={tw`w-10 h-10`}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ImageZoomCustom;
