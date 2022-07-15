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
  RefreshControl,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import tw from 'twrnc';
// import Header from '../../components/global/Header';
import DoubleBtn from '../../components/global/DoubleBtn';
import {baseUrl, mainUrl} from '../../config/apiUrl';
import axios from 'axios';
import {useSelector} from 'react-redux';

const CostsRegister = () => {
  const {token, userId} = useSelector(state => state.userReducer);

  const [companies, setCompanies] = useState([]);

  const [xarajatNomi, setXarajatNomi] = useState('');
  const [soni, setSoni] = useState('');
  const [narxi, setNarxi] = useState('');
  const [note, setNote] = useState('');

  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [serioProchi, setSerioProchi] = useState(1);
  const [balanceByUser, setBalanceByUser] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [current, setCurrent] = useState('');

  const [type, setType] = useState('sum');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const dataCostsCreate = {
    balance: balanceByUser[0]?.id,
    name: xarajatNomi,
    count: Number(soni),
    amount: Number(current),
    price_uz: type === 'sum' ? Number(narxi) : 0,
    price_us: type === 'dollar' ? Number(narxi) : 0,
    types: serioProchi,
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
    setRefreshing(true);
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
      setRefreshing(false);
    } else {
      Alert.alert('Error', 'Bazaga ulanishda xatolik yuz berdi');
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (token && userId) {
      getBalanceById();
      const getCompanies = async () => {
        const resultCompanies = await axios({
          url: `${mainUrl}dashboard/companies/`,
          method: 'GET',
          headers: {
            Authorization: `token ${token}`,
          },
        });

        if (resultCompanies.status === 200) {
          setCompanies(resultCompanies.data);
        } else {
          Alert.alert('Error', 'Bazaga ulanishda xatolik yuz berdi');
        }
      };

      getCompanies();
    }
  }, [token, userId]);

  const dataReport = {
    comment: note,
    user: userId,
    balance: balanceByUser[0]?.id,
    left_balance_uz: balanceByUser[0]?.left_balance_uz,
    left_balance_us: balanceByUser[0]?.left_balance_us,
  };

  const sendCost = async () => {
    if (xarajatNomi && soni && current) {
      if (balanceByUser[0]?.company) {
        dataCostsCreate.general = false;
      } else {
        dataCostsCreate.general = true;
      }
      console.warn('dataCostsCreate => ', dataCostsCreate);
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
      Alert.alert('To`liq kiriting');
    }
  };

  const sendReport = async () => {
    if (balanceByUser[0]?.balance_uz || balanceByUser[0]?.balance_us) {
      // company: balanceByUser[0]?.company?.id,
      if (balanceByUser[0]?.company) {
        dataReport.company = balanceByUser[0]?.company?.id;
      } else {
        console.warn('dataReport => ', dataReport);
      }
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

  const Item = ({img, id}) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedCompany(id);
        dataCostsCreate.company = id;
      }}
      style={[
        tw`w-30 h-30 m-auto mx-1 rounded-xl p-1`,
        {
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 3,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          elevation: 3,
          backgroundColor: selectedCompany === id ? '#00E228' : 'white',
        },
      ]}>
      <Image
        source={{uri: baseUrl + img}}
        resizeMode="contain"
        style={tw`w-full h-full`}
      />
    </TouchableOpacity>
  );

  const renderItem = ({item}) => <Item img={item.img} id={item.id} />;

  // const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView
        style={tw`flex-1 bg-white`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getBalanceById} />
        }>
        <KeyboardAvoidingView behavior="position">
          {/* <Header headerName={'Xarajatlar'} /> */}
          <DoubleBtn
            firstBtnName={'SERIO'}
            firstBtnFunction={() => setSerioProchi(1)}
            secondBtnName={'PROCHI'}
            secondBtnFunction={() => setSerioProchi(2)}
          />

          <View style={tw`flex-row w-11/12 mx-auto mt-2 justify-around`}>
            <Text style={tw`text-xl font-bold`}>Balans :</Text>
            <Text style={tw`text-xl font-bold`}>
              {balanceByUser[0]?.balance_uz || '0'} sum
            </Text>
            <Text style={tw`text-xl font-bold`}>
              {balanceByUser[0]?.balance_us || '0'} 💵
            </Text>
          </View>

          <View style={tw`flex-row w-11/12 mx-auto mt-2 justify-around`}>
            <Text style={tw`text-xl font-bold`}>Qoldiq :</Text>
            <Text style={tw`text-xl font-bold`}>
              {balanceByUser[0]?.left_balance_uz || '0'} sum
            </Text>
            <Text style={tw`text-xl font-bold`}>
              {balanceByUser[0]?.left_balance_us || '0'} 💵
            </Text>
          </View>

          {!balanceByUser[0]?.company && (
            <View style={tw`h-35`}>
              <FlatList
                horizontal
                data={companies}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          )}

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
            <View style={tw`flex-row w-10/12 mx-auto`}>
              <TextInput
                placeholder="Xarajat narxi"
                style={tw`border w-6.5/12 my-2 h-13 rounded-2xl pl-3 text-base border-[rgba(0,0,0,0.5)]`}
                value={narxi}
                onChangeText={setNarxi}
              />

              <TouchableOpacity
                onPress={() => setType('sum')}
                style={tw`w-2.5/12 h-13 border rounded-lg border-[rgba(0,0,0,0.5)] my-auto mx-auto`}>
                <Text style={tw`m-auto`}>
                  Sum
                  {type === 'sum' && '✅'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setType('dollar')}
                style={tw`w-2.5/12 h-13 border rounded-lg border-[rgba(0,0,0,0.5)] my-auto mx-auto`}>
                <Text style={tw`m-auto`}>
                  Dollar
                  {type === 'dollar' && '✅'}
                </Text>
              </TouchableOpacity>
            </View>
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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CostsRegister;
