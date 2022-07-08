import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  AsyncStorage,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';
import Header from '../global/Header';
import axios from 'axios';
import ImageZoom from 'react-native-image-pan-zoom';

import {mainUrl} from '../../config/apiUrl';

// shu yerdan turib agar uzgartirishni xohlasa yangi edit oynasiga jonatilib yuboriladi, agar uni role vendor yoki vendor_manager bolsa

const OrdersById = ({route}) => {
  const [sale, setSale] = useState([]);
  const [dressImg, setDressImg] = useState([]);

  const [selectedDressImg, setSelectedDressImg] = useState([]);

  const started = () => {
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: `${mainUrl}lastoria/warehouse-order-views/${Number(
            route.params.saleId,
          )}/`,
          method: 'PUT',
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            Alert.alert('Yangilandi');
            // console.warn(res.data);
          })
          .catch(_error => {
            return;
            // console.log(_error);
          });
      })
      .catch(_err => {
        // console.log(_err);
        Alert.alert('Xatolik');
      });
  };
  const sended = () => {
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: `${mainUrl}lastoria/warehouse-order-views/${route.params.saleId}/`,
          method: 'POST',
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            Alert.alert('Yangilandi');
          })
          .catch(_error => {
            return;
            // console.log(_error);
          });
      })
      .catch(_err => {
        // console.log(_err);
        Alert.alert('Xatolik');
      });
  };

  useEffect(() => {
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: `${mainUrl}lastoria/warehouse-order-views/${route.params.saleId}/`,
          method: 'GET',
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            // console.warn(res.data);
            setSale(res.data);
            setDressImg(res.data.dress.img);
          })
          .catch(_err => {
            Alert.alert('Bazaga ulanishda xatolik yuz berdi!');
            // console.log(_err);
          });
      })
      .catch(_err => {
        const newLocal = 'Akkaunt yoq.';
        Alert.alert(newLocal);
        // console.log(_err);
      });
  }, [route.params.saleId]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header
        headerName={route.params?.supplier ? 'Yetkazib beruvchi' : 'Sotuvchi'}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={dressImg}
        renderItem={({item}) => (
          <TouchableOpacity
            style={tw`w-60 h-80 mx-auto mb-[${
              Dimensions.get('window').height / 7
            }px]`}
            activeOpacity={0.8}
            onPress={() => setSelectedDressImg(mainUrl + 'media/' + item)}>
            <Image
              source={{uri: `${mainUrl + 'media/' + item}`}}
              style={tw`w-full h-full rounded-xl`}
              resizeMode="contain"
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={selectedDressImg === mainUrl + 'media/' + item}
              onRequestClose={() => {
                setSelectedDressImg(false);
              }}>
              <View style={tw`flex-1 bg-white`}>
                <ImageZoom
                  cropWidth={Dimensions.get('window').width}
                  cropHeight={Dimensions.get('window').height}
                  imageWidth={Dimensions.get('window').width}
                  imageHeight={Dimensions.get('window').height}>
                  <Image
                    source={{uri: `${selectedDressImg}`}}
                    style={tw`w-full h-full`}
                    resizeMode="contain"
                  />
                </ImageZoom>
                <TouchableOpacity
                  style={tw`absolute top-0 left-0 mt-15 ml-5`}
                  onPress={() => {
                    setSelectedDressImg(false);
                  }}>
                  <Image
                    source={require('../../../assets/back.png')}
                    style={tw`w-10 h-10`}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </Modal>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ScrollView
        style={tw`w-11/12 bg-white mx-auto`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`border-b w-4/12 ml-4`}>
          <Text style={tw`text-xl mt-2 ml-2 `}>#{route?.params.saleId}</Text>
        </View>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Ko`ylak nomi
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.dress?.name}
          </Text>
        </View>

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>Shleft</Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.dress_detail?.name}
          </Text>
        </View>

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Jo'natilish sanasi
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.delivery_date}
          </Text>
        </View>

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>Salon nomi</Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.salon?.salon_name}
          </Text>
        </View>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Telefon raqam
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.salon?.phone}
          </Text>
        </View>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Salon manzili
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.salon?.address}
          </Text>
        </View>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Yetkazib berish
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale.need_send ? 'SHART' : 'SHART EMAS'}
          </Text>
        </View>

        <Text style={tw`text-xl mx-auto`}>
          Komentariya : {sale?.dress_note}
        </Text>

        {sale?.status === 1 ? (
          <TouchableOpacity
            onPress={sended}
            activeOpacity={0.8}
            style={tw`bg-blue-500 mx-10 rounded-xl h-15 mt-3 mb-5`}>
            <Text style={tw`text-white font-semibold m-auto text-xl`}>
              Jo'natish
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={started}
            activeOpacity={0.8}
            style={tw`bg-[#00DC7D] mx-10 rounded-xl h-15 mt-3 mb-5`}>
            <Text style={tw`text-white font-semibold m-auto text-xl`}>
              Qabul qilindi
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersById;
