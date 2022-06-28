import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import tw from 'twrnc';
import {useSelector} from 'react-redux';

import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerModal} from '../../../modals/image-picker-modal';
import {mainUrl} from '../../../config/apiUrl';

const TexnoStyleCreateDoorsScreen = () => {
  const [dressImgChooseModalVisible, setDressImgChooseModalVisible] =
    useState(false);

  const [dressImgPickerResponse, setDressImgPickerResponse] = useState(null);

  const [nameImage, setNameImage] = useState('');
  const [uriImage, setUriImage] = useState('');
  const [typeImage, setTypeImage] = useState('');

  const {token} = useSelector(state => state.userReducer);

  const formData = new FormData();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [count, setCount] = useState('');

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
        setDressImgChooseModalVisible(false);
      },
    );
  }, []);

  const createDoor = async () => {
    if (name && price) {
      formData.append('img', {
        uri: uriImage,
        type: typeImage,
        name: nameImage,
      });
      formData.append('name', name);
      formData.append('price', price);
      formData.append('count', count);

      let url = `${mainUrl}texno-style/doors-append-history-custom/`;
      let res = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `token ${token}`,
        },
      });
      if (res.status === 201) {
        Alert.alert("Eshik qo'shildi");
        setNameImage('');
        setUriImage('');
        setTypeImage('');
        return;
      }
    } else {
      Alert.alert("Iltimos, majburiy ma'lumotlarni to'g'ri to'ldiring");
      return;
    }
  };

  return (
    <ScrollView style={tw`bg-white pt-3`}>
      <TextInput
        placeholder="Eshik nomi"
        style={tw`border w-11/12 h-13 mx-auto my-2 rounded-xl pl-5g border-gray-500`}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Eshik narxi"
        style={tw`border w-11/12 h-13 mx-auto my-2 rounded-xl pl-5 border-gray-500`}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <View style={tw`w-11/12 flex-row mx-auto justify-between`}>
        <TextInput
          placeholder="Eshik soni"
          style={tw`border w-5/12 h-13 my-2 rounded-xl pl-5 border-gray-500`}
          onChangeText={setCount}
          keyboardType="numeric"
        />

        <TouchableOpacity
          onPress={() => setDressImgChooseModalVisible(true)}
          style={tw`w-6/12 border h-13 flex-row justify-between items-center rounded-xl border-gray-500 my-2`}>
          <Text style={tw`text-xl m-auto`}>Rasm</Text>
          <View
            style={tw`w-7/12 h-full bg-[#323054] rounded-tr-xl rounded-br-xl`}>
            <Text style={tw`text-white m-auto text-xl`}>File</Text>
          </View>
          <ImagePickerModal
            isVisible={dressImgChooseModalVisible}
            onClose={() => setDressImgChooseModalVisible(false)}
            onImageLibraryPress={onImageLibraryPress}
            onCameraPress={() => {
              return;
            }}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={{uri: uriImage}}
        style={tw`w-full h-65 my-2`}
        resizeMode="contain"
      />

      <TouchableOpacity
        onPress={createDoor}
        style={tw`w-8/12 h-15 bg-[#323054] my-2 mx-auto rounded-xl`}>
        <Text style={tw`text-white text-xl m-auto`}>Saqlash</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TexnoStyleCreateDoorsScreen;
