/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Modal,
  Alert,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {mainUrl} from '../../../config/apiUrl';
import tw from 'twrnc';

const ListDoors = ({
  setDoorId,
  setDoorPrice,
  setDoorImg,
  setName,
  is_sale,
  doors,
}) => {
  const {token} = useSelector(state => state.userReducer);
  const [doorName, setDoorName] = useState('');

  const [listDoorVisible, setListDoorVisible] = useState(false);

  const getDoorData = (id, name, price, img) => {
    setDoorId(id);
    setDoorName(name);
    setName(name);
    setDoorPrice(price);
    setDoorImg(img);
    setListDoorVisible(false);
  };

  const DoorsItem = ({id, name, price, img, count}) => {
    return (
      <TouchableOpacity
        onPress={() => getDoorData(id, name, price, img)}
        style={tw`w-11.7/12 h-11.5 border-b pl-3 flex-row items-center border-[rgba(0,0,0,0.1)] mx-auto`}>
        <Text style={tw`w-1.5/12 text-base font-bold`}>{id}</Text>
        <Text style={tw`my-auto text-lg`}>
          {name} {is_sale && `- soni ${count}`}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderDoors = ({item}) => (
    <DoorsItem
      name={is_sale ? item?.doors?.name : item?.name}
      id={item?.id}
      price={item?.price}
      img={is_sale ? item?.doors?.img : item?.img}
      count={item?.count}
    />
  );

  return (
    <TouchableOpacity
      onPress={() => setListDoorVisible(true)}
      style={tw`w-11/12 h-13 mx-auto border rounded-xl border-gray-500 flex-row justify-between items-center px-3`}>
      <Text style={tw`text-xl`}>Eshik tanlang: {doorName}</Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={listDoorVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setListDoorVisible(!listDoorVisible);
        }}>
        <View
          style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
          <View
            style={tw`w-10.5/12 h-100 bg-[#F1EFF7] rounded-2xl justify-around relative`}>
            <Pressable
              style={tw`absolute right-[-2%] top-[-10px]`}
              onPress={() => setListDoorVisible(false)}>
              <Image
                source={require('../../../../assets/x-button.png')}
                style={tw`w-9 h-9`}
              />
            </Pressable>
            <View
              style={tw`w-10.5/12 mx-auto h-83 bg-[#FBFBFB] rounded-3xl rounded-2xl`}>
              <FlatList
                data={doors}
                renderItem={renderDoors}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Image
        source={require('../../../../assets/down3.png')}
        style={tw`w-8 h-8`}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default ListDoors;
