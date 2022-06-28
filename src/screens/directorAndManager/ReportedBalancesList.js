/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';

const ReportedBalancesList = ({route}) => {
  const {balance_id} = route?.params;
  const [reportList, setReportList] = useState([]);

  const {token} = useSelector(state => state.userReducer);

  const getReportList = async () => {
    // url /dashboard/balance/reported/filter/is_checked/
    // /dashboard/balance/reported/list/{balance_id}/
    const reportResult = await axios.get(
      mainUrl + `dashboard/balance/reported/list/${balance_id}/`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );

    if (reportResult.status === 200) {
      //   console.warn('reportResult.data => ', reportResult.data);
      setReportList(reportResult.data);
    } else {
      Alert.alert('Error', 'Bazaga ulanishda xatolik yuz berdi');
    }
  };

  useEffect(() => {
    if (token) {
      getReportList();
    }
  }, [token]);

  //   convert '2022-06-28' date to like Aprl 1, 2020
  const convertDate = date => {
    const dateArr = date.split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];
    const monthArr = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthName = monthArr[month - 1];
    return `${monthName} ${day}, ${year}`;
  };

  const updateReport = async id => {
    const updateResult = await axios.put(
      mainUrl + `dashboard/balance/reported/is_checked/${id}/`,
      {},
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );

    if (updateResult.status === 200) {
      getReportList();
    } else {
      Alert.alert('Error', 'Bazaga ulanishda xatolik yuz berdi');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#E2E4E1]`}>
      <FlatList
        data={reportList}
        renderItem={({item}) => (
          <View style={tw`my-2`}>
            <View
              style={[
                tw`w-11.2/12 h-45 mx-auto rounded-tr-xl rounded-tl-xl flex-row border-t-2 border-${
                  item?.is_checked ? 'green-600' : '[#E89321]'
                }`,
                {
                  shadowColor: '#000',
                  shadowOpacity: 0.5,
                  shadowRadius: 3,
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  elevation: 3,
                  backgroundColor: 'white',
                },
              ]}>
              <View
                style={tw`absolute right-0 top-0 bg-${
                  item?.is_checked ? 'green-600' : '[#E89321]'
                } w-[28%] h-6 rounded-bl-xl rounded-tr-lg`}>
                <Text style={tw`text-white m-auto text-[17px]`}>
                  {item?.is_checked ? 'Ok' : 'Waiting'}
                </Text>
              </View>
              <Image
                source={{uri: mainUrl + 'media/' + item?.user?.img}}
                resizeMode="contain"
                style={tw`w-18 h-18 ml-[5%] mt-[7%] rounded-full`}
              />
              <View style={tw`my-auto mx-auto`}>
                <Text style={tw`text-xl font-semibold text-[#16183A]`}>
                  {item?.user?.name}
                </Text>

                <Text style={tw`text-lg font-semibold text-gray-600`}>
                  Role : {item?.user?.role}
                </Text>
                <Text style={tw`text-xl font-bold text-[#16183A] mt-2.5`}>
                  {convertDate(
                    item?.balance_history[0]?.date_created ||
                      item?.date_created,
                  )}
                  -{convertDate(item?.date_created)}
                </Text>
                <Text style={tw`text-base font-semibold text-gray-600`}>
                  {convertDate(item?.date_created)}
                </Text>
              </View>
            </View>

            <View
              style={tw`w-11.2/12 h-14 border-t-2 border-[rgba(0,0,0,0.4)] mx-auto flex-row bg-white rounded-br-xl rounded-bl-xl`}>
              <TouchableOpacity
                style={tw`w-6/12 border-r border-[rgba(0,0,0,0.4)]`}>
                <Image
                  source={require('../../../assets/read-more.png')}
                  resizeMode="contain"
                  style={tw`w-full h-11/12 m-auto`}
                />
              </TouchableOpacity>
              {item?.is_checked ? null : (
                <TouchableOpacity
                  onPress={() => updateReport(item?.id)}
                  style={tw`w-6/12 flex-row justify-center items-center border-l border-[rgba(0,0,0,0.4)]`}>
                  <Image
                    source={require('../../../assets/check-mark.png')}
                    resizeMode="contain"
                    style={tw`w-10 h-10 my-auto`}
                  />
                  <Text style={tw`text-green-600 text-xl`}>Ok</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ReportedBalancesList;
