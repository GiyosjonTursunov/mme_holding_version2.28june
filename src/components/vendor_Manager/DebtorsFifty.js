/* eslint-disable react-hooks/exhaustive-deps */
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {mainUrl} from '../../config/apiUrl';
import axios from 'axios';
import {useSelector} from 'react-redux';
import tw from 'twrnc';

import LottieView from 'lottie-react-native';

const DebtorsFifty = () => {
  const {token, userId, role} = useSelector(state => state.userReducer);
  const [debtorsNotSalonFifty, setDebtorsNotSalonFifty] = useState([]);
  const [debtorsSalon, setDebtorsSalon] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [salon_Id, setSalon_Id] = useState();
  const [saleId, setSaleId] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  const [modalWithoutSalon, setModalWithoutSalon] = useState(false);

  const [gulkaram, setGulkaram] = useState([]);

  const dataSenDebt = {
    given_price: 0,
    user: userId,
    sale5050: saleId,
    salon: salon_Id,
  };

  const dataWithoutSalon = {
    sale_5050_id: saleId,
    salon_id: '',
  };

  const getData = () => {
    setRefreshing(true);
    axios({
      method: 'get',
      url:
        role === 'VENDOR'
          ? `${mainUrl}lastoria/debt-user-5050-salon-null/`
          : `${mainUrl}lastoria/debt-5050-not-salon/`,
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        setDebtorsNotSalonFifty(res.data);
        // console.warn(res.data);
        axios({
          url:
            role === 'VENDOR'
              ? `${mainUrl}lastoria/debt-user-5050-not-null/`
              : `${mainUrl}lastoria/debt-5050-salon/`,
          method: 'GET',
          headers: {
            Authorization: `token ${token}`,
          },
        })
          .then(resSalon => {
            setDebtorsSalon(resSalon.data);
            axios({
              url: `${mainUrl}lastoria/salon/`,
              method: 'GET',
              headers: {
                Authorization: `token ${token}`,
              },
            })
              .then(resSalonList => {
                setGulkaram(resSalonList.data);
                setRefreshing(false);
              })
              .catch(_err => {
                // console.error(err);
                setRefreshing(false);
              });
          })
          .catch(_err => {
            // console.warn(err);
            setRefreshing(false);
          });
      })
      .catch(_err => {
        // console.log(err);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    // console.error(token);
    getData();
  }, [token]);

  const sendDebt = () => {
    axios({
      url: `${mainUrl}lastoria/sales-5050-history/`,
      data: dataSenDebt,
      method: 'post',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        Alert.alert('Успешно', 'Долг успешно отправлен');
        setModalVisible(false);
        getData();
        setSalon_Id('');
        setSaleId('');
        dataSenDebt.given_price = 0;
      })
      .catch(_err => {
        // console.error(err);
        Alert.alert('Ошибка', 'Долг не отправлен');
      });
  };

  const sendAttachment = () => {
    axios({
      url: `${mainUrl}lastoria/debt-5050-salon-attachment/`,
      data: dataWithoutSalon,
      method: 'post',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        Alert.alert('Успешно', 'Attachment успешно отправлен');
        setModalWithoutSalon(false);
        getData();
        setSalon_Id('');
        setSaleId('');
        dataWithoutSalon.salon_id = '';
      })
      .catch(_err => {
        // console.error(err);
        Alert.alert('Ошибка', 'Attachment не отправлен');
      });
  };

  const SalonItem = ({id, name}) => {
    const [selectedId, setSelectedId] = useState();
    return (
      <TouchableOpacity
        onPress={() => {
          dataWithoutSalon.salon_id = id;
          setSelectedId(id);
        }}
        style={tw`w-11/12 h-11.5 border-b pl-3 flex-row items-center border-[rgba(0,0,0,0.1)] mx-auto ${
          Number(id) === Number(selectedId) ? 'bg-red-200' : null
        }`}>
        <Text style={tw`w-1.5/12 text-base font-bold`}>{id}</Text>
        <Text style={tw`my-auto text-lg`}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderSalon = ({item}) => (
    <SalonItem name={item.salon_name} id={item.id} />
  );

  const Item = ({
    img,
    dress_name,
    salon_name,
    user_name,
    salonchi_name,
    givenPrice,
    leftPrice,
    delivery_date,
    salon_id,
    item,
  }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        setSaleId(item.id);
        if (!modalVisible && salon_id) {
          if (modalVisible) {
            return;
            // console.warn('tureee');
          } else if (!modalVisible) {
            setSalon_Id(salon_id);
            setModalVisible(true);
          }
        } else {
          if (modalWithoutSalon) {
            return;
            // console.warn('tre');
          } else {
            setModalWithoutSalon(true);
          }
        }
      }}
      style={tw`mx-3 my-2 border rounded-tl-xl rounded-br-xl px-2`}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalWithoutSalon}>
        <View style={tw`flex-1 bg-[rgba(0,0,0,0.5)]`}>
          <View style={tw`w-10/12 h-80 m-auto bg-white rounded-xl`}>
            <TouchableOpacity
              onPress={() => {
                setModalWithoutSalon(false);
                // console.error('modal close');
              }}>
              <Image
                source={require('../../../assets/x-button.png')}
                style={tw`w-8 h-8 absolute right-[-2%] top-[-15px]`}
              />
            </TouchableOpacity>

            <FlatList
              data={gulkaram}
              renderItem={renderSalon}
              keyExtractor={item => item.id}
            />

            <TouchableOpacity
              onPress={sendAttachment}
              style={tw`m-auto w-6/12 h-15 rounded-2xl bg-black my-5`}>
              <Text style={tw`text-white m-auto text-xl`}>Saqlash</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={tw`flex-1 bg-[rgba(0,0,0,0.5)]`}>
          <View style={tw`w-10/12 h-50 m-auto bg-white rounded-xl`}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                source={require('../../../assets/x-button.png')}
                style={tw`w-8 h-8 absolute right-[-2%] top-[-15px]`}
              />
            </TouchableOpacity>
            <View style={tw`w-10/12 mx-auto`}>
              <Text style={tw`text-xl mt-2`}>Berilgan pul</Text>
              <TextInput
                placeholder="Berilgan"
                onChangeText={text => (dataSenDebt.given_price = Number(text))}
                style={tw`h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] pl-3 mt-2`}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                if (Number(leftPrice) - Number(dataSenDebt.given_price) < 0) {
                  Alert.alert('Ошибка', 'Недостаточно средств');
                } else {
                  sendDebt();
                }
              }}
              style={tw`m-auto w-6/12 h-15 rounded-2xl bg-black`}>
              <Text style={tw`text-white m-auto text-xl`}>Saqlash</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Image
        source={{uri: mainUrl + 'media/' + img}}
        style={tw`w-45 h-40 m-auto`}
        resizeMode="contain"
      />

      <View style={tw`flex-row my-1 items-center`}>
        <Text>Ko'ylak : </Text>
        <Text style={tw`text-lg`}>{dress_name}</Text>
      </View>

      <View style={tw`flex-row my-1 items-center`}>
        <Text>Salon : </Text>
        <Text style={tw`text-lg`}>{salon_name}</Text>
      </View>

      <View style={tw`flex-row my-1 items-center`}>
        <Text>Salonchi : </Text>
        <Text style={tw`text-lg`}>{salonchi_name}</Text>
      </View>

      <View style={tw`flex-row my-1 items-center`}>
        <Text>Sotuvchi : </Text>
        <Text style={tw`text-lg`}>{user_name}</Text>
      </View>

      <View style={tw`flex-row my-1 items-center`}>
        <Text>Berilgan pul : </Text>
        <Text style={tw`text-lg`}>{givenPrice}</Text>
      </View>

      <View style={tw`flex-row my-1 items-center`}>
        <Text>Qarz : </Text>
        <Text style={tw`text-lg`}>{leftPrice}</Text>
      </View>

      <View style={tw`flex-row my-1 items-center`}>
        <Text>Pul berish sanasi : </Text>
        <Text style={tw`text-lg`}>{delivery_date}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      img={item?.dress?.img}
      dress_name={item?.dress?.name}
      salon_name={item?.salon?.name}
      salonchi_name={item?.salon?.user}
      user_name={item?.user?.name}
      givenPrice={item?.given_price}
      leftPrice={item?.left_price}
      delivery_date={item?.delivery_date}
      salon_id={item?.salon?.id}
      item={item}
    />
  );

  const mapDatas = () => {
    return (
      <>
        {debtorsNotSalonFifty.length > 0 ? (
          <Text style={tw`text-xl ml-3 mt-5`}>Saloni yoq</Text>
        ) : null}
        <FlatList
          data={debtorsNotSalonFifty}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
        {debtorsSalon.length > 0 ? (
          <Text style={tw`text-xl ml-3 mt-5`}>Saloni bor</Text>
        ) : null}
        <FlatList
          data={debtorsSalon}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </>
    );
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getData} />
      }>
      {!debtorsSalon.length && !debtorsNotSalonFifty.length ? (
        <LottieView
          source={require('../../../assets/lottie/71454-waving-girls.json')}
          style={[tw`w-full mx-auto`, {aspectRatio: 1}]}
          autoPlay
          loop
        />
      ) : (
        mapDatas()
      )}
    </ScrollView>
  );
};

export default DebtorsFifty;
