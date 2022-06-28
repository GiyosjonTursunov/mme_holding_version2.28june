import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import {mainUrl} from '../../../config/apiUrl';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerModal} from '../../../modals/image-picker-modal';
import {useSelector} from 'react-redux';

const RegisterSalonModal = () => {
  const {token} = useSelector(state => state.userReducer);
  const [salonName, setSalonName] = useState('');
  const [salonchiName, setSalonchiName] = useState('');
  const [salonPhone, setSalonPhone] = useState('');
  const [salonAddress, setSalonAddress] = useState('');
  const [passwordSalon, setPasswordSalon] = useState('');

  const [dressImgPickerResponse, setDressImgPickerResponse] = useState(null);

  const [salonImageChooseModalVisible, setSalonImageChooseModalVisible] =
    useState(false);

  const [nameImage, setNameImage] = useState('');
  const [uriImage, setUriImage] = useState('');
  const [typeImage, setTypeImage] = useState('');

  const formDataImg = new FormData();

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setDressImgPickerResponse).then(
      async image => {
        setNameImage(image.assets[0].fileName);
        setUriImage(image.assets[0].uri);
        setTypeImage(image.assets[0].type);
        setSalonImageChooseModalVisible(false);
      },
    );
  }, []);

  const createSalon = () => {
    if (
      salonchiName &&
      salonName &&
      Number(salonPhone) &&
      salonAddress &&
      passwordSalon
    ) {
      if (String(passwordSalon).length < 8) {
        Alert.alert("Password 8 tadan kam bo'lmasin");
      } else {
        formDataImg.append('img', {
          uri: uriImage,
          type: typeImage,
          name: nameImage,
        });

        formDataImg.append('salon_name', salonName);
        formDataImg.append('name', salonchiName);
        formDataImg.append('username', salonPhone);
        formDataImg.append('password', passwordSalon);
        formDataImg.append('address', salonAddress);

        let dataSalon = {
          password: passwordSalon,
          name: salonchiName,
          username: salonPhone,
          salon_name: salonName,
          address: salonAddress,
        };

        axios({
          url: `${mainUrl}lastoria/salon/`,
          method: 'POST',
          data: dataSalon,
          headers: {
            Authorization: `token ${token}`,
          },
        })
          .then(res => {
            Alert.alert('Qo`shildi');
            setPasswordSalon('');
            setSalonchiName('');
            setSalonPhone('');
            setSalonName('');
            setSalonAddress('');
          })
          .catch(_err => {
            // console.warn(_err);
            Alert.alert('Baza bilan qandaydir hatolik.');
            // console.warn('err createSalon => ', err);
          });
      }
    } else {
      Alert.alert('To`liq yozilmagan');
    }
  };

  return (
    <View style={tw`w-11/12 h-95 rounded-2xl m-auto justify-around`}>
      <TextInput
        value={salonName}
        onChangeText={setSalonName}
        placeholder="Salon nomi"
        placeholderTextColor="#7F7F7F"
        style={tw`border h-10 rounded-2xl px-2 border-[rgba(0,0,0,0.5)]`}
      />
      <TextInput
        value={salonchiName}
        onChangeText={setSalonchiName}
        placeholder="Salon egasi ismi"
        placeholderTextColor="#7F7F7F"
        style={tw`border h-10 rounded-2xl px-2 border-[rgba(0,0,0,0.5)]`}
      />
      <TextInput
        value={salonPhone}
        onChangeText={setSalonPhone}
        placeholder="Telefon raqam"
        placeholderTextColor="#7F7F7F"
        style={tw`border h-10 rounded-2xl px-2 border-[rgba(0,0,0,0.5)]`}
      />
      <TextInput
        value={salonAddress}
        onChangeText={setSalonAddress}
        placeholder="Manzil"
        placeholderTextColor="#7F7F7F"
        style={tw`border h-10 rounded-2xl px-2 border-[rgba(0,0,0,0.5)]`}
      />
      <TextInput
        value={passwordSalon}
        onChangeText={setPasswordSalon}
        placeholder="Password"
        placeholderTextColor="#7F7F7F"
        style={tw`border h-10 rounded-2xl px-2 border-[rgba(0,0,0,0.5)]`}
      />

      <TouchableOpacity
        onPress={() => setSalonImageChooseModalVisible(true)}
        style={tw`w-full h-10 flex-row rounded-3xl border border-[rgba(0,0,0,0.5)]`}>
        <View style={tw`w-8/12 h-full pl-2`}>
          <Text style={tw`my-auto text-base text-[rgba(0,0,0,0.5)]`}>
            Rasmi: {nameImage}
          </Text>
        </View>
        <View
          style={tw`w-4/12 h-full border-l bg-[#242424] rounded-br-3xl rounded-tr-3xl`}>
          <Text style={tw`text-base m-auto text-white`}>Files</Text>
        </View>

        <ImagePickerModal
          isVisible={salonImageChooseModalVisible}
          onClose={() => setSalonImageChooseModalVisible(false)}
          onImageLibraryPress={onImageLibraryPress}
          onCameraPress={() => {
            return;
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={createSalon}
        style={tw`w-6.5/12 h-11 border mx-auto rounded-full bg-black`}>
        <Text style={tw`m-auto text-white font-semibold text-base`}>
          Saqlash
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterSalonModal;
