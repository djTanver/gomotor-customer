import React from 'react';
import {View, ScrollView, StyleSheet, FlatList, Dimensions} from 'react-native';
import GButton from '../../../components/GButton';
import GText from '../../../components/GText';
import {fsize, fWeight, color, fAlign, ffamily, radius} from './../../../theme';
import GSearchInput from '../../../components/GSearchInput';
import GImageNameBoxOne from '../../../components/GImageNameBoxOne';
import {environment} from '../../../../enviornment';
import Loader from '../../../components/Loader';
import {ImageUriHandler} from './../../../utils/imageHandler';

export default ({
  onContinue,
  carCmpLoading,
  carCompanies,
  setSelectedModel,
  selectedModel,
}) => {
  if (carCmpLoading) {
    return <Loader text="Car models loading..." />;
  }

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 18}}>
        <GText
          fontFamily={ffamily.bold}
          color={color.orange}
          fontSize={fsize.h6}
          textAlign={fAlign.center}
          style={{marginVertical: 20}}>
          Select Your Car Brand
        </GText>

        {/* <GSearchInput placeholder="Search for Brand"  /> */}

        <FlatList
          data={carCompanies}
          numColumns={3}
          renderItem={({item, index}) => {
            return (
              <GImageNameBoxOne
                key={index + item.company_name}
                onPress={() => setSelectedModel(item)}
                image={{uri: ImageUriHandler(item.brand_logo.url)}}
                name={item.company_name}
                isSelected={selectedModel && selectedModel.id == item.id}
              />
            );
          }}
        />
      </View>

      <GButton marginHorizontal={20} marginVertical={10} onPress={onContinue}>
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
  cardcontainer: {
    flex: 1,

    backgroundColor: 'white',

    width: Dimensions.get('window').width,
    borderWidth: 0,
  },
});
