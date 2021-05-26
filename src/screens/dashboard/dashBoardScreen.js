import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import GText from '../../components/GText';
import GIcon from '../../components/GIcon';
import Toast from 'react-native-simple-toast';
import {fsize, fWeight, color, fAlign, ffamily, radius} from './../../theme';
import GSearchInput from '../../components/GSearchInput';
import GImageNameBox from '../../components/GImageNameBox';
import {search_services} from '../../store/categories/services';
import {ImageUriHandler} from '../../utils/imageHandler';
import Loader from '../../components/Loader';
import navigator from '../../navigation/navigator';
import navigation from '../../utils/navigation';
import API_ENDPOINT from '../../config/api';


export default ({
  onAllServices,
  onCleanPackage,
  categoies,
  onServices,
  cleanLoading,
  loading,
  onCategoryPress,
  currentlocation
}) => {

  const [searchResults, setSearchResults] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [noResults, setNoResults] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const carouselHeight = (windowWidth * 20) / 100;
  //const carouselHeight = (windowWidth * 40) / 100;

  const _renderItem = ({item, index}) => {
  
    return (
      <View
        style={{flex: 1, marginTop: 5, elevation: 100, paddingHorizontal: 10}}>
        <Image
          source={item.image}
          style={{
            flex: 1,
            // height: carouselHeight,
            height: 160,
            resizeMode:'center',
            borderRadius: radius.default,
          }}
        />
        
        
      </View>
    );
  };
  const getSearchServices = async (text) => {
    try {
      setSearchText(text);
      setNoResults(false);
      const result = await search_services(text);
      if (text != '') {
        setSearchResults(result);
      } else {
        setNoResults(false);
        setSearchResults([]);
      }
      if(!result.length){
        
        setNoResults(true);
        setSearchResults([]);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      {/* stickyHeaderIndices={[0]} */}
      <Carousel
        data={corusedData}
        renderItem={_renderItem}
        sliderWidth={windowWidth}
        sliderHeight={carouselHeight}
        itemWidth={windowWidth}
        autoplay={true}
        loop={true}
        lockScrollWhileSnapping={true}
      />

      <View style={{flex: 1, marginHorizontal: 18}}>
        <GText
          color={color.orange}
          fontFamily={ffamily.bold}
          fontSize={fsize.h5}
          style={{marginTop: 10}}>
          Service Categories
        </GText>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            borderColor: color.blue_Light,
            borderRadius: radius.default,
            borderWidth: 1,
            backgroundColor: color.blue_Light,
          }}>
          <TextInput
            placeholder={'Search Anything and Everything for your Car'}
            style={{
              flex: 1,
              padding: 6,
              paddingLeft: 12,
              fontFamily: ffamily.semiBold,
              fontSize: fsize.p1,
            }}
            value={searchText}
            onChangeText={(value) => getSearchServices(value)}
          />
          {searchText.length != '' && (
            <GIcon
              onPress={() => {
                setSearchText('');
                setSearchResults([]);
              }}
              name="close"
              size={fsize.h1}
              color={color.blue}
              style={{marginRight: 5}}
            />
          )}
          <GIcon
            name="search"
            size={fsize.h1}
            color={color.blue}
            style={{marginRight: 12}}
          />
          
        </View>
        
        {!searchResults.length && noResults && (
            <View style={{flex: 1,alignItems:'flex-start', marginHorizontal:16}}>
                <GText
                fontFamily={ffamily.bold}
                color={color.blue}
                fontSize={fsize.p1}
                style={{marginTop: 6, marginBottom: 20, marginRight: 10}}
                textAlign={fAlign.right}>
                No Services Found
              </GText>
            </View>
          )} 

        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            numColumns={3}
            style={{
              marginTop: 1,
              borderBottomWidth: 2,
              borderBottomColor: color.blue_Dark,
              backgroundColor: '#F6FDFF',
            }}
            renderItem={({item, index}) => {
              if (item) {
                return (
                  <GImageNameBox

                  borderRadius = {0}
                  innerBorderRadius = {15}
                    image={
                      item.pictures.length &&
                      item.pictures[0].formats &&
                      item.pictures[0].formats.thumbnail
                        ? {
                            uri:
                              API_ENDPOINT +
                              item.pictures[0].formats.thumbnail.url,
                          }
                        : require('../../assets/bodyRepair.png')
                    }
                    name={item.title}
                    onPress={() => {
                      setSelectedModel(item);
                      navigation({
                        path: navigator.cleanerListNonApartment,
                        params: item,
                      });
                    }}
                    isSelected={(selectedModel && selectedModel.id) == item.id}
                  />
                );
              }
            }}
          />
        )}

        

        <FlatList
          data={categoies}
          numColumns={3}
          style={{marginTop: 12}}
          renderItem={({item, index}) => {
            if (item.picture && item.picture.formats) {
              if (cleanLoading && item.name == 'Cleaning') {
                return <Loader />;
              } else {
                return (
                  <GImageNameBox
                    imageHeight={80}
                    imageWidth={80}
                    borderRadius = {0}
                    innerBorderRadius = {15}
                    image={{
                      uri: ImageUriHandler(item.picture.formats.thumbnail.url),
                    }}
                    name={item.name}
                    onPress={() => onCategoryPress(item)}
                  />
                );
              }
            } else {
              return (
                <GImageNameBox
                  image={require('../../assets/bodyRepair.png')}
                  name={item.name}
                  isSelected={index == 0 && true}
                  onPress={() => onCategoryPress(item)}
                />
              );
            }
          }}
        />

        {/* <GText
          fontFamily={ffamily.bold}
          color={color.blue}
          fontSize={fsize.p1}
          style={{marginTop: 6, marginBottom: 20, marginRight: 10}}
          textAlign={fAlign.right}
          onPress={onAllServices}>
          See all >>
        </GText> */}
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

const corusedData = [
  {
    image: {
      uri:
        'http://3.239.78.166:1337/uploads/Go_Motar_Car_Service_Slider_One_583cdcaea1.jpg',
    },
  },
  {
    image: {
      uri:
        'http://3.239.78.166:1337/uploads/Go_Motar_Slider_Two_926c19ad39.jpg',
    },
  },
  {
    image: {
      uri:
        'http://3.239.78.166:1337/uploads/Go_Motar_Steam_Wash_Slider_Three_6f077bdb0a.jpg',
    },
  },
];
