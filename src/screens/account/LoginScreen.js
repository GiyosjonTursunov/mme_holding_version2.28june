import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import Input from '../../components/global/Input';
import axios from 'axios';

import {mainUrl} from '../../config/apiUrl';

import {useDispatch} from 'react-redux';
import {setIsLogIn, setRole} from '../../redux/actions';

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@user', jsonValue);
  } catch (e) {
    Alert.alert('Error', 'Error');

    // console.warn(e);
  }
};

const LoginScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const sendLogin = () => {
    // if (route.params?.key === 'LaStoria') {
    const loginData = {
      username: phone,
      password: password,
    };
    let urlLogin = `${mainUrl}auth/login/`;
    axios({
      url: urlLogin,
      method: 'POST',
      data: loginData,
    })
      .then(({data}) => {
        if (data.role === 'DIRECTOR') {
          storeData(data);
          dispatch(setIsLogIn(true));
          dispatch(setRole(data.role));
        } else if (
          data.role === 'TEXNOSTYLE_MANAGER' &&
          route.params?.key === 'TexnoStyle'
        ) {
          storeData(data);
          dispatch(setIsLogIn(true));
          dispatch(setRole(data.role));
        } else if (
          (data.role === 'VENDOR_MANAGER' ||
            data.role === 'VENDOR' ||
            data.role === 'WAREHOUSE_MANAGER' ||
            data.role === 'DECORATOR_MANAGER' ||
            data.role === 'SALON' ||
            data.role === 'SMM' ||
            data.role === 'MARKETOLOG' ||
            data.role === 'MANAGER') &&
          route.params?.key === 'LaStoria'
        ) {
          storeData(data);
          dispatch(setIsLogIn(true));
          dispatch(setRole(data.role));
        } else {
          const checkRole = roleUser => {
            if (
              roleUser === 'VENDOR_MANAGER' ||
              roleUser === 'VENDOR' ||
              roleUser === 'WAREHOUSE_MANAGER' ||
              roleUser === 'DECORATOR_MANAGER' ||
              roleUser === 'SALON' ||
              roleUser === 'SMM' ||
              roleUser === 'MARKETOLOG' ||
              roleUser === 'MANAGER'
            ) {
              return 'LaStoria';
            } else if (roleUser === 'TEXNOSTYLE_MANAGER') {
              return 'TexnoStyle';
            }
          };
          // console.warn(route.params.key);
          Alert.alert(
            `Bu akkauntga faqat ${checkRole(
              data.role,
            )} hamkorligi ruxsat berilgan!`,
          );
        }
      })
      .catch(_err => {
        // console.warn('err =>', _err);
        Alert.alert("Email yoki parol noto'g'ri");
      });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`flex-1 bg-white`}>
        <View style={tw`flex-1 justify-center relative mt-4`}>
          <Text style={[tw`mx-auto mt-5 text-7xl`]}>MME</Text>
          <Text style={tw`mx-auto text-xs text-[rgba(0,0,0,0.5)] mt-[-3%]`}>
            Holding company
          </Text>
        </View>
        <Text style={[tw`pl-10 mt-10 mb-1 text-[rgba(0,0,0,0.5)] text-lg`]}>
          Phone number
        </Text>
        <Input
          placeH={'phone'}
          value={phone}
          onChangeText={setPhone}
          kboard={'numeric'}
        />
        <Text style={[tw`pl-10 mt-10 mb-1 text-[rgba(0,0,0,0.5)] text-lg`]}>
          Password
        </Text>
        <Input
          placeH={'password'}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={tw`w-5/12 h-12 bg-black mx-auto my-4 rounded-2xl`}
          onPress={sendLogin}>
          <Text style={tw`m-auto text-white text-lg font-semibold`}>
            Kirish
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`mx-auto`}
          onPress={() =>
            navigation.navigate('RegisterScreen', {key: route.params.key})
          }>
          <Text style={tw`text-[#5199FF] font-semibold text-lg`}>
            Akkaunt yaratish
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
