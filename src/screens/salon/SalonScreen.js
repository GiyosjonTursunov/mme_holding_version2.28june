/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  SafeAreaView,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Pressable,
} from 'react-native';
import tw from 'twrnc';
import Header from '../../components/global/Header';
import axios from 'axios';

import {mainUrl, baseUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('screen');
const Item_width = width * 0.8;
const Item_height = Item_width * 1.2;

const SalonScreen = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [salon_name, setSalon_name] = useState('');
  const [news, setNews] = useState([]);
  const [saleSimple, setSaleSimple] = useState([]);
  const [saleFifty, setSaleFifty] = useState([]);
  const [saleOrders, setSaleOrders] = useState([]);
  const [saleStatistics, setSaleStatistics] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;

  const {token} = useSelector(state => state.userReducer);

  const getDatas = () => {
    setRefreshing(true);
    AsyncStorage.getItem('@user')
      .then(dataString => {
        setUserData(JSON.parse(dataString));
        setSalon_name(JSON.parse(dataString)?.salon_id[0]?.salon_name);
        axios({
          url: `${mainUrl}lastoria/salon/${
            JSON.parse(dataString)?.salon_id[0]?.id
          }/`,
          method: 'GET',
          headers: {
            Authorization: `token ${token}`,
          },
        })
          .then(saleRes => {
            setSaleStatistics([saleRes.data]);
            axios({
              url: `${mainUrl}lastoria/dress-news/`,
              method: 'GET',
              headers: {
                Authorization: `token ${token}`,
              },
            })
              .then(dressNewsRes => {
                setNews(dressNewsRes.data);
                axios({
                  url: `${mainUrl}lastoria/simple-sales/${
                    JSON.parse(dataString)?.salon_id[0]?.id
                  }/`,
                  method: 'GET',
                  headers: {
                    Authorization: `token ${token}`,
                  },
                })
                  .then(salesimpleRes => {
                    setSaleSimple(salesimpleRes.data);
                    axios({
                      url: `${mainUrl}lastoria/5050-sales/${
                        JSON.parse(dataString)?.salon_id[0]?.id
                      }/`,
                      method: 'GET',
                      headers: {
                        Authorization: `token ${token}`,
                      },
                    })
                      .then(saleFiftyRes => {
                        setSaleFifty(saleFiftyRes.data);
                        setRefreshing(false);
                        axios({
                          url: `${mainUrl}lastoria/user-orders/${
                            JSON.parse(dataString)?.salon_id[0]?.id
                          }/`,
                          method: 'GET',
                          headers: {
                            Authorization: `token ${token}`,
                          },
                        })
                          .then(saleOrdersRes => {
                            setSaleOrders(saleOrdersRes.data);
                            setRefreshing(false);
                            // console.warn('orders =>', saleOrdersRes.data);
                          })
                          .catch(_err => {
                            // console.log(err);
                            setRefreshing(false);
                          });
                      })
                      .catch(_err => {
                        // console.error(_err);
                        setRefreshing(false);
                      });
                  })
                  .catch(_err => {
                    // console.error(err);
                    setRefreshing(false);
                  });
              })
              .catch(_err => {
                // console.error(err);
                setRefreshing(false);
              });
          })
          .catch(_err => {
            // console.error(err);
            setRefreshing(false);
          });
      })
      .catch(_err => {
        // console.log(err);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getDatas();
  }, [token]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getDatas} />
        }>
        <Header headerName={'Salonchi'} isRegister={false} />
        <View style={tw`flex-row items-center h-30`}>
          <View style={tw`w-4/12 h-30`}>
            <Image
              style={tw`w-9/12 h-25 rounded-full m-auto border border-gray-300`}
              source={{uri: mainUrl + 'media/' + userData.img}}
            />
          </View>
          <View style={tw`w-7/12 h-20 justify-around`}>
            <Text style={tw`text-base text-[#595085] font-semibold`}>
              {userData?.name}
            </Text>
            <Text style={tw`text-base text-[#595085]`}>{salon_name}</Text>
            <Text style={tw`text-base text-black`}>+998 {userData.phone}</Text>
          </View>
        </View>

        <FlatList
          horizontal
          data={saleStatistics}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View
                key={item.id}
                style={tw`flex-row w-[${
                  Dimensions.get('screen').width
                }px] justify-around h-30 mb-5`}>
                <View
                  style={[
                    tw`w-[${
                      Dimensions.get('screen').width / 3.4
                    }px] h-25 m-auto rounded-xl`,
                    {
                      shadowColor: '#000',
                      shadowOpacity: 0.5,
                      shadowRadius: 3,
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      elevation: 3,
                      backgroundColor: '#F6F5FB',
                    },
                  ]}>
                  <Text
                    style={tw`font-semibold m-auto text-base text-[#61598B]`}>
                    Ko'ylak soni
                  </Text>
                  <Text style={tw`m-auto text-3xl`}>
                    {item.dress_count || 0}
                  </Text>
                </View>

                <View
                  style={[
                    tw`w-[${
                      Dimensions.get('screen').width / 3.4
                    }px] h-25 m-auto rounded-xl`,
                    {
                      shadowColor: '#000',
                      shadowOpacity: 0.5,
                      shadowRadius: 3,
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      elevation: 3,
                      backgroundColor: '#FFF4F4',
                    },
                  ]}>
                  <Text
                    style={tw`font-semibold m-auto text-base text-[#FF3726]`}>
                    Xarajatlar
                  </Text>
                  <Text style={tw`m-auto text-3xl text-[#FF3726]`}>
                    {item.total_price || 0}
                  </Text>
                </View>

                <View
                  style={[
                    tw`w-[${
                      Dimensions.get('screen').width / 3.4
                    }px] h-25 m-auto rounded-xl`,
                    {
                      shadowColor: '#000',
                      shadowOpacity: 0.5,
                      shadowRadius: 3,
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      elevation: 3,
                      backgroundColor: '#FFF4F4',
                    },
                  ]}>
                  <Text
                    style={tw`font-semibold m-auto text-base text-[#FF3726]`}>
                    Qarz
                  </Text>
                  <Text style={tw`m-auto text-3xl text-[#FF3726]`}>
                    {item.left_price || 0}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('LaStoriaNewsScreen')}
          style={tw`w-9/12 mx-auto h-13.5 flex-row justify-center items-center mb-3`}>
          <View
            style={[
              tw`w-7/12 h-18`,
              {
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                shadowColor: '#821F81',
                shadowOpacity: 0.5,
                shadowRadius: 2,
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                elevation: 3,
                backgroundColor: '#fff',
              },
            ]}>
            <Image
              source={require('../../../assets/Lastoria_logo_curves.png')}
              style={tw`w-20 h-full m-auto`}
              resizeMode={'contain'}
            />
          </View>
          <View
            style={[
              {
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                shadowColor: '#3D3270',
                shadowOpacity: 0.5,
                shadowRadius: 3,
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                elevation: 3,
              },
              tw`w-4.5/12 h-18 bg-[#3D3270]`,
            ]}>
            <Text style={tw`text-2xl font-bold m-auto text-white`}>NEWS</Text>
          </View>
        </TouchableOpacity>

        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={news}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-width * 0.7, 0, width * 0.7],
            });
            return (
              <View
                key={item.id}
                style={{width, justifyContent: 'center', alignItems: 'center'}}>
                <Pressable
                  onPress={() => {
                    return;
                  }}
                  style={{
                    borderRadius: 18,
                    shadowColor: '#000',
                    shadowOpacity: 0.5,
                    shadowRadius: 7,
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    elevation: 8,
                    paddingHorizontal: 12,
                    paddingTop: 10,
                    backgroundColor: '#fff',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      width: Item_width,
                      height: Item_height * 1.34,
                      overflow: 'hidden',
                      alignItems: 'center',
                      borderRadius: 14,
                    }}>
                    <Animated.Image
                      source={{uri: baseUrl + item.img}}
                      style={{
                        width: Item_width * 1.1,
                        height: Item_height,
                        resizeMode: 'cover',
                        transform: [{translateX}],
                      }}
                    />

                    <Animated.View
                      style={[
                        tw`mx-auto w-full mt-2 pl-3`,
                        {transform: [{translateX}]},
                      ]}>
                      <Text style={tw`text-xl text-black`}>
                        Ko'ylak: {item?.dress?.name}
                      </Text>
                      <Text
                        style={tw`text-lg font-semibold text-[rgba(0,0,0,0.7)]`}>
                        {item?.note}
                      </Text>
                      <View
                        style={tw`flex-row justify-between items-center mt-3 h-10`}>
                        <Text
                          style={tw`text-lg font-semibold text-[rgba(0,0,0,0.7)]`}>
                          {item?.date_created}
                        </Text>

                        <Image
                          source={require('../../../assets/openNew.png')}
                          style={tw`w-8 h-8`}
                          resizeMode="contain"
                        />
                      </View>
                    </Animated.View>
                  </View>
                </Pressable>
              </View>
            );
          }}
        />

        <Text
          style={tw`pl-[${
            Dimensions.get('screen').width / 15
          }px] text-xl font-semibold mt-8`}>
          Maxsulotlaringiz:
        </Text>

        <View style={tw`w-full h-45 flex-row`}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={saleSimple}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('DressById', {
                      saleId: item.id,
                      type: 'salon',
                    })
                  }
                  activeOpacity={0.8}
                  style={[
                    tw`w-55 h-41 m-auto pl-2 mr-5 ml-2 relative rounded-3xl rounded-tr-[35px]`,
                    {
                      shadowColor: '#000',
                      shadowOpacity: 0.5,
                      shadowRadius: 3,
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      elevation: 8,
                      backgroundColor: '#fff',
                    },
                  ]}>
                  <Image
                    source={{uri: mainUrl + 'media/' + item.dress?.img}}
                    style={tw`absolute w-18 h-18 rounded-full right-0 top-0`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-lg my-1`}>{item.dress?.name}</Text>

                  <View style={tw`flex-row my-1`}>
                    <Image
                      source={require('../../../assets/accountNewsSaler.png')}
                      style={tw`w-5 h-5 my-auto mr-2`}
                    />
                    <Text style={tw`text-lg`}>{item.user?.name}</Text>
                  </View>
                  <View style={tw`flex-row my-1`}>
                    <Image
                      source={require('../../../assets/calendarMinimal.png')}
                      style={tw`w-5 h-5 my-auto mr-2`}
                    />
                    <Text style={tw`text-lg`}>{item.date_created}</Text>
                  </View>
                  <View style={tw`flex-row my-1`}>
                    <Image
                      source={require('../../../assets/dress_price.png')}
                      style={tw`w-5 h-5 my-auto mr-2`}
                    />
                    <Text style={tw`text-lg`}>{item.main_price}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <Text
          style={tw`pl-[${
            Dimensions.get('screen').width / 15
          }px] text-xl font-semibold mt-3`}>
          50/50 sotuv:
        </Text>
        <View style={tw`w-full h-45 flex-row`}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={saleFifty}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('DressById', {
                      saleId: item.id,
                      type: 'salon',
                    })
                  }
                  activeOpacity={0.8}
                  style={[
                    tw`w-55 h-41 m-auto pl-2 mr-5 ml-2 relative rounded-3xl rounded-tr-[35px]`,
                    {
                      shadowColor: '#000',
                      shadowOpacity: 0.5,
                      shadowRadius: 3,
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      elevation: 8,
                      backgroundColor: '#fff',
                    },
                  ]}>
                  <Image
                    source={{uri: mainUrl + 'media/' + item.dress?.img}}
                    style={tw`absolute w-18 h-18 rounded-full right-0 top-0`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-lg my-1`}>{item.dress?.name}</Text>

                  <View style={tw`flex-row my-1`}>
                    <Image
                      source={require('../../../assets/accountNewsSaler.png')}
                      style={tw`w-5 h-5 my-auto mr-2`}
                    />
                    <Text style={tw`text-lg`}>{item.user?.name}</Text>
                  </View>
                  <View style={tw`flex-row my-1`}>
                    <Image
                      source={require('../../../assets/calendarMinimal.png')}
                      style={tw`w-5 h-5 my-auto mr-2`}
                    />
                    <Text style={tw`text-lg`}>{item.date_created}</Text>
                  </View>
                  <View style={tw`flex-row my-1`}>
                    <Image
                      source={require('../../../assets/dress_price.png')}
                      style={tw`w-5 h-5 my-auto mr-2`}
                    />
                    <Text style={tw`text-lg`}>{item.main_price}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <Text
          style={tw`pl-[${
            Dimensions.get('screen').width / 15
          }px] text-xl font-semibold mt-3`}>
          Buyurtmalar:
        </Text>
        <View style={tw`w-full h-45 flex-row`}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={saleFifty}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('DressById', {
                      saleId: item.id,
                      type: 'salon',
                    })
                  }
                  activeOpacity={0.8}
                  style={[
                    tw`w-55 h-41 m-auto pl-2 mr-5 ml-2 relative rounded-3xl rounded-tr-[35px]`,
                    {
                      shadowColor: '#000',
                      shadowOpacity: 0.5,
                      shadowRadius: 3,
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      elevation: 8,
                      backgroundColor: '#fff',
                    },
                  ]}>
                  <Image
                    source={{uri: mainUrl + 'media/' + item.dress?.img}}
                    style={tw`absolute w-18 h-18 rounded-full right-0 top-0`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-lg my-1`}>{item.dress?.name}</Text>

                  <View style={tw`flex-row my-1`}>
                    <Image
                      source={require('../../../assets/accountNewsSaler.png')}
                      style={tw`w-5 h-5 my-auto mr-2`}
                    />
                    <Text style={tw`text-lg`}>{item.user?.name}</Text>
                  </View>
                  <View style={tw`flex-row my-1`}>
                    <Image
                      source={require('../../../assets/calendarMinimal.png')}
                      style={tw`w-5 h-5 my-auto mr-2`}
                    />
                    <Text style={tw`text-lg`}>{item.date_created}</Text>
                  </View>
                  <View style={tw`flex-row my-1`}>
                    <Image
                      source={require('../../../assets/dress_price.png')}
                      style={tw`w-5 h-5 my-auto mr-2`}
                    />
                    <Text style={tw`text-lg`}>{item.main_price}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SalonScreen;
