import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  RefreshControl,
  PlatformColor,
} from 'react-native';
import {color} from '../../../theme';
import GCardNotification from '../../../components/GCardNotification';
import {useSelector, useDispatch} from 'react-redux';
import {deleteNotificationAction} from '../../../store/cleaningPackage/slice';
import navigation from '../../../utils/navigation';
import navigator, {cleanerNavigator} from '../../../navigation/navigator';

export default () => {
  const localdata = useSelector((state) => state.cleanPackage);
  console.log('Local Notifications Data', localdata.notifications);

  return (
    <View style={style.mainWrapper}>{apartment(localdata.notifications)}</View>
  );
};

const apartment = (notifications) => {
  let dispatch = useDispatch();

  const deleteNotification = (messageId) => {
    // console.log("messageid ", messageId)
    dispatch(deleteNotificationAction(messageId));
  };

  const navigateOpenNotification = (notification) => {
    if (notification.data.type) {
      switch (notification.data.type) {
        case 'issueList':
          navigation({path: navigator.issueList});
          break;
        case 'apartmentList':
          navigation({path: navigator.dashBoard});
          break;
          case 'dashboard':
            navigation({path: navigator.dashBoard});
            break;     
        default:
          navigation({path:navigator.dashBoard});
          break;
      }
    } else {
      console.log('Index.js notification data object is empty');
    }
  };

  return (
    <FlatList
      data={notifications}
      style={{marginVertical: 12, marginHorizontal: 12}}
      // keyExtractor={(item) => item.messageId}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              flex: 1,
              marginTop: 20,
              backgroundColor: 'White',
              alignSelf: 'center',
            }}>
            <Text>No Notifications Found</Text>
          </View>
        );
      }}
      renderItem={({item}) => {
        return (
          <GCardNotification
            image={require('../../../assets/ic_launcher.png')}
            centerTopText={item.title}
            centerMiddleText={item.message}
            type="FontAwesome"
            iconColor={color.blue}
            iconName="trash"
            onIconPress={() => deleteNotification(item.messageId)}
            read={item.read}
            onPress={() => navigateOpenNotification(item)}
          />
        );
      }}
    />
  );
};

const style = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: color.white,
  },
  itemMain: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
});
