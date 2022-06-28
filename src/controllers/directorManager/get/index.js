import {mainUrl} from '../../../config/apiUrl';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {useSelector} from 'react-redux';
// const {token, role} = useSelector(state => state.userReducer);

class directorGController {
  static getMagazineList = setMagazineList => {
    AsyncStorage.getItem('@magazineList')
      .then(data => {
        setMagazineList(JSON.parse(data));

        AsyncStorage.getItem('@user')
          .then(stringJson => {
            axios({
              url: `${mainUrl}lastoria/magazines/`,
              method: 'GET',
              headers: {
                Authorization: `token ${JSON.parse(stringJson).token}`,
              },
            })
              .then(res => {
                if (JSON.parse(data)?.length === res.data?.length) {
                  return;
                  // console.log('asyncstorage magazinelst bilan set qilinmadi');
                } else {
                  AsyncStorage.setItem(
                    '@magazineList',
                    JSON.stringify(res.data),
                  ).then(() => {
                    // console.log('magazineList asyncstorageda yangilandi');
                    setMagazineList(res.data);
                  });
                }
              })
              .catch(_err => {
                return;
                // console.error(err);
              });
          })
          .catch(_err => {
            return;
            // console.log(err);
          });
      })
      .catch(_err => {
        return;
        // console.log(err);
      });
  };

  static getSalonList = setSalonList => {
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: `${mainUrl}lastoria/salon/`,
          method: 'GET',
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            setSalonList(res.data);
          })
          .catch(_err => {
            return;
            // console.error(err);
          });
      })
      .catch(_err => {
        return;
        // console.log(err);
      });
  };

  static getCountDressNeedSend = setDostavkaCount => {
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: `${mainUrl}lastoria/orders-send-count/`,
          method: 'GET',
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            setDostavkaCount(res.data);
          })
          .catch(_err => {
            return;
            // console.error(err);
          });
      })
      .catch(_err => {
        return;
        // console.log(err);
      });
  };

  static getCountProduct = setProductCount => {
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: `${mainUrl}lastoria/product-count/`,
          method: 'GET',
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            setProductCount(res.data);
          })
          .catch(_err => {
            return;
            // console.error(err);
          });
      })
      .catch(_err => {
        return;
        // console.log(err);
      });
  };

  static getDressByMagazine = (magazineName, setDressList) => {
    let dataGetDress = {
      magazine_name: magazineName,
    };
    axios({
      url: `${mainUrl}vendor/getDressMag`,
      method: 'POST',
      data: dataGetDress,
    })
      .then(res => {
        // console.warn(res.data);
        // dressList berilmgan ekan. currentValue metodini ishalitb kordim. balki ishlar
        setDressList(currentValue => {
          if (res.data.length === currentValue.length) {
            return currentValue;
          } else {
            return res.data;
          }
        });
      })
      .catch(_err => {
        return;
        // console.error(err);
      });
  };

  static getBalance = async (setBalance, setQoldiq) => {
    const urlGetBalance = `${mainUrl}lastoria/balance/`;
    const balanceStorage = await AsyncStorage.getItem('@balance');
    const qoldiqStorage = await AsyncStorage.getItem('@left_balance');

    if (balanceStorage && qoldiqStorage) {
      setBalance(balanceStorage);
      setQoldiq(qoldiqStorage);

      axios(urlGetBalance)
        .then(async res => {
          if (
            Number(res.data.balance) === Number(balanceStorage) &&
            Number(res.data.left_balance) === Number(qoldiqStorage)
          ) {
            return;
            // console.log('storage bilan bazadagi balans va qoldiq teng ekan');
          } else {
            setQoldiq(res.data.left_balance);
            setBalance(res.data.balance);

            await AsyncStorage.setItem('@balance', String(res.data.balance));
            await AsyncStorage.setItem(
              '@left_balance',
              String(res.data.left_balance),
            );
          }
        })
        .catch(_err => {
          return;
          // console.error(err);
        });
    } else {
      axios(urlGetBalance)
        .then(async res => {
          setQoldiq(res.data.left_balance);
          setBalance(res.data.balance);

          await AsyncStorage.setItem('@balance', String(res.data.balance));
          await AsyncStorage.setItem(
            '@left_balance',
            String(res.data.left_balance),
          );
        })
        .catch(_err => {
          return;
          // console.error(err);
        });
    }
  };

  static getCosts = (setSerioList, isSerio) => {
    let keyForAsyncStorage = isSerio ? '@prochiList' : '@serioList';
    let urlGetCosts = isSerio
      ? `${mainUrl}lastoria/costs-serio/`
      : `${mainUrl}lastoria/costs-prochi/`;

    AsyncStorage.getItem('@user')
      .then(stringJson => {
        AsyncStorage.getItem(keyForAsyncStorage)
          .then(data => {
            if (data === null) {
              axios({
                url: urlGetCosts,
                method: 'GET',
                headers: {
                  Authorization: `token ${JSON.parse(stringJson).token}`,
                },
              })
                .then(res => {
                  setSerioList(res.data);
                  AsyncStorage.setItem(
                    keyForAsyncStorage,
                    JSON.stringify(res.data),
                  );
                })
                .catch(_err => {
                  return;
                  // console.error(err);
                });
            } else {
              setSerioList(JSON.parse(data));

              axios(urlGetCosts)
                .then(res => {
                  if (res.data.length !== JSON.parse(data).length) {
                    setSerioList(res.data);
                    AsyncStorage.setItem(
                      keyForAsyncStorage,
                      JSON.stringify(res.data),
                    );
                  } else {
                    // console.log('seriolist yoki prochilist length teng');
                  }
                })
                .catch(_err => {
                  return;
                  // console.error(err);
                });
            }
          })
          .catch(_err => {
            return;
            // console.error(_err);
          });
      })
      .catch(_err => {
        return;
        // console.error(err);
      });
  };

  static getAllProducts = (setAllProducts, setRefreshing) => {
    setRefreshing ? setRefreshing(true) : null;
    axios(`${mainUrl}lastoria/product/`)
      .then(res => {
        setAllProducts(res.data);
        setRefreshing ? setRefreshing(false) : null;
      })
      .catch(_err => {
        // console.error('server error   ', err);
        setRefreshing ? setRefreshing(false) : null;
      });
  };

  static getAllSales = (setSalonList, setRefreshing) => {
    setRefreshing ? setRefreshing(true) : null;
    axios({
      url: `${mainUrl}lastoria/need-send/`,
    })
      .then(res => {
        setSalonList(res.data);
        setRefreshing ? setRefreshing(false) : null;
        // const firstArr = ["2", "1"];

        // const secondArr = ["2", "1"];

        // var isEqual = function (value, other) {
        //   // Get the value type
        //   var type = Object.prototype.toString.call(value);

        //   // If the two objects are not the same type, return false
        //   if (type !== Object.prototype.toString.call(other)) return false;

        //   // If items are not an object or array, return false
        //   if (["[object Array]", "[object Object]"].indexOf(type) < 0)
        //     return false;

        //   // Compare the length of the length of the two items
        //   var valueLen =
        //     type === "[object Array]"
        //       ? value.length
        //       : Object.keys(value).length;
        //   var otherLen =
        //     type === "[object Array]"
        //       ? other.length
        //       : Object.keys(other).length;
        //   if (valueLen !== otherLen) return false;

        //   // Compare two items
        //   var compare = function (item1, item2) {
        //     // Get the object type
        //     var itemType = Object.prototype.toString.call(item1);

        //     // If an object or array, compare recursively
        //     if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
        //       if (!isEqual(item1, item2)) return false;
        //     }

        //     // Otherwise, do a simple comparison
        //     else {
        //       // If the two items are not the same type, return false
        //       if (itemType !== Object.prototype.toString.call(item2))
        //         return false;

        //       // Else if it's a function, convert to a string and compare
        //       // Otherwise, just compare
        //       if (itemType === "[object Function]") {
        //         if (item1.toString() !== item2.toString()) return false;
        //       } else {
        //         if (item1 !== item2) return false;
        //       }
        //     }
        //   };

        //   // Compare properties
        //   if (type === "[object Array]") {
        //     for (var i = 0; i < valueLen; i++) {
        //       if (compare(value[i], other[i]) === false) return false;
        //     }
        //   } else {
        //     for (var key in value) {
        //       if (value.hasOwnProperty(key)) {
        //         if (compare(value[key], other[key]) === false) return false;
        //       }
        //     }
        //   }

        //   // If nothing failed, return true
        //   return true;
        // };

        // console.log(isEqual(firstArr, secondArr));
      })
      .catch(_err => {
        // console.error('server error   ', err);
        setRefreshing ? setRefreshing(false) : null;
      });
  };

  static getCostsStatisticsByDate = (dateData, setResult) => {
    axios({
      url: `${mainUrl}lastoria/costs-date-filter/`,
      method: 'POST',
      data: dateData,
    })
      .then(res => {
        // console.log('costs-date-filter', res.data);
        setResult(res.data);
      })
      .catch(_err => {
        return;
        // console.error('server error   ', err);
      });
  };

  static getAllSalesForVendor = (
    setAllSalesForVendor,
    setRefreshing,
    refresh,
  ) => {
    refresh ? setRefreshing(true) : null;
    let urlGetAllSalesForVendor = `${mainUrl}lastoria/warehouse-order-views/`;
    axios({
      url: urlGetAllSalesForVendor,
      method: 'GET',
    })
      .then(res => {
        setAllSalesForVendor(res.data);
        refresh ? setRefreshing(false) : null;
      })
      .catch(_err => {
        // return;
        // console.error('server error   ', err);
        refresh ? setRefreshing(false) : null;
      });
  };
}

export default directorGController;
