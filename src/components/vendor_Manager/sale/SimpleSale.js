import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import RegisterDress from '../modals/RegisterDress';
import RegisterSalon from '../modals/RegisterSalon';
import DatePickerCustom from '../../global/DatePickerCustom';
import {useSelector} from 'react-redux';
// import axios from 'axios';
// import {mainUrl, wsSaleManager} from '../../../config/apiUrl';
import LoadingLottie from '../../global/LoadingLottie';

// import {w3cwebsocket as W3CWebSocket} from 'websocket';

const SimpleSale = () => {
  const [dressId, setDressId] = useState();
  const [colorId, setColorId] = useState();
  const [selectedShleftId, setSelectedShleftId] = useState();
  const [mainPrice, setMainPrice] = useState('');
  const [givenPrice, setGivenPrice] = useState();
  const [leftPrice, setLeftPrice] = useState();
  const [moneyGiveDate, setMoneyGiveDate] = useState();
  const [salonId, setSalonId] = useState();
  const [note, setNote] = useState();
  // delievery_date
  const {userId, token, magazineId, wsVendorManagerSale, role} = useSelector(
    state => state.userReducer,
  );

  const [selectedShleftName, setSelectedShleftName] = useState();

  const [showSuccess, setShowSuccess] = useState(false);

  // const saleSocket = React.useRef(new W3CWebSocket(wsSaleManager)).current;

  useEffect(() => {
    if (wsVendorManagerSale) {
      const successSale = () => {
        setShowSuccess(false);
        Alert.alert('Данные успешно добавлены');
        setDressId('');
        setColorId('');
        setSelectedShleftId('');
        setMainPrice('');
        setGivenPrice('');
        setLeftPrice('');
        setMoneyGiveDate('');
        setSalonId('');
        setNote('');
      };

      wsVendorManagerSale.onmessage = e => {
        const data = JSON.parse(e.data);

        if (data.type === 'saved_sale') {
          if (data.sale === 'simple') {
            // console.warn('data =>', data.data);
            if (
              data.data.dress.id === dressId &&
              data.data.salon.id === salonId
            ) {
              // console.error('data =>', data.data);
              successSale();
            } else if (
              !data.data.dress.id === !dressId &&
              !data.data.salon.id === !salonId
            ) {
              setShowSuccess(false);
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

  const dataForSimpleSale = {
    dress: dressId,
    color: colorId,
    detail: selectedShleftId,
    main_price: mainPrice,
    given_price: givenPrice,
    left_price: leftPrice,
    salon: salonId,
    user: userId,
    delivery_date: moneyGiveDate,
    magazine_id: magazineId,
  };

  const sendSimpleSale = () => {
    if (wsVendorManagerSale) {
      if (dressId && givenPrice >= 0 && salonId && magazineId) {
        // setShowSuccess(true);
        // console.warn('nim abu wsVendorManagerSale');
        wsVendorManagerSale.send(
          JSON.stringify({
            type: 'create',
            sale: 'simple',
            data: dataForSimpleSale,
          }),
        );
      } else {
        Alert.alert('Заполните все поля');
      }
    }
  };

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <LoadingLottie
          showLoading={showSuccess}
          setShowLoading={setShowSuccess}
          animation={require('../../../../assets/lottie/success.json')}
        />
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
          placeholderTextColor={mainPrice ? '#000' : null}
          value={mainPrice}
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
        <RegisterSalon setSalonId={setSalonId} />

        <View style={tw`w-11/12 flex-row mx-auto my-[1%] justify-between`}>
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
          style={tw`w-5/12 h-15 bg-[#323054] mx-auto my-2 rounded-2xl`}>
          <Text style={tw`text-white text-xl m-auto`}>Saqlash</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SimpleSale;
