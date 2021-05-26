import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import GButton from '../../../components/GButton';
import GText from '../../../components/GText';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import GImageNameBoxOne from '../../../components/GImageNameBoxOne';
import {ImageUriHandler} from './../../../utils/imageHandler';
import Loader from '../../../components/Loader';

export default ({
  onContinue,
  carNumber,
  setCarNumber,
  addCarLoading,
  setSelectedFuelType,
  carFuelTypes,
  carFuelTypeLoading,
  selectedFuelType,
  carTypes,
  carType,
  selectedCarTypes,
  setSelectedCarTypes,
}) => {
  if (carFuelTypeLoading) {
    return <Loader text="Car fuel type loading..." />;
  }
  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <KeyboardAvoidingView style={{flex: 1, marginHorizontal: 18}}>
        <GText
          fontFamily={ffamily.bold}
          color={color.orange}
          fontSize={fsize.h6}
          textAlign={fAlign.center}
          style={{marginVertical: 20}}>
          Select Your Car Fuel Type
        </GText>

        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            {carFuelTypes.map((item, index) => {
              return (
                <GImageNameBoxOne
                  key={index}
                  onPress={() => setSelectedFuelType(item)}
                  image={{uri: ImageUriHandler(item.icon.url)}}
                  name={item.name}
                  fontSize={fsize.h6}
                  borderRadius={0}
                  isSelected={
                    (selectedFuelType && selectedFuelType.id) == item.id
                  }
                />
              );
            })}
          </View>
        </View>

        <GText
          fontFamily={ffamily.bold}
          color={color.orange}
          fontSize={fsize.h6}>
          Car Category
        </GText>

        <View style={{flexDirection: 'row', marginTop: 12}}>
          {/* {
              carTypes.map((item,index)=>{ */}
          {/* return( */}
          <GText
            // key={index}
            // onPress={() => setSelectedCarTypes(item)}
            fontFamily={ffamily.semiBold}
            color={color.gray}
            fontSize={fsize.h6}
            textAlign={fAlign.center}
            style={{
              ...style.categoryType,
              backgroundColor: color.blue,
              color: color.white,
            }}>
            {carType.name}
          </GText>
          {/* ) */}
          {/* }) */}
          {/* } */}
        </View>

        <GText
          fontFamily={ffamily.bold}
          color={color.orange}
          fontSize={fsize.h6}
          style={{marginTop: 12}}>
          Car Registration Number
        </GText>

        <TextInput
          placeholder="Car number"
          style={style.carNumberInput}
          value={carNumber}
          onChangeText={(value) => setCarNumber(value)}
          autoCapitalize="characters"
          maxLength={11}
        />
        <GText
          fontFamily={ffamily.semiBold}
          color={color.gray}
          fontSize={fsize.p1}
          style={{marginTop: 8}}>
          Please enter car number in this format (KA01MH1234)
        </GText>
      </KeyboardAvoidingView>

      <GButton
        marginHorizontal={20}
        marginVertical={10}
        onPress={onContinue}
        loading={addCarLoading}>
        Continue
      </GButton>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
  carNumberInput: {
    borderColor: color.gray_Light,
    borderWidth: 1,
    borderRadius: radius.default,
    padding: 6,
    marginVertical: 12,
    fontFamily: ffamily.semiBold,
    paddingLeft: 12,
  },
  categoryType: {
    borderWidth: 1,
    flex: 1,
    borderColor: color.gray_Light,
    borderRadius: radius.h8,
    padding: 8,
    marginHorizontal: 4,
  },
});
