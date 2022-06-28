export const SET_IsLogIn = 'SET_IsLogIn';
export const SET_Role = 'SET_Role';
export const SET_Token = 'SET_Token';
export const SET_UserId = 'SET_UserId';
export const SET_MAGAZINE_ID = 'SET_MAGAZINE_ID';

// websocket
export const SET_WS_VENDOR_MANAGER_SALE = 'SET_WS_VENDOR_MANAGER_SALE';
// export const SET_WS_VENDOR_SALE = 'SET_WS_VENDOR_SALE';

export const setIsLogIn = isLogIn => dispatch => {
  dispatch({
    type: SET_IsLogIn,
    payload: isLogIn,
  });
};

export const setRole = role => dispatch => {
  dispatch({
    type: SET_Role,
    payload: role,
  });
};

export const setToken = token => dispatch => {
  dispatch({
    type: SET_Token,
    payload: token,
  });
};

// user id

export const setUserId = userId => dispatch => {
  dispatch({
    type: SET_UserId,
    payload: userId,
  });
};

export const setMagazineId = magazineId => dispatch => {
  dispatch({
    type: SET_MAGAZINE_ID,
    payload: magazineId,
  });
};

export const setWsVendorManagerSale = wsVendorManagerSale => dispatch => {
  dispatch({
    type: SET_WS_VENDOR_MANAGER_SALE,
    payload: wsVendorManagerSale,
  });
};

// export const setWsVendorSale = wsVendorSale => dispatch => {
//   dispatch({
//     type: SET_WS_VENDOR_SALE,
//     payload: wsVendorSale,
//   });
// };
