import React from 'react';
import PaymentSucessScreen from './paymentSucessScreen';
import navigator from '../../../../navigation/navigator';
import navigation from '../../../../utils/navigation';

export default () =>{

    const onContinue = () =>{
        navigation({path:navigator.dashBoard});
    }

    return(
        <PaymentSucessScreen
            onContinue={onContinue}
        />
    )
}
