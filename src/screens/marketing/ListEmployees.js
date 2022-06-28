/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Dimensions,
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

const ListEmployees = () => {
  const {token, role} = useSelector(state => state.userReducer);

  const [employees, setEmployees] = useState([]);

  const [dateModalVisible, setDateModalVisible] = useState(false);

  const [workDate, setWorkDate] = useState('');

  const [employeeId, setEmployeeId] = useState('');

  const [searchName, setSearchName] = useState('LaStoria');

  const getEmployees = () => {
    if (token) {
      axios
        .get(mainUrl + `dashboard/workers/list/${searchName}/`, {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then(res => {
          // console.warn(res.data);
          setEmployees(res.data);
        })
        .catch(err => {
          console.error('error', err);
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
      axios
        .get(mainUrl + `dashboard/workers/list/${searchName}/`, {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then(res => {
          // console.warn(res.data);
          setEmployees(res.data);
        })
        .catch(err => {
          console.error('error', err);
        });
    }
  }, [token, searchName]);

  const chooseData = () => {
    if (workDate.length > 0) {
      return {
        work_date: workDate,
        worker: employeeId,
      };
    } else {
      return {
        worker: employeeId,
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

      // console.warn(resultWorkDateSended.data);
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

  return (
    <SafeAreaView>
      <Header headerName={'Marketing'} />
      <ThreeBtn
        firstBtnName={'LaStoria'}
        firstBtnNavigation={() => setSearchName('LaStoria')}
        secondBtnName={'1SONiA'}
        secondBtnNavigation={() => setSearchName('1SONiA')}
        thirdBtnName={'TexnoStyle'}
        thirdBtnNavigation={() => setSearchName('TexnoStyle')}
      />
      <View
        style={tw`w-11.5/12 h-12 border border-[rgba(0,0,0,0.3)] mx-auto my-2 rounded-xl flex-row`}>
        <Image
          source={require('../../../assets/search.png')}
          style={tw`w-2/12 h-8 m-auto`}
          resizeMode="contain"
        />
        <TextInput
          style={tw`w-10/12 font-600 text-lg text-left pl-3`}
          placeholder={'Qidiruv'}
          placeholderTextColor={'#999'}
          onChangeText={text => {
            if (text.length) {
              setSearchName(text);
            }
          }}
        />
      </View>
      {/* 2022-06-21 */}
      <View style={tw`pb-[${Dimensions.get('screen').height / 2.2}px]`}>
        <FlatList
          data={employees}
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
                <Text style={tw`text-lg`}>{item?.last_name}</Text>
              </View>
              {/* <View style={tw`w-5/12 h-[100%]`}> */}
              <Text style={tw`text-lg m-auto`}>{item?.role?.name}</Text>
              {/* </View> */}
              <TouchableOpacity
                onPress={() => {
                  setDateModalVisible(true);
                  setEmployeeId(item?.id);
                }}
                style={tw`m-auto`}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={dateModalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setDateModalVisible(!dateModalVisible);
                  }}>
                  <View style={tw`flex-1 bg-[rgba(0,0,0,0.3)] relative`}>
                    <View
                      style={tw`w-10/12 h-50 bg-white m-auto justify-around items-center`}>
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

                      <TouchableOpacity
                        onPress={sendWorkDate}
                        style={tw`m-auto w-6/12 h-15 rounded-2xl bg-[#323054] my-5`}>
                        <Text style={tw`text-white m-auto text-xl`}>
                          Saqlash
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
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
      </View>
    </SafeAreaView>
  );
};

export default ListEmployees;
