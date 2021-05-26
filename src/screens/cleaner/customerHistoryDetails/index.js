import React from 'react';
import CustomerHistoryDetailsScreen from './customerHistoryDetailsScreen';
import navigation from '../../../utils/navigation';
import { cleanerNavigator } from './../../../navigation/navigator';

export default () =>{
    cleanerNavigator.createIssue

    const onReportIssue = () =>{
        navigation({path:cleanerNavigator.createIssue});
    }

    return(
        <CustomerHistoryDetailsScreen 
            onReportIssue={onReportIssue}
        />
    )
}
