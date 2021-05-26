import React from 'react';
import {View} from 'react-native';
import GText from '../GText';
import {ffamily, fsize, color} from '../../theme';

export default ({
  paddingHorizontal = 8,
  marginTop = 20,
  leftText,
  rightTextA,
  rightTextB,
  cardStyle,
}) => {
  return (
    <View
      style={{
        paddingHorizontal,
        marginTop,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...cardStyle,
      }}>
      <GText fontSize={fsize.h6} fontFamily={ffamily.semiBold}>
        {leftText}
      </GText>
      <GText
        fontSize={fsize.h5}
        color={color.blue}
        fontFamily={ffamily.semiBold}>
        {rightTextA}
        <GText fontFamily={ffamily.semiBold} fontSize={fsize.h5}>
          {' '}
          / {rightTextB}
        </GText>
      </GText>
    </View>
  );
};
