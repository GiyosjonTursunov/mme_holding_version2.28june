/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Animated,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import tw from 'twrnc';
import {baseUrl, mainUrl} from '../../../config/apiUrl';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const TexnoStyleMainScreen = () => {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userReducer);
  const [doors, setDoors] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width} = Dimensions.get('screen');
  const Item_width = width * 0.8;
  const Item_height = Item_width * 1.2;

  const [refreshing, setRefreshing] = useState(false);

  const [texno_money, setTexno_money] = useState([]);

  const [modalDepozit, setModalDepozit] = useState(false);

  const [modalDepositValue, setModalDepositValue] = useState('');

  const [givenCountValue, setGivenCountValue] = useState('');

  const [modalGivenCount, setModalGivenCount] = useState(false);

  const getDoors = () => {
    // console.log('token', token);
    setRefreshing(true);
    axios({
      url: `${mainUrl}texno-style/doors-append-history/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        setDoors(res.data);
        // console.log('res', res.data);
        setRefreshing(false);
      })
      .catch(_err => {
        // console.error('errorku texno-style/doors-append-history =>', _err);
        setRefreshing(false);
      });

    axios({
      url: `${mainUrl}texno-style/add-texno-style-money/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        setTexno_money(res.data);
      })
      .catch(_err => {
        return;
        // console.error('error texno-style/add-texno-style-money =>', err);
      });
  };

  useEffect(() => {
    if (token) {
      getDoors();
    }
  }, [token]);

  const sendDeposit = () => {
    axios({
      url: `${mainUrl}texno-style/add-texno-style-money/`,
      method: 'POST',
      data: {
        deposit: Number(modalDepositValue),
        total_price: Number(modalDepositValue),
      },
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        // console.warn('add-texno-style-money =>', res.data);
        Alert.alert('Успешно', 'Добавлено');
        getDoors();
        setModalDepositValue(false);
      })
      .catch(_err => {
        // console.error('error =>', err);
        Alert.alert('Ошибка', 'Internet yoki serverda xatolik yuz berdi');
        setModalDepositValue(false);
      });
  };

  return (
    <ScrollView
      style={tw`bg-white pt-3`}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getDoors} />
      }>
      <View style={tw`flex-row justify-between w-full px-4 items-center`}>
        <Text style={tw`text-xl`}>Depozit</Text>
        {texno_money?.deposit !== 0 && texno_money.deposit ? (
          <Text style={tw`text-xl`}>{texno_money?.deposit}</Text>
        ) : (
          <TouchableOpacity onPress={() => setModalDepozit(true)}>
            <Image
              source={require('../../../../assets/plus.png')}
              style={tw`w-8 h-8 mb-1`}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalDepozit}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalDepozit(!modalDepozit);
              }}>
              <View style={tw`flex-1 bg-[rgba(0,0,0,0.3)]`}>
                <View style={tw`w-11/12 h-50 bg-white m-auto`}>
                  <TouchableOpacity onPress={() => setModalDepozit(false)}>
                    <Image
                      source={require('../../../../assets/x-button.png')}
                      style={tw`w-8 h-8 absolute right-[-10px] top-[-15px]`}
                    />
                  </TouchableOpacity>
                  <TextInput
                    placeholder="Depozit"
                    style={tw`border w-11/12 h-13 mx-auto my-2 rounded-xl pl-5 border-gray-500`}
                    onChangeText={setModalDepositValue}
                    keyboardType="numeric"
                    value={modalDepositValue}
                  />

                  <TouchableOpacity
                    onPress={sendDeposit}
                    style={tw`w-7/12 h-15 bg-[#323054] rounded-xl m-auto`}>
                    <Text style={tw`text-white text-xl m-auto`}>Saqlash</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
        )}
      </View>
      <View style={tw`w-11/12 border border-[rgba(0,0,0,0.4)] mx-auto mb-5`} />
      <View style={tw`flex-row justify-between w-full px-4 items-center`}>
        <Text style={tw`text-xl`}>Umumiy summa</Text>
        <Text style={tw`text-xl`}>{texno_money?.total_price}</Text>
      </View>
      <View style={tw`w-11/12 border border-[rgba(0,0,0,0.4)] mx-auto mb-5`} />
      <View style={tw`flex-row justify-between w-full px-4 items-center`}>
        <Text style={tw`text-xl`}>Foyda</Text>
        <Text style={tw`text-xl`}>{texno_money?.benefit}</Text>
      </View>
      <View style={tw`w-11/12 border border-[rgba(0,0,0,0.4)] mx-auto mb-5`} />
      <View style={tw`flex-row justify-between w-full px-4 items-center`}>
        <Text style={tw`text-xl`}>Eshik ko'rinishida pullar</Text>
        <Text style={tw`text-xl`}>{texno_money?.doorsOfMoney}</Text>
      </View>
      <View style={tw`w-11/12 border border-[rgba(0,0,0,0.4)] mx-auto mb-5`} />
      <View style={tw`flex-row justify-between w-full px-4 items-center`}>
        <Text style={tw`text-xl`}>Eshiklar</Text>
        <Text style={tw`text-xl`}>{texno_money?.count}</Text>
      </View>
      <View style={tw`w-11/12 border border-[rgba(0,0,0,0.4)] mx-auto mb-5`} />
      <View style={tw`flex-row justify-between w-full px-4 items-center`}>
        <Text style={tw`text-xl`}>Sana: {texno_money?.date_updated}</Text>
        <Text style={tw`text-xl`}>
          Vaqt:
          {texno_money?.time_updated?.slice(0, 5)}
        </Text>
      </View>
      <View style={tw`w-11/12 border border-[rgba(0,0,0,0.4)] mx-auto mb-5`} />

      <TouchableOpacity
        onPress={() => navigation.navigate('TexnoStyleCreateDoorsScreen')}
        style={tw`w-8/12 h-15 bg-[#323054] mx-auto my-2 rounded-xl`}>
        <Text style={tw`text-white text-xl m-auto`}>Eshik qo'shish</Text>
      </TouchableOpacity>

      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={doors}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });
          return (
            <View
              key={item.id}
              style={{width, justifyContent: 'center', alignItems: 'center'}}>
              <Pressable
                onPress={() => {
                  setModalGivenCount(true);
                  // console.log(item.id);
                }}
                style={{
                  borderRadius: 18,
                  shadowColor: '#000',
                  shadowOpacity: 0.5,
                  shadowRadius: 7,
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  elevation: 8,
                  paddingHorizontal: 12,
                  paddingTop: 10,
                  backgroundColor: '#fff',
                  marginVertical: 10,
                }}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalGivenCount}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalGivenCount(!modalGivenCount);
                  }}>
                  <View
                    style={[
                      tw`flex-1`,
                      {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                      },
                    ]}>
                    <View style={tw`w-11/12 h-60 bg-white m-auto rounded-xl`}>
                      <TouchableOpacity
                        onPress={() => setModalGivenCount(false)}
                        style={tw`absolute right-[-10px] top-[-10px]`}>
                        <Image
                          source={require('../../../../assets/x-button.png')}
                          style={tw`w-10 h-10`}
                        />
                      </TouchableOpacity>
                      <TextInput
                        style={tw`w-11/12 h-15 rounded-xl border m-auto border-[#323054] text-xl`}
                        keyboardType="numeric"
                        onChangeText={setGivenCountValue}
                        value={givenCountValue}
                        placeholder="Eshik soni"
                      />
                      <TouchableOpacity
                        onPress={() => {
                          axios({
                            url: `${mainUrl}texno-style/doors-append-history-custom/${item.id}/`,
                            method: 'PUT',
                            headers: {
                              Authorization: `token ${token}`,
                            },
                            data: {
                              count: Number(givenCountValue),
                            },
                          })
                            .then(res => {
                              setModalGivenCount(false);
                              getDoors();
                              if (givenCountValue > 0) {
                                Alert.alert('Eshik qo‘shildi');
                                setGivenCountValue('');
                              } else {
                                Alert.alert('Eshik ayrildi');
                                setGivenCountValue('');
                              }
                            })
                            .catch(_err => {
                              return;
                              // console.log(err);
                            });
                        }}
                        style={tw`w-8/12 h-14 rounded-xl m-auto bg-[#323054]`}>
                        <Text style={tw`text-xl m-auto text-white`}>
                          Saqlash
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                <View
                  style={{
                    width: Item_width,
                    height: Item_height * 1.4,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 14,
                  }}>
                  <Animated.Image
                    source={{uri: baseUrl + '/media/' + item?.doors?.img}}
                    style={{
                      width: Item_width * 1.1,
                      height: Item_height,
                      resizeMode: 'cover',
                      transform: [{translateX}],
                    }}
                  />

                  <Animated.View
                    style={[
                      tw`mx-auto w-full mt-2 pl-3`,
                      {transform: [{translateX}]},
                    ]}>
                    <Text style={tw`text-xl text-black`}>
                      Eshik: {item?.doors?.name}
                    </Text>
                    <Text
                      style={tw`text-lg font-semibold text-[rgba(0,0,0,0.7)]`}>
                      Narxi: {item?.price}
                    </Text>
                    <Text
                      style={tw`text-lg font-semibold text-[rgba(0,0,0,0.7)]`}>
                      Soni: {item?.count}
                    </Text>
                    <View
                      style={tw`flex-row justify-between items-center mt-3 h-10`}>
                      <Text
                        style={tw`text-lg font-semibold text-[rgba(0,0,0,0.7)]`}>
                        {item?.date_created}
                      </Text>

                      <Image
                        source={require('../../../../assets/openNew.png')}
                        style={tw`w-8 h-8`}
                        resizeMode="contain"
                      />
                    </View>
                  </Animated.View>
                </View>
              </Pressable>
            </View>
          );
        }}
      />

      <View style={tw`w-full h-15`} />
    </ScrollView>
  );
};

export default TexnoStyleMainScreen;
