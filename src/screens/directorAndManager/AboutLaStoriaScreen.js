import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import tw from 'twrnc';
import ListMagazines from '../../components/director/ListMagazines';
import ListSalons from '../../components/director/ListSalons';

const {useEffect, useState} = React;
import {useNavigation} from '@react-navigation/native';

// importing controllers
import directorGController from '../../controllers/directorManager/get';

// importing modal components
import RegisterMagazineModal from './modals/RegisterMagazineModal';

const AboutLaStoriaScreen = () => {
  const navigation = useNavigation();
  const [magazineList, setMagazineList] = useState([]);
  const [salonList, setSalonList] = useState([]);
  const [dostavkaCount, setDostavkaCount] = useState('0');
  const [productCount, setProductCount] = useState('0');

  const [refreshing, setRefreshing] = useState(false);

  const getAllDataForThisPage = () => {
    setRefreshing(true);
    directorGController.getCountDressNeedSend(setDostavkaCount);
    directorGController.getCountProduct(setProductCount);

    setTimeout(async () => {
      directorGController.getSalonList(setSalonList);
      directorGController.getMagazineList(setMagazineList);
    }, 100);

    setRefreshing(false);
  };

  useEffect(() => {
    getAllDataForThisPage();
  }, []);

  return (
    <ScrollView
      style={tw`bg-white border-4`}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getAllDataForThisPage}
        />
      }>
      <Text style={tw`text-lg font-bold m-auto text-black`}>
        Ish haqida ma'lumotlar
      </Text>

      <View style={tw`w-full h-25 flex-row`}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            tw`w-26 h-22.5 bg-[#FEF6E1] rounded-3xl m-auto items-center justify-center`,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              shadowColor: '#000',
              shadowOpacity: 0.17,
              shadowRadius: 5,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              elevation: 5,
            },
          ]}>
          <Text style={tw`text-black`}>{magazineList?.length || 0}</Text>
          <Text style={tw`text-base font-semibold text-black`}>Do'konlar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SupplierStatisticsScreen')}
          style={[
            tw`w-26 h-22.5 bg-[#E3F3FF] rounded-3xl m-auto items-center justify-center`,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              shadowColor: '#000',
              shadowOpacity: 0.17,
              shadowRadius: 5,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              elevation: 5,
            },
          ]}>
          <Text style={tw`text-black`}>{dostavkaCount}</Text>
          <Text style={tw`text-base font-semibold text-black`}>Dostavka</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrdersListScreen')}
          style={[
            tw`w-26 h-22.5 bg-[#DDFFDA] rounded-3xl m-auto items-center justify-center`,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              shadowColor: '#000',
              shadowOpacity: 0.17,
              shadowRadius: 5,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              elevation: 5,
            },
          ]}>
          <Text style={tw`text-black`}>{productCount}</Text>
          <Text style={tw`text-base font-semibold text-black`}>Ombor</Text>
        </TouchableOpacity>
      </View>
      <View
        style={tw`flex-row border-b border-[rgba(0,0,0,0.5)] justify-between w-11/12 mx-auto mt-[3%] pb-[1.5%] items-end`}>
        <Text style={tw`font-semibold text-base text-black`}>
          Magazinlar ro'yhati
        </Text>
        <RegisterMagazineModal
          magazineList={magazineList}
          setMagazineList={setMagazineList}
        />
      </View>
      <ListMagazines magazineList={magazineList} />
      <View
        style={tw`flex-row border-b border-[rgba(0,0,0,0.5)] justify-between w-11/12 mx-auto`}>
        <Text
          style={tw`font-bold text-base`}
          onPress={() => {
            return;
          }}>
          Salonlar ro`yxati
        </Text>

        <Text style={tw`font-bold text-base`}>{salonList?.length || 0}</Text>
      </View>

      <View style={tw`h-[${Dimensions.get('screen').height / 8}px]`}>
        <ListSalons dataList={salonList} />
      </View>
    </ScrollView>
  );
};

export default AboutLaStoriaScreen;
