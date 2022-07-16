/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  // ScrollView,
  Alert,
  FlatList,
  // RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import Header from '../../components/global/Header';
import DoubleBtn from '../../components/global/DoubleBtn';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const ReportScreen = () => {
  const [reportList, setReportList] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const {token} = useSelector(state => state.userReducer);

  const navigation = useNavigation();

  const getDailyReports = async () => {
    setRefreshing(true);
    axios({
      url: `${mainUrl}lastoria/orders-report-all/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        // console.warn(res.data);
        setRefreshing(false);
        setReportList(res.data);
      })
      .catch(_err => {
        // console.error('error', _err);
        setRefreshing(false);
        Alert.alert('Error', 'Something went wrong');
      });
  };

  useEffect(() => {
    getDailyReports();
  }, [token]);

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header headerName={'Otchet'} />

      <DoubleBtn firstBtnName={'Otchet berilgan'} secondBtnName={'Hammasi'} />

      <FlatList
        data={reportList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DailySalesStatisticsScreen', {
                report_id: item.id,
              })
            }
            style={tw`flex-row justify-between items-center p-3 border w-11.5/12 border-gray-500 mx-auto my-2`}>
            <View>
              <Text>Umumiy</Text>
              <Text style={tw`text-xl`}>{item.total_price}</Text>
            </View>

            <View>
              <Text>Sum</Text>
              <Text style={tw`text-xl`}>{item.sum}</Text>
            </View>

            <View>
              <Text>Dollar</Text>
              <Text style={tw`text-xl`}>{item.dollar}</Text>
            </View>

            <View>
              <Text>Sana</Text>
              <Text style={tw`text-xl`}>{item.date_created}</Text>
            </View>
          </TouchableOpacity>
        )}
        refreshing={refreshing}
        onRefresh={() => {
          getDailyReports();
        }}
      />
    </View>
  );
};

export default ReportScreen;
