import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  RefreshControl,
  Pressable,
  Alert,
  AsyncStorage,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';

const {useState, useEffect, useCallback} = React;
import {mainUrl} from '../../config/apiUrl';
import {ImagePickerModal} from '../../screens/directorAndManager/modals/image-picker-modal';

const AddProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProduct, setModalProduct] = useState(false);
  const [current, setCurrent] = useState('');
  const [product_name, setProduct_name] = useState('');
  const [product_id, setProduct_id] = useState('');
  const [product_price, setProduct_price] = useState('');
  const [product_count, setProduct_count] = useState('');
  const [note, setNote] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [wareHouseImgPickerResponse, setWareHouseImgPickerResponse] =
    useState(null);
  const [wareHouseRegisterModalVisible, setWareHouseRegisterModalVisible] =
    useState(false);
  const [nameImage, setNameImage] = useState('');
  const [uriImage, setUriImage] = useState('');
  const [typeImage, setTypeImage] = useState('');

  const formDataWareHouseProduct = new FormData();

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setWareHouseImgPickerResponse)
      .then(async image => {
        setNameImage(image.assets[0].fileName);
        setUriImage(image.assets[0].uri);
        setTypeImage(image.assets[0].type);
        setWareHouseRegisterModalVisible(false);
      })
      .catch(_err => {
        return;
      });
  }, []);

  const registerProduct = async () => {
    if (product_name && current) {
      formDataWareHouseProduct.append('name', product_name);
      formDataWareHouseProduct.append('amount', current);
      // 1 bolsa dona 2 bolsa kg 3 bolsa metr
      formDataWareHouseProduct.append('img', {
        uri: uriImage,
        type: typeImage,
        name: nameImage,
      });

      let url = `${mainUrl}lastoria/warehouse-product/`;
      let res = await fetch(url, {
        method: 'POST',
        body: formDataWareHouseProduct,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `token ${
            JSON.parse(await AsyncStorage.getItem('@user')).token
          }`,
        },
      });
      let responseJson = await res.json();
      if (responseJson) {
        // clear inputs
        // console.log(responseJson);
        setProduct_name('');
        setModalVisible(false);
        // console.error(res.status);
        if (res.status === 201) {
          Alert.alert("Maxsulot ro'yhatdan o'tdi");
        } else {
          Alert.alert('Ошибка при регистрации продукта');
        }
      } else {
        Alert.alert('Ошибка при регистрации продукта');
      }
    } else {
      Alert.alert("To'liq yozilmagan");
    }
  };

  const addProduct = () => {
    if (product_id && Number(product_price) && note && Number(product_count)) {
      let dataAddProduct = {
        count: product_count,
        note: note,
        product: product_id,
        price: product_price,
        isused: false,
      };

      AsyncStorage.getItem('@user')
        .then(stringJson => {
          axios({
            url: `${mainUrl}lastoria/warehouse/`,
            method: 'POST',
            data: dataAddProduct,
            headers: {
              Authorization: `token ${JSON.parse(stringJson).token}`,
            },
          })
            .then(res => {
              // console.warn(res.data);
              setProduct_count('');
              setProduct_price('');
              setNote('');
              if (res.status === 201) {
                Alert.alert("Maxsulot qo'shildi");
              } else {
                Alert.alert('Ошибка при добавлении продукта');
              }
            })
            .catch(_err => {
              return;
              // console.error(err);
            });
        })
        .catch(_err => {
          return;
        });
    } else {
      Alert.alert("Noto'g'ri kiritilgan");
    }
  };

  const getAllProducts = () => {
    setRefreshing(true);
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: `${mainUrl}lastoria/warehouse-product/`,
          method: 'GET',
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            // console.warn(res.data);
            setAllProducts(res.data);
            setRefreshing(false);
          })
          .catch(_err => {
            // console.warn(err);
            setRefreshing(false);
          });
      })
      .catch(_err => {
        return;
        // console.error(_err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const convertAmount = amount => {
    if (amount === 1) {
      return 'dona';
    } else if (amount === 2) {
      return 'kg';
    } else if (amount === 3) {
      return 'metr';
    }
  };

  const Item = ({name, count, amount, id, image}) => (
    <TouchableOpacity
      onPress={() => {
        setProduct_id(id);
        setProduct_name(name);
        setModalProduct(false);
      }}
      style={tw`w-11.5/12 h-15 border border-[rgba(0,0,0,0.5)] rounded-xl mx-auto mt-[1%] flex-row justify-center items-center`}>
      <View style={tw`w-15 h-full`}>
        {image ? (
          <Image
            source={{uri: mainUrl + image.substring(1)}}
            style={tw`w-13 h-13 rounded-md my-auto ml-2`}
          />
        ) : (
          <Image
            source={require('../../../assets/material.jpeg')}
            style={tw`w-13 h-13 my-auto ml-2`}
          />
        )}
      </View>
      <Text style={tw`w-5.5/12 text-base font-semibold ml-3`}>{name}</Text>
      <Text style={tw`w-2/12 text-base`}>{count}</Text>
      <Text style={tw`w-2/12`}>{convertAmount(amount)}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      name={item.name}
      count={item.count}
      amount={item.amount}
      id={item.id}
      image={item.img}
    />
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <View
        style={tw`w-11/12 h-11 mx-auto my-[1%] flex-row justify-between items-center`}>
        <TouchableOpacity
          onPress={() => setModalProduct(true)}
          style={tw`w-9/12 h-full border border-[rgba(0,0,0,0.5)] rounded-2xl mx-auto my-[1%] pl-2`}>
          <Text style={tw`my-auto text-[rgba(0,0,0,0.5)]`}>
            Maxsulot nomi:
            <Text style={tw`text-black text-base font-bold`}>
              {'  '}
              {product_name}
            </Text>
          </Text>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalProduct}
            onRequestClose={() => {
              setModalProduct(!modalVisible);
            }}>
            <View style={tw`flex-1 bg-[rgba(0,0,0,0.7)]`}>
              <View
                style={tw`m-auto w-10.5/12 h-100 border rounded-3xl bg-white justify-start pt-5`}>
                <Pressable
                  onPress={() => setModalProduct(false)}
                  style={tw`absolute top-[-12px] right-0`}>
                  <Image
                    source={require('../../../assets/x-button.png')}
                    style={tw`w-8 h-8`}
                  />
                </Pressable>
                <FlatList
                  data={allProducts}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={getAllProducts}
                    />
                  }
                />
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={tw`mr-[10%]`}>
          <Image
            source={require('../../../assets/plus.png')}
            style={tw`w-8 h-8`}
          />
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={tw`flex-1 bg-[rgba(0,0,0,0.7)]`}>
              <View
                style={tw`border m-auto bg-white flex-col w-10/12 h-90 justify-around items-start rounded-3xl relative`}>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={tw`absolute top-[-12px] right-0`}>
                  <Image
                    source={require('../../../assets/x-button.png')}
                    style={tw`w-8 h-8`}
                  />
                </Pressable>

                <TextInput
                  value={product_name}
                  onChangeText={setProduct_name}
                  placeholder="Maxsulot nomi"
                  style={tw`w-10/12 h-11 border border-[rgba(0,0,0,0.5)] rounded-md mx-auto pl-2`}
                />

                <TouchableOpacity
                  onPress={() => setWareHouseRegisterModalVisible(true)}
                  style={tw`border border-gray-500 w-10/12 h-11 mx-auto flex flex-row items-center rounded-md`}>
                  <View
                    style={tw`w-6/12 h-full border rounded-md rounded-tr-3xl rounded-br-3xl justify-center items-center bg-[#242424]`}>
                    <Text style={tw`text-white text-base`}>Rasm tanlang</Text>
                  </View>
                  <Text style={tw`ml-2`}>Rasm yulash</Text>
                </TouchableOpacity>

                <ImagePickerModal
                  isVisible={wareHouseRegisterModalVisible}
                  onClose={() => setWareHouseRegisterModalVisible(false)}
                  onImageLibraryPress={onImageLibraryPress}
                  onCameraPress={() => {
                    return;
                  }}
                />

                <View
                  style={tw`flex-row justify-around items-center mx-auto h-13`}>
                  <TouchableOpacity
                    onPress={() => setCurrent(3)}
                    // 1 bolsa dona 2 bolsa kg 3 bolsa metr
                    style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
                    <Text style={tw`m-auto`}>
                      Metr
                      {current === 3 && '✅'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setCurrent(1)}
                    style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
                    <Text style={tw`m-auto`}>
                      Dona
                      {current === 1 && '✅'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setCurrent(2)}
                    style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
                    <Text style={tw`m-auto`}>
                      Kg
                      {current === 2 && '✅'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={registerProduct}
                  style={tw`w-7/12 h-14 border rounded-full bg-black mx-auto my-2`}>
                  <Text style={tw`text-white text-lg font-bold m-auto`}>
                    Saqlash
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
      </View>
      <View style={tw`w-11/12 h-11 mx-auto my-[1%] flex-row justify-between`}>
        <TextInput
          value={product_count}
          onChangeText={setProduct_count}
          placeholder="Soni"
          style={tw`w-5/12 h-11 border border-[rgba(0,0,0,0.5)] rounded-2xl mx-auto my-[1%] pl-2`}
        />
        <TextInput
          value={product_price}
          onChangeText={setProduct_price}
          placeholder="Maxsulot narxi"
          style={tw`w-5/12 h-11 border border-[rgba(0,0,0,0.5)] rounded-2xl mx-auto my-[1%] pl-2`}
        />
      </View>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Qo'shimcha ma'lumotlar"
        multiline
        style={tw`w-10.3/12 h-25 rounded-3xl border border-[rgba(0,0,0,0.5)] mx-auto mt-[2%] p-3`}
      />
      <TouchableOpacity
        style={tw`w-6/12 h-15 bg-black mx-auto mt-5 rounded-full`}
        onPress={addProduct}>
        <Text style={tw`text-white font-semibold m-auto text-lg`}>Saqlash</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProduct;
