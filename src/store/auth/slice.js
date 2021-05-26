import {createSlice} from '@reduxjs/toolkit';
import {updateProfileData, unSubscribeTopic, subscribeTopic} from './services';

const initialState = {
  user: {},
  token: null,
  isUser: false,
  fcmToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isUser = true;
    },
    clearUser: (state, payload) => {
      state.isUser = false;
      state.user = undefined;
      state.token = '';
      state.fcmToken = '';
    },
    setFcmToken: (state, action) => {
      state.user.fcmToken = action.payload.fcmToken;
    },
    setupdatedUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default authSlice;

export const {
  setUser,
  clearUser,
  setFcmToken,
  setupdatedUser,
} = authSlice.actions;

export const updateProfileDataAction = (
  token,
  id,
  payload,
  resultData,
) => async (dispatch) => {
  try {
    const response = await updateProfileData(id, payload);

    dispatch(setFcmToken(response.firebasetoken));
    dispatch(setupdatedUser(response));
    resultData(token, response);
  } catch (e) {
    return console.error(e.message);
  }
};

export const subscribeTopicAction = (payload, resultData) => async (
  dispatch,
) => {
  try {
    const response = await subscribeTopic(payload);
    resultData(response);
  } catch (e) {
    console.log('subscribeTopicAction -----------', e);
    resultData('error');
    return console.error(e.message);
  }
};

export const unsubscribeTopicAction = (payload, resultData) => async (
  dispatch,
) => {
  try {
    const response = await unSubscribeTopic(payload);
    // dispatch(UpdateSuccess(response));
    resultData(response);
  } catch (e) {
    console.log('unsubscribeTopicAction -----------', e);
    // resultData('error');
    // return console.error(e.message);
    //const json = resultData(e);
    //const obj = JSON.parse(json);
   // return console.error(e.message);
  }
};
