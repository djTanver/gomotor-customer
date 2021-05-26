import React from 'react';
import CreatedIssueScreen from './createdIssueScreen';
import navigation from '../../../../utils/navigation';
import { cleanerNavigator } from './../../../../navigation/navigator';

export default ({route}) =>{
    
    const onContinue = () =>{
        navigation({path:cleanerNavigator.dashBoard});
    }
    
    return <CreatedIssueScreen 
                onContinue={onContinue} route={route}
            />
}
