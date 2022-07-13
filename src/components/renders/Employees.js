import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {memo} from 'react';

import tw from 'twrnc';

const getTodayDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  return yyyy + '-' + mm + '-' + dd;
};

const Employees = ({item, setIsNorm, setDateModalVisible, setEmployeeId}) => (
  <View
    style={tw`w-11/12 h-18 mx-auto my-2 rounded-lg ${
      item?.worker_date_work[0] &&
      item?.worker_date_work[0]?.work_date === getTodayDate()
        ? 'border-red-700'
        : null
    } ${
      item?.worker_date_work[0] &&
      item?.worker_date_work[0]?.work_date === getTodayDate()
        ? 'border-2'
        : 'border'
    } flex-row justify-between items-center px-1`}>
    <View>
      <Text style={tw`text-lg`}>{item?.first_name}</Text>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-lg`}>{item?.last_name}</Text>
        <Text style={tw`ml-2.5 text-xl text-blue-600`}>{item?.workedDays}</Text>
      </View>
    </View>
    <Text style={tw`text-lg m-auto absolute left-[55%]`}>
      {item?.role?.name}
    </Text>

    {/* <Text style={tw`text-lg m-auto absolute left-[75%]`}>
                  {item?.workedDays}
                </Text> */}

    <TouchableOpacity
      onPress={() => {
        setIsNorm(2);
        setDateModalVisible(true);
        setEmployeeId(item?.id);
      }}
      style={tw`my-auto absolute right-2`}>
      <Image
        style={tw`w-10 h-10`}
        source={require('../../../assets/minus.png')}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
);

export default memo(Employees);
