import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CleanerProgressCard from '../../../../components/CleanerProgressCard';
import GIcon from '../../../../components/GIcon';
import GText from '../../../../components/GText';
import RNPickerSelect from 'react-native-picker-select';
import {Rating} from 'react-native-ratings';
import navigation from '../../../../utils/navigation';
import {cleanerNavigator} from '../../../../navigation/navigator';
import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from '../../../../theme';
import GButton from '../../../../components/GButton';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import API_ENDPOINT from '../../../../config/api';
import {useSelector} from 'react-redux';
import authSelector from '../../../../store/auth/selector';
import GImageNameIconBox from '../../../../components/GImageNameIconBox';
import {search_services} from '../../../../store/categories/services';
import GImageNameBox from '../../../../components/GImageNameBox';
import {create_reviews} from '../../../../store/report/service';
import {ScrollView} from 'react-native-gesture-handler';

export default () => {
  const user_id = useSelector(authSelector.userId);
  const [images, setImages] = useState([]);
  const [selcetdUser, setSelectedUser] = useState('');
  const [review, setReview] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [ratings, setRatings] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const [isSelected, setSelected] = useState(true);
  const [isLoad, setLoad] = useState(false);

  const typesOfUsers = [
    {label: 'Cleaner', value: 'cleaner'},
    {label: 'Supervisor', value: 'supervisor'},
  ];

  useEffect(() => {}, []);

  function ratingCompleted(rating) {
    setRatings(rating);
  }
  async function submit() {
    try {
      setLoad(true);
      if (!searchText) {
        Toast.show('Please search and select service');
      }
      if (!selectedModel) {
        Toast.show('Please search and select service');
      } else if (review == '') {
        Toast.show('Please enter your reviews');
      } else {
        let _object = {
          review: review,
          rating: ratings,
          user_id: user_id, //to which user rating belong to
          service: selectedModel,
          //service: 1,
        };
        let response = await create_reviews(_object);
        //console.log('_object', response, _object);
        if (response) {
          setLoad(false);

          setReview('');
          setRatings('');
          setSearchText('');
          setSelectedModel(null);
          Toast.show('Your review is submitted.');
          navigation({path: cleanerNavigator.account});
        }
      }
    } catch (err) {
      setLoad(false);

      console.log('error', err);
    }
  }
  const getSearchServices = async (text) => {
    try {
      setSearchText(text);
      const result = await search_services(text);
      if (text != '') {
        setSearchResults(result);
        setSelected(false);
      } else {
        setSearchResults([]);
      }
      console.log('service results', result);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <ScrollView style={style.mainWrapper}>
      <View
        style={{
          backgroundColor: color.white,
          flex: 1,
        }}>
        <View style={{marginHorizontal: 12}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}></View>
          <GText
            fontSize={fsize.h6}
            color={color.blue}
            style={{marginTop: 10, marginBottom: 10}}>
            Want to give Feedback, Rating
          </GText>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              borderColor: color.gray_Light,
              borderRadius: radius.default,
              borderWidth: 2,
            }}>
            <TextInput
              placeholder={'Search Services'}
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
          {searchResults.length > 0 && !isSelected && (
            <FlatList
              data={searchResults}
              numColumns={3}
              style={{
                marginTop: 1,
                borderBottomWidth: 2,
                borderBottomColor: '#C9F2FF',
                backgroundColor: '#F6FDFF',
              }}
              renderItem={({item, index}) => {
                if (item) {
                  return (
                    <GImageNameBox
                    borderRadius = {0}
                    innerBorderRadius = {15}
                      image={
                        item.pictures.length
                          ? {
                              uri:
                                API_ENDPOINT +
                                item.pictures[0].formats.thumbnail.url,
                            }
                          : require('../../../../assets/bodyRepair.png')
                      }
                      name={item.title}
                      onPress={() => {
                        setSelectedModel(item);
                        setSelected(true);
                      }}
                      isSelected={
                        (selectedModel && selectedModel.id) == item.id
                      }
                    />
                  );
                }
              }}
            />
          )}
          {selectedModel && (
            <View style={{paddingVertical: 8}}>
              <GText fontFamily={ffamily.semiBold} color={color.blue}>
                Selected Service
              </GText>
              <GText fontSize={fsize.p1}>{selectedModel.title}</GText>
            </View>
          )}
          <GText
            fontSize={fsize.h6}
            color={color.blue}
            style={{marginTop: 20, marginBottom: 10}}>
            Give Ratings
          </GText>
          <GText
            fontSize={fsize.p1}
            color={color.orange}
            style={{ marginBottom: 10}}>
            Slide through the stars to choose between 1 to 5
          </GText>

          <Rating
            count={1}
            type="star"
            style={{margin: 5}}
            ratingCount={5}
            imageSize={30}
            showRating
            onFinishRating={ratingCompleted}
          />
          <GText
            fontSize={fsize.h6}
            color={color.blue}
            style={{marginTop: 20, marginBottom: 10}}>
            Comment
          </GText>
          <TextInput
            placeholder="Enter your comment here"
            style={{
              marginTop: 10,
              borderColor: color.gray_Light,
              borderWidth: 1,
              paddingLeft: 14,
              borderRadius: radius.default,
            }}
            value={review}
            multiline
            numberOfLines={4}
            onChangeText={(value) => setReview(value)}
          />
        </View>
      </View>
      <GButton
        loading={isLoad}
        onPress={submit}
        buttonStyle={{marginVertical: 20, marginHorizontal: 20}}>
        Submit
      </GButton>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: color.white,
  },
  topCardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.gray_Light,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },

  topCardImage: {
    height: 35,
    width: 35,
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
