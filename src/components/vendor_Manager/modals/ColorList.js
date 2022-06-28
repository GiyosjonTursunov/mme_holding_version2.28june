/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image, Modal, Alert} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';

const ColorList = ({setSelectedColorId}) => {
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [selectedColorName, setSelectedColorName] = useState('');

  return (
    <TouchableOpacity
      style={tw`flex-row w-5.7/12 h-11 border my-2 rounded-xl justify-between items-center border-[rgba(0,0,0,0.5)]`}
      onPress={() => setColorModalVisible(true)}>
      <Text style={tw`m-auto text-lg text-gray-500`}>
        {selectedColorName || 'Rang'}
      </Text>

      <Image
        source={require('../../../../assets/down.png')}
        style={tw`w-6 h-6 m-auto`}
        resizeMode="contain"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={colorModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setColorModalVisible(!colorModalVisible);
        }}>
        <View style={tw`flex-1 bg-[rgba(0,0,0,0.3)]`}>
          <View
            style={tw`absolute bottom-27 w-full h-40 justify-around items-center`}>
            <View
              style={tw`w-11.5/12 bg-white h-40 justify-around items-center rounded-lg`}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedColorName('Telesniy');
                  setSelectedColorId('1');
                  setColorModalVisible(!colorModalVisible);
                }}
                style={[
                  tw`w-11/12 h-15 rounded-xl`,
                  {
                    shadowColor: '#000',
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    elevation: 3,
                    backgroundColor: '#ffff',
                  },
                ]}>
                <Text style={tw`text-2xl m-auto`}>Telesniy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedColorName('Ayveri');
                  setSelectedColorId('2');
                  setColorModalVisible(!colorModalVisible);
                }}
                style={[
                  tw`w-11/12 h-15 rounded-xl`,
                  {
                    shadowColor: '#000',
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    elevation: 3,
                    backgroundColor: '#ffff',
                  },
                ]}>
                <Text style={tw`text-2xl m-auto`}>Ayveri</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setColorModalVisible(!colorModalVisible)}
            activeOpacity={0.9}
            style={tw`absolute bottom-10 w-10/12 h-15 bg-white rounded-xl left-[7.5%]`}>
            <Text style={tw`text-[#007AFF] font-semibold m-auto text-2xl`}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ColorList;
