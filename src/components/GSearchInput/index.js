import React from 'react';
import {View, TextInput} from 'react-native';
import GIcon from '../GIcon';
import {ffamily, fsize, color, radius} from '../../theme';

export default ({placeholder, containerStyle}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        borderColor: color.gray_Light,
        borderRadius: radius.default,
        borderWidth: 2,
        ...containerStyle,
      }}>
      <TextInput
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: 6,
          paddingLeft: 12,
          fontFamily: ffamily.semiBold,
          fontSize: fsize.p1,
        }}
      />
      <GIcon
        name="search"
        size={fsize.h1}
        color={color.blue}
        style={{marginRight: 12}}
      />
    </View>
  );
};
