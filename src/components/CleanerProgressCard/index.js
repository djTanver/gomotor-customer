import React from 'react';
import {View, StyleSheet} from 'react-native';
import GText from '../GText';
import GIcon from '../GIcon';
import GImageNameIconBox from '../GImageNameIconBox';
import {ffamily, fsize, color, radius} from '../../theme';

export default ({}) => {
  return (
    <View style={{marginHorizontal: 12, marginTop: 8}}>
      <GImageNameIconBox
        image={require('../../assets/individual.png')}
        name="Mahesh Kumar"
        description="GOMOMKAR121"
        iconName="local-phone"
      />

      <View style={style.topCardWrapper}>
        <GIcon
          name="office-building"
          type="MaterialCommunityIcons"
          size={fsize.h1}
          style={{marginHorizontal: 12}}
        />
        <View style={{flex: 1}}>
          <GText fontFamily={ffamily.semiBold} fontSize={fsize.p1}>
            RARA Apartment,
          </GText>
          {/* <GText
                        fontSize={fsize.p2}
                        >
                        5th main road, BTM layout bangalore - 560063
                    </GText> */}
        </View>
      </View>

      {/* <View style={style.topCardWrapper}>
                <View style={style.timingsBox}>
                    <GIcon
                        name="alarm-on"
                        size={fsize.h4}
                    />
                    <GText
                        fontSize={fsize.p1}
                        >
                        6 AM - 9 AM
                    </GText>
                </View>
                <View style={{flex:1,alignItems:"center"}}>
                    <GText
                        fontFamily={ffamily.bold}
                        fontSize={fsize.p1}
                        >
                        1 / 3
                    </GText>
                </View>
                <View style={{flex:1,alignItems:"center"}}>
                    <GText
                        fontFamily={ffamily.bold}
                        fontSize={fsize.p1}
                        >
                        3 / 12
                    </GText>
                </View>
            </View> */}
    </View>
  );
};

const style = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.gray_Light,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: radius.max,
    marginHorizontal: 12,
  },
  topCardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.gray_Light,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  timingsBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
