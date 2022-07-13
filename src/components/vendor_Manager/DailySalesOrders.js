/* eslint-disable react-native/no-inline-styles */
import {ScrollView, View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';

import tw from 'twrnc';
import {wsSaleManager} from '../../config/apiUrl';

import LottieView from 'lottie-react-native';

import {w3cwebsocket as W3CWebSocket} from 'websocket';
import DailySales from '../renders/DailySales';

const DailySalesOrders = () => {
  // const {wsVendorManagerSale} = useSelector(state => state.userReducer);
  const [simpleSales, setSimpleSales] = useState([]);
  const [saleFifty, setSaleFifty] = useState([]);
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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

  const renderItem = ({item}) => {
    // console.error(item);
    return (
      <DailySales
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
          // onRefresh={() => setRed(true)}
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
