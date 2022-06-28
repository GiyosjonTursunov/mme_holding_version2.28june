import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import tw from 'twrnc';
import Header from '../../components/global/Header';
import directorGController from '../../controllers/directorManager/get';
import {mainUrl} from '../../config/apiUrl';

const LaStoriaWareHouseScreen = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    directorGController.getAllProducts(setAllProducts, setRefreshing);
  }, []);

  const Item = ({name, count, amount, image}) => (
    <TouchableOpacity
      style={tw`w-10.5/12 h-15 border-b border-[rgba(0,0,0,0.2)] rounded-xl mx-auto my-[2%] justify-around items-center content-around mx-auto flex flex-row`}>
      {image.length > 1 ? (
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
      <View
        style={tw`flex-row mx-auto items-center justify-center border-l h-full pl-2 border-gray-300`}>
        <Text style={tw`mr-1`}>{count}</Text>
        <Text>{amount ? 'metr' : 'dona'}</Text>
      </View>
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
      <Header headerName={'Ombor'} />
      <View
        style={tw`w-10/12 flex-row mt-[1%] mx-auto justify-between items-center mb-5`}>
        <Text style={tw`text-base font-bold`}>Maxsulotlar:</Text>
        <Text style={tw`text-base font-bold`}>{allProducts.length || 0}</Text>
      </View>

      <FlatList
        data={allProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() =>
              directorGController.getAllProducts(setAllProducts, setRefreshing)
            }
          />
        }
      />
    </View>
  );
};

export default LaStoriaWareHouseScreen;
