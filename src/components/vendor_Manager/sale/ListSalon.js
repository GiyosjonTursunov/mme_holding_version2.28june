import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const ListSalon = ({listSalon, onPress, closeModal, selectedSalonName}) => {
  // console.warn('listSalon => ', listSalon);
  const getDressIdForSale = id => {
    onPress(id);
    closeModal(false);
  };

  const SalonItem = ({id, name}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          getDressIdForSale(id);
          selectedSalonName(name);
        }}
        style={tw`w-11.7/12 h-11.5 border-b pl-3 flex-row items-center border-[rgba(0,0,0,0.1)] mx-auto`}>
        <Text style={tw`w-1.5/12 text-base font-bold`}>{id}</Text>
        <Text style={tw`my-auto text-lg`}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderSalon = ({item}) => (
    <SalonItem name={item.salon_name} id={item.id} />
  );
  return (
    <View style={tw`w-10.5/12 h-85 bg-white rounded-2xl m-auto`}>
      <FlatList
        data={listSalon}
        renderItem={renderSalon}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ListSalon;
