import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import GText from '../GText';
import {fsize, fWeight, color, fAlign, ffamily, radius} from './../../theme';

export default ({colors = color.blue_dark, size = 30, style, text}) => {
  return (
    <View
      style={{
        // flex: 1,
        width: 80,
        height: 80,
        borderColor: color.gray,
        borderWidth: 1,
        borderRadius: radius.default,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.white,
      }}>
      <ActivityIndicator color={colors} size={size} style={style} />
      {/* <GText
        style={{marginTop: 40}}
        color={color.blue}
        fontSize={fsize.h5}
        textAlign={fAlign.center}>
        {text}
      </GText> */}
    </View>
  );
};
