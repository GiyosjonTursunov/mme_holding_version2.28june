/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Image,
  Modal,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import RegisterDress from '../modals/RegisterDress';
import RegisterSalon from '../modals/RegisterSalon';
import DatePickerCustom from '../../global/DatePickerCustom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {mainUrl} from '../../../config/apiUrl';

// import {w3cwebsocket as W3CWebSocket} from 'websocket';
// import {setWsVendorManagerSale} from '../../../redux/actions';

const OrderDress = () => {
  const {token, userId, magazineId, wsVendorManagerSale, role} = useSelector(
    state => state.userReducer,
  );

  const [dressId, setDressId] = useState();
  const [selectedShleftId, setSelectedShleftId] = useState();
  const [selectedShleftName, setSelectedShleftName] = useState();

  const [mainPrice, setMainPrice] = useState('');
  const [givenPrice, setGivenPrice] = useState('');
  const [leftPrice, setLeftPrice] = useState('');
  const [moneyGiveDate, setMoneyGiveDate] = useState('');
  const [salonId, setSalonId] = useState();
  const [note, setNote] = useState();
  // delivery_date
  const [deliveryDate, setDeliveryDate] = useState();

  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState('');

  const [shleftList, setShleftList] = useState([]);
  const [shleftListModalVisible, setShleftListModalVisible] = useState(false);

  // const saleSocket = React.useRef(new W3CWebSocket(wsSaleUrl)).current;

  const dataForOrder = {
    dress: dressId,
    color: selectedColorId,
    detail: selectedShleftId,
    main_price: mainPrice,
    left_price: leftPrice,
    date_left_price: moneyGiveDate,
    mortgage: givenPrice,
    note: note,
    salon: salonId,
    delivery_date: deliveryDate,
    user: userId,
    magazine: magazineId,
  };

  useEffect(() => {
    if (wsVendorManagerSale) {
      // wsVendorManagerSale.onopen = () => {
      //   console.log('Connected to news wsVendorManagerSale');
      //   // saleSocket.close();
      // };

      const successSale = () => {
        Alert.alert('Данные успешно добавлены');
        setDressId('');
        setSelectedColorId('');
        setSelectedShleftId('');
        setMainPrice('');
        setGivenPrice('');
        setLeftPrice('');
        setMoneyGiveDate('');
        setSalonId('');
        setNote('');
        setSelectedShleftName('');
      };

      wsVendorManagerSale.onmessage = e => {
        const data = JSON.parse(e.data);

        if (data.type === 'saved_sale') {
          // console.warn('saved_sale =>', data);
          if (data.sale === 'order') {
            if (
              data.data.dress.id === dressId &&
              data.data.salon.id === salonId
            ) {
              successSale();
            } else if (
              !data.data.dress.id === !dressId &&
              !data.data.salon.id === !salonId
            ) {
              Alert.alert('Данные не добавлены');
            }
          }
        }
      };

      wsVendorManagerSale.onerror = e => {
        console.error('Error: ' + e.data);
      };
      wsVendorManagerSale.onclose = e => {
        console.warn('Closed: ' + e.data);
      };
    }
  }, [wsVendorManagerSale, dressId, salonId, role]);

  const sendOrder = () => {
    if (dressId && moneyGiveDate && givenPrice && deliveryDate) {
      wsVendorManagerSale.send(
        JSON.stringify({
          type: 'create',
          sale: 'order',
          data: dataForOrder,
        }),
      );
    } else {
      Alert.alert("To'liq kiriting!");
    }
  };

  const showColor = id => {
    if (Number(id) === 1) {
      return 'Telesniy';
    } else if (Number(id) === 2) {
      return 'Ayveri';
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView behavior="position">
        <View style={tw`mt-[3%]`}>
          <RegisterDress
            setDressId={setDressId}
            setMainPriceSale={setMainPrice}
            setColorId={setSelectedColorId}
            setSelectedShleftId={setSelectedShleftId}
            setSelectedShleftName={setSelectedShleftName}
          />
        </View>

        <View style={tw`w-11/12 flex-row mx-auto justify-between`}>
          <TextInput
            placeholder={String(mainPrice) || 'Narx'}
            value={mainPrice}
            placeholderTextColor={mainPrice ? '#000' : null}
            onChangeText={text => {
              if (givenPrice && text - givenPrice >= 0) {
                setMainPrice(text);
                setLeftPrice(text - givenPrice);
              } else if (!givenPrice) {
                setMainPrice(text);
              }
            }}
            style={tw`w-3.9/12 h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] text-center my-[2%]`}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={tw`flex-row w-3.9/12 h-11 border my-[2%] pl-[2%] rounded-xl justify-between items-center border-[rgba(0,0,0,0.5)]`}
            onPress={() => setColorModalVisible(true)}>
            <Text
              style={tw`my-auto text-lg ${
                selectedColorId ? null : 'text-gray-500'
              }`}>
              {selectedColorId ? showColor(selectedColorId) : 'Rang'}
            </Text>

            <Image
              source={require('../../../../assets/down.png')}
              style={tw`w-8 h-8 absolute right-[2%]`}
              resizeMode="contain"
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={colorModalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setColorModalVisible(!colorModalVisible);
              }}>
              <View style={tw`flex-1 bg-[rgba(0,0,0,0.3)]`}>
                <View
                  style={tw`absolute bottom-27 w-full h-40 justify-around items-center`}>
                  <View
                    style={tw`w-11.5/12 bg-white h-40 justify-around items-center rounded-lg`}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedColorId('1');
                        setColorModalVisible(!colorModalVisible);
                      }}
                      style={[
                        tw`w-11/12 h-15 rounded-xl`,
                        {
                          shadowColor: '#000',
                          shadowOpacity: 0.5,
                          shadowRadius: 3,
                          shadowOffset: {
                            width: 1,
                            height: 1,
                          },
                          elevation: 3,
                          backgroundColor: '#ffff',
                        },
                      ]}>
                      <Text style={tw`text-2xl m-auto`}>Telesniy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedColorId('2');
                        setColorModalVisible(!colorModalVisible);
                      }}
                      style={[
                        tw`w-11/12 h-15 rounded-xl`,
                        {
                          shadowColor: '#000',
                          shadowOpacity: 0.5,
                          shadowRadius: 3,
                          shadowOffset: {
                            width: 1,
                            height: 1,
                          },
                          elevation: 3,
                          backgroundColor: '#ffff',
                        },
                      ]}>
                      <Text style={tw`text-2xl m-auto`}>Ayveri</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setColorModalVisible(!colorModalVisible)}
                  activeOpacity={0.9}
                  style={tw`absolute bottom-10 w-10/12 h-15 bg-white rounded-xl left-[7.5%]`}>
                  <Text
                    style={tw`text-[#007AFF] font-semibold m-auto text-2xl`}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              axios({
                url: `${mainUrl}lastoria/dress-detail/`,
                method: 'GET',
                headers: {
                  Authorization: `token ${token}`,
                },
              })
                .then(res => {
                  setShleftList(res.data);
                  setShleftListModalVisible(true);
                })
                .catch(_err => {
                  Alert.alert('Bazada Xatolik');
                  // console.error(err);
                });
            }}
            style={tw`flex-row w-3.9/12 h-11 border my-[2%] pl-[2%] rounded-xl justify-between items-center border-[rgba(0,0,0,0.5)]`}>
            <Text
              style={tw`text-black text-base ${
                selectedShleftId ? 'text-black' : 'text-[rgba(0,0,0,0.5)]'
              }`}>
              {selectedShleftName ? selectedShleftName : 'Shleft'}
            </Text>
            <Image
              source={require('../../../../assets/down.png')}
              style={tw`w-8 h-8 absolute right-[2%]`}
              resizeMode="contain"
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={shleftListModalVisible}
              onRequestClose={() => {
                setShleftListModalVisible(false);
              }}>
              <View style={tw`flex-1 bg-[rgba(0,0,0,0.2)]`}>
                <View
                  style={tw`w-11.7/12 absolute bottom-27 h-80 left-[1.5%] bg-white rounded`}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={shleftList}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={[
                          tw`w-11/12 h-15 mx-auto my-2 bg-white rounded-2xl pl-3`,
                          {
                            shadowColor: '#000',
                            shadowOpacity: 0.5,
                            shadowRadius: 3,
                            shadowOffset: {
                              width: 1,
                              height: 1,
                            },
                            elevation: 3,
                            backgroundColor: '#ffff',
                          },
                        ]}
                        onPress={() => {
                          setSelectedShleftId(item.id);
                          setSelectedShleftName(item.name);
                          setShleftListModalVisible(false);
                        }}>
                        <Text style={tw`text-lg my-auto`}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setShleftListModalVisible(false)}
                  style={tw`w-11.7/12 h-15 bg-white mx-auto mt-3 rounded-2xl bg-white absolute bottom-10 left-[1.5%]`}>
                  <Text
                    style={tw`text-[#007AFF] font-semibold m-auto text-2xl`}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </TouchableOpacity>
        </View>

        <TextInput
          multiline
          placeholder="Qo'shimcha ma'lumotlar"
          value={note}
          onChangeText={setNote}
          style={tw`w-11/12 h-20 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] mx-auto my-[2%] px-2 py-2`}
        />

        <View
          style={tw`w-11/12 flex-row justify-between items-center mx-auto my-[2%]`}>
          <Text style={tw`text-lg`}>Ko'ylak chiqarish</Text>
          <DatePickerCustom
            setNeedDate={setDeliveryDate}
            text={deliveryDate}
            secondFunc={setMoneyGiveDate}
          />
        </View>

        <View style={tw`my-[1%]`}>
          <RegisterSalon setSalonId={setSalonId} />
        </View>

        <View style={tw`w-11/12 flex-row mx-auto my-[2%] justify-between`}>
          <TextInput
            placeholder="Berilgan"
            value={givenPrice}
            onChangeText={text => {
              if (mainPrice && mainPrice - text >= 0) {
                setGivenPrice(text);
                setLeftPrice(mainPrice - text);
              }
            }}
            style={tw`w-6/12 h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] pl-3`}
            keyboardType="numeric"
          />

          <View style={tw`w-4/12 justify-center items-center`}>
            <Text>Qoldi</Text>
            <Text style={tw`text-lg`}>{leftPrice}</Text>
          </View>
        </View>

        <View
          style={tw`w-11/12 flex-row justify-between items-center mx-auto my-[2%]`}>
          <Text style={tw`text-lg`}>Pul berilish sanasi</Text>
          <DatePickerCustom
            setNeedDate={setMoneyGiveDate}
            text={moneyGiveDate}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={sendOrder}
          style={tw`w-5/12 h-15 bg-[#323054] mx-auto my-2 rounded-xl`}>
          <Text style={tw`text-white text-xl m-auto`}>Saqlash</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default OrderDress;
