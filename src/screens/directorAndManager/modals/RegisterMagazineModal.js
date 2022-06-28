import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import tw from 'twrnc';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerModal} from './image-picker-modal';

import {mainUrl} from '../../../config/apiUrl';

const RegisterMagazineModal = ({setMagazineList, magazineList}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [magazineName, setMagazineName] = useState('');
  const [magazineAddress, setMagazineAddress] = useState('');

  const [magazineImgPickerResponse, setMagazineImgPickerResponse] =
    useState(null);
  const [magazineModalVisible, setMagazineModalVisible] = useState(false);
  const [nameImage, setNameImage] = useState('');
  const [uriImage, setUriImage] = useState('');
  const [typeImage, setTypeImage] = useState('');

  const formDataMagazine = new FormData();
  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setMagazineImgPickerResponse).then(
      async image => {
        setNameImage(image.assets[0].fileName);
        setUriImage(image.assets[0].uri);
        setTypeImage(image.assets[0].type);
        setMagazineModalVisible(false);
      },
    );
  }, []);

  const createMagazine = async () => {
    formDataMagazine.append('name', magazineName);
    formDataMagazine.append('address', magazineAddress);

    formDataMagazine.append('img', {
      uri: uriImage,
      type: typeImage,
      name: nameImage,
    });

    let url = `${mainUrl}lastoria/magazines/`;
    let res = await fetch(url, {
      method: 'POST',
      body: formDataMagazine,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    let responseJson = await res.json();
    // console.log(responseJson, 'responseJson');
    if (res.status === 201) {
      setMagazineList([...magazineList, responseJson]);
      setMagazineName('');
      setModalVisible(false);
    } else {
      Alert.alert('Serverda Xatolik');
    }
  };

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Image
        source={require('../../../../assets/plus.png')}
        style={tw`w-9 h-9`}
        resizeMode="contain"
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={tw`w-full h-full bg-[rgba(0,0,0,0.5)]`}>
          <View
            style={tw`w-10/12 h-60 m-auto items-start bg-white rounded-xl justify-around`}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={tw`mt-2 ml-2`}>
              <Text style={tw`text-base font-bold my-auto text-blue-600 p-2`}>
                Close
              </Text>
            </TouchableOpacity>

            <TextInput
              style={tw`w-11/12 h-10 border border-gray-500 rounded-md p-2 mx-auto`}
              placeholder="Magazin nomi"
              value={magazineName}
              onChangeText={setMagazineName}
            />

            <TextInput
              style={tw`w-11/12 h-10 border border-gray-500 rounded-md p-2 mx-auto mt-2`}
              placeholder="Manzil"
              value={magazineAddress}
              onChangeText={setMagazineAddress}
            />

            <TouchableOpacity
              onPress={() => setMagazineModalVisible(true)}
              style={tw`border border-gray-500 w-11/12 h-10 mx-auto flex flex-row items-center rounded-md my-2`}>
              <View
                style={tw`w-6/12 h-10 border rounded-md rounded-tr-3xl rounded-br-3xl justify-center items-center bg-[#242424]`}>
                <Text style={tw`text-white text-base`}>Rasm tanlang</Text>
              </View>
              <Text>Rasm nomi</Text>
            </TouchableOpacity>

            <ImagePickerModal
              isVisible={magazineModalVisible}
              onClose={() => setMagazineModalVisible(false)}
              onImageLibraryPress={onImageLibraryPress}
              onCameraPress={() => {
                return;
              }}
            />

            <TouchableOpacity
              style={tw`w-6/12 h-11 rounded-full bg-[#242424] mx-auto mt-2`}
              onPress={createMagazine}>
              <Text style={tw`m-auto text-base font-semibold text-white`}>
                Qo'shish
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default RegisterMagazineModal;
