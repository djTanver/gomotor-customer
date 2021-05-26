import React, {useEffect, useRef, useState} from 'react';

import {View, StyleSheet, TextInput, Text, Dimensions, ProgressBarAndroidComponent} from 'react-native';
import {showtoast} from '../../../utils/error';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import _ from 'underscore';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';

import GButton from '../../../components/GButton';
import GText from '../../../components/GText';
import GIcon from '../../../components/GIcon';

import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import navigator from '../../../navigation/navigator';
import navigation from '../../../utils/navigation';
import Helper from '../../../providers/helper-service';
import {environment} from '../../../../enviornment';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import {add_address, add_new_address} from '../../../store/address/service';
import authSelector from '../../../store/auth/selector';
import {store} from '../../../../App';
import {user_address} from '../../../store/address/service';
import {add_apartment} from '../../../store/cleaningPackage/services';
import {CommonActions} from '@react-navigation/native';

export default ({props}) => {
//console.log('-----------props.props=======',props)
const { from} = props.params;

  const [currentLocation, setCurrentLocation] = useState({});
  const [searchResult, setSearchResults] = useState({});
  const [address, setAddress] = useState({});
  const [addressOne, setAddressOne] = useState('');
  const [addAddressLoading, setAddressLoading] = useState(false);
  const [area, setArea] = useState('');
  const [landMark, setLandmark] = useState('');
  const [flatNumber, setFlatNumber] = useState('');

  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [formattedAddress, setFormatttedAdd] = useState('');

  const [isPrefill, setPrefill] = useState(false);
  const user = useSelector(authSelector.user);
  const ref = useRef();
  const [selectedAddress, setSelectedAddress] = useState('');
  const addressTypes = ['HOME', 'WORK'];
  const [home, setHome] = useState({});
  const [work, setWork] = useState({});
  const [other, setOther] = useState({});

  useEffect(() => {
    console.log('ref');

    if (
      props.params &&
      !props.params.isCleaner &&
      !props.params.isApartment &&
      Object.keys(props.params.address).length != 0
    ) {
      setAddressOne(props.params.address.address);
      setArea('' || props.params.address.street_area);
      setLandmark(props.params.address.land_mark);
      setCity(props.params.address.city);
      setState(props.params.address.state);
      setFlatNumber(props.params.address['flat_number']);
      setPincode(props.params.address.pincode);
      setLatitude(props.params.address.coordinates.latitude);
      setLongitude(props.params.address.coordinates.longitude);
      setCurrentLocation({
        latitude: props.params.address.coordinates.latitude,
        longitude: props.params.address.coordinates.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    } else if (props.params.isCleaner) {
      setPrefill(true);
      setCurrentUserLoc();
      addressData();
    } else if (props.params.isApartment) {
      // setPrefill( true );
      setCurrentUserLoc();
    } else {
      setCurrentUserLoc();
    }
  }, []);
  const addressData = async () => {
    try {
      let res = await user_address(user.id);
      console.log('response', res);
      if (res && res.length > 0) {
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
      showtoast(`Some error occurred ${err.message}`);
    }
  };
  const onSubmit = async () => {
    console.log(
      'final result',
      state,
      city,
      addressOne,
      pincode,
      landMark,
      area,
    );
    try {
      if (!addressOne || !area || !city || !state || !pincode) {
        showtoast('Please enter address, area, city, state and pincode.');
        return;
      }
      if(pincode.length<6){
        showtoast('Please enter a valid pincode.');
        return;
      }
      // if (!latitude || !longitude) {
      //   showtoast('Please select a valid location on map');
      //   return;
      // }

     
    Geocoder.init('AIzaSyClDjPX_2bzduWI0sIpppvcMkQB7ZhanKQ');
    const locationDatares=await Geocoder.from(addressOne+' '+pincode+' '+city+' '+state);
    const locationDatas = await locationDatares.results[0].geometry.location;
    console.log("===========================map Data===================",locationDatas);    
            
  console.log("===========latitude",latitude);
  console.log("===========longitude",longitude);
      setAddressLoading(true);
      let belongs_to =
        props.params.address && props.params.address.belongs_to
          ? props.params.address.belongs_to
          : props.params.isApartment
          ? 'Apartment'
          : 'Customer';
      let _object = {
        address: addressOne,
        street_area: area,
        land_mark: landMark,
        city: city,
        state: state,
        pincode: pincode,
        user_id: user.id,
        address_type: props.params.type,
        flat_number: flatNumber ? flatNumber : null,
        belongs_to: belongs_to,
        coordinates: {latitude: locationDatas.lat, longitude: locationDatas.lng},
      };
      console.log('body', _object, user.id);
      let res;
      switch (props.params.type) {
        case 'home':
          if (home && home.id) {
            res = await add_address(user.id, home.id, _object);
          } else {
            res = await add_new_address(_object);
          }
          break;
        case 'work':
          if (work && work.id) {
            res = await add_address(user.id, work.id, _object);
          } else {
            res = await add_new_address(_object);
          }
          break;
        case 'other':
          if (other && other.id) {
            res = await add_address(user.id, other.id, _object);
          } else {
            res = await add_new_address(_object);
          }
          break;
      }
      if (props.params.isApartment) {
        try {
          //here add apartment
          let _obj = {
            pincode: pincode,

            state: state,
            city: city,

            land_mark: landMark,
            coordinates: {
              latitude: latitude,
              longitude: longitude,
            },
            address: '',
            address_type: 'other',
            belongs_to: 'Apartment',
            apartment_name: name || '',
            address: formattedAddress || '',
            flat_number: flatNumber ? flatNumber : null,
          };
          console.log('formattedAddress=============>' + formattedAddress);
          const result = await add_apartment(_obj);

          if (result) {
            if(from=="add_home" || from=="add_work"){
              navigation({
                path: navigator.cleanerListNonApartment,
                params: {from: from}
              }) 
            }
            navigation({path: navigator.apartmentAddSucess});
            //navigation({path: navigator.cleanerListNonApartment});
          }
        } catch (error) {
          setAddressLoading(false);
          console.log('what the hell ---->' + error.message);
          if (error.statusCode == 409) {
            showtoast(
              `Apartment already exists please wait, we will cater you soon.`,
            );
          } else showtoast(`Add apartment failed!! ${error.message}`);

          //navigation(true);
        }
      }

      // console.log('result ', res);

      if (res) {
        setAddressLoading(false);
        console.log('res returned ' + JSON.stringify(res));
        if (!props.params.isCleaner && !props.params.isApartment){
          if(from=="add_home" || from=="add_work"){
            navigation({
              path: navigator.cleanerListNonApartment,
              params: {from: from}
            }) 
            }
            else{
          navigation({path: navigator.addressDetail});
            }
        }
        else if (props.params.isApartment) {
          if(from=="add_home" || from=="add_work"){
 
            navigation({
              path: navigator.cleanerListNonApartment,
              params: {from: from}
            }) 

            }
            else{
          navigation.dispatch(CommonActions.goBack());
            }
        }
        return showtoast('Address details are added successfully.');
      }
    } catch (err) {
      setAddressLoading(false);

      console.log('error', err);
      showtoast(`Some error occurred ${err.message}`);
    }
  };

  async function setCurrentUserLoc() {
    Geolocation.getCurrentPosition(
      (position) => {
        Geocoder.init('AIzaSyClDjPX_2bzduWI0sIpppvcMkQB7ZhanKQ');
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then((json) => {
            console.log(json.results.address_components);
            onSearchLocation(json.results[0]);
          })
          .catch((error) => console.warn(error));
        if (position && position.coords) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });
        }
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 100000},
    );
  }
  async function onSubmitCleaner() {
    console.log(
      'final result',
      state,
      city,
      addressOne,
      pincode,
      landMark,
      area,
    );
    try {
      let _obj = {
        pincode: pincode,

        state: state,
        city: city,

        land_mark: landMark,
        coordinates: {
          latitude: latitude,
          longitude: longitude,
        },
        address: '',
        address_type: 'other',
        belongs_to: 'Apartment',
        apartment_name: name,
        address: formattedAddress,
      };
     const result = await add_apartment(_obj);

      if (result) {
navigation({path: navigator.apartmentAddSucess});
          //navigation({path: navigator.cleanerListNonApartment});
      }
    } catch (error) {
      console.log('what the hell ---->' + error.message);
      if (error.statusCode == 409) {
        showtoast(
          `Apartment already exists please wait, we will cater you soon.`,
        );
      } else showtoast(`Add apartment failed!! ${error.message}`);
    }
  }
  async function onSearchLocation(locationData) {
    console.log('location result', locationData);
    try {
      setName('');
      setAddressOne('');
      setArea('');
      setFlatNumber('');
      setLandmark('');
      setCity('');
      setState('');
      setPincode('');
      if (locationData.name) {
        setAddressOne(locationData.name);
      }
      if (props.params.isApartment) {
        setName(locationData.name);
      }
      if (locationData && locationData.address_components.length > 0) {
        _.each(locationData.address_components, (element) => {
          if (element.types[0] == 'route') {
            const locationname = locationData.name || '';
            setAddressOne(locationname + ' ' + element.long_name);
          }
          if (element.types[0] == 'sublocality_level_3') {
            setArea(element.long_name);
          }
          if (element.types[0] == 'sublocality_level_2') {
            setArea(area + ' ' + element.long_name);
          }
          if (element.types[0] == 'sublocality_level_1') {
            setLandmark(element.long_name);
          }
          if (element.types[0] == 'locality') {
            setCity(element.long_name);
          }
          if (element.types[0] == 'administrative_area_level_1') {
            setState(element.long_name);
          }
          if (element.types[0] == 'postal_code') {
            setPincode(element.long_name);
          }
        });
        setLatitude(locationData.geometry.location.lat);
        setLongitude(locationData.geometry.location.lng);
        setName(locationData.name);
        setFormatttedAdd(locationData.formatted_address.trim());

        setCurrentLocation({
          latitude: locationData.geometry.location.lat,
          longitude: locationData.geometry.location.lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      }
    } catch (err) {
      console.log('err google location', err);
    }
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        {currentLocation && currentLocation.longitude && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[
              styles.map,
              {
                height: isPrefill
                  ? '100%'
                  : props.params.isCleaner
                  ? '100%'
                  : 410,
              },
            ]}
            region={currentLocation}>
            {(currentLocation || {}).latitude && (
              <Marker.Animated
                coordinate={currentLocation}
                onPress={(e) => console.log('onPress', e)}
                draggable={false}
              />
            )}
          </MapView>
        )}
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: '100%'}}>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Search"
            fetchDetails={true}
            renderDescription={(text) => {
              console.log('text', text);
              setPrefill(true);
              return <Text>{text.description}</Text>;
            }}
            onPress={(data, details = null) => {
              ref.current.setAddressText('');

              setPrefill(false);
              onSearchLocation(details);
            }}
            query={{
              key: 'AIzaSyClDjPX_2bzduWI0sIpppvcMkQB7ZhanKQ',
              language: 'en',
              components: 'country:in',
            }}
            styles={{
              textInputContainer: {
                borderRadius: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                marginHorizontal: 10,
              },
              listView: {
                borderRadius: 5,
                right: 14,
                marginLeft: 23,
              },
            }}
            enablePoweredByContainer={false}
            renderRightButton={() => {
              if (isPrefill) {
                return (
                  <GIcon
                    onPress={() => {
                      ref.current.setAddressText('');
                      setPrefill(true);
                    }}
                    name="close"
                    type="MaterialCommunityIcons"
                    size={20}
                    color={color.gray}
                    style={{
                      // marginHorizontal: 12,
                      backgroundColor: 'white',
                      right: 3,
                      paddingVertical: 12,
                      bottom: 3,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      paddingHorizontal: 4,
                    }}
                  />
                );
              }
            }}
            debounce={200}
          />
          {!props.params.isApartment && isPrefill && props.params.isCleaner && (
            <View style={{flexDirection: 'row'}}>
              {addressTypes.map((item, index) => {
                return (
                  <GText
                    key={index}
                    onPress={() => {
                      setSelectedAddress(item);
                      if (item == 'HOME') {
                        console.log('data', home);
                        setCurrentLocation({
                          latitude: home.coordinates.latitude,
                          longitude: home.coordinates.longitude,
                          latitudeDelta: LATITUDE_DELTA,
                          longitudeDelta: LONGITUDE_DELTA,
                        });
                        //onSearch(home.coordinates.latitude, home.coordinates.longitude);
                      } else if (item == 'WORK') {
                        setCurrentLocation({
                          latitude: work.coordinates.latitude,
                          longitude: work.coordinates.longitude,
                          latitudeDelta: LATITUDE_DELTA,
                          longitudeDelta: LONGITUDE_DELTA,
                        });
                        //onSearch(work.coordinates.latitude, work.coordinates.longitude);
                      }
                    }}
                    fontFamily={ffamily.semiBold}
                    color={color.gray}
                    fontSize={fsize.p2}
                    textAlign={fAlign.center}
                    style={{
                      ...styles.categoryType,
                      backgroundColor:
                        selectedAddress == item ? color.blue : color.white,
                      color: selectedAddress == item ? color.white : color.gray,
                      top: -510,
                    }}>
                    {item}
                  </GText>
                );
              })}
            </View>
          )}
        </View>
      </View>

      {!isPrefill && !props.params.isCleaner && (
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
              Search Location
            </GText>

            <TextInput
              placeholder="Address 1(H No /Apartment name)"
              style={{
                borderBottomColor: color.gray_Light,
                borderBottomWidth: 1,
                marginTop: 10,
                borderRadius: radius.default,
              }}
              onChangeText={(value) => setAddressOne(value)}
              value={addressOne}
            />
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <TextInput
                  placeholder="Street /Area"
                  style={{
                    borderBottomColor: color.gray_Light,
                    borderBottomWidth: 1,
                    height: 50,
                    padding: 10,
                    borderRadius: radius.default,
                  }}
                  onChangeText={(value) => setArea(value)}
                  value={area}
                />
              </View>
              <View style={{width: '50%'}}>
                <TextInput
                  placeholder="Flat/Blk No"
                  style={{
                    borderBottomColor: color.gray_Light,
                    borderBottomWidth: 1,
                    height: 50,
                    padding: 10,
                    borderRadius: radius.default,
                  }}
                  onChangeText={(value) => setFlatNumber(value)}
                  value={flatNumber}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{width: '35%'}}>
                <TextInput
                  placeholder="City"
                  style={{
                    borderBottomColor: color.gray_Light,
                    borderBottomWidth: 1,
                    height: 50,
                    padding: 10,
                    borderRadius: radius.default,
                  }}
                  onChangeText={(value) => setCity(value)}
                  value={city}
                />
              </View>
              <View style={{width: '30%'}}>
                <TextInput
                  keyboardType={Platform.OS=="android"?"numeric":"phone-pad"}
                  placeholder="Pincode"
                  style={{
                    borderBottomColor: color.gray_Light,
                    borderBottomWidth: 1,
                    height: 50,
                    padding: 10,
                    borderRadius: radius.default,
                  }}
                  onChangeText={(value) =>{ 
                    let pincodeval = value.replace(/\D/gm, '');
                    setPincode(pincodeval)}
                    }
                  value={pincode}
                />
              </View>
              <View style={{width: '35%'}}>
                <TextInput
                  placeholder="State"
                  style={{
                    borderBottomColor: color.gray_Light,
                    borderBottomWidth: 1,
                    height: 50,
                    padding: 10,
                    borderRadius: radius.default,
                  }}
                  onChangeText={(value) => setState(value)}
                  value={state}
                />
              </View>
            </View>
          </View>
          <GButton
            buttonStyle={{marginVertical: 10, marginHorizontal: 30}}
            disabled={!latitude && !longitude}
            onPress={onSubmit}
            loading={addAddressLoading}>
            Update 
          </GButton>
        </View>
      )}
      {props.params.isCleaner && (
        <GButton
          buttonStyle={{marginVertical: 10, marginHorizontal: 30}}
          onPress={onSubmitCleaner}
          loading={addAddressLoading}>
          Update
        </GButton>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    height: 500,
    width: '100%',
  },
  userLocationBtn: {
    backgroundColor: color.white,
    top: -10,
    right: 0,
    left: -25,
    width: 42,
    height: 42,
    borderRadius: 30,
    position: 'absolute',
    zIndex: 999,
    elevation: 5,
  },
  userLocationIconCtr: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryType: {
    borderWidth: 1,
    borderColor: color.gray_Light,
    borderRadius: radius.h8,
    padding: 8,
    marginHorizontal: 4,
  },
});
