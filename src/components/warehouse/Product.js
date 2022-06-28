/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {mainUrl} from '../../config/apiUrl';
import axios from 'axios';
import tw from 'twrnc';
import {useSelector} from 'react-redux';

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {token} = useSelector(state => state.userReducer);

  const getAllProducts = () => {
    setRefreshing(true);
    axios({
      url: `${mainUrl}lastoria/warehouse-product/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        // console.warn(res.data);
        setAllProducts(res.data);
        setRefreshing(false);
      })
      .catch(_err => {
        // console.warn(err);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    if (token) {
      getAllProducts();
    }
  }, [token]);

  const convertAmount = amount => {
    if (amount === 1) {
      return 'dona';
    } else if (amount === 2) {
      return 'kg';
    } else if (amount === 3) {
      return 'metr';
    }
  };

  const Item = ({name, count, amount, image}) => (
    <TouchableOpacity
      style={tw`w-10.5/12 h-16 border border-[rgba(0,0,0,0.5)] rounded-xl mx-auto my-[1.5%] flex-row justify-center items-center`}>
      {image ? (
        <Image
          source={{uri: mainUrl + image.substring(1)}}
          style={tw`w-13 h-13 rounded-md`}
        />
      ) : (
        <Image
          source={require('../../../assets/material.jpeg')}
          style={tw`w-10 h-10`}
        />
      )}
      <Text style={tw`w-5.5/12 text-base font-semibold ml-3`}>{name}</Text>
      <Text style={tw`w-2/12 text-base`}>{count}</Text>
      <Text style={tw`w-2/12`}>{convertAmount(amount)}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      name={item.name}
      count={item.count}
      amount={item.amount}
      image={item.img}
    />
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <View
        style={tw`w-11/12 h-15 border-b justify-between items-end flex-row mx-auto`}>
        <Text style={tw`font-semibold text-xl`}>Maxsulotlar</Text>
        <Text style={tw`font-semibold text-xl`}>{allProducts.length}</Text>
      </View>

      <FlatList
        data={allProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAllProducts} />
        }
      />
    </View>
  );
};

export default Product;
