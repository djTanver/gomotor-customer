import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { authNavigator } from './navigator';
import sendOtp from '../screens/auth/login/sendOtp';
import verifyOtp from '../screens/auth/login/verifyOtp';
import RegisterForm from '../screens/auth/register/form';
import VerifyOtpRegister from '../screens/auth/register/otpVerify';

const Stack = createStackNavigator();

const AuthStack = () => {
 
    return (
        <Stack.Navigator initialRouteName={authNavigator.loginSendOtp}>
            <Stack.Screen 
                name={authNavigator.loginSendOtp} 
                component={sendOtp} 
                options={{
                    headerShown:false                  
                }}
            />
            <Stack.Screen 
                name={authNavigator.verifyOtp} 
                component={verifyOtp} 
                options={{title:""}} 
            />
            <Stack.Screen 
                name={authNavigator.registerForm} 
                component={RegisterForm} 
                options={{title:"Registration"}} 
            />
            <Stack.Screen 
                name={authNavigator.verifyOtpRegister} 
                component={VerifyOtpRegister} 
                options={{title:"Registration"}} 
            />
        </Stack.Navigator>
    )
}

export default AuthStack;
