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
import GText from '../../../../components/GText';

export default ({phone, setOtp, isVerifyOtp, onContinue, otp}) => {
  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1, marginHorizontal: 26}}>
          <View style={{flex: 0.5}}>
            <GText
              fontSize={fsize.h4}
              fontFamily={ffamily.bold}
              color={color.blue}
              style={{marginTop: '10%'}}>
              Verify OTP
            </GText>
            <GText
              color={color.gray}
              fontFamily={ffamily.semiBold}
              fontSize={fsize.h6}
              style={{marginTop: '2%'}}>
              Code is send to &nbsp;
              <GText color={color.blue}>{phone}</GText>
            </GText>
          </View>

          <View style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
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
              <Gtext color={color.gray} textAlign={fAlign.center}>
                Didn't receive code ?
                <GText color={color.blue} style={{marginTop: 10}}>
                  Resend
                </GText>
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
