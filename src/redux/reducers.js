import {
  SET_IsLogIn,
  SET_MAGAZINE_ID,
  SET_Role,
  SET_Token,
  SET_UserId,
  SET_WS_VENDOR_MANAGER_SALE,
  // SET_WS_VENDOR_SALE,
} from './actions';
import {AsyncStorage} from 'react-native';

// import {w3cwebsocket as W3CWebSocket} from 'websocket';
// import {wsSaleUrl, wsTest} from '../config/apiUrl';

const isUserStorage = AsyncStorage.getItem('@user').then(value => {
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
});

const initialState = {
  isLogIn: isUserStorage ? true : false,
  role: '',
  token: '',
  userId: '',
  magazineId: '',
  wsVendorManagerSale: null,
  // wsVendorSale: null,
  // wsTest: new W3CWebSocket(wsTest),
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IsLogIn:
      return {
        ...state,
        isLogIn: action.payload,
      };
    case SET_Role:
      return {
        ...state,
        role: action.payload,
      };
    case SET_Token:
      return {
        ...state,
        token: action.payload,
      };
    case SET_UserId:
      return {
        ...state,
        userId: action.payload,
      };
    case SET_MAGAZINE_ID:
      return {
        ...state,
        magazineId: action.payload,
      };
    case SET_WS_VENDOR_MANAGER_SALE:
      return {
        ...state,
        wsVendorManagerSale: action.payload,
      };
    // case SET_WS_VENDOR_SALE:
    //   return {
    //     ...state,
    //     wsVendorSale: action.payload,
    //   };
    default:
      return state;
  }
}

export default userReducer;
