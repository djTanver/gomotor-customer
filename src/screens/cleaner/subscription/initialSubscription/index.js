import React from 'react';
import SelectSubscriptionScreen from './selectSubscriptionScreen';
import navigation from '../../../../utils/navigation';
import { cleanerNavigator } from './../../../../navigation/navigator';

export default () =>{
    
    const onContinue = () =>{
        navigation({path:cleanerNavigator.dashBoard});
    }
    
    return <SelectSubscriptionScreen 
                onContinue={onContinue}
            />
}
