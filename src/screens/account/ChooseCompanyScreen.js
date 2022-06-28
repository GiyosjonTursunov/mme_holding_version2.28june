/* eslint-disable react-native/no-inline-styles */
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const ChooseCompanyScreen = ({navigation}) => {
  return (
    <SafeAreaView style={tw`bg-white flex-1 bg-[#0C85DD]`}>
      <Text style={tw`mx-auto font-semibold text-3xl my-5 text-white`}>
        Hamkoringizni tanlang
      </Text>

      <View
        style={tw`w-full h-full rounded-tr-3xl rounded-tl-3xl pt-10 flex-row flex-wrap justify-around items-center bg-[#E4F3FB]`}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('LoginScreen', {key: '1Sonia'})}
          style={[
            tw`w-4.7/12 h-30 my-2 rounded-3xl bg-white border-b-2 border-[#00B6E4]`,
            {
              shadowColor: '#00B6E4',
              shadowOpacity: 0.5,
              shadowRadius: 3,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              elevation: 8,
            },
          ]}>
          <Image
            source={require('../../../assets/logo-1sonia.png')}
            style={tw`w-10/12 h-10/12 m-auto`}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('LoginScreen', {key: 'LaStoria'})}
          style={[
            tw`w-4.7/12 h-30 my-2 rounded-3xl bg-white border-b-2 border-[#821F81]`,
            {
              shadowColor: '#821F81',
              shadowOpacity: 0.5,
              shadowRadius: 3,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              elevation: 8,
            },
          ]}>
          <Image
            source={require('../../../assets/Lastoria_logo_curves.png')}
            style={tw`w-8/12 h-8/12 m-auto`}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('LoginScreen', {key: 'TexnoStyle'})
          }
          style={[
            tw`w-4.7/12 h-30 my-2 rounded-3xl bg-white border-b-2 border-[#D70000]`,
            {
              shadowColor: '#D70000',
              shadowOpacity: 0.5,
              shadowRadius: 3,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              elevation: 8,
            },
          ]}>
          <Image
            source={require('../../../assets/texnologo.png')}
            style={tw`w-10/12 h-10/12 m-auto`}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChooseCompanyScreen;
