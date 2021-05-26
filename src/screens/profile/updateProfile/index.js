import React from 'react';
import {useSelector} from 'react-redux';
import authSelector from '../../../store/auth/selector';
import UpdateProfileScreen from './updateProfileScreen';
// import
export default () => {
  const user = useSelector(authSelector.user);
  return <UpdateProfileScreen user={user} />;
};
