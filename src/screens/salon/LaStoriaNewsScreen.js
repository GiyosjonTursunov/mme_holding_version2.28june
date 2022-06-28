import {
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import axios from 'axios';

import {mainUrl, baseUrl} from '../../config/apiUrl';

const LaStoriaNewsScreen = () => {
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = () => {
    setRefreshing(true);
    axios(`${mainUrl}lastoria/news/`)
      .then(res => {
        setNews(res.data);
        setRefreshing(false);
      })
      .catch(_err => {
        Alert.alert('Bazaga ulanishda xatolik yuz berdi!');
        setRefreshing(false);
        // console.log(err);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <SafeAreaView style={tw`bg-white`}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={news}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <>
              <View
                style={tw`w-full h-10 flex-row items-center justify-between px-3`}>
                <View style={tw`flex-row items-center`}>
                  <Image
                    source={require('../../../assets/adaptive-icon.png')}
                    style={tw`w-10 h-10`}
                  />
                  <Text style={tw`text-[#7F288E] font-bold text-base`}>
                    Lastoria
                  </Text>
                </View>

                <Text style={tw`text-[#7F288E] text-base`}>
                  {item.date_created}
                </Text>
              </View>

              <Pressable>
                <Image
                  source={{uri: baseUrl + item.img}}
                  style={tw`w-full h-100`}
                  resizeMode="cover"
                />
              </Pressable>

              <Text style={tw`text-base ml-3 my-1.5 font-semibold`}>
                {item.title}
              </Text>

              <Text style={tw`ml-4 mb-5`}>{item.text}</Text>
            </>
          );
        }}
        refreshControl={
          <RefreshControl onRefresh={fetchNews} refreshing={refreshing} />
        }
      />
    </SafeAreaView>
  );
};

export default LaStoriaNewsScreen;
