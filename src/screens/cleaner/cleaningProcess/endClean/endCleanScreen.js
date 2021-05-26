import React from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import GButton from '../../../../components/GButton';
import GText from '../../../../components/GText';
import GIcon from '../../../../components/GIcon';
import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from './../../../../theme';

export default () => {
  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 18}}>
        <View style={style.topCardWrapper}>
          <Image
            source={require('../../../../assets/individual.png')}
            style={style.topCardImage}
          />
          <View style={{flex: 1}}>
            <GText fontFamily={ffamily.semiBold}>Mahesh Kumar</GText>
            <GText color={color.blue} fontSize={fsize.h6}>
              GOMOMKAR121
            </GText>
          </View>
          <GIcon name="local-phone" size={fsize.h1} style={{marginRight: 16}} />
        </View>

        <View style={style.topCardWrapper}>
          <GIcon
            name="office-building"
            type="MaterialCommunityIcons"
            size={fsize.h1}
            style={{marginHorizontal: 12}}
          />
          <View style={{flex: 1}}>
            <GText fontFamily={ffamily.semiBold}>RARA Apartment,</GText>
            <GText fontSize={fsize.p1}>
              5th main road, BTM layout bangalore - 560063
            </GText>
          </View>
        </View>

        <View style={style.topCardWrapper}>
          <View style={style.timingsBox}>
            <GIcon name="alarm-on" size={fsize.h1} />
            <GText fontSize={fsize.h6}>6 AM - 9 AM</GText>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GText fontFamily={ffamily.bold} fontSize={fsize.h5}>
              1 / 3
            </GText>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <GText fontFamily={ffamily.bold} fontSize={fsize.h5}>
              3 / 12
            </GText>
          </View>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Image
            source={require('../../../../assets/qrcode.png')}
            style={{height: 200, width: 200}}
          />
          <GText fontSize={fsize.h5} style={{marginTop: 10}}>
            Scan to end the process
          </GText>
          <GText
            fontSize={fsize.h5}
            fontFamily={ffamily.semiBold}
            style={{marginTop: 4}}>
            Monday - 11 / 01 /2021
          </GText>
        </View>
      </View>

      <GButton marginHorizontal={20} marginVertical={10}>
        END
      </GButton>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
  topCardWrapper: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.gray_Light,
    borderBottomWidth: 1,
  },
  topCardImage: {
    height: 45,
    width: 45,
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
