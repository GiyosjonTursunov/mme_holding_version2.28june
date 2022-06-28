import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import Input from '../../components/global/Input';
import axios from 'axios';

import {useNavigation} from '@react-navigation/native';
import {mainUrl} from '../../config/apiUrl';

const RegisterScreen = ({route}) => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      // console.warn(jsonValue);
      await AsyncStorage.setItem('@user', jsonValue);
      navigation.navigate('SalonScreen');
    } catch (e) {
      Alert.alert("Xatolik yuz berdi birozdan so'ng qayta urinib ko'ring.");
      // console.warn(e);
    }
  };

  const sendRegister = () => {
    if (route.params?.key !== 'lastoria') {
      Alert.alert('Bu akkauntga faqat LaStoria hamkorligi ruxsat berilgan!');
    } else if (!phone || !password || !name) {
      Alert.alert('To`liq yozing.');
    } else if (password.length < 4) {
      Alert.alert('Password 4tadan kop bolishi kerak.');
    } else {
      const registerData = {
        name: name,
        password: password,
        username: phone,
      };
      let urlForRegister = `${mainUrl}auth/register/`;
      axios({
        url: urlForRegister,
        method: 'POST',
        data: registerData,
      })
        .then(res => {
          storeData(res.data);
          const {data} = res;
          if (data.token) {
            switch (data.role) {
              case 'SALON':
                navigation.navigate('SalonScreen');
                break;
            }
          } else {
            Alert.alert("You don't have permission");
          }
        })
        .catch(_err => {
          return;
          // console.log(_err);
        });
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`flex-1 bg-white`}>
        <KeyboardAvoidingView
          style={tw`flex-1`}
          behavior={Platform.OS === 'ios' ? 'position' : null}>
          <View style={tw`flex-1 justify-center relative mt-5`}>
            <Text style={tw`mx-auto text-7xl text-black`}>MME</Text>
            <Text style={tw`mx-auto text-xs mt-[-3%] mb-[3%] text-gray-900`}>
              Holding company
            </Text>
          </View>
          <View>
            <Text style={tw`text-2xl mx-auto text-black`}>
              Register to use this app
            </Text>
            <Text style={tw`pl-10 mt-10 mb-1 text-lg text-gray-900`}>Name</Text>
            <Input placeH={'name'} onChangeText={setName} value={name} />
            <Text style={tw`pl-10 mt-10 mb-1 text-lg text-gray-900`}>
              Password
            </Text>
            <Input
              placeH={'password'}
              onChangeText={setPassword}
              value={password}
            />
            <Text style={tw`pl-10 mt-10 mb-1 text-lg text-gray-900`}>
              Phone number
            </Text>
            <Input
              placeH={'phone'}
              onChangeText={setPhone}
              value={phone}
              kboard={'numeric'}
            />
            <TouchableOpacity
              onPress={sendRegister}
              style={tw`w-5/12 h-12 bg-black mx-auto my-5 rounded-2xl`}>
              <Text style={tw`m-auto text-white text-lg font-semibold`}>
                Saqlash
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LoginScreen', {key: route.params?.key})
              }
              style={tw`mx-auto`}>
              <Text style={tw`text-[#5199FF] font-bold text-lg`}>
                Akkauntingiz bormi?
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
