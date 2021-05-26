import React, { useState } from 'react';
import {Alert} from 'react-native';
import { authNavigator } from '../../../../navigation/navigator';
import RegisterFormScreen from './registerFormScreen';
import { send_register_otp } from './../../../../store/auth/services';
import Toast from 'react-native-simple-toast';

export default ({ navigation }) =>{

    const [ formData, setFormData ] = useState({
        phone: null,
        email: null,
        username: null,
        isValidPhone: true,
        isValidUsername: true,
        isValidEmail: true
    });

    const [ isSendOtp, setSendOtp ] = useState(false);

    const onInputChange = (name,value) =>{
        setFormData({
            ...formData,
            [name]:value,
        })
    }

    const handleFieldValidation = (name, value) => {
        
        switch(name){
            case 'username': 
            const nameRegExp =  /^[a-zA-Z ]{2,30}$/;
            console.log("username =======>"+ nameRegExp.test(value));
            if(value.length < 4 || !nameRegExp.test(value)){
                setFormData({
                    ...formData,
                    isValidUsername:false
                });
            }else{
                setFormData({
                    ...formData,
                    isValidUsername:true
                });
            }
                break;
            case 'email':
                var emailRegEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
                if(value.length < 4 || !emailRegEx.test(value)){
                    setFormData({
                        ...formData,
                        isValidEmail:false
                    });
                }else{
                    setFormData({
                        ...formData,
                        isValidEmail:true
                    });
                }
                break;
            case 'phone':
                var phoneRegex  = /^[789]\d{9}$/;
                if(value.length < 4 || !phoneRegex.test(value)){
                    setFormData({
                        ...formData,
                        isValidPhone:false
                    });
                }else{
                    setFormData({
                        ...formData,
                        isValidPhone:true
                    });
                }
                break;
        }
    }

    const onContinue = async() =>{

        try {
            if(!formData.phone || !formData.email || !formData.username){
                Toast.show("Please enter all the fields.")
                return;
            }
            const {isValidEmail, isValidPhone, isValidUsername} = formData;
            if(!isValidEmail || !isValidEmail || !isValidUsername){
                Toast.show("Please enter valid data.")
                return;
            }
            if(!isValidPhone ){
                Toast.show("Please enter 10 digit mobile number.")
                return;
            }
            setSendOtp(true);
            const data = {
                phone: `+91${formData.phone}`,
                email: formData.email
            }
            const response = await send_register_otp(data);
            setSendOtp(false);
            if(response && response.type == "success"){
                navigation.navigate(authNavigator.verifyOtpRegister,{data:{
                    ...formData,
                    phone: `+91${formData.phone}`,
                }});        
            }
        } catch (error) {
            setSendOtp(false);
            
        }
    }

    return <RegisterFormScreen
                onContinue={onContinue}
                formData={formData}
                onInputChange={onInputChange}
                isSendOtp={isSendOtp}
                handleFieldValidation={handleFieldValidation}
            />
}
