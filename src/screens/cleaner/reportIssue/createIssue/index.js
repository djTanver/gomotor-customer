import React from 'react';
import CreateIssueScreen from './createIssueScreen';
import navigation from '../../../../utils/navigation';
import { cleanerNavigator } from './../../../../navigation/navigator';

export default () =>{
    
    const onSubmit = () =>{
        navigation({path:cleanerNavigator.createdIssue});
    }
    
    return <CreateIssueScreen 
                onSubmit={onSubmit}
            />
}
