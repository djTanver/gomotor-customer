import React from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GText from '../GText';
import {ffamily, fsize, color as colors, radius} from '../../theme';

export default ({
  onPress,
  gradientFrom = colors.blue_Dark,
  gradientTo = colors.blue,
  height = 75,
  width = '30%',
  borderRadius = radius.default,
  alignItems = 'center',
  justifyContent = 'space-around',
  cardStyle,
  topText,
  topTextStyle,
  bottomText,
  bottomTextStyle,
  topFontSize = fsize.h5,
  bottomFontSize = fsize.p1,
  topFontColor = colors.white,
  bottomFontColor = colors.white,
}) => {
  return (
    <LinearGradient
      colors={[gradientFrom, gradientTo]}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      style={{
        height,
        width,
        borderRadius,
        alignItems,
        justifyContent,
        ...cardStyle,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignItems,
          justifyContent,
          ...cardStyle,
        }}>
        <GText
          color={topFontColor}
          fontFamily={ffamily.bold}
          fontSize={topFontSize}
          style={topTextStyle}>
          {topText}
        </GText>
        <GText
          color={bottomFontColor}
          fontSize={bottomFontSize}
          fontFamily={ffamily.bold}
          style={{bottomTextStyle}}>
          {bottomText}
        </GText>
      </TouchableOpacity>
    </LinearGradient>
  );
};
