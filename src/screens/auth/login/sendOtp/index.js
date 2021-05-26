import React, { useState } from 'react';
import { authNavigator } from '../../../../navigation/navigator';
import SendOtpScreen from './sendOtpScreen';
import { send_login_otp } from './../../../../store/auth/services';
import {showtoast} from '../../../../utils/error'


export default ({ navigation }) =>{

    const [ phone, setPhone ] = useState("");
    const [ isSendOtp, setSendOtp ] = useState(false);

    const onContinue = async() =>{
        if(phone){
            try {
                setSendOtp(true);
                const data = {
                    "phone" : `+91${phone}`
                }
                const response = await send_login_otp(data);
                setSendOtp(false);
                if(response && response.type == "success"){
                    navigation.navigate(authNavigator.verifyOtp,{ phone:`+91${phone}`, isLogin:true });
                }
            } catch (error) {
                setSendOtp(false);
            }
        }else{
            showtoast("Please enter Mobile Number")
        }
    }

    const onRegister = () =>{
        navigation.navigate(authNavigator.registerForm);
    }

    return <SendOtpScreen
                onContinue={onContinue}
                onRegister={onRegister}
                phone={phone}
                setPhone={setPhone}
                isSendOtp={isSendOtp}
            />
}
