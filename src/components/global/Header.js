import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {mainUrl} from '../../config/apiUrl';
import {useDispatch} from 'react-redux';
import {
  setIsLogIn,
  setRole,
  setToken,
  setUserId,
  setMagazineId,
} from '../../redux/actions';
import NetInfo from '@react-native-community/netinfo';

import LottieView from 'lottie-react-native';

const Header = ({headerName, isRegister}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [user_data, setUser_data] = useState();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem('@user');
      // console.error('jsonValue =>', jsonValue);
      if (jsonValue) {
        let parsedJson = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (!parsedJson.token) {
          AsyncStorage.removeItem('@user')
            .then(() => {
              dispatch(setIsLogIn(false));
              dispatch(setRole(''));
            })
            .catch(_err => {
              dispatch(setIsLogIn(false));
              dispatch(setRole(''));
            });
        } else if (parsedJson.token) {
          setUser_data(parsedJson);
          dispatch(setToken(parsedJson.token));
          // console.log('userToken ', parsedJson.token);
          dispatch(setMagazineId(parsedJson.magazine_id));
          // console.warn('user id ', parsedJson.id);
          dispatch(setUserId(parsedJson.id));
        }
      } else {
        dispatch(setIsLogIn(false));
        dispatch(setRole(''));
      }
    };
    getData();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return unsubscribe;
  }, [isConnected]);

  const ExitAccount = () => {
    if (isRegister) {
      Alert.alert('Sozlamalar', '', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Akkaunt qo`shish',
          onPress: async () => {
            navigation.navigate('RegisterResidenceScreen');
          },
        },
        {
          text: 'Chiqish',
          onPress: async () => {
            AsyncStorage.removeItem('@user')
              .then(() => {
                dispatch(setIsLogIn(false));
                dispatch(setRole(''));
              })
              .catch(_err => {
                dispatch(setIsLogIn(false));
                dispatch(setRole(''));
              });
          },
          style: 'destructive',
        },
      ]);
    } else {
      Alert.alert('Sozlamalar', '', [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Chiqish',
          onPress: async () => {
            AsyncStorage.removeItem('@user')
              .then(() => {
                dispatch(setIsLogIn(false));
                dispatch(setRole(''));
              })
              .catch(_err => {
                dispatch(setIsLogIn(false));
                dispatch(setRole(''));
              });
            // console.log('Logged out!');
          },
          style: 'destructive',
        },
      ]);
    }
  };

  return (
    <View style={tw`w-full flex-row justify-between items-center px-2 my-1`}>
      <Text style={tw`text-base text-black font-semibold min-w-3/12 my-auto`}>
        {headerName}
      </Text>
      <Text style={tw`text-lg text-black font-bold`}>{user_data?.name}</Text>
      <View style={tw`flex-row`}>
        <TouchableOpacity activeOpacity={0.7} onPress={ExitAccount}>
          {user_data?.img ? (
            <View style={tw`flex-row`}>
              {isConnected ? null : (
                <LottieView
                  source={require('../../../assets/lottie/no-connection.json')}
                  autoPlay
                  loop
                  style={tw`w-8 h-8 m-auto`}
                />
              )}
              <Image
                source={{uri: mainUrl + 'media/' + user_data.img}}
                style={tw`w-10 h-10 rounded-full`}
                onPress={ExitAccount}
              />
            </View>
          ) : (
            <Image
              source={require('../../../assets/profile-user.png')}
              style={tw`w-10 h-10`}
              onPress={ExitAccount}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
