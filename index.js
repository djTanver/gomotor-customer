/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification'
import navigation from './src/utils/navigation';
import navigator from './src/navigation/navigator'

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN Local Notification:", token);
    },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION index page:", notification);
  
      if(notification.userInteraction && notification.foreground){
        console.log("NOTIFICATION index userInteraction Foreground and type:", notification, notification.data.type);
        console.log("Read action msgId: ",notification.data.messageId)
        if(notification && notification.data && notification.data.type){
          switch (notification.data.type) {
            case 'issueList':
              navigation({path: navigator.issueList});
              break;
            case 'apartmentList':
              navigation({path: navigator.dashBoard});
              break;
            default:
              navigation({path:navigator.notifications});
              break;
          }
        }else{
          console.log("Index.js notification data object is empty")
        }
      }
  
      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
  
  PushNotification.createChannel(
    {
      channelId: "channel-id", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  
  PushNotification.getChannels(function (channel_ids) {
    console.log(channel_ids); // ['channel_id_1']
  });

AppRegistry.registerComponent(appName, () => App);
