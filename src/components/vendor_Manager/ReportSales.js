/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';

const ReportSales = () => {
  const {token} = useSelector(state => state.userReducer);
  const [mainPrice, setMainPrice] = useState();
  const [givenPrice, setGivenPrice] = useState();
  const [leftPrice, setLeftPrice] = useState();
  const [salonGivenPrice, setSalonGivenPrice] = useState();
  const [mortgage, setMortgage] = useState();

  const [sum, setSum] = useState();
  const [dollar, setDollar] = useState();
  const [note, setNote] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const getDailyReportSalesMoney = () => {
    setRefreshing(true);
    axios({
      url: `${mainUrl}lastoria/all-sales-daily-reports/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        // console.warn(res.data);
        setMainPrice(res.data.main_price);
        setGivenPrice(res.data.given_price);
        setLeftPrice(res.data.left_price);
        setSalonGivenPrice(res.data.salon_given_price);
        setMortgage(res.data.mortgage);
        setRefreshing(false);
      })
      .catch(_err => {
        setMainPrice(0);
        Alert.alert('Ошибка', 'Не удалось получить данные');
        setRefreshing(false);
        console.error(_err);
      });
  };

  useEffect(() => {
    if (token) {
      getDailyReportSalesMoney();
    }
  }, [token]);

  const sendReport = () => {
    if (!mainPrice) return Alert.alert('Ошибка', 'Не указана сумма продаж');
    const reporData = {
      salon_given_price: salonGivenPrice,
      total_price: mainPrice,
      left_price: leftPrice,
      given_price: givenPrice,
      sum: sum,
      dollar: dollar,
      note: note,
      mortgage: mortgage,
    };

    axios({
      url: `${mainUrl}lastoria/all-sales-daily-reports/`,
      method: 'POST',
      data: reporData,
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(() => {
        setSum('0');
        setDollar('0');
        setNote('');
        setMortgage('0');
        Alert.alert('Отчет отправлен');
        getDailyReportSalesMoney();
      })
      .catch(() => {
        Alert.alert('Ошибка', 'Не удалось отправить отчет');
      });
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getDailyReportSalesMoney}
        />
      }>
      <View style={tw`w-5/12 h-10 mx-auto my-5 border-b`}>
        <Text style={tw`m-auto text-3xl font-semibold`}>
          💰 {mainPrice || 0}
        </Text>
      </View>

      <View style={tw`flex-row w-11/12 mx-auto justify-between`}>
        <Text style={tw`text-xl`}>Berilgan pullar</Text>
        <Text style={tw`text-xl`}>{givenPrice}</Text>
      </View>

      <View style={tw`flex-row w-11/12 mx-auto justify-between`}>
        <Text style={tw`text-xl`}>Qarzlar</Text>
        <Text style={tw`text-xl`}>{leftPrice}</Text>
      </View>

      <View style={tw`flex-row w-11/12 mx-auto justify-between`}>
        <Text style={tw`text-xl`}>50/50 sotuv salon bergan pul</Text>
        <Text style={tw`text-xl`}>{salonGivenPrice}</Text>
      </View>

      <View style={tw`flex-row w-11/12 mx-auto justify-between`}>
        <Text style={tw`text-xl`}>Zaklad</Text>
        <Text style={tw`text-xl`}>{mortgage}</Text>
      </View>

      <Text style={tw`mx-auto text-xl`}>Sum 💴</Text>
      <TextInput
        keyboardType="numeric"
        value={sum}
        onChangeText={text => {
          setSum(text);
        }}
        placeholder="Sum 💴"
        style={[
          tw`border w-10/12 h-13 mx-auto my-3 rounded-xl pl-3 border-gray-400`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 0.5,
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            elevation: 2,
            backgroundColor: '#fff',
          },
        ]}
      />
      <Text style={tw`mx-auto text-xl`}>Dollar 💵</Text>
      <TextInput
        keyboardType="numeric"
        value={dollar}
        onChangeText={setDollar}
        placeholder="Dollar 💵"
        style={[
          tw`border w-10/12 h-13 mx-auto my-3 rounded-xl pl-3 border-gray-400`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 0.5,
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            elevation: 2,
            backgroundColor: '#fff',
          },
        ]}
      />
      <TextInput
        value={note}
        multiline
        onChangeText={setNote}
        placeholder="Komentariya 💬"
        style={[
          tw`border w-10/12 h-25 mx-auto my-3 rounded-xl pl-3 border-gray-400`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 0.5,
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            elevation: 2,
            backgroundColor: '#fff',
          },
        ]}
      />
      <TouchableOpacity
        onPress={sendReport}
        activeOpacity={0.8}
        style={[
          tw`mx-auto my-3 w-8/12 h-15 rounded-full`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            elevation: 2,
            backgroundColor: '#00aaff',
          },
        ]}>
        <Text style={tw`m-auto text-2xl`}>Yuborish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReportSales;
