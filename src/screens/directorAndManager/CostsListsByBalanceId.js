/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';

import {
  SwipeItem,
  SwipeButtonsContainer,
  SwipeProvider,
} from 'react-native-swipe-item';

const CostsListsByBalanceId = ({route, navigation}) => {
  const {balance_id} = route.params;
  const {token} = useSelector(state => state.userReducer);
  const [costsList, setCostsList] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [learnMoreModalVisible, setLearnMoreModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const getCostsList = async () => {
    setRefreshing(true);
    const resultCostsList = await axios.get(
      mainUrl + `dashboard/balance/cost/list/${balance_id}/`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );

    if (resultCostsList.status === 200) {
      setRefreshing(false);
      setCostsList(resultCostsList.data);
    } else {
      setRefreshing(false);
      Alert.alert('Error', 'Bazaga ulanishda xatolik yuz berdi');
    }
  };

  useEffect(() => {
    if (token) {
      getCostsList();
    }
  }, [token]);

  const leftButton = comment => {
    return (
      <SwipeButtonsContainer style={tw`mt-5`}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Удалить комментарий');
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
            Alert.alert(
              'Удалить запись',
              'Вы уверены, что хотите удалить запись?',
              [
                {
                  text: 'Отмена',
                  style: 'cancel',
                },
                {
                  text: 'Удалить',
                  onPress: () => {
                    Alert.alert('lohsan');
                  },
                },
              ],
              {cancelable: false},
            )
          }>
          <Image
            source={require('../../../assets/transfer.png')}
            resizeMode="contain"
            style={[
              tw`w-10 h-10 m-auto`,
              {
                transform: [{rotate: '90'}],
              },
            ]}
          />
        </TouchableOpacity>
      </SwipeButtonsContainer>
    );
  };

  const SelectedItemView = ({name, value}) => {
    return (
      <View style={tw`w-full h-9 border-b flex-row justify-between my-2 px-5`}>
        <Text style={tw`text-lg my-auto`}>{name}</Text>

        <Text style={tw`text-lg my-auto`}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        refreshing={refreshing}
        onRefresh={getCostsList}
        data={costsList}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              if (!item?.add_balance_uz && !item?.add_balance_us) {
                setLearnMoreModalVisible(true);
                setSelectedItem(item);
              }
            }}>
            <SwipeProvider>
              <SwipeItem
                style={tw`w-full h-15`}
                swipeContainerStyle={tw`justify-between flex-row items-center bg-white border-b border-[rgba(0,0,0,0.3)] px-1 mt-2`}
                leftButtons={leftButton(item?.comment)}
                //   rightButtons={rightButton(item?.id)}
              >
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-7 h-7 my-auto bg-[#D4D8D8] ml-2`}>
                    <Text style={tw`m-auto`}>{index + 1}</Text>
                  </View>
                  <Text style={tw`ml-3 font-500 text-[16px]`}>
                    {item?.add_balance_uz || item?.name}{' '}
                    {item?.add_balance_uz ? 'sum' : null}
                  </Text>
                  <Text style={tw`ml-3 font-500 text-[16px]`}>
                    {item?.add_balance_us || null}{' '}
                    {item?.add_balance_us ? '💵' : null}
                  </Text>
                </View>
                {item?.types === 'Add-balance' ? (
                  <Image
                    source={require('../../../assets/download.png')}
                    resizeMode="contain"
                    style={tw`w-10 h-10 m-auto`}
                  />
                ) : item?.types === 'Serio' || item?.types === 'Prochi' ? (
                  <Image
                    source={require('../../../assets/upload.png')}
                    resizeMode="contain"
                    style={tw`w-10 h-10 m-auto`}
                  />
                ) : item?.types === 'Update-balance' ? (
                  <Image
                    source={require('../../../assets/update.png')}
                    resizeMode="contain"
                    style={tw`w-10 h-10 m-auto`}
                  />
                ) : null}
                <Text style={tw`mx-auto`}>{item?.date_updated}</Text>

                {item?.types === 'Serio' || item?.types === 'Prochi' ? (
                  <>
                    <Text style={tw`mx-auto text-red-600`}>
                      {item?.price_uz} sum
                    </Text>
                    <Text style={tw`mx-auto text-red-600`}>
                      {item?.price_us} 💵
                    </Text>
                  </>
                ) : null}

                {/* Modal for learnMore */}

                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={learnMoreModalVisible}>
                  <SafeAreaView style={tw`flex-1 bg-[rgba(0,0,0,0.3)]`}>
                    <View style={tw`w-10/12 h-100 rounded-xl bg-white m-auto`}>
                      <TouchableOpacity
                        style={tw`absolute right-[-2%] top-[-5%]`}
                        onPress={() => setLearnMoreModalVisible(false)}>
                        <Image
                          source={require('../../../assets/x-button.png')}
                          resizeMode="contain"
                          style={tw`w-10 h-10 m-auto`}
                        />
                      </TouchableOpacity>

                      <Text style={tw`text-3xl mx-auto mt-3`}>
                        {selectedItem?.types}
                      </Text>

                      <SelectedItemView
                        name={'Nomi : '}
                        value={selectedItem?.name}
                      />

                      <SelectedItemView
                        name={'Soni : '}
                        value={selectedItem?.count}
                      />

                      <SelectedItemView
                        name={'Miqdori : '}
                        value={selectedItem?.amount}
                      />

                      <SelectedItemView
                        name={'Narxi : '}
                        value={`${selectedItem?.price_uz} sum ${selectedItem?.price_us} 💵`}
                      />

                      <Text style={tw`text-lg mx-auto`}>
                        Qo'shimcha ma'lumot
                      </Text>

                      <Text style={tw`text-lg mx-auto`}>
                        {selectedItem?.comment}
                      </Text>
                    </View>
                  </SafeAreaView>
                </Modal>
              </SwipeItem>
            </SwipeProvider>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CostsListsByBalanceId;
