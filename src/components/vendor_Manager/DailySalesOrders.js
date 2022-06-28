/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  // Alert,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
// import axios from 'axios';
// import {useSelector} from 'react-redux';

import tw from 'twrnc';
import {mainUrl, wsSaleManager} from '../../config/apiUrl';

import LottieView from 'lottie-react-native';

import {w3cwebsocket as W3CWebSocket} from 'websocket';

const DailySalesOrders = () => {
  // const {wsVendorManagerSale} = useSelector(state => state.userReducer);
  const [simpleSales, setSimpleSales] = useState([]);
  const [saleFifty, setSaleFifty] = useState([]);
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [red, setRed] = useState(true);

  // const saleSocket = useMemo(() => {
  //   return new W3CWebSocket(wsSaleManager);
  // }, []);

  const saleSocket = useMemo(() => {
    return new W3CWebSocket(wsSaleManager);
  }, []);

  useEffect(() => {
    if (saleSocket) {
      // console.warn('salesocket => ', saleSocket);
      saleSocket.onmessage = e => {
        const data = JSON.parse(e.data);
        // console.warn('manager dailyscreen  =>', data);
        if (data?.type === 'all_sale') {
          setSimpleSales(data?.simple_sale);
          setSaleFifty(data?.sale_5050);
          setOrders(data?.orders);
        } else if (data?.type === 'saved_sale') {
          if (data.sale === '5050') {
            // console.warn('data 5050 =>', data);
            setSaleFifty([data?.data, ...saleFifty]);
          } else if (data?.sale === 'simple') {
            setSimpleSales([data?.data, ...simpleSales]);
          } else if (data?.sale === 'order') {
            setOrders([data?.data, ...orders]);
          }
        }
      };

      saleSocket.onerror = e => {
        console.error('Error: ' + e.data);
      };
      saleSocket.onclose = e => {
        console.warn('Closed: ' + e.data);
      };
    }
  }, [simpleSales, saleFifty, orders, saleSocket]);

  function choooseColor(item) {
    if (item.mortgage >= 0) {
      return '#E05C58';
    } else if (item.girl_name) {
      return '#67CEAF';
    } else {
      return '#468CE4';
    }
  }

  const Item = ({img, dress_name, user_name, salonchi_name, item, price}) => (
    <View
      style={[
        tw`w-[${Dimensions.get('screen').width / 1.35}px] h-45 ml-[${
          Dimensions.get('screen').width / 6.5
        }px] mr-[3px] mb-2 mt-[${
          Dimensions.get('screen').width / 14
        }px] bg-[${choooseColor(item)}] rounded-3xl`,
        {
          shadowColor: '#000',
          shadowOpacity: 0.6,
          shadowRadius: 3,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          elevation: 3,
        },
      ]}>
      <View
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.6,
          shadowRadius: 3,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          elevation: 3,
        }}>
        <Image
          source={{uri: mainUrl + 'media/' + img}}
          style={tw`w-[${
            Dimensions.get('screen').width / 3.3
          }px] h-46 absolute top-[-${
            Dimensions.get('screen').height / 40
          }px] left-[-${Dimensions.get('screen').width / 9}px] rounded-3xl`}
          resizeMode="cover"
        />
      </View>
      <View
        style={tw`flex-row my-1 items-center justify-end pr-[${
          Dimensions.get('screen').width / 15
        }px] w-9/12 h-[${Dimensions.get('screen').height / 25}px] self-end`}>
        <Text style={tw`text-white text-lg`}>Ko'ylak : </Text>
        <Text style={tw`text-lg text-white`}>{dress_name}</Text>
      </View>

      <View
        style={tw`flex-row my-1 items-center justify-end pr-[${
          Dimensions.get('screen').width / 20
        }px] w-6/12 h-[${Dimensions.get('screen').height / 25}px] self-end`}>
        <Text style={tw`text-white text-lg`}>Narxi : </Text>
        <Text style={tw`text-lg text-white`}>{price}</Text>
      </View>

      <View
        style={tw`flex-row my-1 items-center justify-end pr-[${
          Dimensions.get('screen').width / 15
        }px]`}>
        <Text style={tw`text-white text-lg`}>Salonchi : </Text>
        <Text style={tw`text-lg text-white`}>{salonchi_name}</Text>
      </View>

      <View
        style={tw`flex-row my-1 items-center justify-end pr-[${
          Dimensions.get('screen').width / 15
        }px]`}>
        <Text style={tw`text-white text-lg`}>Sotuvchi : </Text>
        <Text style={tw`text-lg text-white`}>{user_name}</Text>
      </View>
    </View>
  );

  const renderItem = ({item}) => {
    // console.error(item);
    return (
      <Item
        img={item?.dress?.img}
        dress_name={item?.dress?.name}
        salonchi_name={item?.salon?.user}
        user_name={item?.user?.name}
        price={item?.main_price}
        item={item}
      />
    );
  };

  function mapData() {
    return (
      <>
        {simpleSales?.length ? (
          <>
            <Text style={tw`text-2xl text-black ml-3 mt-3`}>Sotuvlar</Text>
            <View style={[tw`w-11/12 ml-3`, {borderWidth: 0.3}]} />
          </>
        ) : null}
        <FlatList
          data={simpleSales}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
        {saleFifty?.length ? (
          <>
            <Text style={tw`text-2xl text-black ml-3 mt-3`}>
              50/50 sotuvlar
            </Text>
            <View style={[tw`w-11/12 ml-3`, {borderWidth: 0.3}]} />
          </>
        ) : null}

        <FlatList
          data={saleFifty}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        {orders?.length ? (
          <>
            <Text style={tw`text-2xl text-black ml-3 mt-5`}>Buyurtmalar</Text>
            <View style={tw`border w-11/12 ml-3 border-[rgba(0,0,0,0.4)]`} />
          </>
        ) : null}

        <FlatList
          data={orders}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 bg-white`}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRed(true)}
        />
      }>
      {!simpleSales?.length && !saleFifty?.length && !orders?.length ? (
        <LottieView
          source={require('../../../assets/lottie/search.json')}
          style={[tw`w-full`, {aspectRatio: 1}]}
          autoPlay
          loop
        />
      ) : (
        mapData()
      )}
      <View style={tw`w-full h-5`} />
    </ScrollView>
  );
};

export default DailySalesOrders;
