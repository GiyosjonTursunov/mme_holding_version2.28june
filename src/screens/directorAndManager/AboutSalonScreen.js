import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, Dimensions} from 'react-native';
import Header from '../../components/global/Header';
import AboutShopSalonStatistics from '../../components/director/AboutShopSalonStatistics';
import tw from 'twrnc';
import axios from 'axios';
import {PieChart} from 'react-native-svg-charts';

import {mainUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';

const AboutSalonScreen = ({route}) => {
  const [salon, setSalon] = useState({});
  const {token} = useSelector(state => state.userReducer);

  useEffect(() => {
    axios({
      url: `${mainUrl}lastoria/salon/${route.params?.id}/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        setSalon(res.data);
      })
      .catch(_err => {
        return;
      });
  }, [route.params?.id, token]);

  const data = [salon?.dress_count, salon?.given_price, salon?.left_price];

  const randomColor = ['#0D2535', '#5388D8', '#F4BE37'];

  const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor[index],
      },
      key: `pie-${index}`,
    }));

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <Header headerName={'Salon mijoz'} />
      <Text style={tw`text-2xl font-bold mx-auto my-1`}>
        {route.params?.name}
      </Text>
      <View style={tw`w-8/12 h-18 mx-auto justify-center items-center`}>
        <Text style={tw`text-base`}>Jami daromad</Text>
        <Text style={tw`text-3xl font-bold`}>{salon.total_price} sum</Text>
      </View>

      <AboutShopSalonStatistics
        name={"Olingan ko'ylaklar"}
        number={salon.dress_count}
        children={
          <Image
            source={require('../../../assets/saled_dresses.png')}
            style={tw`w-full h-full rounded-full`}
          />
        }
      />

      <AboutShopSalonStatistics
        name={'Berilgan pullar'}
        number={salon.given_price}
        children={
          <Image
            source={require('../../../assets/given_price.png')}
            style={tw`w-full h-full rounded-full`}
          />
        }
      />

      <AboutShopSalonStatistics
        name={'Beriladigan pullar'}
        number={salon.left_price}
        children={
          <Image
            source={require('../../../assets/left_price.png')}
            style={tw`w-full h-full rounded-full`}
          />
        }
      />

      <View style={tw`my-5`}>
        <PieChart
          style={{height: Dimensions.get('screen').height / 3}}
          data={pieData}
        />

        <View style={tw`flex-row w-full mx-auto mt-5`}>
          <View style={tw`mx-auto flex-row justify-around items-center w-5/12`}>
            <View style={tw`w-4 h-4 bg-[${randomColor[0]}] rounded-full`} />
            <View>
              <Text>Sotilgan koylaklar</Text>
            </View>
          </View>

          <View style={tw`mx-auto flex-row justify-around items-center w-5/12`}>
            <View style={tw`w-4 h-4 bg-[${randomColor[1]}] rounded-full`} />
            <View>
              <Text>Berilgan pullar</Text>
            </View>
          </View>
        </View>
        <View
          style={tw`mx-auto flex-row justify-around items-center w-5/12 mt-2`}>
          <View style={tw`w-4 h-4 bg-[${randomColor[2]}] rounded-full`} />
          <View>
            <Text>Beriladigan pullar</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutSalonScreen;
