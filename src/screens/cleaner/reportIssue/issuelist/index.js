import React from 'react';
import IssueListScreen from './issueListScreen';
import navigation from '../../../../utils/navigation';
import navigator from './../../../../navigation/navigator';

export default ( {route}) =>{
    const onContinue = () =>{
        navigation({path:navigator.createIssue});
    }
    return(
        <IssueListScreen
            onContinue={onContinue} route={route}/>
    )
}
