import React, {useEffect, useState} from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import GButton from '../../../components/GButton';
import GText from '../../../components/GText';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';

import Helper from '../../../providers/helper-service';
import {environment} from '../../../../enviornment';
import Toast from 'react-native-simple-toast';
import {useField} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

export default ({props}) => {
  const [carModel, setCarModel] = useState('');
  const [carType, setCarType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [isSubmit, setSubmit] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('props', props);
    if (props.params && props.params.car_model_id) {
      setCarModel(props.params.car_model_id.name);
      setCarType(props.params.car_type_id.name);
      setFuelType(props.params.fuel_type_id.name);
      setCarNumber(props.params.car_number);
    }
  }, []);

  async function submit() {
    let carRegNumberRegx = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _][^\s]*)$/;

    try {
      console.log('submit');
      let user_id = 1;
      if (!carRegNumberRegx.test(carNumber)) {
        Toast.show('Incorrect Pattern');
      } else {
        let obj = {
          car_company: props.params.car_company_id.id,
          car_model: props.params.car_model_id.id,
          car_type: props.params.car_type_id.id,
          fuel_type: props.params.fuel_type_id.id,
          car_number: carNumber,
        };
        let res = await Helper.updateCarDetails(user_id, props.params.id, obj);
        console.log('res updateCarDetails', res);
        if (res) {
          Toast.show('Car details are updated successfully.');
          navigation.dispatch(CommonActions.goBack());
        }
      }
    } catch (err) {
      console.log('error', err);
      Toast.show(`Some error occurred ${err.message}`);
    }
  }

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 26}}>
        <GText
          fontFamily={ffamily.bold}
          style={{marginTop: 12}}
          fontSize={fsize.h6}
          textAlign={fAlign.left}>
          Car Model
        </GText>
        <TextInput
          placeholder="Car Model"
          editable={false}
          style={{
            borderColor: color.gray_Light,
            borderWidth: 1,
            paddingLeft: 14,
            marginTop: 10,
            marginBottom: 12,
            borderRadius: radius.default,
          }}
          value={carModel}
        />
        <GText
          fontFamily={ffamily.bold}
          style={{marginTop: 12}}
          fontSize={fsize.h6}
          textAlign={fAlign.left}>
          Car Type
        </GText>
        <TextInput
          placeholder="Car Type"
          value={carType}
          editable={false}
          style={{
            borderColor: color.gray_Light,
            borderWidth: 1,
            paddingLeft: 14,
            marginTop: 10,
            marginBottom: 12,
            borderRadius: radius.default,
          }}
        />
        <GText
          fontFamily={ffamily.bold}
          style={{marginTop: 12}}
          fontSize={fsize.h6}
          textAlign={fAlign.left}>
          Fuel Type
        </GText>
        <TextInput
          placeholder="Fuel Type"
          value={fuelType}
          editable={false}
          style={{
            borderColor: color.gray_Light,
            borderWidth: 1,
            paddingLeft: 14,
            marginTop: 10,
            marginBottom: 12,
            borderRadius: radius.default,
          }}
        />
        <GText
          fontFamily={ffamily.bold}
          style={{marginTop: 12}}
          fontSize={fsize.h6}
          textAlign={fAlign.left}>
          Car Number
        </GText>
        <TextInput
          placeholder="Car Number"
          value={carNumber}
          style={{
            borderColor: color.gray_Light,
            borderWidth: 1,
            paddingLeft: 14,
            marginTop: 10,
            marginBottom: 12,
            borderRadius: radius.default,
          }}
          onChangeText={(value) => {
            console.log(`Car number =========> ${value}`);
            setCarNumber(value);
            setSubmit(true);
          }}
        />
        <GText
          fontFamily={ffamily.semiBold}
          color={color.gray}
          fontSize={fsize.p1}
          style={{marginTop: 8}}>
          Please enter car number in this format (KA01MH1234)
        </GText>
      </View>
      <View style={style.buttonWrapper}>
        <GButton buttonStyle={{marginVertical: 10}} onPress={submit}>
          Update
        </GButton>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
  textInput: {
    fontSize: fsize.h2,
    color: color.black,
    fontWeight: fWeight.bold,
  },
  buttonWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
