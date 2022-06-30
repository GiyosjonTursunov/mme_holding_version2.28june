/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import Header from '../../components/global/Header';
import DoubleBtn from '../../components/global/DoubleBtn';
import {mainUrl} from '../../config/apiUrl';
import axios from 'axios';
import {useSelector} from 'react-redux';

const CostsRegister = () => {
  const {token, userId} = useSelector(state => state.userReducer);

  const [xarajatNomi, setXarajatNomi] = useState('');
  const [soni, setSoni] = useState('');
  const [narxi, setNarxi] = useState('');
  const [note, setNote] = useState('');

  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [serioProchi, setSerioProchi] = useState(1);
  const [balanceByUser, setBalanceByUser] = useState([]);

  const [current, setCurrent] = useState('');

  const dataCostsCreate = {
    balance: balanceByUser[0]?.id,
    name: xarajatNomi,
    count: Number(soni),
    amount: Number(current),
    price: Number(narxi),
    types: serioProchi,
    company: Number(balanceByUser[0]?.company?.id),
    comment: note,
  };

  const clearAllHooks = () => {
    setXarajatNomi();
    setSoni();
    setNarxi();
    setNote();
    setCurrent();
  };

  const getBalanceById = async () => {
    const resultBalance = await axios(
      mainUrl + `dashboard/balance/list/by/user/${userId}/`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );

    if (resultBalance.status === 200) {
      setBalanceByUser(resultBalance.data);
    } else {
      Alert.alert('Error', 'Bazaga ulanishda xatolik yuz berdi');
    }
  };

  useEffect(() => {
    if (token && userId) {
      getBalanceById();
    }
  }, [token, userId]);

  const dataReport = {
    comment: note,
    user: userId,
    company: balanceByUser[0]?.company?.id,
    balance: balanceByUser[0]?.id,
    left_balance: balanceByUser[0]?.left_balance,
  };

  const sendCost = async () => {
    if (xarajatNomi && soni && current) {
      if (Number(balanceByUser[0]?.left_balance) - Number(narxi) >= 0) {
        const sendedCostResult = await axios.post(
          mainUrl + 'dashboard/balance/cost/create/',
          dataCostsCreate,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          },
        );

        if (sendedCostResult.status === 201) {
          clearAllHooks();
          Alert.alert('Ishlatildi');
          getBalanceById();
        } else {
          Alert.alert('Bazaga ulanishda xatolik!');
        }
      } else {
        Alert.alert(
          `Balansingizda yetmayotgan mablag! ${Math.abs(
            Number(balanceByUser[0]?.left_balance) - Number(narxi),
          )}`,
        );
      }
    } else {
      Alert.alert('To`liq kiriting');
    }
  };

  const sendReport = async () => {
    if (balanceByUser[0]?.balance) {
      const sendedReportResult = await axios.post(
        mainUrl + 'dashboard/balance/reported/create/',
        dataReport,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        },
      );

      if (sendedReportResult.status === 201) {
        clearAllHooks();
        Alert.alert('Ishlatildi');
        getBalanceById();
        setModalReportVisible(false);
      } else {
        Alert.alert('Bazaga ulanishda xatolik!');
      }
    } else {
      Alert.alert('Balansingiz mavjud emas!');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView style={tw`flex-1 bg-white`}>
        <Header headerName={'Xarajatlar'} />
        <DoubleBtn
          firstBtnName={'SERIO'}
          firstBtnFunction={() => setSerioProchi(1)}
          secondBtnName={'PROCHI'}
          secondBtnFunction={() => setSerioProchi(2)}
        />
        <View
          style={tw`w-9/12 h-10 flex-row justify-between items-center mx-auto`}>
          <Text style={tw`text-xl font-bold`}>Balans</Text>
          <View style={tw`flex-row w-6/12 justify-around items-center`}>
            <Text style={tw`text-xl font-bold`}>
              {balanceByUser[0]?.balance || '0'}
            </Text>
          </View>
        </View>

        <View
          style={tw`w-9/12 h-10 flex-row justify-between items-center mx-auto`}>
          <Text style={tw`text-xl font-bold`}>Qoldiq</Text>
          <View style={tw`flex-row w-6/12 justify-around items-center`}>
            <Text style={tw`text-xl font-bold`}>
              {balanceByUser[0]?.left_balance || '0'}
            </Text>
          </View>
        </View>

        <View style={tw`w-full justify-around`}>
          <TextInput
            placeholder="Xarajat nomi"
            style={tw`border w-10/12 my-2 mx-auto h-13 rounded-xl pl-3 text-base border-[rgba(0,0,0,0.5)]`}
            onChangeText={setXarajatNomi}
            value={xarajatNomi}
          />
          <TextInput
            placeholder="Soni"
            style={tw`border w-10/12 my-2 mx-auto h-13 rounded-xl pl-3 text-base border-[rgba(0,0,0,0.5)]`}
            onChangeText={setSoni}
            value={soni}
          />
          <View
            style={tw`flex-row my-2 justify-around items-center mx-auto h-13`}>
            <TouchableOpacity
              onPress={() => setCurrent(3)}
              // 1 bolsa dona 2 bolsa kg 3 bolsa metr
              style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
              <Text style={tw`m-auto`}>
                Metr
                {current === 3 && '✅'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setCurrent(1)}
              style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
              <Text style={tw`m-auto`}>
                Dona
                {current === 1 && '✅'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setCurrent(2)}
              style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
              <Text style={tw`m-auto`}>
                Kg
                {current === 2 && '✅'}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={tw`flex-row my-2 justify-around items-center mx-auto h-13`}>
            <TouchableOpacity
              onPress={() => setCurrent(4)}
              style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
              <Text style={tw`m-auto`}>
                Litr
                {current === 4 && '✅'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setCurrent(5)}
              style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
              <Text style={tw`m-auto`}>
                Kub
                {current === 5 && '✅'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setCurrent(6)}
              style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
              <Text style={tw`m-auto`}>
                Kbayt/soat
                {current === 6 && '✅'}
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Xarajat narxi"
            style={tw`border w-10/12 my-2 h-13 mx-auto rounded-2xl pl-3 text-base border-[rgba(0,0,0,0.5)]`}
            value={narxi}
            onChangeText={setNarxi}
          />
          <TextInput
            placeholder="Qo'shimcha ma'lumot"
            multiline
            style={tw`border w-10/12 mx-auto h-30 rounded-xl pl-3 text-base border-[rgba(0,0,0,0.5)]`}
            value={note}
            onChangeText={setNote}
          />
          <View style={tw`flex-row w-60 mx-auto my-2 mb-10`}>
            <TouchableOpacity
              style={tw`w-5.5/12 h-11 bg-black mx-auto rounded-2xl`}
              onPress={sendCost}>
              <Text style={tw`m-auto text-white text-base`}>Ishlatish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`w-5.5/12 h-11 bg-black mx-auto rounded-2xl`}
              onPress={() => setModalReportVisible(true)}>
              <Text style={tw`m-auto text-white text-base`}>Tozalash</Text>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalReportVisible}
                onRequestClose={() => {
                  setModalReportVisible(!modalReportVisible);
                }}>
                <TouchableOpacity
                  onPress={() => setModalReportVisible(false)}
                  style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
                  <TouchableOpacity
                    onPress={() => setModalReportVisible(true)}
                    style={tw`w-11/12 h-40 bg-white rounded-3xl justify-around items-center`}>
                    <TextInput
                      multiline
                      style={tw`w-11/12 h-20 border border-[rgba(0,0,0,0.5)] rounded-2xl p-2`}
                      placeholder="Balans tozalsh"
                      value={note}
                      onChangeText={setNote}
                    />
                    <TouchableOpacity
                      style={tw`w-6/12 h-13 rounded-full bg-[#242424]`}
                      onPress={sendReport}>
                      <Text
                        style={tw`m-auto text-base font-semibold text-white`}>
                        Jo'natish
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </TouchableOpacity>
              </Modal>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CostsRegister;
