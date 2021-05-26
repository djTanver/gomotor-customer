import React, {useEffect, useState} from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
  Dimensions,
  Button,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import GButton from '../../../../components/GButton';
import GText from '../../../../components/GText';
import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from '../../../../theme';
import navigator from '../../../../navigation/navigator';
import navigation from '../../../../utils/navigation';
import Helper from '../../../../providers/helper-service';
import {environment} from '../../../../../enviornment';

export default (props) => {
  const {parsedDetails, parseData, saveApartment} = props;

  const [currentLocation, setCurrentLocation] = useState({
    latitude: -33.8567844,
    longitude: 151.2152967,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        {/* <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={currentLocation}></MapView> */}
      </View>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          parseData(details);
        }}
        query={{
      //  key: 'AIzaSyBdfxwAWQXGzVd4TfT83rILYzvgeoSIjQs',
      key: 'AIzaSyClDjPX_2bzduWI0sIpppvcMkQB7ZhanKQ',
          language: 'en',
        }}
        styles={{
          textInputContainer: {
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginHorizontal: 20,
          },
          listView: {
            borderRadius: 5,
            marginHorizontal: 20,
          },
        }}
      />
      {parsedDetails && (
        <View
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: 'white',
            paddingVertical: 10,
          }}>
          <View style={{marginHorizontal: 20}}>
            <GText
              fontFamily={ffamily.bold}
              style={{marginTop: 12}}
              fontSize={fsize.h6}
              textAlign={fAlign.center}>
              Selected Apartment details
            </GText>
            <GText
              fontSize={fsize.h6}
              style={{
                borderBottomColor: color.gray_Light,
                borderBottomWidth: 1,
                paddingLeft: 14,
                marginTop: 10,
                borderRadius: radius.default,
                marginTop: 12,
              }}>
              {parsedDetails.address}
            </GText>
            <GText
              fontSize={fsize.h6}
              style={{
                borderBottomColor: color.gray_Light,
                borderBottomWidth: 1,
                paddingLeft: 14,
                marginTop: 10,
                borderRadius: radius.default,
                marginTop: 12,
              }}>
              {parsedDetails.city} {parsedDetails.postal_code}
            </GText>
            {/* <TextInput
            placeholder={parsedDetails.address}
            value={parsedDetails.address}
            style={{
              borderBottomColor: color.gray_Light,
              borderBottomWidth: 1,
              paddingLeft: 14,
              marginTop: 10,
              borderRadius: radius.default,
            }}
          />

          <TextInput
             placeholder={parsedDetails.city}
             value={parsedDetails.city}
            style={{
              borderBottomColor: color.gray_Light,
              borderBottomWidth: 1,
              paddingLeft: 14,
              marginTop: 10,
              borderRadius: radius.default,
              color:"black"
            }}
          />

          <TextInput
            placeholder={parsedDetails.state}
            value={parsedDetails.state}
            style={{
              borderBottomColor: color.gray_Light,
              borderBottomWidth: 1,
              paddingLeft: 14,
              marginTop: 10,
              borderRadius: radius.default,
            }}
          /> */}
          </View>
        </View>
      )}
      <View style={styles.buttonWrapper}>
        <GButton onPress={saveApartment}>Add Apartment</GButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
  buttonWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
