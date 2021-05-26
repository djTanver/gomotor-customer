import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'; 
import GButton from '../../../../components/GButton';
import Gtext from '../../../../components/GText';
import {fsize, fWeight, color, fAlign, ffamily} from '../../../../theme';

export default ({phone, setOtp, isVerifyOtp, onContinue, otp, reSendOtp}) => {
  return (
    <ScrollView
      contentContainerStyle={style.scrollView}
      keyboardShouldPersistTaps={'handled'}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1, marginHorizontal: 26}}>
          <View style={{flex: 0.5}}>
            <Gtext
              fontSize={fsize.h4}
              fontFamily={ffamily.bold}
              color={color.blue}
              style={{marginTop: '10%'}}>
              Verify OTP
            </Gtext>
            <Gtext
              color={color.gray}
              fontFamily={ffamily.semiBold}
              fontSize={fsize.h6}
              style={{marginTop: '2%'}}>
              OTP sent to &nbsp;
              <Gtext color={color.blue}>{phone}</Gtext>
            </Gtext>
          </View>

          <View>
            <View style={{justifyContent: 'center'}}>
              <OTPInputView
                pinCount={6}
                style={{height: 100}}
                codeInputFieldStyle={style.codeInputField}
                editable={!isVerifyOtp}
                onCodeFilled={(code) => {
                  onContinue(code);
                }}
                onCodeChanged={(code) => {
                  setOtp(code);
                }}
              />
              <Gtext
                fontSize={fsize.h6}
                fontFamily={ffamily.normal}
                color={color.gray}
                textAlign={fAlign.center}>
                Didn't receive code ?
                <Gtext
                  onPress={() => reSendOtp()}
                  color={color.blue}
                  fontSize={fsize.h5}
                  fontFamily={ffamily.normal}
                  style={{marginTop: 10}} >
                  {''} {''} Resend
                </Gtext>
              </Gtext>
            </View>
            <View style={style.buttonWrapper}>
              <GButton
                loading={isVerifyOtp}
                onPress={() => {
                  onContinue(otp);
                }}>
                Continue
              </GButton>
            </View>
          </View>

          <View style={style.footerWrapper}></View>
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
  textInput: {
    flex: 1.5,
    fontSize: fsize.h2,
    color: color.black,
    fontWeight: fWeight.bold,
  },
  buttonWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  footerWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeInputField: {
    borderColor: color.white,
    borderBottomColor: color.gray,
    borderBottomWidth: 2,
    color: color.black,
    fontSize: fsize.h3,
    fontWeight: fWeight.bold,
  },
});
