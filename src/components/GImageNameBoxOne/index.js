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
  imageHeight = 46,
  imageWidth = 46,
  borderRadius =5,
  fontSize = fsize.p2,
  isImageSelected = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 5,
        margin: 10,
        borderWidth: isSelected ? 2 : 1,
        borderColor: isSelected ? color.blue : color.gray_Light,
        borderRadius: radius.default,
        ...containerStyle,
      }}>
      <Image
        source={image}
        style={{
          height: imageHeight,
          width: imageWidth,
          borderRadius: borderRadius,
          borderWidth: isImageSelected ? 3 : 0,
          borderColor: color.blue,
        }}
      />
      <GText
        fontFamily={ffamily.semiBold}
        fontSize={fontSize}
        textAlign={fAlign.center}>
        {name}
      </GText>
    </TouchableOpacity>
  );
};
