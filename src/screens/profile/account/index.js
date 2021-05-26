import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import AccountScreen from './accountScreen';
import navigation from '../../../utils/navigation';
import navigator, { authNavigator } from './../../../navigation/navigator';
import {clearUser} from '../../../store/auth/slice';
import authSelector from '../../../store/auth/selector';
import {get_user_orders} from '../../../store/cleaningPackage/services';
import moment from 'moment';
import Loader from '../../../components/Loader';
import { navigationRef } from '../../../../App';
import { StackActions } from '@react-navigation/native';
import {clearAllNotificationAction} from '../../../store/cleaningPackage/slice'

export default () => {
  const [cleanLoading, setCleanLoading] = useState(false);
  const user = useSelector(authSelector.user);

  const dispatch = useDispatch();

  const onUpdateProfilePress = () => {
    navigation({path: navigator.updateProfile});
  };

  const onAddressDetails = () => {
    navigation({path: navigator.addressDetail});
  };

  const onPackageDetails = async() => {
    try {
      console.log("im hererererererererereerr");
      setCleanLoading(true);
      const today = moment().add(1, 'days').format( 'YYYY-MM-DD' );
      const result = await get_user_orders( user.id, today );
      setCleanLoading(false);
      if (result > 0) {
        navigation({path: navigator.packageDetail, params:{isCarAdded:''}});
      } else {
        navigation({path: navigator.selectAddress});
      }
      
    } catch (error) {
      setCleanLoading(false);
      navigation({path: navigator.packageDetail});
      console.log('error: ', error);
    }
    //navigation({path: navigator.packageDetail});
  };

  const onCleanerAndSuperVisor = () => {
    navigation({path: navigator.cleanerAndSuperVisor});
  };

  const onCarList = () => {
    navigation({path: navigator.cartList});
  };

  const createdIssue = () => {
    console.log("isuue")
    navigation({path: navigator.issueList});
  };

  const reviews = () => {
    navigation({path: navigator.reviewAndRatings});
  };

  const onLogout = () => {
    dispatch(clearAllNotificationAction())
    dispatch(clearUser());
  };

  const onPrivacyPolicy = () => {
    navigation({path: navigator.privacyPolicy})
  }

  const onPaymentHistory = () =>
  {
    navigation({path: navigator.paymentHistory});

  }
  if (cleanLoading) {
    return <Loader />;
  }
  return (
    <AccountScreen
      onUpdateProfilePress={onUpdateProfilePress}
      onAddressDetails={onAddressDetails}
      onPackageDetails={onPackageDetails}
      onCarList={onCarList}
      onCleanerAndSuperVisor={onCleanerAndSuperVisor}
      onLogout={onLogout}
      createdIssue={createdIssue}
      reviews={reviews}
      onPaymentHistory={onPaymentHistory}
      onPrivacyPolicy={onPrivacyPolicy}
      user={user}
    />
  );
};
