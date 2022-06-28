import {mainUrl} from '../../../config/apiUrl';
import axios from 'axios';
import {AsyncStorage, Alert} from 'react-native';

class directorCController {
  static createMagazine = magazineName => {
    let dataMagazine = {
      magazine_name: magazineName,
    };
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: `${mainUrl}director/createMagazine`,
          method: 'POST',
          data: dataMagazine,
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            Alert.alert('Magazin yaratildi!');
          })
          .catch(_err => {
            return;
            // console.error(err);
          });
      })
      .catch(_err => {
        return;
        // console.warn('err createMagazine => ', err);
      });
  };

  static sendCostCreate = (
    dataCostsCreate,
    setQoldiq,
    left_balance,
    lastFunc,
  ) => {
    if (
      dataCostsCreate.name &&
      Number(dataCostsCreate.number) &&
      Number(dataCostsCreate.price) &&
      dataCostsCreate.note &&
      left_balance
    ) {
      if (Number(left_balance) - Number(dataCostsCreate.price) >= 0) {
        AsyncStorage.getItem('@user')
          .then(stringJson => {
            axios({
              url: `${mainUrl}lastoria/costs/`,
              method: 'POST',
              data: dataCostsCreate,
              headers: {
                Authorization: `token ${JSON.parse(stringJson).token}`,
              },
            })
              .then(async res => {
                setQoldiq(res.data.left_balance);
                await AsyncStorage.setItem(
                  '@left_balance',
                  String(res.data.left_balance),
                );
                Alert.alert('Ishlatildi');
                lastFunc ? lastFunc() : null;
              })
              .catch(_err => {
                // console.error(err);
                Alert.alert('To`liq yozilmagan ');
              });
          })
          .catch(_err => {
            return;
            // console.warn('err sendCostCreate => ', err);
          });
      } else {
        let kam = Number(left_balance) - Number(dataCostsCreate.price);
        Alert.alert(kam + ' kam');
      }
    } else {
      // console.error('To`liq yozilmagan ', dataCostsCreate);
      Alert.alert('To`liq yozilmagan yoki xato');
    }
  };

  static createUpdateBalance = (
    modalVisible,
    narxi,
    note,
    dataCreateUpdateBalance,
    setBalance,
    setQoldiq,
    setModalVisible,
  ) => {
    // console.warn(modalVisible, Number(narxi), note);
    if (modalVisible && Number(narxi) && note) {
      let urlCreateUpdateBalance = `${mainUrl}lastoria/balance-history/`;
      AsyncStorage.getItem('@user')
        .then(stringJson => {
          axios({
            url: urlCreateUpdateBalance,
            method: 'POST',
            data: dataCreateUpdateBalance,
            headers: {
              Authentication: `token ${JSON.parse(stringJson).token}`,
            },
          })
            .then(async res => {
              Alert.alert("Qo'shildi");
              setBalance(res.data.balance);
              setQoldiq(res.data.left_balance);
              setModalVisible(false);

              await AsyncStorage.setItem('@balance', String(res.data.balance));
              await AsyncStorage.setItem(
                '@left_balance',
                String(res.data.left_balance),
              );
            })
            .catch(_err => {
              Alert.alert('Server bilan hatolik yuz berdi…');
              // console.error(err);
            });
        })
        .catch(_err => {
          return;
          // console.warn('err createUpdateBalance => ', err);
        });
    } else {
      Alert.alert("To'liq yozilmagan");
    }
  };

  static createSalon = data_Salon => {
    let urlCreateSalon = `${mainUrl}vendor/createSalon`;

    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: urlCreateSalon,
          method: 'POST',
          data: data_Salon,
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            // console.log('Salon yaratildi!: =>', res.data);
            Alert.alert('Salon yaratildi');
          })
          .catch(_err => {
            Alert.alert(
              'Serverda xatolik yoki bu salon nomi allaqachon mavjud',
            );
            // console.log(err);
          });
      })
      .catch(_err => {
        return;
        // console.warn('err createSalon => ', err);
      });
  };
}

export default directorCController;
