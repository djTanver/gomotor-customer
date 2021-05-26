import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import GText from '../GText';
import {ffamily, fsize, color, radius, fAlign} from '../../theme';

export default ({
  onPress,
  image,
  isSelected,
  name,
  containerStyle,
  imageHeight,
  imageWidth,
  borderRadius = radius.max,
  innerBorderRadius = radius.max,
  fontSize = fsize.h6,
  isImageSelected = false,
  item,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 6,
        margin: 6,
        borderWidth: isSelected ? 2 : 0,
        borderColor: color.blue,
        borderRadius: borderRadius,
        ...containerStyle,
      }}>
      <Image
        source={image}
        style={{
          height: imageHeight ? imageHeight : 60,
          width: imageWidth ? imageWidth : 60,
          borderRadius: innerBorderRadius,
          borderWidth: isImageSelected ? 3 : 1,
          borderColor: color.blue,
        }}
      />
      <GText
        color={color.gray}
        fontFamily={ffamily.semiBold}
        fontSize={fontSize}
        textAlign={fAlign.center}>
        {name}
      </GText>
    </TouchableOpacity>
  );
};
