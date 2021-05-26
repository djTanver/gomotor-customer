import React from 'react';
import {View, StyleSheet} from 'react-native';
import GText from '../../../components/GText';
import LinearGradient from 'react-native-linear-gradient';
import {fsize, fWeight, color, fAlign, ffamily, radius} from './../../../theme';
import moment from 'moment';

export default ({planDetails}) => {
  console.log(
    'planDetailsplanDetailsplanDetailsplanDetailsplanDetails',
    planDetails,
  );
  return (
    <View>
      {planDetails.subscription_plan_stats.full_exterior_clean_left ? (
        <LinearGradient
          colors={[color.blue_Dark, color.blue]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={style.gradientWrapper}>
          {planDetails.subscription_plan_stats.full_exterior_clean_left ==
          'NA' ? null : (
            <View style={style.textWrapper}>
              <GText
                fontSize={fsize.p1}
                fontFamily={ffamily.bold}
                color={color.white}
                textAlign={fAlign.center}>
                {planDetails.subscription_plan_stats.full_exterior_clean_left
                  ? planDetails.subscription_plan_stats.full_exterior_clean_left
                  : '0'}
                /24{'\n'}
                <GText
                  fontSize={fsize.p1}
                  color={color.white}
                  textAlign={fAlign.center}>
                  Exterior
                </GText>
              </GText>
            </View>
          )}
          {planDetails.subscription_plan_stats.full_interior_clean_left ==
          'NA' ? null : (
            <View style={style.textWrapper}>
              <GText
                fontSize={fsize.p1}
                fontFamily={ffamily.bold}
                color={color.white}
                textAlign={fAlign.center}>
                {planDetails.subscription_plan_stats.full_interior_clean_left
                  ? planDetails.subscription_plan_stats.full_interior_clean_left
                  : '0'}
                /3{'\n'}
                <GText
                  fontSize={fsize.p1}
                  color={color.white}
                  textAlign={fAlign.center}>
                  Interior
                </GText>
              </GText>
            </View>
          )}
          <View style={style.textWrapper}>
            <GText
              fontSize={fsize.p1}
              fontFamily={ffamily.bold}
              color={color.white}
              textAlign={fAlign.center}>
              {moment(planDetails.from_date).format('DD-MMM-YYYY')}
              {'\n'}
              <GText
                fontSize={fsize.p1}
                color={color.white}
                textAlign={fAlign.center}>
                Valid From
              </GText>
            </GText>
          </View>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <GText
              fontSize={fsize.p1}
              fontFamily={ffamily.bold}
              color={color.white}
              textAlign={fAlign.center}>
              {moment(planDetails.to_date).format('DD-MMM-YYYY')}
              {'\n'}
              <GText
                fontSize={fsize.p1}
                color={color.white}
                textAlign={fAlign.center}>
                Valid Upto
              </GText>
            </GText>
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={[color.blue_Dark, color.blue]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={style.gradientWrapper}>
          <View style={style.textWrapper}>
            <GText
              fontSize={fsize.p1}
              color={color.white}
              textAlign={fAlign.center}>
              My Details
            </GText>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  gradientWrapper: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 9,
    borderRadius: 3,
  },
  textWrapper: {
    borderRightColor: color.white,
    borderRightWidth: 1,
    alignItems: 'center',
    flex: 1,
  },
});
