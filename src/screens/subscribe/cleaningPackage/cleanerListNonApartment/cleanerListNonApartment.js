import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Dimensions,
  useWindowDimensions,
  Text,
} from 'react-native';
import GText from '../../../../components/GText';
import GIcon from '../../../../components/GIcon';
import Loader from '../../../../components/Loader';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import navigator from '../../../../navigation/navigator';
import navigation from '../../../../utils/navigation';
import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from './../../../../theme';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default (props) => {

  
  const {home, work} = props;

  const {onContinue, onSearch, loading, cleaners, route} = props;
  const [currentLocation, setCurrentLocation] = useState({});
  const [addressTypes, setAddressTypes] = useState(['CURRENT']);
  const ref = useRef();
  const [isPrefill, setPrefill] = useState(false);

  const [current, setCurrent] = useState({});
  const [selectedAddressType, setselectedAddressType] = useState('CURRENT');
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    //console.log("Cleaner list non apartment Props ========>"+JSON.stringify(props));

    //console.log("Cleaner list non apartment Props ========>"+home, work);
    const {home, work} = props;
    const types = ['CURRENT'];
    if (home && work) {
      types.unshift('HOME', 'WORK');
    }
    if (!home && !work) {
      types.unshift('ADD HOME', 'ADD WORK');
    }
    else if (home && !work) {
      types.unshift('HOME','ADD WORK');
    } else if (work && !home) {
      types.unshift('ADD HOME','WORK');
    }
    setAddressTypes(types);
    setCurrentUserLoc();
  }, [home, work]);



  async function setCurrentUserLoc() {
    Geolocation.getCurrentPosition(
      (position) => {
        Geocoder.init('AIzaSyClDjPX_2bzduWI0sIpppvcMkQB7ZhanKQ');
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then((json) => {})
          .catch((error) => console.warn(error));
        if (position && position.coords) {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });
          onSearch(position.coords.latitude, position.coords.longitude);
        }
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 3600000},
    );
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        {currentLocation && currentLocation.longitude && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[styles.map, {height: '100%'}]}
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
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log('details', details);

          onSearch(
            details.geometry.location.lat,
            details.geometry.location.lng,
          );
          setCurrentLocation({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });
        }}
        query={{
        //  key: 'AIzaSyBdfxwAWQXGzVd4TfT83rILYzvgeoSIjQs',
          key: 'AIzaSyClDjPX_2bzduWI0sIpppvcMkQB7ZhanKQ',
          language: 'en',
        }}
        renderDescription={(text) => {
          console.log('text', text);
          setPrefill(true);
          return <Text>{text.description}</Text>;
        }}
        styles={{
          textInputContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
            borderColor: color.lineColor,
            borderWidth: 1,
            borderRadius: radius.default,
          },
          listView: {
            borderRadius: 5,
            marginHorizontal: 20,
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
      <View style={{flexDirection: 'row', marginHorizontal: 15}}>
        {addressTypes.map((item, index) => {
          return (
            <View style={{width: '33.33%'}}>
              <GText
                key={index}
                onPress={() => {
                  if(item== 'ADD HOME'){
                    navigation({
                      path: navigator.googleLocation,
                      params: {address: {}, type: 'home',from:'add_home'},
                    })
                  }
                  else if(item== 'ADD WORK'){
                    navigation({
                      path: navigator.googleLocation,
                      params: {address: {}, type: 'work',from:'add_work'},
                    })
                  }
                  setselectedAddressType(item);

                  //on press of home or work get results belonging to that area.

                  if(item == 'HOME') {
                    if (props.home.coordinates) {
                      setCurrentLocation({
                        latitude: props.home.coordinates.latitude,
                        longitude: props.home.coordinates.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      });
                      onSearch(
                        props.home.coordinates.latitude,
                        props.home.coordinates.longitude,
                      );
                    }
                  } else if (item == 'WORK') {
                    if (props.home && props.home.coordinates) {
                      setCurrentLocation({
                        latitude: props.work.coordinates.latitude,
                        longitude: props.work.coordinates.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      });
                      onSearch(
                        props.work.coordinates.latitude,
                        props.work.coordinates.longitude,
                      );
                    }
                  }
                 
                  else if (item == 'CURRENT') {
                    setCurrentUserLoc();
                  }
                }}
               
                fontFamily={ffamily.semiBold}
                color={color.gray}
                fontSize={fsize.p2}
                textAlign={fAlign.center}
                style={{
                  ...styles.categoryType,
                  backgroundColor:
                    selectedAddressType == item ? color.blue : color.white,
                  color: selectedAddressType == item ? color.white : color.gray,
                  top:
                    cleaners && cleaners.length > 0
                      ? -(windowHeight - 320)
                      : -(windowHeight - 275),
                }}>
                
                {item}
              </GText>
            </View>
          );
        })}
      </View>
      <View
        style={{
          bottom: 15,
          // backgroundColor: color.transparent,
          paddingVertical: 2,
        }}>
        {cleaners && cleaners.length > 0 ? (
          <FlatList
            horizontal={true}
            // ListHeaderComponent={
            //   <>
            //   {
            //     loading && <Loader style={{marginTop:20}} />
            //   }
            //   {
            //     cleaners.length > 0 &&
            //     <View
            //       style={{
            //         backgroundColor: 'white',
            //         color: 'white',
            //         marginTop: 60,
            //         alignItems: 'center',
            //       }}>
            //       <GText fontFamily={ffamily.semiBold} fontSize={fsize.p1} color="gray">
            //         {' '}
            //         list of all cleaners for searched location{' '}
            //       </GText>
            //     </View>
            //   }
            //   </>
            // }
            showsHorizontalScrollIndicator={false}
            data={cleaners}
            renderItem={({item}) => {
              return <HomeAddress item={item} {...props} />;
            }}
          />
        ) : (
          <View>
            {/* <GText
              style={{backgroundColor: color.white, paddingVertical: 50}}
              textAlign="center">
              No results found.
            </GText> */}
            <View
              style={{
                backgroundColor: '#F5F5F5',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <View style={{padding: 10, marginRight: 10}}>
                <Image
                  source={require('../../../../assets/washman.png')}
                  style={{height: 40, width: 40, borderRadius: 100}}
                />
              </View>
              <View>
                <GText
                  fontFamily={ffamily.semiBold}
                  fontSize={fsize.h6}
                  color="black">
                  No results found.
                </GText>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
});

const HomeAddress = ({item}) => {

  console.log('-------------item data',item);
  const {
    provider_name,
    distance,
    contact_details,
    service_phone,
    email,
    city,
    id,
    service_id,
    land_mark,
    closest,
    latitude,
    longitude,
    company_name,
  } = item;

  const contact_detail = JSON.parse(contact_details);

  const handlePhone = () => {
    Linking.openURL(`tel:${service_phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };
  const handleWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=${service_phone}}`);
  };

  return (
    <View
      style={{
        marginHorizontal: 8,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        elevation: 5,
        overflow: 'hidden',
        minWidth: 250,
      }}>
      <TouchableOpacity  
      onPress={() =>
                navigation({
                  path: navigator.serviceProviderDetail,
                  params: {id:id,serviceId:service_id,city:city,closest:closest,land_mark:land_mark,contact_detail,latitude:latitude,longitude:longitude},
                })
              }
        style={{
          // backgroundColor: '#F5F5F5',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: 10,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        <View style={{padding: 10, marginRight: 10}}>
          <Image
            source={require('../../../../assets/washman.png')}
            style={{height: 40, width: 40, borderRadius: 100}}
          />
        </View>
        <View>
          <GText
            fontFamily={ffamily.semiBold}
            fontSize={fsize.h6}
            color="black">
            {company_name}
          </GText>
          <GText fontFamily={ffamily.semiBold} fontSize={fsize.p1} color="gray">
            {land_mark}
          </GText>
          <GText fontFamily={ffamily.semiBold} fontSize={fsize.p1} color="red">
            Distance : {distance.toString().slice(0, 3)} KM
          </GText>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#E2F5FD',
          marginTop: 0,
          paddingVertical: 5,
        }}>
        <View>
          <TouchableOpacity onPress={handlePhone}>
            <GIcon
              name="phone"
              type="Feather"
              size={fsize.h3}
              style={{
                backgroundColor: color.green,
                color: color.white,
                borderRadius: radius.max,
                padding: 4,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleEmail}>
            <GIcon
              name="mail"
              type="Feather"
              size={fsize.h3}
              style={{
                backgroundColor: color.blue,
                color: color.white,
                borderRadius: radius.max,
                padding: 4,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <GIcon onPress={handleWhatsapp}
              name="whatsapp"
              type="FontAwesome"
              size={fsize.h3}
              style={{
                backgroundColor: color.green,
                color: color.white,
                borderRadius: radius.max,
                padding: 4,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

{
  /* <GIcon
name="search"
type="MaterialIcons"
size={fsize.h1}
style={{
  backgroundColor: color.white,
  borderRadius: radius.max,
  padding: 3,
  color: color.blue,
}}
/> */
}
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
