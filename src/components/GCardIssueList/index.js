import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import GText from '../GText';
import GIcon from '../GIcon';
import {ffamily, fsize, color, radius} from '../../theme';
import API_ENDPOINT from '../../config/api';
import localphoto from '../../assets/cleaning.jpg';

export default ({
  status,
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
        borderColor: color.lineColor,
        borderWidth: 1,
        borderRadius: radius.default,
        ...cardStyle,
      }}>
      {status == 'closed' ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginLeft: 10,
            height: 6,
            width: 6,
            backgroundColor: color.green,
            borderRadius: 50,
          }}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginLeft: 10,
            height: 6,
            width: 6,
            backgroundColor: color.blue_Dark,
            borderRadius: 50,
          }}
        />
      )}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 10,
        }}>
        <Image
          source={image ? {uri: API_ENDPOINT + image} : localphoto}
          style={{height: imageHeight, width: imageWidth, borderRadius: 5}}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', marginLeft: 12}}>
        <GText fontSize={fsize.p1} fontFamily={ffamily.bold} color={color.blue}>
          {centerTopText}
        </GText>
        <GText
          fontSize={fsize.p1}
          style={{marginTop: 2}}
          fontFamily={ffamily.bold}
          color={color.gray}>
          {centerMiddleText}
        </GText>
        <GText
          fontSize={fsize.p2}
          fontFamily={ffamily.bold}
          color={color.gray_Light}
          style={{marginTop: 4}}>
          {centerBottomTextA}
          {/* <GText
                        fontSize={fsize.p2}
                        fontFamily={ffamily.bold}
                        > |
                    </GText> */}
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
