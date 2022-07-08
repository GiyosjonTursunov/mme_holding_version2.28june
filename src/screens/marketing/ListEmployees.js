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

import SearchBar from '@pnap/react-native-search-bar';

import tw from 'twrnc';
import DatePickerCustom from '../../components/global/DatePickerCustom';

const ListEmployees = ({navigation}) => {
  const {token, role} = useSelector(state => state.userReducer);

  const [employees, setEmployees] = useState([]);

  const [dateModalVisible, setDateModalVisible] = useState(false);

  const [workDate, setWorkDate] = useState('');

  const [employeeId, setEmployeeId] = useState('');

  const [searchName, setSearchName] = useState('LaStoria');

  const [isNorm, setIsNorm] = useState(2);

  const [isSearchPressed, setIsSearchPressed] = useState(false);

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
          // console.warn('getEmployees =>', res.data);
          setRefreshing(false);
        })
        .catch(err => {
          console.error('error', err);
          setRefreshing(false);
        });
    }
  };

  // get today date by formatting yyyy-mm-dd
  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
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
          // console.error('error', err);
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

    // console.warn('dataSortedId =>', dataSortedId);

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
      {role === 'MARKETOLOG' && <Header headerName={'Marketing'} />}
      <ThreeBtn
        firstBtnName={'LaStoria'}
        firstBtnNavigation={() => setSearchName('LaStoria')}
        secondBtnName={'1SONiA'}
        secondBtnNavigation={() => setSearchName('1SONiA')}
        thirdBtnName={'TexnoStyle'}
        thirdBtnNavigation={() => setSearchName('TexnoStyle')}
      />
      {/* <View style={tw`flex-row px-4`}>
        <View
          style={tw`w-10/12 h-12 border border-[rgba(0,0,0,0.3)] mx-auto my-2 rounded-xl flex-row`}>
          <Image
            source={require('../../../assets/search.png')}
            style={tw`w-2/12 h-8 m-auto`}
            resizeMode="contain"
          />
          <TextInput
            style={tw`w-10/12 font-600 text-lg text-left pl-2`}
            placeholder={'Qidiruv'}
            placeholderTextColor={'#999'}
            onChangeText={text => {
              if (text.length) {
                setSearchName(text);
              }
            }}
          />
        </View>
      </View> */}

      <View
        style={tw`w-11.5/12 flex-row h-15 justify-around items-center mx-auto mt-3`}>
        <TouchableOpacity
          onPress={() => setTypesForUrl('all/')}
          style={tw`border rounded-3xl my-auto ${
            isSearchPressed ? 'hidden' : null
          } ${typesForUrl === 'all/' ? 'bg-black' : null}`}>
          <Text
            style={tw`text-xl m-auto text-black px-5 py-2 ${
              typesForUrl === 'all/' ? 'text-white' : null
            }`}>
            Barchasi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`${isSearchPressed ? 'hidden' : null}`}
          onPress={() => {
            setTypesForUrl('vacha/');
          }}>
          <Image
            source={require('../../../assets/invoice.png')}
            resizeMode="contain"
            style={tw`w-10 h-10`}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('CostsRegister')}
          style={tw`${isSearchPressed ? 'hidden' : null}`}>
          <Text style={tw`text-6xl`}>💸</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`${
            isSearchPressed ? 'absolute right-0 top-3 w-full' : null
          }`}>
          <SearchBar
            onSubmitSearch={text => {
              if (text.length) {
                setSearchName(text);
              }
            }}
            onActiveSearch={() => setSearchName('')}
            onToggleSearchBar={() => setIsSearchPressed(!isSearchPressed)}
            customIcon={
              <Image
                source={require('../../../assets/search.png')}
                resizeMode="contain"
                style={tw`w-8 h-8`}
              />
            }
            underlineActiveColor={'#9f9ea4'}
            underlineInactiveColor={'#6d28d9'}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        onRefresh={getEmployees}
        refreshing={refreshing}
        data={employees}
        onEndReached={() => console.warn('hello world')}
        renderItem={({item}) => (
          <View
            style={tw`w-11/12 h-18 mx-auto my-2 rounded-lg ${
              item?.worker_date_work[0] &&
              item?.worker_date_work[0]?.work_date === getTodayDate()
                ? 'border-red-700'
                : null
            } ${
              item?.worker_date_work[0] &&
              item?.worker_date_work[0]?.work_date === getTodayDate()
                ? 'border-2'
                : 'border'
            } flex-row justify-between items-center px-1`}>
            <View>
              <Text style={tw`text-lg`}>{item?.first_name}</Text>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-lg`}>{item?.last_name}</Text>
                <Text style={tw`ml-2.5 text-xl text-blue-600`}>
                  {item?.workedDays}
                </Text>
              </View>
            </View>
            <Text style={tw`text-lg m-auto absolute left-[55%]`}>
              {item?.role?.name}
            </Text>

            {/* <Text style={tw`text-lg m-auto absolute left-[75%]`}>
              {item?.workedDays}
            </Text> */}

            <TouchableOpacity
              onPress={() => {
                setIsNorm(2);
                setDateModalVisible(true);
                setEmployeeId(item?.id);
              }}
              style={tw`my-auto absolute right-2`}>
              <Image
                style={tw`w-10 h-10`}
                source={require('../../../assets/minus.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
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
