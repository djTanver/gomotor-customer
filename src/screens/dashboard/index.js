import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { Alert,PermissionsAndroid,Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import DashBoardScreen from './dashBoardScreen';
import navigator, {cleanerNavigator} from '../../navigation/navigator';
import navigation from '../../utils/navigation';
import {categories} from './../../store/categories/services';
import {check_active_plans} from './../../store/cleaningPackage/services';
import authSelector from './../../store/auth/selector';
import { updateProfileData } from './../../store/profile/services';
import PushNotification from "react-native-push-notification";
import {setNewNotificationAction, setReadAction} from '../../store/cleaningPackage/slice'; 
import {get_user_orders} from '../../store/cleaningPackage/services';
import moment from 'moment';

import {
  updateProfileDataToken,
  subscribeTopicAction,
  unsubscribeTopicAction,
} from './../../store/auth/slice';
import { shouldUseActivityState } from 'react-native-screens';

export default () => {
  
  const userId = useSelector(authSelector.userId);

  const [categoies, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cleanLoading, setCleanLoading] = useState(false);

  
 

  

  useEffect(() => {
    getInitialData();
  }, []);


  


  // useEffect( async()=>{
  //   const getToken = async() =>{
  //       const token = await messaging().getToken();

  //       return token;
  //   }
  //   const fcm_token = await getToken();
  //   if(fcm_token){
  //     Alert.alert('Got token');
  //     updateFcmToken(fcm_token)
  //   }
  //   await messaging().getInitialNotification()
  //     .then(remoteMessage => {
  //       console.log("Trying to capture Notification details from Quit state", remoteMessage)
  //       if (remoteMessage && remoteMessage.data && remoteMessage.data.type) {
  //         console.log( 'Notification caused app to open from quit state:', remoteMessage);
  //         dispatch(setReadAction(remoteMessage.messageId))
  //       switch (remoteMessage.data.type) {
  //         case 'SUBSCRIPTION':
  //           navigation({path: navigator.packageDetail, params:{isCarAdded:''}});
  //           break;
  //         case 'WORK_HISTORY':
  //           navigation({path: cleanerNavigator.workHistory});
  //           break;
  //         default:
  //           navigation({path: navigator.dashBoard});
  //           break;
  //       }
  //     }
  //   });

  //   messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     let duplicate = false;

  //       localNotifications.map((item,index)=>{
  //         console.log(index+" local received and nowReceived", item.received.trim() === moment(new Date()).format("YYYY-MM-DD hh:mm A"))
  //         if(item.received.trim() === moment(new Date()).format("YYYY-MM-DD hh:mm A")){
  //           duplicate = true
  //           console.log("Notification matched in local storage")
  //         }
  //       });

  //       if (!duplicate) {
  //         dispatch(
  //           setNewNotificationAction({
  //             messageId: payload.messageId,
  //             title: payload.notification.title,
  //             message: payload.notification.body,
  //             data: payload.data,
  //             received: moment(new Date()).format('YYYY-MM-DD hh:mm A'),
  //             read: false,
  //           }),
  //         );
  //       } else {
  //         console.log('Duplicate Notification, not inserting to local storage');
  //       }

  //       console.log('Foreground Notification Received', payload);
  //       sendNotification(payload.notification.title, payload.notification.body, payload.data, payload.messageId)
  //   });

  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     Alert.alert('Message handled in the background!', remoteMessage);
  //     //console.log('Message handled in the background!', remoteMessage);
  //     let duplicate = false;

  //     localNotifications.map((item) => {
  //       if (item.messageId == remoteMessage.messageId) {
  //         duplicate = true;
  //         console.log('Notification matched in local storage');
  //       }
  //     });

  //     if (!duplicate) {
  //       dispatch(
  //         setNewNotificationAction({
  //           messageId: remoteMessage.messageId,
  //           title: remoteMessage.notification.title,
  //           message: remoteMessage.notification.body,
  //           data: remoteMessage.data,
  //           received: moment(new Date()).format('YYYY-MM-DD hh:mm A'),
  //           read: false,
  //         }),
  //       );
  //     } else {
  //       console.log('Duplicate Notification, not inserting to local storage');
  //     }
  //   });

  // },[]);

  // const sendNotification = (title, message, data, msgId) =>{
  //   console.log("here in send Notifications")
  //   PushNotification.localNotification({
  //     channelId: 'channel-id',
  //     title: title, // (optional)
  //     message: message, // (required)
  //     userInfo: { type: data.type, messageId: msgId}
  //   });
  // };

  // // const updateProfileFunction = (token) => {
  // //   const initData = {
  // //     firebasetoken: token,
  // //   };
  // //   dispatch(
  // //     updateProfileDataToken(token, userID, initData, updateProfileResult),
  // //   );
  // // };

  // const updateProfileResult = (token, result) => {
  //   console.log('main Stack token upload response', result);
  //   if (result) {
  //     let body = {
  //       registrationTokens: token,
  //       topic: 'Cleaner', //Admin, Customer, Cleaner, NCSP
  //     };
  //     dispatch(subscribeTopicAction(body, subscribeTopicResponse));
  //   }
  // };

  // const subscribeTopicResponse = (repsonse) => {
  //   console.log('Subscribe Topic response: ', repsonse);
  // };

  // const unSubscribeToken = (oldToken) => {
  //   let body = {
  //     token: oldToken,
  //     topic: 'Cleaner', //Admin, Customer, Cleaner, NCSP
  //   };
  //   dispatch(unsubscribeTopicAction(body, unsubscribeTopicResponse));
  // };

  // const unsubscribeTopicResponse = (repsonse) => {
  //   console.log('UnSubscribe Topic response: ', repsonse);
  // };

  // const updateFcmToken = async(token) =>{
  //   try {
  //     const body = { firebasetoken: token };
  //     const response = await updateProfileData(userId,body);
  //   } catch (error) {
  //    console.log(error);
  //   }
  // }

  const getInitialData = async () => {
    setLoading(true);
    try {
      const result = await categories();
      setLoading(false);
      if (result) {
        setCategories(result);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onAllServices = () => {
    navigation({path: navigator.allServicesSearch});
  };

  const onCleanPackage = async () => {
    try {

      
      
      if (userId) {
        setCleanLoading(true);

        const today = moment().add(1, 'days').format( 'YYYY-MM-DD' );
      const result = await get_user_orders(userId, today );
      setCleanLoading(false);
      if (result > 0) {
        navigation({path: navigator.packageDetail, params:{isCarAdded:''}});
      } else {
        navigation({path: navigator.selectAddress});
      }

        // const result = await check_active_plans(userId);

        // setCleanLoading(false);
        // if (result) {
        //   if (result.length > 0) {
        //     navigation({
        //       path: navigator.packageDetail,
        //       params: {isCarAdded: ''},
        //     });
        //   } else {
        //     navigation({path: navigator.selectAddress});
        //   }
        // }
      }
    } catch (error) {
      setCleanLoading(false);
      console.log('error: ', error);
    }
  };

  const onCategoryPress = (item) => {
    if (item.name.trim() == 'Hire Car Cleaner') {
      onServices(item);
    } else {
      onServices(item);
    }
  };
  const onServices = (item) => {
    navigation({path: navigator.selectServices, params: {item: item}});
  };

  return (
    <DashBoardScreen
      onAllServices={onAllServices}
      categoies={categoies}
      loading={loading}
      // onServices={( item ) =>onServices(item)}
      onCategoryPress={onCategoryPress}
      cleanLoading={cleanLoading}
      
    />
  );
};
