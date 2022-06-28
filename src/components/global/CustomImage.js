import React from 'react';
import FastImage from 'react-native-fast-image';

const ImageOptimize = ({uri, style}) => (
  <FastImage
    style={style}
    source={{
      uri: uri,
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
);

export default ImageOptimize;
