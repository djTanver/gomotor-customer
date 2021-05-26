import React from 'react';
import {useSelector} from 'react-redux';
import AddressDetailScreen from './addressDetailScreen';
import authSelector from '../../../store/auth/selector';
export default ({route}) => {
  const user = useSelector(authSelector.user);
  return <AddressDetailScreen user={user} route={route} />;
};
