import React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GText from '../GText';
import {
  ffamily,
  fsize,
  fWeight,
  color as colors,
  radius,
  fAlign,
} from '../../theme';

export default ({
  children,
  onPress,
  gradientColors = [colors.orange, colors.orange],
  paddingHorizontal = 100,
  paddingVertical = 8,
  marginHorizontal,
  marginVertical,
  borderRadius = radius.default,
  buttonStyle,
  fontWeight,
  fontFamily = ffamily.semiBold,
  textAlign = fAlign.center,
  textStyle,
  fontSize = fsize.h6,
  color = colors.white,
  loading = false,
  loaderColor = colors.white,
  marginTop,
  disabled = false,
}) => {
  return (
    <LinearGradient
      colors={gradientColors}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      style={{
        marginTop,
        marginHorizontal,
        marginVertical,
        borderRadius,
        overflow: 'hidden',
        ...buttonStyle,
      }}>
      <TouchableOpacity
        onPress={onPress}
        disabled={loading || disabled}
        style={{
          paddingHorizontal,
          paddingVertical,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <GText
          color={color}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          fontSize={fontSize}
          textAlign={textAlign}
          style={textStyle}>
          {children}
        </GText>
        {loading && (
          <ActivityIndicator
            style={{position: 'absolute', right: 18}}
            animating={loading}
            color={loaderColor}
          />
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};
