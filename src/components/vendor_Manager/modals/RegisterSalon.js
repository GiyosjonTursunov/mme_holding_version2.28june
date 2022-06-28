import {View, Text, TouchableOpacity, Image, Modal, Alert} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {mainUrl} from '../../../config/apiUrl';
import {useSelector} from 'react-redux';
import ListSalon from '../sale/ListSalon';
import tw from 'twrnc';
import RegisterSalonModal from './RegisterSalonModal';

const RegisterSalon = ({setSalonId}) => {
  const {token} = useSelector(state => state.userReducer);
  const [salonListModalVisible, setSalonListModalVisible] = useState(false);
  const [salonList, setSalonList] = useState([]);
  const [selectedSalonName, setSelectedSalonName] = useState('');
  const [salonModalRegisterVisible, setSalonModalRegisterVisible] =
    useState(false);

  const getSalonList = () => {
    axios({
      url: `${mainUrl}lastoria/salon/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        setSalonListModalVisible(true);
        setSalonList(res.data);
      })
      .catch(_err => {
        return;
        // console.error(err);
      });
  };
  return (
    <View
      style={tw`w-11/12 h-11 flex-row justify-between items-center mx-auto my-[1%]`}>
      <TouchableOpacity
        onPress={getSalonList}
        style={tw`w-10.5/12 h-11 border rounded-xl justify-between border-[rgba(0,0,0,0.5)] flex-row px-5 items-center`}>
        <Text style={tw`text-lg`}>
          Salon:{' '}
          <Text style={tw`font-semibold text-black`}>{selectedSalonName}</Text>
        </Text>
        <Image
          source={require('../../../../assets/down.png')}
          style={tw`w-8 h-8`}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={salonListModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setSalonListModalVisible(!salonListModalVisible);
          }}>
          <View
            style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
            <View
              style={tw`w-10.5/12 h-110 bg-[#F1EFF7] rounded-2xl justify-around`}>
              <View
                style={tw`w-full h-8 pl-3 flex-row justify-start px-5 items-center`}>
                <TouchableOpacity
                  style={tw`absolute right-2 top-[-10px]`}
                  onPress={() => setSalonListModalVisible(false)}>
                  <Image
                    source={require('../../../../assets/x-button.png')}
                    style={tw`w-12 h-12`}
                  />
                </TouchableOpacity>
                <Text style={tw`text-base font-semibold mx-auto`}>
                  Salonlar ro'yhati.
                </Text>
              </View>
              <ListSalon
                closeModal={setSalonListModalVisible}
                onPress={setSalonId}
                listSalon={salonList}
                selectedSalonName={setSelectedSalonName}
              />
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSalonModalRegisterVisible(true)}>
        <Image
          source={require('../../../../assets/plus.png')}
          style={tw`w-8 h-8`}
        />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={salonModalRegisterVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setSalonModalRegisterVisible(!salonModalRegisterVisible);
        }}>
        <View
          style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
          <View
            style={tw`w-10.5/12 h-110 bg-[#F1EFF7] rounded-2xl justify-around`}>
            <View
              style={tw`w-full h-8 pl-3 flex-row justify-start px-5 items-center`}>
              <TouchableOpacity
                style={tw`absolute right-2 top-[-10px]`}
                onPress={() => setSalonModalRegisterVisible(false)}>
                <Image
                  source={require('../../../../assets/x-button.png')}
                  style={tw`w-12 h-12`}
                />
              </TouchableOpacity>
              <Text style={tw`text-base font-semibold ml-[18%]`}>
                Salon kiritish
              </Text>
            </View>
            <RegisterSalonModal />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RegisterSalon;
