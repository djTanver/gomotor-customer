import React from 'react';
import DashBoardScreen from './allServicesSearch';
import navigator from '../../../navigation/navigator';
import navigation from '../../../utils/navigation';

export default () =>{

    const onContinue = () =>{
        navigation({path:navigator.selectModel});
    }

    return(
        <DashBoardScreen
            onContinue={onContinue}
        />
    )
}
