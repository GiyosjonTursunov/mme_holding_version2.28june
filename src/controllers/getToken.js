import {AsyncStorage} from 'react-native';

class getToken {
  static token = async setUserJson => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      const ParsedJson = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserJson(ParsedJson);
    } catch (e) {
      // error reading value
      alert('error');
    }
  };
}

export default getToken;
