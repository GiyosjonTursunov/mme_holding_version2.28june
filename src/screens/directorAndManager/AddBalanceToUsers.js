/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import tw from 'twrnc';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {baseUrl, mainUrl} from '../../config/apiUrl';

const AddBalanceToUsers = () => {
  const {token} = useSelector(state => state.userReducer);

  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [usersModalVisible, setUsersModalVisible] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [money, setMoney] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (token) {
      // console.warn(token);
      const getUsers = async () => {
        const resultUsers = await axios.get(mainUrl + 'auth/user/list/', {
          headers: {
            Authorization: `token ${token}`,
          },
        });

        if (resultUsers.status === 200) {
          setUsers(resultUsers.data);
          // console.error(resultUsers.data, 'resultUsers.data');
        } else {
          Alert.alert('Error', 'Bazaga ulanishda xatolik yuz berdi');
          // console.warn(resultUsers.status, 'resultUsers');
        }
      };

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

      getUsers();
      getCompanies();

      return () => {
        setUsers([]);
        setCompanies([]);
      };
    }
  }, [token]);

  const Item = ({img, id}) => (
    <TouchableOpacity
      onPress={() => setSelectedCompany(id)}
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

  const sendBalance = async () => {
    if (selectedUser && selectedCompany && money) {
      const resultSended = await axios.post(
        mainUrl + 'dashboard/balance/create/',
        {
          user: selectedUser,
          company: selectedCompany,
          balance: money,
          left_balance: money,
          comment: comment,
        },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        },
      );

      if (resultSended.status === 201) {
        Alert.alert('Success', 'Balance yuborildi');
        setSelectedUser(null);
        setSelectedUserName('');
        setMoney('');
        setSelectedCompany(null);
        setComment('');
      } else {
        Alert.alert('Error', 'Bazaga ulanishda xatolik yuz berdi');
      }
    } else {
      Alert.alert('Error', 'To`liq ma`lumotlar kiritilmadi');
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <TouchableOpacity
        onPress={() => setUsersModalVisible(true)}
        style={tw`w-10/12 mx-auto h-10 border border-[rgba(0,0,0,0.3)] flex-row items-center justify-between px-3 rounded-lg mt-2`}>
        <Text>Kimga {selectedUserName}</Text>
        <Image
          style={tw`w-8 h-8`}
          source={require('../../../assets/down.png')}
          resizeMode="contain"
        />
        <Modal
          visible={usersModalVisible}
          onRequestClose={() => setUsersModalVisible(false)}
          animationType="fade"
          transparent={true}>
          <View style={tw`flex-1 bg-[rgba(0,0,0,0.3)]`}>
            <View style={tw`w-10/12 h-100 m-auto bg-white rounded-lg`}>
              <TouchableOpacity
                style={tw`absolute right-[-2] top-[-3]`}
                onPress={() => setUsersModalVisible(false)}>
                <Image
                  source={require('../../../assets/x-button.png')}
                  style={tw`w-10 h-10 m-auto`}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <FlatList
                data={users}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedUser(item.id);
                      setSelectedUserName(item.name);
                      setUsersModalVisible(false);
                    }}
                    style={tw`w-full mx-auto h-15 border-b border-[rgba(0,0,0,0.3)] justify-between flex-row items-center px-3 rounded-lg mt-2`}>
                    {/* <Text>{item?.name}</Text> */}
                    <View style={tw`flex-row items-center`}>
                      <View style={tw`w-7 h-7 my-auto bg-[#D4D8D8] ml-2`}>
                        <Text style={tw`m-auto`}>{item?.id}</Text>
                      </View>
                      <Text style={tw`ml-3 font-500 text-[16px]`}>
                        {item?.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          </View>
        </Modal>
      </TouchableOpacity>

      <TextInput
        placeholder="Berilgan summa"
        value={money || ''}
        onChangeText={setMoney}
        keyboardType="numeric"
        style={tw`w-10/12 h-10 mx-auto my-2 border border-[rgba(0,0,0,0.3)] rounded-lg pl-2`}
      />

      <View style={tw`h-35`}>
        <FlatList
          horizontal
          data={companies}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <TextInput
        placeholder="Comment"
        multiline
        value={comment || ''}
        onChangeText={setComment}
        style={tw`w-10/12 h-25 mx-auto my-2 border border-[rgba(0,0,0,0.3)] rounded-lg pl-2`}
      />

      <TouchableOpacity
        onPress={sendBalance}
        style={tw`w-8/12 h-13 border bg-black mx-auto my-2 rounded-xl`}>
        <Text style={tw`text-lg text-white m-auto`}>Saqlash</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBalanceToUsers;
