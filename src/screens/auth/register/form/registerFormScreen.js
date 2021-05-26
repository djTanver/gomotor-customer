import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, TextInput} from 'react-native';
import {
  fsize,
  fWeight,
  color,
  fAlign,
  radius,
  ffamily,
} from '../../../../theme';
import GButton from '../../../../components/GButton';
import Gtext from '../../../../components/GText';

export default ({onContinue, formData, onInputChange, isSendOtp, handleFieldValidation}) => {
  const {phone, email, username, isValidUsername, isValidPhone, isValidEmail} = formData;

  return (
    <ScrollView contentContainerStyle={style.scrollView} keyboardShouldPersistTaps={'handled'}>
      <View style={{flex: 1, marginHorizontal: 26}}>
        <View style={{marginVertical: '7%'}}>
          <Gtext
            fontSize={fsize.h5}
            fontFamily={ffamily.bold}
            textAlign={fAlign.left}>
            Create an Account
          </Gtext>
          <Gtext
            color={color.gray}
            fontFamily={ffamily.semiBold}
            textAlign={fAlign.left}
            fontSize={fsize.h6}
            style={{marginTop: 4}}>
            Please provide the following information
          </Gtext>
        </View>

        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={style.formWrapper}>
              <TextInput
                placeholder="Full name"
                style={{
                  borderColor: '#a2bcdd',
                  backgroundColor: '#DCE6F2',
                  borderRadius: 5,
                  borderWidth: 1,
                  paddingLeft: 14,
                  marginBottom: '5%'
                }}
                value={username}
                onChangeText={(value) => {
                  onInputChange('username', value);
                }}
                onEndEditing={(e) => handleFieldValidation('username',e.nativeEvent.text)}
              />
              {!formData.isValidUsername && <Gtext
              color='#ff0000'
              fontFamily={ffamily.semiBold}
              textAlign={fAlign.left}
              fontSize={fsize.p1}
              style={{margin:0, paddingBottom: 10}}>
              Please enter your full name.
              </Gtext>

              }

              <TextInput
                placeholder="Email ID"
                style={{
                  borderColor: '#a2bcdd',
                  backgroundColor: '#DCE6F2',
                  borderRadius: 5,
                  borderWidth: 1,
                  paddingLeft: 14,
                  marginBottom: '5%',
                }}
                value={email}
                onChangeText={(value) => {
                  onInputChange('email', value);
                }}
                onEndEditing={(e) => handleFieldValidation('email',e.nativeEvent.text)}
              />
              {!formData.isValidEmail && <Gtext
              color='#ff0000'
              fontFamily={ffamily.semiBold}
              textAlign={fAlign.left}
              fontSize={fsize.p1}
              style={{margin:0, paddingBottom: 10}}>
              Please enter valid email address.
              </Gtext>
              }
              <TextInput
                placeholder="Phone number"
                keyboardType={Platform.OS=="android"?"numeric":"phone-pad"}
                style={{
                  borderColor: '#a2bcdd',
                  backgroundColor: '#DCE6F2',
                  borderRadius: 5,
                  borderWidth: 1,
                  paddingLeft: 14,
                  marginBottom: '5%',
                }}
                value={phone}
                maxLength={10}
                onChangeText={(value) =>{ 
                  let phoneNum = value.replace(/\D/gm, '');
                  onInputChange('phone',phoneNum)}
                  }
                onEndEditing={(e) => handleFieldValidation('phone',e.nativeEvent.text)}
              />
              {!formData.isValidPhone && <Gtext
              color='#ff0000'
              fontFamily={ffamily.semiBold}
              textAlign={fAlign.left}
              fontSize={fsize.p1}
              style={{margin:0, paddingBottom: 10}}>
              Please enter valid phone number.
              </Gtext>
              }
               <View style={style.buttonWrapper}>
                {/* <Gtext
                  color={color.gray}
                  fontSize={fsize.p1}
                  textAlign={fAlign.center}
                  style={{marginVertical: 10}}>
                  Click continue to select the services which you provide to our
                  customers.
                </Gtext> */}

                <GButton onPress={onContinue} loading={isSendOtp}>
                  Continue
                </GButton>
            </View>
            </View>
           
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textInput: {
    fontSize: fsize.h2,
    color: color.black,
    fontWeight: fWeight.bold,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
   
  },
  footerWrapper: {
    
    alignItems: 'center',
    justifyContent: 'center',
  },
});
