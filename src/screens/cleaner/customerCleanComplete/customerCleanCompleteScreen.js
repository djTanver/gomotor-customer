import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import CleanerProgressCard from '../../../components/CleanerProgressCard';
import GIcon from '../../../components/GIcon';
import GImageNameIconBox from '../../../components/GImageNameIconBox';
import GText from '../../../components/GText';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';

export default () => {
  return (
    <View style={style.mainWrapper}>
      <Image
        source={require('../../../assets/car.jpg')}
        style={{width: '100%', flex: 1}}
      />

      <View
        style={{
          backgroundColor: color.white,
          marginTop: -20,
          flex: 0.6,
          overflow: 'hidden',
          borderTopLeftRadius: radius.h6,
          borderTopRightRadius: radius.h6,
        }}>
        <CleanerProgressCard />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginHorizontal: 12,
            paddingVertical: 12,
            borderTopColor: color.blue_Dark,
            borderTopWidth: 1,
            borderBottomColor: color.gray_Light,
            borderBottomWidth: 1,
          }}>
          <GText fontSize={fsize.p1}>Car cleaning</GText>
          <GText fontSize={fsize.p1}>12/12/2020</GText>
          <GText fontSize={fsize.p1}>Completed</GText>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  topCardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.gray_Light,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  topCardImage: {
    height: 35,
    width: 35,
    borderRadius: radius.max,
    marginHorizontal: 12,
  },
  timingsBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
