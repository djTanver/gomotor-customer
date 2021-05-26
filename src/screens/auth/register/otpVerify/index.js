import React, { useState } from 'react';
import VerifyOtpScreen from './verifyOtpScreen';
import { registerUser } from './../../../../store/auth/thunk';
import { useDispatch } from 'react-redux';

export default ({ route }) =>{

    const [ otp, setOtp ] = useState(null);
    const [ isVerifyOtp, setVerifyOtp ] = useState(false);

    const dispatch = useDispatch();

    const onContinue = async(otp) =>{

        const data = {
            phone:route.params.data.phone,
            email:route.params.data.email,
            username:route.params.data.username,
            role: "Customer",
            otp,
        }

        const cb = () =>{
            setVerifyOtp(false);
        }

        setVerifyOtp(true);
        dispatch(registerUser(data,cb));
    }

    return <VerifyOtpScreen
                phone={route.params.data.phone} 
                setOtp={setOtp}
                isVerifyOtp={isVerifyOtp}
                onContinue={onContinue}
                otp={otp}
            />
}
