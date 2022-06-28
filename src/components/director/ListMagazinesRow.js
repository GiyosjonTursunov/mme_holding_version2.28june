/* eslint-disable no-lone-blocks */
import React from 'react';
import {Text, FlatList, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const ListMagazinesRow = ({data, getId, setModalMagazine}) => {
  const navigation = useNavigation();
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            {
              getId
                ? (getId(item.id), setModalMagazine(false))
                : navigation.navigate('AboutShopDressInfoScreen', {
                    magazineName: item.name,
                  });
            }
          }}
          style={[
            tw`w-26 bg-[#E9FFE3] items-center justify-center h-30 mx-5 my-auto rounded-tr-[20] rounded-2xl`,
          ]}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default ListMagazinesRow;
