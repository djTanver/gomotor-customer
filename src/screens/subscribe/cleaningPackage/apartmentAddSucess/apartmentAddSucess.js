import React from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import GImageNameBox from '../../../../components/GImageNameBox';
import GText from '../../../../components/GText';
import GIcon from '../../../../components/GIcon';
import GButton from '../../../../components/GButton';
import GModal from '../../../../components/GModal';
import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from '../../../../theme';

export default ({onContinue}) => {
  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 10, justifyContent: 'center'}}>
        <GIcon
          name="apartment"
          size={fsize.xlarge}
          style={{textAlign: 'center'}}
        />

        <GText
          fontFamily={ffamily.bold}
          fontSize={fsize.p1}
          color={color.gray}
          textAlign={fAlign.center}
          style={{marginTop: 12}}>
          Your Apartment request has been Added. We will reach you shortly.
        </GText>

        <GButton
          marginHorizontal={30}
          marginVertical={10}
          paddingHorizontal={10}
          onPress={onContinue}
          buttonStyle={{marginTop: 20}}>
          Thank You
        </GButton>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
});
