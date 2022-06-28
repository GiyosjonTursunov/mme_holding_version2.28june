import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import tw from 'twrnc';
import RegisterDress from '../../components/vendor_Manager/modals/RegisterDress';
import {ImagePickerModal} from '../../modals/image-picker-modal';

import * as ImagePicker from 'react-native-image-picker';
import {mainUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';

const CreateAdScreen = () => {
  const [dressId, setDressId] = useState('');
  const [note, setNote] = useState('');
  const [rating, setRating] = useState('');
  const [dressImgChooseModalVisible, setDressImgChooseModalVisible] =
    useState(false);

  const [dressImgPickerResponse, setDressImgPickerResponse] = useState(null);

  const [nameImage, setNameImage] = useState('');
  const [uriImage, setUriImage] = useState('');
  const [typeImage, setTypeImage] = useState('');

  const {token} = useSelector(state => state.userReducer);

  const formData = new FormData();

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

  const createAd = async () => {
    formData.append('note', note);
    formData.append('img', {
      uri: uriImage,
      type: typeImage,
      name: nameImage,
    });
    formData.append('dress', dressId);
    formData.append('rating', rating);

    let url = `${mainUrl}lastoria/dress-news/`;
    let res = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'token ' + token,
      },
    });
    if (res.status === 201) {
      Alert.alert("Ko'ylak qo'shildi");
      setNote('');
      setRating('');
      setNameImage('');
      setUriImage('');
      setTypeImage('');
    } else {
      Alert.alert("Iltimos, majburiy ma'lumotlarni to'g'ri to'ldiring");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`flex-1 bg-white`}>
        <RegisterDress setDressId={setDressId} />
        {/* note rating img */}
        <TextInput
          multiline
          placeholder="Qo'shimcha ma'lumot"
          style={tw`w-11/12 h-30 border mx-auto mt-3 rounded-xl py-2 px-2 text-base`}
          onChangeText={setNote}
        />
        <View
          style={tw`w-full flex-row justify-between items-center px-5 mt-3`}>
          <TextInput
            placeholder="Rating"
            style={tw`w-5.8/12 h-10 border rounded-xl`}
            onChangeText={setRating}
          />
          {/* <TextInput placeholder="Rating" style={tw`w-5/12 h-10 border mt-3`} /> */}
          <TouchableOpacity
            onPress={() => setDressImgChooseModalVisible(true)}
            style={tw`w-5.8/12 h-10 border flex-row justify-between items-center rounded-xl`}>
            <Text style={tw`m-auto text-base`}>Rasm</Text>
            <View
              style={tw`w-7.5/12 h-10 bg-black rounded-tr-xl rounded-br-xl`}>
              <Text style={tw`text-white text-lg m-auto`}>File</Text>
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
          style={tw`w-full h-65 mt-3`}
          resizeMode="contain"
        />

        <TouchableOpacity
          onPress={createAd}
          style={tw`w-6/12 h-15 bg-black rounded-xl mx-auto my-3`}>
          <Text style={tw`text-white text-xl font-semibold m-auto`}>
            Saqlash
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAdScreen;
