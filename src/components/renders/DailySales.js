/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {View, Image, Dimensions, Text} from 'react-native';
import {mainUrl} from '../../config/apiUrl';
import tw from 'twrnc';

export function choooseColor(item) {
  if (item.mortgage >= 0) {
    return '#E05C58';
  } else if (item.girl_name) {
    return '#67CEAF';
  } else {
    return '#468CE4';
  }
}

const DailySales = ({
  img,
  dress_name,
  user_name,
  salonchi_name,
  item,
  price,
}) => (
  <View
    style={[
      tw`w-[${Dimensions.get('screen').width / 1.35}px] h-45 ml-[${
        Dimensions.get('screen').width / 6.5
      }px] mr-[3px] mb-2 mt-[${
        Dimensions.get('screen').width / 14
      }px] bg-[${choooseColor(item)}] rounded-3xl`,
      {
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowRadius: 3,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        elevation: 3,
      },
    ]}>
    <View
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowRadius: 3,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        elevation: 3,
      }}>
      <Image
        source={{uri: mainUrl + 'media/' + img}}
        style={tw`w-[${
          Dimensions.get('screen').width / 3.3
        }px] h-46 absolute top-[-${
          Dimensions.get('screen').height / 40
        }px] left-[-${Dimensions.get('screen').width / 9}px] rounded-3xl`}
        resizeMode="cover"
      />
    </View>
    <View
      style={tw`flex-row my-1 items-center justify-end pr-[${
        Dimensions.get('screen').width / 15
      }px] w-9/12 h-[${Dimensions.get('screen').height / 25}px] self-end`}>
      <Text style={tw`text-white text-lg`}>Ko'ylak : </Text>
      <Text style={tw`text-lg text-white`}>{dress_name}</Text>
    </View>

    <View
      style={tw`flex-row my-1 items-center justify-end pr-[${
        Dimensions.get('screen').width / 20
      }px] w-6/12 h-[${Dimensions.get('screen').height / 25}px] self-end`}>
      <Text style={tw`text-white text-lg`}>Narxi : </Text>
      <Text style={tw`text-lg text-white`}>{price}</Text>
    </View>

    <View
      style={tw`flex-row my-1 items-center justify-end pr-[${
        Dimensions.get('screen').width / 15
      }px]`}>
      <Text style={tw`text-white text-lg`}>Salonchi : </Text>
      <Text style={tw`text-lg text-white`}>{salonchi_name}</Text>
    </View>

    <View
      style={tw`flex-row my-1 items-center justify-end pr-[${
        Dimensions.get('screen').width / 15
      }px]`}>
      <Text style={tw`text-white text-lg`}>Sotuvchi : </Text>
      <Text style={tw`text-lg text-white`}>{user_name}</Text>
    </View>
  </View>
);

export default memo(DailySales);
