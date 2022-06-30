import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Image, ScrollView} from 'react-native';
import tw from 'twrnc';
import AboutShopSalonStatistics from '../../components/director/AboutShopSalonStatistics';
import Header from '../../components/global/Header';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';
import {PieChart} from 'react-native-svg-charts';
import {useSelector} from 'react-redux';

const AboutShopsScreen = ({route}) => {
  const [magazine, setMagazine] = useState([]);
  const data = [
    magazine?.saled_dresses,
    magazine?.given_price,
    magazine?.left_money,
  ];

  const randomColor = ['#0D2535', '#5388D8', '#F4BE37'];
  const {token} = useSelector(state => state.userReducer);

  const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor[index],
      },
      key: `pie-${index}`,
    }));

  useEffect(() => {
    axios({
      url: `${mainUrl}lastoria/magazines/${route.params?.id}/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        setMagazine(res.data);
      })
      .catch(_err => {
        // console.log(err);
      });
  }, [route.params.id, token]);

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <Header headerName={`${route.params?.name}`} />
      <View style={tw`w-8/12 h-20 mx-auto justify-center items-center`}>
        <Text style={tw`text-2xl font-bold`}>Jami daromad</Text>
        <Text style={tw`text-3xl font-semibold`}>{magazine?.money}</Text>
      </View>

      <AboutShopSalonStatistics
        name={"Sotilgan ko'ylaklar"}
        number={magazine?.saled_dresses}
        children={
          <Image
            source={require('../../../assets/saled_dresses.png')}
            style={tw`w-full h-full rounded-full`}
          />
        }
      />
      <AboutShopSalonStatistics
        name={'Berilgan pullar'}
        number={magazine?.given_price}
        children={
          <Image
            source={require('../../../assets/given_price.png')}
            style={tw`w-full h-full rounded-full`}
          />
        }
      />
      <AboutShopSalonStatistics
        name={'Beriladigan pullar'}
        number={magazine?.left_money}
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

export default AboutShopsScreen;
