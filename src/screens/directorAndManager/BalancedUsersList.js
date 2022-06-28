/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import axios from 'axios';

import tw from 'twrnc';
import {mainUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';

import {
  SwipeItem,
  SwipeButtonsContainer,
  SwipeProvider,
} from 'react-native-swipe-item';

const BalancedUsersList = ({navigation}) => {
  const {token} = useSelector(state => state.userReducer);

  const [users, setUsers] = useState([]);

  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedComment, setSelectedComment] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('LaStoria');

  const getUsersList = async () => {
    // console.log(token);
    setRefreshing(true);
    const resultUsers = await axios.get(
      mainUrl + `dashboard/balance/list/${selectedCompany}/`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );

    if ((resultUsers.status = '200')) {
      // console.warn('resultUsers.data => ', resultUsers.data);
      setUsers(resultUsers.data);
      setRefreshing(false);
    } else {
      setRefreshing(false);
      Alert.alert('Error', 'Bazaga ulanishda xatolik yuz berdi');
    }
  };

  useEffect(() => {
    if (token) {
      getUsersList();
    }

    return () => {
      setUsers([]);
    };
  }, [token, selectedCompany]);

  const leftButton = comment => {
    return (
      <SwipeButtonsContainer style={tw`mt-5`}>
        <TouchableOpacity
          onPress={() => {
            setIsCommentModalVisible(true);
            setSelectedComment(comment);
          }}>
          <Image
            source={require('../../../assets/messages.png')}
            resizeMode="contain"
            style={tw`w-10 h-10 m-auto`}
          />
        </TouchableOpacity>
      </SwipeButtonsContainer>
    );
  };

  const rightButton = id => {
    return (
      <SwipeButtonsContainer style={tw`mt-5`}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CostsListsByBalanceId', {balance_id: id})
          }>
          <Image
            source={require('../../../assets/transfer.png')}
            resizeMode="contain"
            style={[
              tw`w-10 h-10 m-auto`,
              {
                transform: [{rotate: '180deg'}],
              },
            ]}
          />
        </TouchableOpacity>
      </SwipeButtonsContainer>
    );
  };

  return (
    <View style={tw`flex-1 bg-white pb-10`}>
      <View style={tw`flex-row items-center`}>
        <ScrollView
          horizontal
          style={tw`w-10/12 mt-2`}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => setSelectedCompany('LaStoria')}
            style={tw`border rounded-2xl ${
              selectedCompany === 'LaStoria' ? 'bg-white' : 'bg-black'
            } mx-1`}>
            <Text
              style={tw`text-md m-auto px-3 py-1.6 ${
                selectedCompany === 'LaStoria' ? 'text-black' : 'text-white'
              }`}>
              LaStoria
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedCompany('1SONiA')}
            style={tw`border rounded-2xl ${
              selectedCompany === '1SONiA' ? 'bg-white' : 'bg-black'
            } mx-1`}>
            <Text
              style={tw`text-md px-3 py-1.6 ${
                selectedCompany === '1SONiA' ? 'text-black' : 'text-white'
              }`}>
              1SONiA
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedCompany('TexnoStyle')}
            style={tw`border rounded-2xl ${
              selectedCompany === 'TexnoStyle' ? 'bg-white' : 'bg-black'
            } mx-1`}>
            <Text
              style={tw`text-md m-auto px-3 py-1.6 ${
                selectedCompany === 'TexnoStyle' ? 'text-black' : 'text-white'
              }`}>
              TexnoStyle
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddBalanceToUsers')}>
          <Text style={tw`text-green-600 text-lg mx-3 mt-1`}>Qo'shish</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        refreshing={refreshing}
        onRefresh={getUsersList}
        data={users}
        renderItem={({item, index}) => (
          <SwipeProvider>
            <SwipeItem
              style={tw`w-full h-15`}
              swipeContainerStyle={tw`justify-between flex-row items-center bg-white border-b border-[rgba(0,0,0,0.3)] px-1 mt-2`}
              leftButtons={leftButton(item?.comment)}
              rightButtons={rightButton(item?.id)}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-7 h-7 my-auto bg-[#D4D8D8] ml-2`}>
                  <Text style={tw`m-auto`}>{index + 1}</Text>
                </View>
                <Text style={tw`ml-3 font-500 text-[16px]`}>
                  {item?.user?.name}
                </Text>
              </View>
              {item?.reported_balance?.length > 0 ? (
                <TouchableOpacity
                  style={tw`mx-auto`}
                  onPress={() =>
                    navigation.navigate('ReportedBalancesList', {
                      balance_id: item?.id,
                    })
                  }>
                  <Image
                    source={require('../../../assets/notificationIcon.png')}
                    resizeMode="contain"
                    style={tw`w-6 h-6 m-auto`}
                  />

                  <Text
                    style={tw`absolute top-[-28%] right-[-12%] text-lg text-red-600`}>
                    {item?.reported_balance?.length}
                  </Text>
                </TouchableOpacity>
              ) : null}
              <Text style={tw`mx-auto`}>{item?.date_updated}</Text>
              <View>
                <Text style={tw`mr-1 text-red-600 text-base`}>
                  {item?.balance}
                </Text>
                <Text style={tw`mr-1 text-[#47B9EC] text-base`}>
                  {item?.left_balance}
                </Text>
              </View>

              {/* Modal for comment */}

              <Modal
                animationType="fade"
                transparent={true}
                visible={isCommentModalVisible}>
                <View style={tw`flex-1 bg-[rgba(0,0,0,0.3)]`}>
                  <View style={tw`w-10/12 h-50 bg-white m-auto rounded-lg`}>
                    <TouchableOpacity
                      style={tw`absolute right-[-3] top-[-3]`}
                      onPress={() => setIsCommentModalVisible(false)}>
                      <Image
                        source={require('../../../assets/x-button.png')}
                        resizeMode="contain"
                        style={tw`w-10 h-10 m-auto`}
                      />
                    </TouchableOpacity>
                    <Text
                      style={tw`m-auto`}
                      onPress={() => setIsCommentModalVisible(false)}>
                      {selectedComment}
                    </Text>
                  </View>
                </View>
              </Modal>
            </SwipeItem>
          </SwipeProvider>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default BalancedUsersList;
