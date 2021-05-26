import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  Text,
  Image,
} from 'react-native';
import GButton from '../../../../components/GButton';
import Gtext from '../../../../components/GText';
import {fsize, fWeight, color, fAlign, ffamily} from './../../../../theme';

export default ({onContinue, onRegister, phone, setPhone, isSendOtp}) => {
  return (
    <ScrollView contentContainerStyle={style.scrollView} keyboardShouldPersistTaps={'handled'}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1, marginHorizontal: 26}}>
          <View>
            <Gtext
              fontSize={fsize.h4}
              fontFamily={ffamily.bold}
              color={color.blue}
              style={{marginTop: '10%'}}>
              Login
            </Gtext>
            <Gtext
              color={color.gray}
              fontFamily={ffamily.semiBold}
              fontSize={fsize.h6}
              style={{marginTop: '2%'}}>
              Please login to continue
            </Gtext>
          </View>

          {/* <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10%',
            }}>
            <Image
              style={{width: 200, height: 60}}
              source={require('../../../../assets/logo.png')}
            />
          </View> */}

          <View
            style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <View style={{justifyContent: 'center', alignContent: 'center'}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '10%',
                }}>
                <Image
                  style={{width: 200, height: 60}}
                  source={require('../../../../assets/logo.png')}
                />
              </View>

              {/* <Gtext
                color={color.gray}
                fontFamily={ffamily.semiBold}
                fontSize={fsize.h6}
                textAlign={fAlign.center}>
                Enter your phone number
              </Gtext> */}
              <View style={style.inputWrapper}>
                <Gtext
                  fontSize={fsize.h3}
                  textAlign={fAlign.center}
                  style={{flex: 0.4}}
                  fontFamily={ffamily.semiBold}
                  fontWeight={fWeight.bold}>
                  + 91
                </Gtext>
                <TextInput
                  maxLength={10}
                  placeholder="Mobile Number"
                  keyboardType={Platform.OS=="android"?"numeric":"phone-pad"}
                  style={style.textInput}
                  value={phone}
                  onChangeText={(value) =>{ 
                    let phoneNum = value.replace(/\D/gm, '');
                    setPhone(phoneNum)}
                    }
                />
              </View>
              <Gtext
                color={color.gray}
                fontSize={fsize.h6}
                textAlign={fAlign.center}
                fontFamily={ffamily.semiBold}
                style={{marginTop: 5}}>
                OTP will be sent on this No, for verification
              </Gtext>
            </View>
            <View style={style.buttonWrapper}>
              <GButton onPress={onContinue} loading={isSendOtp} fontSize={fsize.p1}
              fontFamily={ffamily.bold}>
                Login to Continue
              </GButton>
            </View>
          </View>
          {/* register */}
        </View>
        <View style={style.footerWrapper}>
          <Gtext
            color={color.gray}
            fontSize={fsize.h6}
            fontFamily={ffamily.semiBold}>
            New to GoMotorCar |
            <Gtext
              color={color.blue}
              fontSize={fsize.h5}
              fontFamily={ffamily.semiBold}
              onPress={onRegister}>
              Register
            </Gtext>
          </Gtext>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1.5,
    fontSize: fsize.h3,
    color: color.black,
    fontWeight: fWeight.bold,
  },
  buttonWrapper: {
    // flex: 0.5,
    marginTop: '7%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerWrapper: {
    // flex: 0.5,
    marginBottom: '13%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
