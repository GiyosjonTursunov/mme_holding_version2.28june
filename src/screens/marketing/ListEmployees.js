/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';
import Header from '../../components/global/Header';
import ThreeBtn from '../../components/global/ThreeBtn';

import tw from 'twrnc';
import DatePickerCustom from '../../components/global/DatePickerCustom';
import Employees from '../../components/renders/Employees';

const ListEmployees = ({navigation}) => {
  const {token, role} = useSelector(state => state.userReducer);

  const [employees, setEmployees] = useState([]);

  const [dateModalVisible, setDateModalVisible] = useState(false);

  const [workDate, setWorkDate] = useState('');

  const [employeeId, setEmployeeId] = useState('');

  const [searchName, setSearchName] = useState('LaStoria');

  const [isNorm, setIsNorm] = useState(2);

  // const [isSearchPressed, setIsSearchPressed] = useState(false);

  const [typesForUrl, setTypesForUrl] = useState('all/');

  const [refreshing, setRefreshing] = useState(false);

  const getEmployees = () => {
    if (token) {
      setRefreshing(true);
      axios
        .get(mainUrl + `dashboard/workers/list/${searchName}/${typesForUrl}`, {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then(res => {
          setEmployees(res.data);
          setRefreshing(false);
        })
        .catch(err => {
          console.error('error', err);
          setRefreshing(false);
        });
    }
  };

  useEffect(() => {
    if (token) {
      setRefreshing(true);
      axios
        .get(mainUrl + `dashboard/workers/list/${searchName}/${typesForUrl}`, {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then(res => {
          setEmployees(res.data);
          setRefreshing(false);
        })
        .catch(_err => {
          setRefreshing(false);
        });
    }
  }, [token, searchName, typesForUrl]);

  const chooseData = () => {
    if (workDate.length > 0) {
      return {
        work_date: workDate,
        worker: employeeId,
        status: isNorm,
      };
    } else {
      return {
        worker: employeeId,
        status: isNorm,
      };
    }
  };

  const sendWorkDate = async () => {
    if (employeeId) {
      let dataSend = chooseData();

      const resultWorkDateSended = await axios.post(
        mainUrl + 'dashboard/workers/date-work/create/',
        dataSend,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        },
      );

      if (resultWorkDateSended.data) {
        Alert.alert('Данные успешно отправлены');
        setDateModalVisible(false);
        getEmployees();
      } else {
        Alert.alert('Ошибка при отправке данных');
      }
    } else {
      Alert.alert('Выберите сотрудника');
    }
  };

  const updateSalaryDate = async () => {
    const dataSortedId = employees.map(item => {
      return {id: item.id};
    });

    const resultUpdate = axios.put(
      mainUrl + 'dashboard/workers/update/work/',
      dataSortedId,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );

    if ((await resultUpdate).status === 200) {
      Alert.alert('Данные успешно отправлены');
      getEmployees();
    } else {
      Alert.alert('Ошибка при отправке данных');
    }
  };

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CostsRegister')}
        style={tw`absolute right-0 bottom-[8%] z-1 bg-white rounded-full p-1`}>
        <Text style={tw`text-6xl m-auto`}>💸</Text>
      </TouchableOpacity>
      {role === 'MARKETOLOG' && <Header headerName={'Marketing'} />}
      <ThreeBtn
        firstBtnName={'LaStoria'}
        firstBtnNavigation={() => setSearchName('LaStoria')}
        secondBtnName={'1SONiA'}
        secondBtnNavigation={() => setSearchName('1SONiA')}
        thirdBtnName={'TexnoStyle'}
        thirdBtnNavigation={() => setSearchName('TexnoStyle')}
      />
      <View style={tw`flex-row w-11/12 mx-auto justify-around items-center`}>
        <View
          style={tw`w-8/12 h-12 border-b border-[rgba(0,0,0,0.3)] my-2 rounded-xl flex-row`}>
          <Image
            source={require('../../../assets/search.png')}
            style={tw`w-2/12 h-6.5 m-auto`}
            resizeMode="contain"
          />
          <TextInput
            style={tw`w-10.5/12 font-600 text-lg text-left pl-1`}
            placeholder={'Qidiruv'}
            placeholderTextColor={'#999'}
            onChangeText={text => {
              if (text.length) {
                setSearchName(text);
              }
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => setTypesForUrl('all/')}
          style={tw`border rounded-xl my-auto  ${
            typesForUrl === 'all/' ? 'bg-black' : null
          }`}>
          <Text
            style={tw`text-xl m-auto text-black px-3 py-2 ${
              typesForUrl === 'all/' ? 'text-white' : null
            }`}>
            Все
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setTypesForUrl('vacha/');
          }}>
          <Image
            source={require('../../../assets/invoice.png')}
            resizeMode="contain"
            style={tw`w-10 h-10`}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        onRefresh={getEmployees}
        refreshing={refreshing}
        data={employees}
        onEndReached={() => console.warn('hello world')}
        renderItem={({item}) => (
          <Employees
            item={item}
            setDateModalVisible={setDateModalVisible}
            setEmployeeId={setEmployeeId}
            setIsNorm={setIsNorm}
          />
        )}
        keyExtractor={item => item?.id}
      />

      <Modal animationType="fade" transparent={true} visible={dateModalVisible}>
        <View style={tw`flex-1 bg-[rgba(0,0,0,0.3)]`}>
          <View
            style={tw`w-10/12 h-70 bg-white m-auto justify-around items-center rounded-xl`}>
            <TouchableOpacity
              style={tw`absolute right-[-3] top-[-20px]`}
              onPress={() => setDateModalVisible(false)}>
              <Image
                source={require('../../../assets/x-button.png')}
                style={tw`w-12 h-12`}
              />
            </TouchableOpacity>
            <View style={tw`mx-auto items-center`}>
              <Text style={tw`text-lg my-1`}>Kelmagan kuni</Text>
              <DatePickerCustom
                workDate
                setNeedDate={setWorkDate}
                text={workDate}
              />
            </View>

            <View style={tw`mx-auto items-center flex-row`}>
              <TouchableOpacity
                onPress={() => setIsNorm(1)}
                style={tw`w-5/12 h-10 border mx-1 rounded-3xl ${
                  isNorm === 1 ? 'bg-[#323054]' : null
                }`}>
                <Text
                  style={tw`m-auto text-lg text-black ${
                    isNorm === 1 ? 'text-white' : null
                  }`}>
                  Sababli
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsNorm(2)}
                style={tw`w-5/12 h-10 border mx-1 rounded-3xl ${
                  isNorm === 2 ? 'bg-[#323054]' : null
                }`}>
                <Text
                  style={tw`m-auto text-lg text-black ${
                    isNorm === 2 ? 'text-white' : null
                  }`}>
                  Sababsiz
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={sendWorkDate}
              style={tw`m-auto w-6/12 h-15 rounded-2xl bg-[#323054] my-2`}>
              <Text style={tw`text-white m-auto text-xl`}>Saqlash</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {typesForUrl === 'all/' ? null : (
        <TouchableOpacity
          onPress={updateSalaryDate}
          style={tw`w-6/12 h-12 border mx-auto bg-black rounded-3xl my-2`}>
          <Text style={tw`text-xl text-white m-auto`}>Oylik berildi</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default ListEmployees;
