import React,{useState,useEffect} from 'react';
import {Image, View, TouchableOpacity, Text,Platform,PermissionsAndroid} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector, useDispatch} from 'react-redux';
import navigator, {cleanerNavigator} from './navigator';
import SelectSubscription from '../screens/cleaner/subscription/initialSubscription';
import GIcon from '../components/GIcon';
import GText from '../components/GText';
import {fsize, fWeight, color, fAlign, radius, ffamily} from './../theme';
import Account from '../screens/profile/account';
import CleaningFlow from './cleaner/cleaningFlow';
import WorkHistory from '../screens/cleaner/workhistory';
import CustomerList from '../screens/cleaner/customers';
import Dashboard from '../screens/dashboard';
import authSelector from './../store/auth/selector';
import API_ENDPOINT from '../config/api';
import navigation from '../utils/navigation';
import {setAllReadAction} from '../store/cleaningPackage/slice';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';  
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
 

  return (
    <Tab.Navigator
      initialRouteName={navigator.dashBoard}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: color.blue_Light,
        },
        activeTintColor: color.blue,
        inactiveTintColor: color.black,
        keyboardHidesTabBar: true,
      }}>
      {TabData.map((data, index) => {
        return (
          <Tab.Screen
            key={index}
            name={data.routeName}
            component={data.component}
            options={{
              tabBarIcon: ({color = 'black'}) => (
                <GIcon
                  name={data.iconName}
                  type={data.iconType}
                  style={{color: color, fontSize: data.iconSize}}
                />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabStack;

const DashBoardStack = () => {
  const user = useSelector(authSelector.user);
  const dispatch = useDispatch();
  const localdata = useSelector((state) => state.cleanPackage);

  const notificationCount = () => {
    let count = 0;
    localdata.notifications.map((item) => {
      if (item.read == false) {
        count = count + 1;
      }
    });
    return count;
  };

  const [cityName,setCityName] = useState('');
  const [iscityName,setIsCityName]=useState(false);



  const getOneTimeLocation = () => {
    
    Geolocation.getCurrentPosition(
     
      (position) => {
  
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        Geocoder.init('AIzaSyClDjPX_2bzduWI0sIpppvcMkQB7ZhanKQ');
        Geocoder.from(currentLatitude,currentLongitude)
        .then(json => {
          
            const addressComponent = json.results[0].address_components[1].short_name;
            console.log('my json dta-----------------------',json.results[0]);
           setCityName(addressComponent);
           setIsCityName(true);
        })
        .catch(error =>
            console.warn(error)
        );


      },
      (error) => {
        console.log(error.message);
      },
      // {
      //   enableHighAccuracy: false,
      //   timeout: 10000,
      //   maximumAge: 1000
      // },
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
       
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           
            getOneTimeLocation();
           
          } else {
            console.log('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();   
  }, []);



  return (
    <Stack.Navigator initialRouteName={navigator.dashBoard}>
      <Stack.Screen
        name={navigator.dashBoard}
        component={Dashboard}
        options={{
          headerStyle: {
            elevation: 5,
          },
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/logo.png')}
                  style={{
                    height: 30,
                    width: 100,
                    borderRadius: 0,
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
              {/* <GText
                  fontSize={fsize.h6}
                  fontFamily={ffamily.semiBold}
                  style={{marginRight: 5}}>
                 {user && user.username ? user.username : ''}
                </GText> */} 

            {iscityName &&<View 
            
            style={{overflow:'hidden',flexDirection:'row',backgroundColor:color.blue_Light,borderRadius:5,padding:5,width:160,alignItems:'center',justifyContent:'center'}}>
            <GIcon
                      type="MaterialCommunityIcons"
                      name="map-marker"
                      size={15}
                      // color={color. blue_Light}
                      style={{
                        color: color.blue_Dark,
                        // fontSize: fsize.h1, 
                      
                      }}
                    />
              <Text numberOfLines={1} style={{color:color.gray}}>{cityName}</Text>
            </View>}


            </View>
          ),
          headerLeftContainerStyle: {marginLeft: 10},
          headerTitle: '',
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setAllReadAction());
                      navigation({path: navigator.notifications});
                    }}>
                    <GIcon
                      type="MaterialCommunityIcons"
                      name="bell"
                      size={30}
                      // color={color. blue_Light}
                      style={{
                        color: color.blue_Dark,
                        // fontSize: fsize.h1,
                        marginRight: 14,
                      }}
                    />
                    {notificationCount() != 0 ? (
                      <View
                        style={{
                          position: 'absolute',
                          left: '30%',
                          top: 5,
                          backgroundColor: 'red',
                          borderRadius: 100,
                          paddingHorizontal: 4,
                          paddingVertical: 1.5,
                        }}>
                        <Text style={{color: 'white', fontSize: 12}}>
                          {notificationCount()}
                        </Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                </View>
              {/* Removed profile logo from header as per feedback from client dated 05-05-21 */}
                {/* <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation({path: cleanerNavigator.account});
                    }}>
                    <Image
                      source={
                        user
                          ? user.photo
                            ? user.photo.url
                              ? {uri: API_ENDPOINT + user.photo.url}
                              : require('../assets/individual.png')
                            : require('../assets/individual.png')
                          : require('../assets/individual.png')
                      }
                      // source={require('../assets/individual.png')}
                      style={{height: 30, width: 30, borderRadius: 100}}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>
            );
          },
          headerRightContainerStyle: {marginRight: 10},
        }}
      />
    </Stack.Navigator>
  );
};

const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName={cleanerNavigator.account}>
      <Stack.Screen
        name={cleanerNavigator.account}
        component={Account}
        options={{
          headerStyle: {
            elevation: 5,
          },
          headerLeft: () => <GIcon type="arrow-back" color={color.black} />,
          headerTitle: 'Account',
          headerTitleStyle: {
            fontFamily: ffamily.semiBold,
            fontSize: fsize.h4,
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const WorkHistoryStack = () => {
  return (
    <Stack.Navigator initialRouteName={cleanerNavigator.workHistory}>
      <Stack.Screen
        name={cleanerNavigator.workHistory}
        component={WorkHistory}
        options={{
          headerStyle: {
            elevation: 5,
          },
          headerLeft: () => <GIcon type="arrow-back" color={color.black} />,
          headerTitle: 'Work history',
          headerTitleStyle: {
            fontFamily: ffamily.semiBold,
            fontSize: fsize.h4,
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const TabData = [
  {
    iconName: 'home',
    iconType: 'AntDesign',
    iconSize: 26,
    routeName: navigator.dashBoard,
    component: DashBoardStack,
  },
  // {
  //   iconName: 'view-quilt',
  //   iconSize: 26,
  //   routeName: cleanerNavigator.customerStack,
  //   component: CustomerStack,
  // },
  {
    iconName: 'swap-horiz',
    iconType: 'MaterialIcons',
    iconSize: 26,
    routeName: cleanerNavigator.workHistory,
    component: WorkHistoryStack,
  },
  {
    iconName: 'person-outline',
    iconType: 'MaterialIcons',
    iconSize: 26,
    routeName: cleanerNavigator.account,
    component: AccountStack,
  },
];
