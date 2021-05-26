import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import CleanerProgressCard from '../../../../components/CleanerProgressCard';
import GIcon from '../../../../components/GIcon';
import GText from '../../../../components/GText';
import {useSelector} from 'react-redux';
import authSelector from '../../../../store/auth/selector';
import request from '../../../../utils/fetch';
import moment from 'moment';
import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from '../../../../theme';
import {ScrollView} from 'react-native-gesture-handler';
import GImageNameIconBox from '../../../../components/GImageNameIconBox';

export default ({route}) => {
  const [images, setImages] = useState([]);
  const user_id = useSelector(authSelector.userId);
  const token = useSelector((state) => state.auth.token);
  const [cleanerDetails, setCleanerDetails] = useState({});
  const [isLoad, setLoad] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [details, setDetails] = useState('');
  const [service, setService] = useState({});
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [closingComments, setClosingComments] = useState('');

  useEffect(() => {
    console.log('IssueDetails', route.params);

    if (route && route.params) {
      setCleanerDetails(route.params);
    }
    if (route.params && route.params.images && route.params.images.length > 0) {
      setImages(route.params.images);
    }
    if (route.params && route.params.details) {
      setDetails(route.params.details);
    }
    if (route.params && route.params.title) {
      setTitle(route.params.title);
    }
    if (route.params && route.params.status) {
      setStatus(route.params.status);
    }
    if (route.params && route.params.closing_comments) {
      setClosingComments(route.params.closing_comments);
    }
    if (route.params && route.params.service) {
      setService(route.params.service);
    }
  }, []);

  const items = images.map((item) => {
    if (item) {
      return (
        <Image
          source={{uri: 'http://3.239.78.166:1337' + item.url}}
          style={{
            height: 80,
            width: 80,
            marginRight: 10,
            borderRadius: radius.default,
          }}
        />
      );
    }
  });

  const customerDetails = (param) => {
    console.log('cleaner Details: ', cleanerDetails);
    if (param == 'name') {
      if (cleanerDetails.customer_id) {
        if (cleanerDetails.customer_id.username) {
          return cleanerDetails.customer_id.username.trim();
        } else {
          return '';
        }
      } else {
        return '';
      }
    }

    if (param == 'carNumber') {
      if (cleanerDetails.user_car_id) {
        if (cleanerDetails.user_car_id.car_number) {
          return cleanerDetails.user_car_id.car_number.trim();
        } else {
          return '';
        }
      } else {
        return '';
      }
    }

    if (param == 'apartmentAddress') {
      if (cleanerDetails.customer_id) {
        if (cleanerDetails.customer_id.apartmentDetails) {
          if (cleanerDetails.customer_id.apartmentDetails.address) {
            if (cleanerDetails.customer_id.apartmentDetails.address.address) {
              return cleanerDetails.customer_id.apartmentDetails.address.address.trim();
            } else {
              return '';
            }
          } else {
            return '';
          }
        } else {
          return '';
        }
      } else {
        return '';
      }
    }

    if (param == 'apartmentName') {
      if (cleanerDetails.customer_id) {
        if (cleanerDetails.customer_id.apartmentDetails) {
          if (cleanerDetails.customer_id.apartmentDetails.name) {
            return cleanerDetails.customer_id.apartmentDetails.name;
          } else {
            return '';
          }
        } else {
          return '';
        }
      } else {
        return '';
      }
    }
  };

  return (
    <View style={style.mainWrapper}>
      {/* <Image
        source={
          cleanerDeatils.cleaner_id &&
          cleanerDeatils.cleaner_id.photo &&
          cleanerDeatils.cleaner_id.photo.formats &&
          cleanerDeatils.cleaner_id.photo.formats.thumbnail
            ? {
                uri:
                  'http://3.239.78.166:1337' +
                  cleanerDeatils.cleaner_id.photo.formats.thumbnail.url,
              }
            : require('../../../../assets/car.jpg')
        }
        style={{height: 180, width: '100%'}}
      /> */}

      <ScrollView
        style={{
          backgroundColor: color.white,
          flex: 1,
          marginTop: 0,
          overflow: 'hidden',
          borderTopLeftRadius: radius.h6,
          borderTopRightRadius: radius.h6,
        }}>
        {/* <CleanerProgressCard item={cleanerDeatils.cleaner_id} /> */}

        <View>
          <GImageNameIconBox
            nameFont={ffamily.bold}
            descriptionSize={fsize.p1}
            descriptionStyle={{color: color.blue, fontFamily: ffamily.bold}}
            image={require('../../../../assets/car.jpg')}
            name={customerDetails('carNumber')}
            description={customerDetails('name')}
            // iconName="local-phone"
          />

          <View style={style.topCardWrapper}>
            <GIcon
              name="office-building"
              type="MaterialCommunityIcons"
              size={30}
              style={{marginHorizontal: 12}}
            />
            <View style={{flex: 1}}>
              <GText
                fontFamily={ffamily.bold}
                fontSize={fsize.p1}
                color={color.gray}>
                {customerDetails('apartmentName')}
              </GText>
              <GText
                fontSize={fsize.p1}
                color={color.gray}
                fontFamily={ffamily.semiBold}>
                {customerDetails('apartmentAddress')}
              </GText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomColor: color.lineColor,
              borderBottomWidth: 1,
              backgroundColor: color.blue_Light,
            }}>
            <GText fontSize={fsize.p1} fontFamily={ffamily.semiBold}>
              Car cleaning
            </GText>
            <GText fontSize={fsize.p1} fontFamily={ffamily.semiBold}>
              {cleanerDetails.issueCreatedDate
                ? moment(cleanerDetails.issueCreatedDate).format('DD-MMM-YYYY')
                : ''}
            </GText>
            <GText
              fontSize={fsize.p1}
              color={color.blue}
              fontFamily={ffamily.bold}>
              {status}
            </GText>
          </View>
        </View>
        <View style={{marginHorizontal: 15}}>
          <View style={{marginVertical: 10}}>
            <GText
              textAlign={fAlign.left}
              fontFamily={ffamily.semiBold}
              color={color.orange}
              fontSize={fsize.p1}>
              Issue
            </GText>
            <GText
              textAlign={fAlign.left}
              fontFamily={ffamily.bold}
              color={color.gray}
              fontSize={fsize.p1}
              style={{marginTop: 5}}>
              {title}
            </GText>
          </View>
          <View style={{marginVertical: 10}}>
            <GText
              textAlign={fAlign.left}
              fontFamily={ffamily.semiBold}
              color={color.orange}
              fontSize={fsize.p1}>
              Selected Service Type
            </GText>
            <GText
              textAlign={fAlign.left}
              fontFamily={ffamily.bold}
              color={color.gray}
              fontSize={fsize.p1}
              style={{marginTop: 5}}>
              {service.title}
            </GText>
          </View>
          <View style={{marginVertical: 10}}>
            <GText
              textAlign={fAlign.left}
              fontFamily={ffamily.semiBold}
              color={color.orange}
              fontSize={fsize.p1}>
              Issue Details
            </GText>
            <GText
              textAlign={fAlign.left}
              fontFamily={ffamily.bold}
              color={color.gray}
              fontSize={fsize.p1}
              style={{marginTop: 5}}>
              {details}
            </GText>
          </View>

          <View style={{marginVertical: 10}}>
            <GText
              textAlign={fAlign.left}
              fontFamily={ffamily.semiBold}
              color={color.orange}
              fontSize={fsize.p1}>
              Uploaded Images
            </GText>
            {/* <Image
              source={require('../../../../assets/add-image.png')}
              style={{
                height: 60,
                width: 60,
                marginRight: 10,
                borderRadius: radius.default,
                marginVertical: 20,
              }}
            /> */}
            <View
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {items.length > 0 ? (
                items
              ) : (
                <GText
                  textAlign={fAlign.left}
                  fontFamily={ffamily.bold}
                  color={color.black}
                  fontSize={fsize.p1}
                  style={{marginTop: 0}}>
                  No Images found
                </GText>
              )}
            </View>
          </View>

          <View style={{marginVertical: 15}}>
            <GText
              textAlign={fAlign.left}
              fontFamily={ffamily.semiBold}
              color={color.orange}
              fontSize={fsize.p1}>
              Issue Resolved Comment
            </GText>
            <GText
              textAlign={fAlign.left}
              fontFamily={ffamily.bold}
              color={color.gray}
              fontSize={fsize.p1}
              style={{marginTop: 5}}>
              {closingComments
                ? closingComments
                : 'No comment yet, issue is still pending.'}
            </GText>
          </View>
        </View>

        {/* <View style={{marginHorizontal: 15}}>
          <View>
            <TextInput
              placeholder={'What happened to the car'}
              style={{
                marginTop: 10,
                borderColor: color.gray_Light,
                borderWidth: 1,
                borderRadius: radius.default,
              }}
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
            <GText
              style={{marginTop: 10}}
              fontFamily={ffamily.semiBold}
              color={color.blue}>
              Selected Service
            </GText>

            <GText
              style={{marginTop: 10}}
              fontFamily={ffamily.semiBold}
              color={color.blue}>
              Uploaded images
            </GText>
            <View
              style={{marginTop: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
              {items}
              <TouchableOpacity onPress={() => imagePick()}>
                <Image
                  source={require('../../../../assets/add-image.png')}
                  style={{
                    height: 60,
                    width: 60,
                    marginRight: 10,
                    borderRadius: radius.default,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Enter your comment"
              style={{
                marginTop: 10,
                borderColor: color.gray_Light,
                borderWidth: 1,
                borderRadius: radius.default,
                justifyContent: 'flex-start',
              }}
              multiline
              numberOfLines={4}
              onChangeText={(value) => setDetails(value)}
              value={details}
            />
            <GButton
              loading={isLoad}
              buttonStyle={{marginVertical: 20}}
              onPress={() => createdIssue()}>
              Submit
            </GButton>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: color.white,
  },
  topCardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.lineColor,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },

  topCardImage: {
    height: 35,
    width: 35,
    borderRadius: radius.max,
    marginHorizontal: 12,
  },
  timingsBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
