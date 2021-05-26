import React from 'react';
import CarListScreen from './carListScreen';
import authSelector from '../../../store/auth/selector';
import {useSelector} from 'react-redux';

export default () =>
{
    const user = useSelector(authSelector.user);

    return(
        <CarListScreen user={user} />
    )
}


