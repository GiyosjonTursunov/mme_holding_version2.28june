/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {mainUrl} from '../../../config/apiUrl';
import tw from 'twrnc';
import {useSelector} from 'react-redux';

const ShleftList = ({setShleftId, setSelectedShleftId}) => {
  const [shleftList, setShleftList] = useState([]);
  const [shleftListModalVisible, setShleftListModalVisible] = useState(false);
  const [shleftName, setShleftName] = useState('');

  const {token} = useSelector(state => state.userReducer);

  return (
    <TouchableOpacity
      onPress={() => {
        axios({
          url: `${mainUrl}lastoria/dress-detail/`,
          method: 'GET',
          headers: {
            Authorization: `token ${token}`,
          },
        })
          .then(res => {
            setShleftList(res.data);
            setShleftListModalVisible(true);
          })
          .catch(err => {
            // console.error(err.response.status);
            if (
              err.response.status === 401 ||
              err.response.status === 400 ||
              err.response.status === 403
            ) {
              Alert.alert('Siz royhatdan otmagansiz!');
            }
          });
      }}
      style={tw`w-5.7/12 h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] text-center flex-row items-center`}>
      <Text
        style={tw`m-auto text-black text-base ${
          shleftName ? 'text-black' : 'text-[rgba(0,0,0,0.5)]'
        }`}>
        {shleftName ? shleftName : 'Shleft'}
      </Text>
      <Image
        source={require('../../../../assets/down.png')}
        style={tw`w-6 h-6 m-auto`}
        resizeMode="contain"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={shleftListModalVisible}
        onRequestClose={() => {
          setShleftListModalVisible(false);
        }}>
        <View style={tw`flex-1 bg-[rgba(0,0,0,0.2)]`}>
          <View
            style={tw`w-11.7/12 absolute bottom-27 h-80 left-[1.5%] bg-white rounded`}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={shleftList}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    tw`w-11/12 h-15 mx-auto my-2 bg-white rounded-2xl pl-3`,
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
                  ]}
                  onPress={() => {
                    setShleftId(item.id);
                    setSelectedShleftId(item.id);
                    setShleftName(item.name);
                    setShleftListModalVisible(false);
                  }}>
                  <Text style={tw`text-lg my-auto`}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShleftListModalVisible(false)}
            style={tw`w-11.7/12 h-15 bg-white mx-auto mt-3 rounded-2xl bg-white absolute bottom-10 left-[1.5%]`}>
            <Text style={tw`text-[#007AFF] font-semibold m-auto text-2xl`}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ShleftList;
