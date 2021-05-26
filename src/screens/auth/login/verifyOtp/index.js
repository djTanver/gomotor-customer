import React, { useState } from 'react';
import VerifyOtpScreen from './verifyOtpScreen';
import { loginUser } from './../../../../store/auth/thunk';
import { useDispatch } from 'react-redux';
import {showtoast} from '../../../../utils/error'
import { resend_otp } from './../../../../store/auth/services';

export default ({ route }) =>{

    const [ otp, setOtp ] = useState(null);
    const [ isVerifyOtp, setVerifyOtp ] = useState(false);

    const dispatch = useDispatch();

    const onContinue = async(otp) =>{
        const data = {
            identifier:route.params.phone,
            otp,
        }

        const cb = () =>{
            setVerifyOtp(false);
        }

        setVerifyOtp(true);
        dispatch(loginUser(data,cb));
    }

    async function reSendOtp() {
        let _otpObj = {};
        try {
          if (route.params.isLogin) {
            _otpObj = {
              phone: route.params.phone,
            };
            let response = await resend_otp(_otpObj);
            // console.log('respons', response);
          } else {
            _otpObj = {
              phone: `${
                route.params && route.params.phone
                  ? route.params.phone
                  : route.params.basic.phone
              }`,
              email:
                route.params && route.params.email
                  ? route.params.email
                  : route.params.basic.email,
            };
            let response = await resend_register_otp(_otpObj);
            // console.log('respons', response);
          }
        } catch (err) {
          console.log('error', err);
        }
      }

    return <VerifyOtpScreen
                phone={route.params.phone} 
                setOtp={setOtp}
                isVerifyOtp={isVerifyOtp}
                onContinue={onContinue}
                otp={otp}
                reSendOtp={reSendOtp}
            />
}
