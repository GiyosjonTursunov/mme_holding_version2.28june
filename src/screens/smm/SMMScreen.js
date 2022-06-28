/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Animated,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import tw from 'twrnc';
import axios from 'axios';
import {baseUrl, mainUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';
import Header from '../../components/global/Header';
import {useNavigation} from '@react-navigation/native';

const SMMScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {token} = useSelector(state => state.userReducer);
  const navigation = useNavigation();

  const [dressNews, setDressNews] = useState([]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const {width} = Dimensions.get('screen');
  const Item_width = width * 0.8;
  const Item_height = Item_width * 1.2;

  const getAds = () => {
    if (token) {
      axios({
        url: `${mainUrl}lastoria/dress-news/`,
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then(res => {
          setDressNews(res.data);
          // console.error('res.data =>', res.data);
        })
        .catch(_err => {
          return;
          // console.error('error =>', err);
        });
    }
  };

  useEffect(() => {
    getAds();
  }, [token]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header headerName={'Marketing'} />
      <ScrollView
        style={tw`flex-1 bg-white`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAds} />
        }>
        <View style={tw`w-full flex-row justify-between px-5 items-center`}>
          <Text style={tw`text-xl text-black font-semibold`}>
            Reklamadagi ko'ylaklar
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateAdScreen')}>
            <Image
              source={require('../../../assets/plus.png')}
              style={tw`w-10 h-10`}
            />
          </TouchableOpacity>
        </View>
        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={dressNews}
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
                      height: Item_height * 1.4,
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SMMScreen;
