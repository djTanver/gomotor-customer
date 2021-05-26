import React from 'react';
import {View, ScrollView, StyleSheet, FlatList, Image} from 'react-native';
import GText from '../../../components/GText';
import {fsize, fWeight, color, fAlign, ffamily, radius} from './../../../theme';
import GSearchInput from '../../../components/GSearchInput';
import GImageNameBox from '../../../components/GImageNameBox';

export default ({onContinue}) => {
  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 18}}>
        <GText
          fontFamily={ffamily.semiBold}
          color={color.blue}
          fontSize={fsize.h6}
          style={{marginTop: 12}}>
          Problems with your car ?
        </GText>

        <GSearchInput placeholder="Search Services" />

        <FlatList
          data={data}
          numColumns={3}
          style={{marginTop: 12}}
          renderItem={({item, index}) => {
            return (
              <GImageNameBox
                image={item.image}
                name={item.name}
                isSelected={index == 0 && true}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
});

const data = [
  {
    image: require('../../../assets/cleaning.jpg'),
    name: 'Car clean',
  },
  {
    image: require('../../../assets/acService.jpg'),
    name: 'AC Services',
  },
  {
    image: require('../../../assets/bodyRepair.png'),
    name: 'Body Repair',
  },
  {
    image: require('../../../assets/tyresAndBrakes.jpg'),
    name: 'Tyres and Brakes',
  },
  {
    image: require('../../../assets/acService.jpg'),
    name: 'Denting and Painting',
  },
  {
    image: require('../../../assets/acService.jpg'),
    name: 'Battery Issue',
  },
  {
    image: require('../../../assets/cleaning.jpg'),
    name: 'Car clean',
  },
  {
    image: require('../../../assets/acService.jpg'),
    name: 'AC Services',
  },
  {
    image: require('../../../assets/bodyRepair.png'),
    name: 'Body Repair',
  },
  {
    image: require('../../../assets/acService.jpg'),
    name: 'Battery Issue',
  },
  {
    image: require('../../../assets/cleaning.jpg'),
    name: 'Car clean',
  },
  {
    image: require('../../../assets/acService.jpg'),
    name: 'AC Services',
  },
  {
    image: require('../../../assets/bodyRepair.png'),
    name: 'Body Repair',
  },
  {
    image: require('../../../assets/acService.jpg'),
    name: 'Battery Issue',
  },
  {
    image: require('../../../assets/cleaning.jpg'),
    name: 'Car clean',
  },
  {
    image: require('../../../assets/acService.jpg'),
    name: 'AC Services',
  },
  {
    image: require('../../../assets/bodyRepair.png'),
    name: 'Body Repair',
  },
];
