import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Image, Alert} from 'react-native';
import {store} from '../../../../App';
import GButton from '../../../components/GButton';
import GIcon from '../../../components/GIcon';
import GText from '../../../components/GText';
import GCardD from '../../../components/GCardD';
import {fsize, fWeight, color, fAlign, ffamily, radius} from './../../../theme';
import CleanPackageCard from './cleanPackageCard';
import Helper from '../../../providers/helper-service';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import API_ENDPOINT from '../../../config/api';

export default ({
  onUpdateProfilePress,
  onAddressDetails,
  onPackageDetails,
  onCarList,
  onCleanerAndSuperVisor,
  onPaymentHistory,
  onPrivacyPolicy,
  onLogout,
  user,
  createdIssue,
  reviews,
}) => {
  //const userId = user && user.id? user.id : null;

  const [planDetails, setPlanDetails] = useState({
    full_exterior_clean_left: 0,
    full_interior_clean_left: 0,
    valid_upto: 'yyyy-mm-dd',
  });
  const [userDetails, setUserDetails] = useState();

  useFocusEffect(
    React.useCallback(() => {
      let isUserActive = true;
      let isPlanActive = true;

      const getUserDetails = async () => {
        try {
          if (user) {
            let res = await Helper.getUserDetails(user.id);

            if (isUserActive) setUserDetails(res);
          }
        } catch (error) {
          console.log('Error use focus effect =======>' + error.message);
        }
      };
      const activePlanFun = async () => {
        try {
          if (user) {
            let res = await Helper.getActivePlan(user.id);
            console.log('user', res);
            if (res && res[0]) {
              try {
                let response = await Helper.getPlanDetails(res[0].id);

                // console.log("Activate plan", response)
                if (response && isPlanActive) {
                  setPlanDetails(response);
                }
              } catch (err) {
                console.log('Error', err);
                Toast.show(`Error ${err.message}`);
              }
            }
          }
        } catch (error) {
          console.log('error', error);
          Toast.show(`Error ${error.message}`);
        }
      };
      activePlanFun();
      getUserDetails();

      return () => {
        isUserActive = false;
        isPlanActive = false;
      };
    }, []),
  );

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 15}}>
          {userDetails && userDetails.photo && userDetails.photo.url ? (
            <Image
              source={{
                uri: `${API_ENDPOINT}${userDetails.photo.url}`
              }}
              style={{height: 65, width: 65, borderRadius: 100}}
            />
          ) : (
            <Image
              source={{uri: `${API_ENDPOINT}/uploads/usera_f4108126ae.png`}}
              style={{height: 65, width: 65, borderRadius: 100}}
            />
          )}
          <GText
            fontFamily={ffamily.semiBold}
            style={{marginTop: 6}}
            fontSize={fsize.h5}>
            {userDetails && userDetails.username ? userDetails.username : ''}
          </GText>
          {/* <GText
            fontFamily={ffamily.semiBold}
            style={{marginTop: 4}}
            color={color.blue}
            fontSize={fsize.p1}>
            GMCUS{userDetials.id}
          </GText> */}
        </View>

        <View
          style={{
            marginTop: 10,
            backgroundColor: color.blue,
            paddingLeft: 15,
          }}>
          <View
            style={{
              // borderTopColor: color.gray_Light,
              // borderTopWidth: 1,
              // borderBottomColor: color.gray_Light,
              // borderBottomWidth: 1,

              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <GIcon
                name="phone-call"
                type="Feather"
                size={fsize.h4}
                color={color.white}
                style={{marginRight: 5}}
              />
              <GText
                fontSize={fsize.p1}
                fontFamily={ffamily.semiBold}
                color={color.white}>
                {userDetails && userDetails.phone ? userDetails.phone : ''}
              </GText>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <GIcon
                name="email-outline"
                type="MaterialCommunityIcons"
                size={fsize.h4}
                color={color.white}
                style={{marginRight:5}}
              />
              <GText
              style={{paddingHorizontal:5}}
              numberOfLines={1}
                fontSize={fsize.p1}
                fontFamily={ffamily.semiBold}
                color={color.white}>
                
                {userDetails && userDetails.email ? userDetails.email : ''}
              </GText>
            </View>
          </View>

          {/* <CleanPackageCard planDetails={planDetails} /> */}
        </View>

        <View style={{marginTop: 12, marginHorizontal: 16}}>
          <GCardD
            leftIconName="person-outline"
            leftIconType="MaterialIcons"
            rightIconName="chevron-right"
            rightIconType="MaterialIcons"
            title="Profile Information"
            onPress={onUpdateProfilePress}
          />
          <GCardD
            leftIconName="location-on"
            rightIconName="chevron-right"
            rightIconType="MaterialIcons"
            title="Address details"
            onPress={onAddressDetails}
          />
          <GCardD
            leftIconName="package"
            leftIconType="MaterialCommunityIcons"
            rightIconName="chevron-right"
            rightIconType="MaterialIcons"
            title="Subscription pack"
            onPress={onPackageDetails}
          />
          {/* <GCardD
            leftIconName="issue-opened"
            leftIconType="Octicons"
            rightIconName="chevron-right"
            rightIconType="MaterialIcons"
            title="Cleaner and Supervisor"
            onPress={onCleanerAndSuperVisor}
          /> */}
          <GCardD
            leftIconName="car"
            leftIconType="FontAwesome"
            rightIconName="chevron-right"
            rightIconType="MaterialIcons"
            title="My Cars"
            onPress={onCarList}
          />

          <GCardD
            leftIconName="money"
            leftIconType="FontAwesome"
            rightIconName="chevron-right"
            rightIconType="MaterialIcons"
            title="Payment History"
            onPress={onPaymentHistory}
          />
          <GCardD
            leftIconName="privacy-tip"
            leftIconType="MaterialIcons"
            rightIconName="chevron-right"
            rightIconType="MaterialIcons"
            title="Privacy Policy"
            onPress={onPrivacyPolicy}
          />
          <GCardD
            leftIconName="report"
            leftIconType="MaterialIcons"
            rightIconName="chevron-right"
            rightIconType="MaterialIcons"
            title="Issues"
            onPress={createdIssue}
          />
          <GCardD
            leftIconName="star"
            leftIconType="FontAwesome"
            rightIconName="chevron-right"
            rightIconType="MaterialIcons"
            title="Reviews and Ratings"
            onPress={reviews}
          />
        </View>
      </View>

      <View style={{marginVertical: 20}}>
        <GButton
          paddingHorizontal={10}
          paddingVertical={10}
          marginHorizontal={60}
          backgroundColor={color.blue}
          textAlign={fAlign.center}
          fontSize={fsize.p1}
          fontFamily={ffamily.semiBold}
          onPress={onLogout}>
          SIGN OUT
        </GButton>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
  topCardWrapper: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1.5,
    fontSize: fsize.h2,
    color: color.black,
    fontWeight: fWeight.bold,
  },
  buttonWrapper: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
