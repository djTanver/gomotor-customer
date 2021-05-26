import React from 'react';
import {View} from 'react-native';
import GText from '../../../../components/GText';
import GButton from '../../../../components/GButton';
import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from '../../../../theme';

export default ({carNumber, textA}) => {
  return (
    <View style={{flex: 1, margin: 12, alignItems: 'center'}}>
      <GText
        textAlign={fAlign.center}
        fontFamily={ffamily.bold}
        style={{
          paddingHorizontal: 30,
          paddingVertical: 10,
          marginTop: 12,
          backgroundColor: color.gray_Light,
          borderRadius: radius.h4,
        }}>
        {carNumber}
      </GText>
      <GText textAlign={fAlign.center} style={{marginTop: 12}}>
        {textA}
      </GText>
      <View style={{flex: 1, flexDirection: 'row', marginTop: 12}}>
        <View style={{flex: 1}}>
          <GText
            textAlign={fAlign.center}
            fontFamily={ffamily.bold}
            color={color.blue}>
            3
            <GText textAlign={fAlign.center} fontFamily={ffamily.bold}>
              {' '}
              / 12
            </GText>
          </GText>
          <GButton
            marginHorizontal={20}
            paddingHorizontal={10}
            paddingVertical={6}
            gradientColors={['#048CD0', '#33E1FF']}
            textAlign={fAlign.center}
            buttonStyle={{marginTop: 12}}
            fontSize={fsize.h5}
            fontFamily={ffamily.semiBold}>
            Exterior
          </GButton>
        </View>
        <View style={{flex: 1}}>
          <GText
            textAlign={fAlign.center}
            fontFamily={ffamily.bold}
            color={color.blue}>
            1
            <GText textAlign={fAlign.center} fontFamily={ffamily.bold}>
              {' '}
              / 3
            </GText>
          </GText>
          <GButton
            marginHorizontal={20}
            paddingHorizontal={10}
            paddingVertical={6}
            textAlign={fAlign.center}
            buttonStyle={{marginTop: 12}}
            fontSize={fsize.h5}
            fontFamily={ffamily.semiBold}>
            Interior
          </GButton>
        </View>
      </View>
    </View>
  );
};
