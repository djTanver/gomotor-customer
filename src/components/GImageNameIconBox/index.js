import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import GText from '../GText';
import GIcon from '../GIcon';
import {ffamily, fsize, color, radius} from '../../theme';

export default ({
  image,
  name,
  description,
  cardStyle,
  imageStyle,
  iconStyle,
  onIconPress,
  iconType,
  iconName,
  iconSize = fsize.h1,
  nameStyle,
  nameFont = ffamily.semiBold,
  nameSize = fsize.p1,
  nameColor,
  descriptionFont,
  descriptionSize = fsize.p2,
  descriptionColor = color.blue,
  descriptionStyle,
}) => {
  return (
    <View style={[style.mainWrapper, {...cardStyle}]}>
      <Image source={image} style={[style.image, {...imageStyle}]} />
      <View style={{flex: 1}}>
        <GText
          fontFamily={nameFont}
          fontSize={nameSize}
          color={nameColor}
          style={{...nameStyle}}>
          {name}
        </GText>
        <GText
          color={descriptionColor}
          fontSize={descriptionSize}
          fontFamily={descriptionFont}
          style={{...descriptionStyle}}>
          {description}
        </GText>
      </View>
      <GIcon
        onPress={onIconPress}
        name={iconName}
        type={iconType}
        size={iconSize}
        style={{marginRight: 16, ...iconStyle}}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.lineColor,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: radius.max,
    marginHorizontal: 12,
  },
});
