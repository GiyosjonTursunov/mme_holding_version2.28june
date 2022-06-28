import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import RegisterDress from '../modals/RegisterDress';
import RegisterSalon from '../modals/RegisterSalon';
import DatePickerCustom from '../../global/DatePickerCustom';
import {useSelector} from 'react-redux';
// import axios from 'axios';
// import {wsSaleUrl} from '../../../config/apiUrl';

// import {w3cwebsocket as W3CWebSocket} from 'websocket';

const FiftySale = () => {
  const [dressId, setDressId] = useState();
  const [colorId, setColorId] = useState();
  const [selectedShleftId, setSelectedShleftId] = useState();
  const [mainPrice, setMainPrice] = useState('');
  const [givenPrice, setGivenPrice] = useState();
  const [leftPrice, setLeftPrice] = useState();
  const [moneyGiveDate, setMoneyGiveDate] = useState();
  const [salonId, setSalonId] = useState();
  const [note, setNote] = useState();

  const [girlName, setGirlName] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const {userId, token, magazineId, wsVendorManagerSale, role} = useSelector(
    state => state.userReducer,
  );

  const [selectedShleftName, setSelectedShleftName] = useState();

  // const saleSocket = React.useRef(new W3CWebSocket(wsSaleUrl)).current;

  useEffect(() => {
    if (wsVendorManagerSale) {
      const successSale = () => {
        Alert.alert('Данные успешно добавлены');
        setDressId();
        setColorId();
        setSelectedShleftId();
        setMainPrice();
        setGivenPrice();
        setLeftPrice();
        setMoneyGiveDate();
        setSalonId();
        setNote();
        setGirlName();
        setDeliveryDate();
      };

      wsVendorManagerSale.onmessage = e => {
        const data = JSON.parse(e.data);

        if (data.type === 'saved_sale') {
          // Alert.alert('Неизвестный тип события');
          if (data.sale === '5050') {
            if (
              data?.data?.dress?.id === dressId &&
              data?.data?.salon?.id === salonId
            ) {
              successSale();
            } else if (
              data?.data?.dress?.id === dressId &&
              !data?.data?.salon?.id === !salonId
            ) {
              successSale();
            } else if (
              !data?.data?.dress?.id === !dressId &&
              !data?.data?.salon?.id === !salonId
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

  const dataForFiftySale = {
    dress: dressId,
    color: colorId,
    detail: selectedShleftId,
    main_price: mainPrice,
    given_price: Number(mainPrice) / 2,
    left_price: leftPrice || Number(mainPrice) / 2,
    date_left_price: moneyGiveDate,
    salon: salonId,
    girl_name: girlName,
    delivery_date: deliveryDate,
    user: userId,
    magazine_id: magazineId,
    salon_given_price: givenPrice,
  };

  const sendSimpleSale = () => {
    if (wsVendorManagerSale) {
      if (dressId && girlName && deliveryDate) {
        wsVendorManagerSale.send(
          JSON.stringify({
            type: 'create',
            sale: '5050',
            data: dataForFiftySale,
          }),
        );
      } else {
        Alert.alert('Заполните все поля');
      }
    }
  };

  // const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior="padding"
        // keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={tw`mt-[3%]`}>
          <RegisterDress
            setDressId={setDressId}
            setMainPriceSale={setMainPrice}
            setColorId={setColorId}
            setSelectedShleftId={setSelectedShleftId}
            setSelectedShleftName={setSelectedShleftName}
          />
        </View>
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
          style={tw`w-11/12 h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] text-center mx-auto`}
          keyboardType="numeric"
        />

        <View
          style={tw`flex-row w-11/12 mx-auto justify-between my-1 items-center`}>
          <TextInput
            placeholder={'Kelin ismi'}
            value={girlName}
            onChangeText={setGirlName}
            style={tw`w-6/12 h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] pl-3`}
          />

          <View style={tw`w-5.5/12 items-center`}>
            <Text style={tw`text-base`}>Kelin bergan pul</Text>
            <Text style={tw`text-lg`}>
              {Number(Number(mainPrice) / 2) || 0}
            </Text>
          </View>
        </View>

        <View
          style={tw`w-11/12 flex-row justify-between items-center mx-auto my-[1%]`}>
          <Text style={tw`text-base`}>Ko'ylak chiqarish sanasi</Text>
          <DatePickerCustom
            setNeedDate={setDeliveryDate}
            text={deliveryDate}
            secondFunc={setMoneyGiveDate}
          />
        </View>

        <RegisterSalon setSalonId={setSalonId} />

        <View style={tw`w-11/12 flex-row mx-auto my-[1%] justify-between`}>
          <TextInput
            placeholder="Berilgan"
            value={givenPrice}
            onChangeText={text => {
              if (mainPrice && mainPrice - text >= 0) {
                setGivenPrice(text);
                setLeftPrice(mainPrice / 2 - text);
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
          style={tw`w-11/12 flex-row justify-between items-center mx-auto my-[1%]`}>
          <Text style={tw`text-lg`}>Pul berilish sanasi</Text>
          <DatePickerCustom
            setNeedDate={setMoneyGiveDate}
            text={moneyGiveDate}
          />
        </View>

        <TextInput
          multiline
          placeholder="Qo'shimcha ma'lumotlar"
          value={note}
          onChangeText={setNote}
          style={tw`w-10.5/12 h-20 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] mx-auto my-[1%] px-2 py-2`}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={sendSimpleSale}
          style={tw`w-5/12 h-15 bg-[#323054] mx-auto my-2 rounded-xl`}>
          <Text style={tw`text-white text-xl m-auto`}>Saqlash</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default FiftySale;
