import React, {useEffect} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import navigation from '../utils/navigation';
import navigator, {authNavigator} from './navigator';
import GIcon from '../components/GIcon';
import GText from '../components/GText';
import TabStack from './tabStack';
import AuthStack from './authStack';
import CleanerStack from './cleanerStack';
import authSelector from '../store/auth/selector';
import {fsize, fWeight, color, fAlign, radius, ffamily} from './../theme';
import SelectCompany from '../screens/selectCar/selectCompany';
import SelectModel from '../screens/selectCar/selectModel';
import SelectFuelType from '../screens/selectCar/selectFuelType';
import AllServicesSearch from '../screens/services/allServicesSearch';
import SelectAddress from '../screens/subscribe/cleaningPackage/selectAddress';
import AddApartment from '../screens/subscribe/cleaningPackage/addApartment';
import SelectPackage from '../screens/subscribe/cleaningPackage/selectPackage';
import PaymentSucess from '../screens/subscribe/cleaningPackage/paymentSucess';
import ApartmentAddSucess from '../screens/subscribe/cleaningPackage/apartmentAddSucess';
import UpdateProfile from '../screens/profile/updateProfile';
import AddressDetail from '../screens/profile/addressDetails';
import PackageDetail from '../screens/profile/packageDetails';
import CleanerAndSuperVisor from '../screens/profile/cleanerAndSuperVisor';
import SelectServices from '../screens/services/selectServices';
import CreatedIssue from '../screens/cleaner/reportIssue/createdIssue';
import IssueList from '../screens/cleaner/reportIssue/issuelist';
import CreateIssue from '../screens/cleaner/reportIssue/createIssue';
import ReviewAndRatings from '../screens/cleaner/review-and-ratings/user-reviews';
import Notifications from '../screens/cleaner/notifications';
import SteamCarWash from '../screens/steamCarWash/steamCarWash'; 
import PrivacyPolicy from '../screens/cleaner/privacyPolicy';
import SteamCarSuccessScreen from '../screens/steamCarWash/steamCarSuccessScreen';
import ServiceProviderDetail from '../screens/serviceProviderDetail/serviceProviderDetail';

import {handleRouting} from '../utils/handleNotification';
import {localNotificationService} from '../utils/notification/LocalNotificationService'; 

import CartList from '../screens/profile/carList';
import EditCar from '../screens/profile/editCar';
import GoogleLocation from '../screens/profile/google-location';
import PaymentHistory from '../screens/profile/paymentHistory';
// import { updateProfileData } from './../../store/profile/services';
import Map from '../screens/map';
import CleanerListNonApartment from '../screens/subscribe/cleaningPackage/cleanerListNonApartment';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {
  updateProfileDataAction,
  subscribeTopicAction,
  unsubscribeTopicAction,
} from '../store/auth/slice';
import {
  setNewNotificationAction,
  clearAllNotificationAction,
  setReadAction,
} from '../store/cleaningPackage/slice';
import moment from 'moment';
const Stack = createStackNavigator();

const MainStack = () => {
  const isUser = useSelector(authSelector.isUser);
  const user = useSelector(authSelector.user);
  const userID = useSelector(authSelector.userId);
  const userRole = useSelector(authSelector.role);
  const dispatch = useDispatch();
  const localdata = useSelector((state) => state.cleanPackage);
  const localNotifications = localdata.notifications;
  console.log('localNotifications', localNotifications);

  useEffect(() => {
     
      const getToken= async () => {
       let token = await messaging().getToken();
        console.log('========================================token', token, user);
    
        // await messaging().onNotificationOpenedApp(remoteMessage => {
        //   console.log(
        //     'Notification caused app to open from background state:',
        //     remoteMessage,
        //   );
        // });
    
         messaging()
          .getInitialNotification()
          .then((remoteMessage) => {
            console.log(
              'Trying to capture Notification details from Quit state',
              remoteMessage,
            );
            if (remoteMessage && remoteMessage.data && remoteMessage.data.type) {
              console.log(
                'Notification caused app to open from quit state:',
                remoteMessage,
              );
              dispatch(setReadAction(remoteMessage.messageId));
              switch (remoteMessage.data.type.trim()) {
                case 'issueList':
                  console.log('going to issueList');
                  navigation({path: navigator.issueList});
                  break;
                case 'apartmentList':
                  console.log('going to apartmentList');
                  navigation({path: navigator.dashBoard});
                  break;
                default:
                  console.log('going to notifications');
                  navigation({path: navigator.dashBoard});
                  break;
              }
            }
          });
    
        // setNotification(await messaging().getInitialNotification((payload) => {
        //   console.log('App closed Notification received', payload);
        // }))
    
       // let notification1 = await messaging().onMessage((payload) => {
          messaging().onMessage((payload) => {
          let duplicate = false;
    
          localNotifications.map((item) => {
            console.log(payload);
            if (item.messageId == payload.messageId) {
              duplicate = true;
              
              console.log('Notification matched in local storage');
            }
            else{
              duplicate = false;
            }
          });
    
          // localNotifications.map((item, index) => {
          //   console.log(
          //     index + ' local received and nowReceived',
          //     item.received.trim() ===
          //       moment(new Date()).format('YYYY-MM-DD hh:mm A'),
          //   );
          //   if (
          //     item.received.trim() ===
          //     moment(new Date()).format('YYYY-MM-DD hh:mm A')
          //   ) {
          //     duplicate = true;
          //     console.log('Notification matched in local storage');
          //   }
          // });
    
          if (!duplicate) {
            dispatch(
              setNewNotificationAction({
                messageId: payload.messageId,
                title: payload.notification.title,
                message: payload.notification.body,
                data: payload.data,
                received: moment(new Date()).format('YYYY-MM-DD hh:mm A'),
                read: false,
              }),
            );
    
            console.log('Foreground Notification Received', payload);
            sendNotification(
              payload.notification.title,
              payload.notification.body,
              payload.data,
              payload.messageId,
            );
          } else {
            console.log('Duplicate Notification, not inserting to local storage');
          }
    
        
        });
    
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          console.log('Message handled in the background!', remoteMessage);
          let duplicate = false;
    
          localNotifications.map((item) => {
            if (item.messageId == remoteMessage.messageId) {
              duplicate = true;
              console.log('Notification matched in local storage');
            }
          });
    
          if (!duplicate) {
            dispatch(
              setNewNotificationAction({
                messageId: remoteMessage.messageId,
                title: remoteMessage.notification.title,
                message: remoteMessage.notification.body,
                data: remoteMessage.data,
                received: moment(new Date()).format('YYYY-MM-DD hh:mm A'),
                read: false,
              }),
            );
            sendNotification(
              payload.notification.title,
              payload.notification.body,
              payload.data,
              payload.messageId,
            );
          } else {
            console.log('Duplicate Notification, not inserting to local storage');
          }
        });
    
        // if (notification) {
        //   console.log("handle routing background in MainStack")
        //   handleRouting(notification);
        // }
    
        // if (notification1) {
        //   console.log("handle routing foreground")
        //   handleRouting(notification1);
        // }
    
        if (user.username) {
          if (!user.firebasetoken) {
            console.log('FirebaseToken is NULL, calling Subscribe API...');
            updateProfileFunction(token);
          } else {
            console.log('token not null');
          }
        }
    
        if (user.username) {
          if (user.firebasetoken) {
            if (user.firebasetoken.trim() !== token.trim()) {
              console.log(
                'checkTokens Boolean: ',
                user.firebasetoken.trim() == token.trim(),
              );
              console.log(
                'FirebaseToken mismatch: local : gen',
                user.firebasetoken,
                ' and ' + token,
              );
              console.log(
                'calling unsubscribe API and subscribe API for token mismatch.....',
              );
              unSubscribeToken(user.firebasetoken);
              updateProfileFunction(token);
            } else {
              console.log('token matches');
            }
          }
        }
      };
      if(isUser==true){
        getToken();
      }

  },[isUser]);

 

  const sendNotification = (title, message, data, msgId) => {
    console.log('here in send Notifications');
    PushNotification.localNotification({
      channelId: 'channel-id',
      title: title, // (optional)
      message: message, // (required)
      userInfo: {type: data.type, messageId: msgId},
    });
  };

  const updateProfileFunction = (token) => {
    const initData = {
      firebasetoken: token,
    };
    dispatch(
      updateProfileDataAction(token, userID, initData, updateProfileResult),
    );
  };

  const updateProfileResult = (token, result) => {
    console.log('main Stack token upload response', result);
    if (result) {
      let body = {
        registrationTokens: token,
        topic: 'Customer', //Admin, Customer, Cleaner, NCSP
      };
      dispatch(subscribeTopicAction(body, subscribeTopicResponse));
    }
  };

  const subscribeTopicResponse = (repsonse) => {
    console.log('Subscribe Topic response: ', repsonse);
  };

  const unSubscribeToken = (oldToken) => {
    
    let body = {
      token: oldToken,
      topic: 'Customer', //Admin, Customer, Cleaner, NCSP
    };
    if(oldToken)
      dispatch(unsubscribeTopicAction(body, unsubscribeTopicResponse));
  };

  const unsubscribeTopicResponse = (repsonse) => {
    console.log('UnSubscribe Topic response: ', repsonse);
  };

  try {
    console.log('im coming here =======>' + isUser);
    if (!isUser) {
      return (
        <Stack.Navigator
          initialRouteName={authNavigator.loginSendOtp}
          headerMode="none">
          <Stack.Screen
            name={authNavigator.loginSendOtp}
            component={AuthStack}
          />
        </Stack.Navigator>
      );
    } 
    else {
      return (
        <Stack.Navigator initialRouteName={navigator.dashBoard}>
          <Stack.Screen
            name={navigator.dashBoard}
            component={TabStack}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name={navigator.selectCompany}
            component={SelectCompany}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Add Car',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h5,
                color: color.blue,
              },
            }}
          />
          <Stack.Screen
            name={navigator.selectModel}
            component={SelectModel}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Add Car',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h5,
                color: color.blue,
              },
            }}
          />
          <Stack.Screen
            name={navigator.selectFuelType}
            component={SelectFuelType}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Add Car',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h5,
                color: color.blue,
              },
            }}
          />
          <Stack.Screen
            name={navigator.paymentHistory}
            component={PaymentHistory}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Payment History',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h5,
                color: color.black,
              },
            }}
          />
          <Stack.Screen
            name={navigator.allServicesSearch}
            component={AllServicesSearch}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'All Services',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h5,
              },
            }}
          />
          <Stack.Screen
            name={navigator.selectAddress}
            component={SelectAddress}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Hire a Cleaner',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h5
              },
            }}
          />
          <Stack.Screen
            name={navigator.selecPackage}
            component={SelectPackage}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Select Package',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h5,
              },
            }}
          />
          <Stack.Screen
            name={navigator.paymentSucess}
            component={PaymentSucess}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerLeft: () => {
                return (
                  <GText fontSize={fsize.h6} fontFamily={ffamily.semiBold}>
                    Hi, {isUser ? user.username : ''}
                  </GText>
                );
              },
              headerLeftContainerStyle: {marginLeft: 12},
              headerTitle: '',
              headerRight: () => (
                <TouchableOpacity>
                  <Image
                    source={require('../assets/individual.png')}
                    style={{height: 30, width: 30, borderRadius: 100}}
                  />
                </TouchableOpacity>
              ),
              headerRightContainerStyle: {marginRight: 10},
            }}
          />
          <Stack.Screen
            name={navigator.apartmentAddSucess}
            component={ApartmentAddSucess}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerLeft: () => {
                return (
                  <GText fontSize={fsize.h6} fontFamily={ffamily.semiBold}>
                    Hi, {isUser ? user.username : ''}
                  </GText>
                );
              },
              headerLeftContainerStyle: {marginLeft: 12},
              headerTitle: '',
              headerRight: () => (
                <TouchableOpacity>
                  <Image
                    source={require('../assets/individual.png')}
                    style={{height: 30, width: 30, borderRadius: 100}}
                  />
                </TouchableOpacity>
              ),
              headerRightContainerStyle: {marginRight: 10},
            }}
          />
          <Stack.Screen
            name={navigator.updateProfile}
            component={UpdateProfile}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Update Profile',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.addressDetail}
            component={AddressDetail}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Address details',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.packageDetail}
            component={PackageDetail}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Subscription details',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.cartList}
            component={CartList}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'My Cars',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.editCar}
            component={EditCar}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Car Details',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.googleLocation}
            component={GoogleLocation}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Search Location',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.addApartment}
            component={AddApartment}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Search Location',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.cleanerAndSuperVisor}
            component={CleanerAndSuperVisor}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Cleaner and Supervisor',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.selectServices}
            component={SelectServices}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Services',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.cleanerListNonApartment}
            component={CleanerListNonApartment}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Services Available',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.issueList}
            component={IssueList}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Your Issues',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.createdIssue}
            component={CreatedIssue}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Issues Details',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.createIssue}
            component={CreateIssue}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Report Issue',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.reviewAndRatings}
            component={ReviewAndRatings}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Reviews and Ratings',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />  
          <Stack.Screen
            name={navigator.privacyPolicy}
            component={PrivacyPolicy}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Privacy Policy',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          />
          <Stack.Screen
            name={navigator.notifications}
            component={Notifications}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Notifications',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
              headerRight: () => {
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {localdata.notifications.length > 0 ? (
                      <TouchableOpacity
                        onPress={() => dispatch(clearAllNotificationAction())}>
                        <GIcon
                          type="MaterialIcons"
                          name="clear-all"
                          size={30}
                          style={{marginRight: 10}}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                );
              },
              headerRightContainerStyle: {marginRight: 10},
            }}
          />

<Stack.Screen
            name={navigator.steamCarWash}
            component={SteamCarWash}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Steam Car Wash',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          /> 
          <Stack.Screen
            name={navigator.steamCarSuccessScreen}
            component={SteamCarSuccessScreen}
            options={{headerShown: false}}
          /> 
          <Stack.Screen
            name={navigator.serviceProviderDetail}
            component={ServiceProviderDetail}
            options={{
              headerStyle: {
                elevation: 5,
              },
              headerTitle: 'Service Provider Detial',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: ffamily.semiBold,
                fontSize: fsize.h6,
              },
            }}
          /> 

        </Stack.Navigator>
      );
    }
  } catch (error) {
    console.log('Error main stack error ==============>' + error.message);
  }
};

export default MainStack;
