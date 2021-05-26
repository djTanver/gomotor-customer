import React from 'react';
import {View, ScrollView, StyleSheet, FlatList} from 'react-native';
import GButton from '../../../components/GButton';
import GText from '../../../components/GText';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import GSearchInput from '../../../components/GSearchInput';
import GImageNameBoxOne from '../../../components/GImageNameBoxOne';
import Loader from '../../../components/Loader';
import {ImageUriHandler} from './../../../utils/imageHandler';

export default ({
  onContinue,
  carModelLoading,
  carModels,
  setSelectedModel,
  selectedModel,
}) => {
  if (carModelLoading) {
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
          Select Your Car Model
        </GText>

        {/* <GSearchInput placeholder="Search for Model" /> */}

        <FlatList
          data={carModels}
          numColumns={3}
          style={{marginTop: 12}}
          renderItem={({item, index}) => {
            return (
              <GImageNameBoxOne
                key={index + item.name}
                onPress={() => setSelectedModel(item)}
                image={{uri: ImageUriHandler(item.icon.url)}}
                name={item.name}
                isSelected={(selectedModel && selectedModel.id) == item.id}
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
});
