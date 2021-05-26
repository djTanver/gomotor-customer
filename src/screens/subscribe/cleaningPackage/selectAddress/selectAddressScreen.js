import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import GText from '../../../../components/GText';
import GIcon from '../../../../components/GIcon';
import GButton from '../../../../components/GButton';
import Loader from '../../../../components/Loader';
import GModal from '../../../../components/GModal';
import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from './../../../../theme';
import navigator from '../../../../navigation/navigator';
import navigation from '../../../../utils/navigation';
import API_ENDPOINT from '../../../../config/api';

export default (props) => {
  const {onContinue, toggleSwitch, switchValue, addNewApartment} = props;

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      {/* <View
        style={{
          marginHorizontal: 15,
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 10,
          backgroundColor: color.blue_Light,
          borderRadius: 5,
        }}>
        <View>
          <GText
            color={color.gray}
            fontFamily={ffamily.semiBold}
            fontSize={fsize.h6}>
            Are you staying in Apartment ?
          </GText>
        </View>
        <View>
          <Switch onValueChange={toggleSwitch} value={switchValue} />
        </View>
      </View> */}

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        {switchValue ? (
          <GText
            color={color.gray}
            fontFamily={ffamily.semiBold}
            fontSize={fsize.h6}
            style={{
              backgroundColor: color.blue,
              paddingHorizontal: 20,
              paddingVertical: 5,
              color: color.white,
              borderRadius: 5,
            }}>
            Yes - I am staying in Apartment
          </GText>
        ) : (
          <GText
            color={color.gray}
            fontFamily={ffamily.semiBold}
            fontSize={fsize.h6}
            style={{
              backgroundColor: color.orange,
              paddingHorizontal: 20,
              paddingVertical: 5,
              color: color.white,
              borderRadius: 5,
            }}>
            No - I am not staying in Apartment
          </GText>
        )}
      </View> */}
<View style={{flex: 1, marginHorizontal: 15, paddingTop: 10}}>
        {/* {switchValue ? <IsApartment {...props} /> : <NonApartment {...props} />} */}
        {switchValue&& <IsApartment {...props} />}
      </View>

      {/* <ApartmentAddress /> */}
      {switchValue ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            marginHorizontal: 15,
            backgroundColor: color.lineColor,
            padding: 5,
            borderRadius: 25,
          }}>
          <GText
            color={color.blue}
            fontSize={fsize.h6}
            fontFamily={ffamily.bold}
            style={{flex: 1, paddingLeft: 15}}>
            If your apartment is not in list, add here
          </GText>
          <TouchableOpacity onPress={addNewApartment}>
            <GIcon
              name="domain-plus"
              type="MaterialCommunityIcons"
              size={fsize.h5}
              color={color.white}
              style={{
                backgroundColor: color.blue,
                borderRadius: radius.max,
                padding: 12,
              }}
            />
          </TouchableOpacity>
        </View>
      ) : null}

      <GButton marginHorizontal={20} marginVertical={10} onPress={onContinue}>
        Continue
      </GButton>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
});

const NonApartment = ({onNonApartmentClick}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <GText fontFamily={ffamily.semiBold} fontSize={fsize.h6}>
          Looking for car cleaner to service your car?
        </GText>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // marginVertical: 10,
            paddingVertical: 20,
            //  backgroundColor: '#F7F7F7',
          }}>
          {/* <GIcon
              name="addusergroup"
              type="AntDesign"
              size={fsize.h1}
              style={{
                backgroundColor: color.blue,
                borderRadius: radius.max,
                padding: 4,
                marginVertical: 20,
              }}
            /> */}
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 5,
              marginVertical: 20,
            }}
            source={{
              uri: `${API_ENDPOINT}/uploads/cleaner_Two_9f1e96f74e.png`,
            }}
          />

          <TouchableOpacity
            onPress={onNonApartmentClick}
            style={{
              backgroundColor: color.blue_Light,
              padding: 10,
              borderRadius: 5,
            }}>
            <GText fontFamily={ffamily.semiBold} fontSize={fsize.p1}>
              Search for car wash center
            </GText>
          </TouchableOpacity>
          {/* <GText fontFamily={ffamily.semiBold} fontSize={fsize.h6}>
            Looking for car cleaner to service your car?
          </GText> */}
        </View>
      </View>
    </View>
  );
};

const IsApartment = ({
  aptDetailLoading,
  aptLoading,
  allApartments,
  getSelectedApartment,
  selectedApartment,
  setSelectedTimeSlot,
  selectedApartmentDetails,
  selectedTimeSlot,
  flatNumber,
  setFlatNumber,
}) => {
  if (aptLoading) {
    return <Loader style={{marginTop: 12}} />;
  }

  return (
    <View>
      <GText
        color={color.orange}
        fontSize={fsize.h6}
        fontFamily={ffamily.bold}
        style={{marginTop: 15}}>
        Select Apartment
      </GText>

      <RNPickerSelect
     useNativeAndroidPickerStyle={false}
        onValueChange={(value) => value && getSelectedApartment(value)}
        items={allApartments.map((apartment) => {
          return {
            label: apartment.name,
            value: apartment.id,
            key: apartment.id,
          };
        })}
        placeholder={{label: 'select apartments', color: color.blue_Light}}
        value={selectedApartment}
        style={{
          inputAndroid: {
            color: color.black,
            height: 45,
            borderColor: color.gray_Light,
            padding: 10,
            borderWidth: 1,
            backgroundColor: color.blue_Light,
            borderRadius: 5,
            marginTop: 10,
            // marginLeft: 20,
            // marginRight: 20,
          },
          
        }}
        
      />

      {aptDetailLoading && <Loader style={{marginTop: 12}} />}

      {selectedApartmentDetails && (
        <>
          <GText
            color={color.orange}
            fontSize={fsize.h6}
            fontFamily={ffamily.bold}
            style={{marginTop: 20}}>
            Select the time slot
          </GText>

          <RNPickerSelect
             useNativeAndroidPickerStyle={false}
            onValueChange={(value) => value && setSelectedTimeSlot(value)}
            items={selectedApartmentDetails.apartment.time_slots.map(
              (timeslots) => {
                console.log('timeslots', timeslots);
                return {
                  label: `${timeslots.start_time.substring(
                    0,
                    5,
                  )} to ${timeslots.end_time.substring(0, 5)}`,
                  value: timeslots.id,
                  key: timeslots.id,
                };
              },
            )}
            placeholder={{label: 'select time slots', color: color.black}}
            value={selectedTimeSlot}
            style={{
              inputAndroid: {
                color: color.black,
                height: 45,
                borderColor: color.gray_Light,
                padding: 10,
                borderWidth: 1,
                backgroundColor: color.lineColor,
                borderRadius: 5,
                marginTop: 10,
              },
            }}
          />

          {selectedTimeSlot && selectedApartmentDetails && (
            <TextInput
              placeholder="Flat Number and Block number"
              style={{
                borderBottomColor: color.blue_Light,
                borderBottomWidth: 1.4,
                paddingBottom: 4,
                fontSize: fsize.p1,
                fontFamily: ffamily.semiBold,
                backgroundColor: color.lineColor,
                marginTop: 10,
              }}
              onChangeText={(text) => setFlatNumber(text)}
              value={flatNumber}
              required="true"
            />
          )}
          {selectedTimeSlot && (
            <>
              <GText
                color={color.orange}
                fontSize={fsize.h6}
                fontFamily={ffamily.bold}
                style={{marginTop: 12}}>
                Apartment Details
              </GText>
              <GText
                color={color.gray}
                fontSize={fsize.h6}
                style={{
                  marginTop: 6,
                  paddingBottom: 15,
                }}>
                {/* <GText fontSize={fsize.h6}>Name:&nbsp;</GText>
                {selectedApartmentDetails.apartment.name}
                {'\n'}
                <GText fontSize={fsize.h6}>Address:&nbsp;</GText>
                {selectedApartmentDetails.apartment.address.address}
                {'\n'}
                <GText fontSize={fsize.h6}>Land mark:&nbsp;</GText>
                {selectedApartmentDetails.apartment.address.land_mark}
                {'\n'}
                <GText fontSize={fsize.h6}>City:&nbsp;</GText>
                {selectedApartmentDetails.apartment.address.city}
                {'\n'}
                <GText fontSize={fsize.h6}>Pincode:&nbsp;</GText>
                {selectedApartmentDetails.apartment.address.pincode}
                {'\n'} */}
                <GText
                  fontSize={fsize.h6}
                  color={color.blue}
                  fontFamily={ffamily.semiBold}>
                  {selectedApartmentDetails.apartment.name}{' '}
                </GText>
                {'\n'}
                {selectedApartmentDetails.apartment.address.address}
                {selectedApartmentDetails.apartment.address.land_mark}
                {selectedApartmentDetails.apartment.address.city}-
                {selectedApartmentDetails.apartment.address.pincode}
              </GText>
            </>
          )}
        </>
      )}
    </View>
  );
};

const ApartmentAddress = () => {
  return (
    <View>
      <GText
        color={color.orange}
        fontSize={fsize.h6}
        fontFamily={ffamily.bold}
        style={{marginTop: 12}}>
        Select Apartment
      </GText>
      <GText
        color={color.gray}
        fontSize={fsize.p1}
        style={{
          marginTop: 12,
          borderColor: color.gray_Light,
          borderWidth: 1,
          padding: 6,
          borderRadius: radius.default,
        }}>
        No Apartment Name
      </GText>

      <GText
        color={color.gray}
        fontSize={fsize.p1}
        textAlign={fAlign.center}
        style={{
          marginTop: 12,
          borderColor: color.blue,
          borderWidth: 1.6,
          padding: 6,
          borderRadius: radius.default,
        }}>
        Add New Apartment
      </GText>

      <GText
        fontSize={fsize.h6}
        fontFamily={ffamily.semiBold}
        style={{marginTop: 18}}>
        Apartment details
      </GText>

      <TextInput
        placeholder="Apartment Name and Address"
        style={{
          borderBottomColor: color.gray_Light,
          borderBottomWidth: 1.4,
          paddingBottom: 4,
          fontSize: fsize.p1,
          fontFamily: ffamily.semiBold,
        }}
      />

      <TextInput
        placeholder="Street / Area"
        style={{
          borderBottomColor: color.gray_Light,
          borderBottomWidth: 1.4,
          paddingBottom: 4,
          fontSize: fsize.p1,
          fontFamily: ffamily.semiBold,
        }}
      />

      <TextInput
        placeholder="Land mark"
        style={{
          borderBottomColor: color.gray_Light,
          borderBottomWidth: 1.4,
          paddingBottom: 4,
          fontSize: fsize.p1,
          fontFamily: ffamily.semiBold,
        }}
      />

      <TextInput
        placeholder="City"
        style={{
          borderBottomColor: color.gray_Light,
          borderBottomWidth: 1.4,
          paddingBottom: 4,
          fontSize: fsize.p1,
          fontFamily: ffamily.semiBold,
        }}
      />
    </View>
  );
};
