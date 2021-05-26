import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import GText from '../GText';
import GIcon from '../GIcon';
import {ffamily, fsize, color, radius} from '../../theme';

export default ({
  onPress,
  cardStyle,
  cardHeight = 76,
  cardMarginTop = 6,
  image,
  imageHeight = 40,
  imageWidth = 40,
  centerTopText,
  centerMiddleText,
  centerBottomTextA,
  centerBottomTextB,
  iconName,
  iconColor = color.black,
  iconSize = fsize.h1,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: cardHeight,
        marginTop: cardMarginTop,
        flexDirection: 'row',
        borderColor: color.gray_Light,
        borderWidth: 1,
        borderRadius: radius.default,
        ...cardStyle,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 12,
        }}>
        <Image
          source={image}
          style={{height: imageHeight, width: imageWidth, borderRadius: 100}}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', marginLeft: 12}}>
        <GText fontSize={fsize.p1} fontFamily={ffamily.bold}>
          {centerTopText}
        </GText>
        <GText fontSize={fsize.p2} color={color.gray} style={{marginTop: 2}}>
          {centerMiddleText}
        </GText>
        <GText
          fontSize={fsize.p2}
          fontFamily={ffamily.bold}
          color={color.blue}
          style={{marginTop: 4}}>
          {centerBottomTextA}
          <GText fontSize={fsize.p2} fontFamily={ffamily.bold}>
            {' '}
            |
          </GText>
          <GText
            fontSize={fsize.p2}
            fontFamily={ffamily.bold}
            color={color.blue}>
            {' '}
            {centerBottomTextB}
          </GText>
        </GText>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 12,
        }}>
        <GIcon name={iconName} color={iconColor} size={iconSize} />
      </View>
    </TouchableOpacity>
  );
};
