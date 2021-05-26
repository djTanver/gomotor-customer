import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  AddressRouteData:null,
  notifications : []
};

const cleanPackage = createSlice({
    name:"cleanPackage",
    initialState:initialState,
    reducers:{
      setAddressRouteData: (state,action) =>{
          state.AddressRouteData = action.payload;
      },
      setNewNotification : (state, action) =>{
          // state.notifications = []
          state.notifications = [...state.notifications, action.payload]
      },
      deleteNotification : (state, action) =>{
          // console.log("Delete notification reducer payload ", action.payload)
          let tempArray = state.notifications.filter(notifications => notifications.messageId !== action.payload)
          state.notifications = tempArray
      },
      clearAllNotification : (state, action) =>{
          state.notifications = []
      },
      setAllRead : (state, action) =>{
          let tempArray = [...state.notifications]
          tempArray.map((item)=>{
            if(item.read == false){
              item.read = true
            }
          })
          state.notifications = tempArray
      },
      setRead : (state, action) =>{
          let indexMatched = -1
          let tempArray = [...state.notifications]
          tempArray.map((item,index)=>{
            if(item.messageId == action.payload){
              indexMatched = index
            }
          })
          if(indexMatched != -1){
            console.log("Index Matched ",indexMatched)
            tempArray[indexMatched].read = true
          }
          state.notifications = tempArray
        }
      }
});

export default cleanPackage;

export const { setAddressRouteData,setNewNotification, deleteNotification, clearAllNotification, setAllRead, setRead } = cleanPackage.actions;

export const setNewNotificationAction = (payload) => async (dispatch) => {
    try {
      dispatch(setNewNotification(payload));
    } catch (e) {
      return console.error(e.message);
    }
  };
  
  export const deleteNotificationAction = (payload) => async (dispatch) => {
    try {
      dispatch(deleteNotification(payload));
    } catch (e) {
      return console.error(e.message);
    }
  };
  
  export const clearAllNotificationAction = (payload) => async (dispatch) => {
    try {
      dispatch(clearAllNotification());
    } catch (e) {
      return console.error(e.message);
    }
  };
  
  export const setAllReadAction = (payload) => async (dispatch) => {
    try {
      dispatch(setAllRead());
    } catch (e) {
      return console.error(e.message);
    }
  };
  
  export const setReadAction = (payload) => async (dispatch) => {
    try {
      dispatch(setRead( payload));
    } catch (e) {
      return console.error(e.message);
    }
  };
