import React, {useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import tw from 'twrnc';

const DatePickerCustom = ({setNeedDate, func, text, secondFunc, workDate}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setOpen(true)}
      activeOpacity={0.8}
      style={tw`w-${
        workDate ? '8/12' : '6/12'
      } flex flex-row items-center border border-[rgba(0,0,0,0.7)] rounded-2xl h-10.5`}>
      <Text style={tw`m-auto text-${text ? 'black' : 'gray-500'} text-base`}>
        {text || '00/00/2022'}
      </Text>
      <View
        style={tw`bg-[#323054] h-full w-5/12 rounded-tr-2xl rounded-br-2xl items-center justify-center`}>
        <Image
          source={require('../../../assets/calendar.png')}
          resizeMode="contain"
          style={tw`w-7 h-7`}
        />
        <DatePicker
          mode="date"
          modal
          open={open}
          date={date}
          onConfirm={dateF => {
            setOpen(false);
            const year = dateF.getFullYear();
            const month = dateF.getMonth() + 1;
            const day = dateF.getDate();
            const validMonth = month < 10 ? `0${month}` : month;
            const validDay = day < 10 ? `0${day}` : day;
            const date_today = `${year}-${validMonth}-${validDay}`;
            setNeedDate(date_today);
            setDate(dateF);
            secondFunc ? secondFunc(date_today) : null;
            func ? func() : null;
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DatePickerCustom;
