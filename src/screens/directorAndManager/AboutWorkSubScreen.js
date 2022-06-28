/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {PieChart} from 'react-native-svg-charts';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';

const AboutWorkSubScreen = () => {
  const [companiesProfit, setCompaniesProfit] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {token} = useSelector(state => state.userReducer);

  const getCompaniesProfit = () => {
    setRefreshing(true);
    axios({
      url: `${mainUrl}dashboard/companies/statistics/money/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        setCompaniesProfit(res.data);
        setRefreshing(false);
      })
      .catch(_err => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getCompaniesProfit();
  }, [token]);

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getCompaniesProfit}
        />
      }>
      <View style={tw`mt-5`}>
        <PieChart
          style={{height: Dimensions.get('screen').height / 3}}
          data={companiesProfit}
        />
      </View>

      <View style={tw`mt-5`}>
        <FlatList
          horizontal
          data={companiesProfit}
          keyExtractor={item => item.key.toString()}
          renderItem={({item}) => (
            <View
              style={tw`mx-${
                Dimensions.get('screen').width / 45
              } flex-col items-center justify-center`}>
              <Text>{item.name}</Text>
              <View style={tw`w-8 h-8 rounded-full bg-[${item.svg?.fill}]`} />
              <Text>{item.value}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default AboutWorkSubScreen;
