import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Touchable,
  StyleSheet,
  Text,
} from 'react-native';
import GText from '../GText';
import GIcon from '../GIcon';
import {ffamily, fsize, color, radius} from '../../theme';
import LcIcon from '../../assets/ic_launcher.png';

export default ({
  onPress,
  cardStyle,
  cardHeight = 76,
  cardMarginTop = 8,
  image,
  imageHeight = 40,
  imageWidth = 40,
  centerTopText,
  centerMiddleText,
  centerBottomTextA,
  centerBottomTextB,
  iconName,
  iconColor,
  iconSize = fsize.h1,
  isLine,
  type,
  onIconPress,
  read,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: color.white,
        width: '100%',
        // height:cardHeight,
        paddingVertical: 3,
        marginTop: cardMarginTop,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: radius.default,
      }}>
      <View style={{width: '87%'}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: 8,
            justifyContent: 'space-between',
            width: '100%',
          }}
          onPress={onPress}>
          <View style={{width: '15%'}}>
            <Image source={LcIcon} style={style.topCardImage} />
          </View>

          <View style={{width: '82%', justifyContent: 'center'}}>
            <GText
              fontFamily={ffamily.bold}
              fontSize={fsize.h6}
              numberOfLines={1}>
              {centerTopText}
            </GText>
            <GText
              fontSize={fsize.p1}
              fontFamily={ffamily.semiBold}
              color={color.gray}
              numberOfLines={2}>
              {centerMiddleText}
            </GText>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width: '10%'}}>
        <TouchableOpacity onPress={onIconPress}>
          <GIcon
            type="MaterialCommunityIcons"
            name="delete"
            size={25}
            color={color.blue}></GIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: color.white,
  },
  topCardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.gray_Light,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  topCardImage: {
    height: 45,
    width: 45,
    borderRadius: 5,
    //   marginRight: 20
    //   marginHorizontal: 12,
  },
  timingsBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cleanerView: {
    // height:35,
    padding: 8,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  progress: {
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  modalText: {
    textAlign: 'center',
  },
});
