import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import GText from '../../../components/GText';
import GIcon from '../../../components/GIcon';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import navigator from '../../../navigation/navigator';
import navigation from '../../../utils/navigation';
import {user_address} from '../../../store/address/service';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

export default ({user, route}) => {
  
  const [home, setHome] = useState({});
  const [work, setWork] = useState({});
  const [other, setOther] = useState({});
  const userId = user.id;
  // console.log('useruseruseruseruseruseruser', user.id);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const addressData = async () => {
        try {
          let res = await user_address(user.id);
          console.log('response', res);
          if (res && res.length > 0 && isActive) {
            res.map((item, index) => {
              if (item.address_type == 'home') {
                setHome(item);
              } else if (item.address_type == 'work') {
                setWork(item);
              } else if (item.address_type == 'other') {
                setOther(item);
              }
            });
          }
        } catch (err) {
          console.log('error', err);
          Toast.show(`Some error occurred ${err.message}`);
        }
      };

      addressData();
      return () => {
        isActive = false;
      };
    }, [userId]),
  );

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
            paddingHorizontal: 15,
          }}>
          <GText
            fontSize={fsize.h6}
            color={color.orange}
            fontFamily={ffamily.bold}>
            All Address Details
          </GText>
        </View>

        <View style={{marginHorizontal: 12, marginTop: 0}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 22,
            }}>
            <GText
              fontSize={fsize.h6}
              fontFamily={ffamily.bold}
              color={color.blue}>
              Home Address
            </GText>
            {Object.keys(home).length != 0&&route.params&&<TouchableOpacity
            style={{position:'relative',left:60}}
              onPress={() =>
                navigation({
                  path: navigator.steamCarWash,
                  params: {address:home.address+','+home.land_mark+','+ home.city+'-'+ home.pincode+', '
                  +home.state,location_id:home.id},
                })
              }>
              <GIcon
                name="verified"
                size={fsize.h1}
                color={color.gray}
                style={{padding: 4,}}
              />
            </TouchableOpacity>}
            <TouchableOpacity
              onPress={() =>
                navigation({
                  path: navigator.googleLocation,
                  params: {address: home, type: 'home', from: ''},
                })
              }>
              <GIcon
                name="my-location"
                size={fsize.h1}
                color={color.gray}
                style={{padding: 4}}
              />
            </TouchableOpacity>
          </View>
          {Object.keys(home).length == 0 ? (
            <GText
              color={color.gray}
              fontSize={fsize.p1}
              style={{
                marginTop: 2,
                paddingBottom: 12,
                borderBottomColor: color.gray_Light,
                borderBottomWidth: 1.6,
              }}>
              Address not added yet
            </GText>
          ) : (
            <GText
              color={color.gray}
              fontSize={fsize.p1}
              style={{
                marginTop: 2,
                paddingBottom: 12,
                borderBottomColor: color.gray_Light,
                borderBottomWidth: 1.6,
              }}>
              {home.address}, {home.land_mark}, {home.city} - {home.pincode},{' '}
              {home.state}
            </GText>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 22,
            }}>
            <GText
              fontSize={fsize.h6}
              fontFamily={ffamily.bold}
              color={color.blue}>
              Work Address
            </GText>
            {Object.keys(work).length != 0&&route.params&&<TouchableOpacity
            style={{position:'relative',left:60}}
              onPress={() =>{
                console.log('--------------addresss links------',work);
                navigation({
                  path: navigator.steamCarWash,
                  params: {address:work.address+','+work.land_mark+','+ work.city+'-'+ work.pincode+', '
                  +work.state,location_id:work.id},
                })
              }}>
              <GIcon
                name="verified"
                size={fsize.h1}
                color={color.gray}
                style={{padding: 4,}}
              />
            </TouchableOpacity>}
            <TouchableOpacity
              onPress={() =>
                navigation({
                  path: navigator.googleLocation,
                  params: {address: work, type: 'work', from: ''},
                })
              }>
              <GIcon
                name="my-location"
                size={fsize.h1}
                color={color.gray}
                style={{padding: 4}}
              />
            </TouchableOpacity>
          </View>
          {Object.keys(work).length == 0 ? (
            <GText
              color={color.gray}
              fontSize={fsize.p1}
              style={{
                marginTop: 2,
                paddingBottom: 12,
                borderBottomColor: color.gray_Light,
                borderBottomWidth: 1.6,
              }}>
              Address not added yet
            </GText>
          ) : (
            <GText
              color={color.gray}
              fontSize={fsize.p1}
              style={{
                marginTop: 2,
                paddingBottom: 12,
                borderBottomColor: color.gray_Light,
                borderBottomWidth: 1.6,
              }}>
              {work.address}, {work.land_mark}, {work.city} - {work.pincode},{' '}
              {work.state}
            </GText>
          )}

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 22,
            }}>
            <GText
              fontSize={fsize.h6}
              fontFamily={ffamily.bold}
              color={color.blue}>
              Other Address
            </GText>
            {Object.keys(other).length != 0&&route.params&&<TouchableOpacity
            style={{position:'relative',left:60}}
              onPress={() =>
                navigation({
                  path: navigator.steamCarWash,
                  params: {address: other.address+','+other.land_mark+','+ other.city+'-'+ other.pincode+', '
                  +other.state,location_id:other.id},
                })
              }>
              <GIcon
                name="verified"
                size={fsize.h1}
                color={color.gray}
                style={{padding: 4,}}
              />
            </TouchableOpacity>}
            <TouchableOpacity
              onPress={() =>
                navigation({
                  path: navigator.googleLocation,
                  params: {address: other, type: 'other', from: ''},
                })
              }>
              <GIcon
                name="my-location"
                size={fsize.h1}
                color={color.gray}
                style={{padding: 4}}
              />
            </TouchableOpacity>
          </View> */}
          {/* {Object.keys(other).length == 0 ? (
            <GText
              color={color.gray}
              fontSize={fsize.p1}
              style={{
                marginTop: 2,
                paddingBottom: 12,
                borderBottomColor: color.gray_Light,
                borderBottomWidth: 1.6,
              }}>
              Address not added yet
            </GText>
          ) : (
            <GText
              color={color.gray}
              fontSize={fsize.p1}
              style={{
                marginTop: 2,
                paddingBottom: 12,
                borderBottomColor: color.gray_Light,
                borderBottomWidth: 1.6,
              }}>
              {other.address}, {other.land_mark}, {other.city} - {other.pincode}
              , {other.state}
            </GText>
          )} */}
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
});
