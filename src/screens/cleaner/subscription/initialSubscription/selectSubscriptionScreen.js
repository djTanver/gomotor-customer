import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import GButton from '../../../../components/GButton';
import Gtext from '../../../../components/GText';
import {fsize, fWeight, color, fAlign} from './../../../../theme';

export default ({onContinue}) => {
  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 26}}>
        <View style={{marginTop: 10}}>
          <Gtext fontSize={fsize.h5}>Select Subscription</Gtext>
          <Gtext color={color.gray} fontSize={fsize.p1} style={{marginTop: 6}}>
            Select the any subcription pack and pay it so you can use platform
            to get the customers.
          </Gtext>
        </View>

        <View style={{flex: 1}}>
          <View style={{flex: 1, marginTop: 30}}>
            <FlatList
              data={[1, 2, 3, 4, 5]}
              renderItem={({item}) => <Comp />}
            />
          </View>
        </View>

        <View style={style.buttonWrapper}>
          <GButton onPress={onContinue} backgroundColor={color.blue}>
            Pay Now
          </GButton>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.gray,
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1.5,
    fontSize: fsize.h2,
    color: color.black,
    fontWeight: fWeight.bold,
  },
  buttonWrapper: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Comp = () => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}>
        <View
          style={{
            padding: 10,
            backgroundColor: color.white,
            borderRadius: 100,
            borderColor: color.gray_Light,
            borderWidth: 1,
          }}></View>
      </View>
      <View style={{flex: 1}}>
        <Gtext fontSize={fsize.h6}>Starter Package</Gtext>
        <Gtext color={color.gray} fontSize={fsize.p1}>
          1 year subscription plan
        </Gtext>
      </View>
      <Gtext fontSize={fsize.h6} color={color.blue}>
        Rs. 1999
      </Gtext>
    </TouchableOpacity>
  );
};
