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

export default ({onReportIssue}) => {
  return (
    <View style={style.mainWrapper}>
      <Image
        source={require('../../../assets/car.jpg')}
        style={{height: 180, width: '100%'}}
      />

      <View
        style={{
          backgroundColor: color.white,
          flex: 1,
          marginTop: -20,
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
            paddingVertical: 8,
            borderTopColor: color.blue_Dark,
            borderTopWidth: 1,
            borderBottomColor: color.gray_Light,
            borderBottomWidth: 1,
          }}>
          <GText fontFamily={ffamily.semiBold} fontSize={fsize.h5}>
            Services History
          </GText>
          <TouchableOpacity
            onPress={onReportIssue}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: color.green,
              borderWidth: 1,
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: radius.default,
            }}>
            <GText
              fontFamily={ffamily.bold}
              fontSize={fsize.p1}
              color={color.blue}
              style={{marginRight: 4}}>
              Report
            </GText>
            <GIcon name="error" color={color.blue} size={fsize.h3} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7]}
          style={{marginTop: 8}}
          renderItem={() => {
            return (
              <View
                style={{
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                }}>
                <Image
                  source={require('../../../assets/individual.png')}
                  style={style.topCardImage}
                />
                <View style={{flex: 1}}>
                  <GText fontFamily={ffamily.semiBold} fontSize={fsize.p1}>
                    Mahesh Kumar
                  </GText>
                  <GText fontSize={fsize.p2}>GOMOMKAR121</GText>
                </View>
                <View style={{flex: 0.5}}>
                  <GText fontSize={fsize.p1}>12/12/2021</GText>
                  <GText
                    fontSize={fsize.p2}
                    fontFamily={ffamily.semiBold}
                    color={color.blue}>
                    6 AM - 9 AM
                  </GText>
                </View>
              </View>
            );
          }}
        />
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
