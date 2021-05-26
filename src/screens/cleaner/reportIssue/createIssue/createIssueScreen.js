import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import GButton from '../../../../components/GButton';
import GText from '../../../../components/GText';
import GIcon from '../../../../components/GIcon';
import {format, now} from 'momento';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import RNPickerSelect from 'react-native-picker-select';
import API_ENDPOINT from '../../../../config/api';
import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from './../../../../theme';
import {search_services} from '../../../../store/categories/services';
import GImageNameBox from '../../../../components/GImageNameBox';
import {useSelector} from 'react-redux';
import authSelector from '../../../../store/auth/selector';
import request from '../../../../utils/fetch';
import GImageNameIconBox from '../../../../components/GImageNameIconBox';
import {uploadImage} from '../../../../utils/uploadImage';
import Loader from '../../../../components/LoaderUploadCreateIssue';
import Helper from '../../../../providers/helper-service';
import {create_report} from '../../../../store/report/service';
import navigation from '../../../../utils/navigation';
import navigator from './../../../../navigation/navigator';

export default ({onSubmit, route}) => {
  // console.log('routerouterouteroute', route.params.dataValue);
  const [images, setImages] = useState([]);
  const user_id = useSelector(authSelector.userId);
  const user = useSelector(authSelector.user);
  const token = useSelector((state) => state.auth.token);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const [isSelected, setSelected] = useState(true);
  const [isLoad, setLoad] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [dropValue, setDropValue] = useState('Select a Customer');
  const [cleaner, setCleaner] = useState({});
  const [cars, setCars] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  let tempCustArray1 = [];
  let tempCustArray = [];

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    try {
      let response = await Helper.getUserAllCars(user_id);
      // console.log("Customer cars", response)

      tempCustArray = [];
      tempCustArray1 = [];
      response.map((item) => {
        if (item) {
          tempCustArray1.push(item);
        }
      });
      // console.log("cars filetered", tempCustArray1)
      tempCustArray1.map(({id, car_number}) => {
        // console.log(id, car_number)
        tempCustArray.push({
          label: car_number,
          value: id,
        });
      });
      // console.log("tempArray", tempCustArray)
      setCars(tempCustArray);
    } catch (e) {}
  };

  async function createdIssue() {
    console.log('uploads', uploads);
    console.log('selectedModel ----------', selectedModel);
    if (imageUploading) {
      Toast.show('Please wait image is uploading...');
    } else {
      try {
        if (selectedModel) {
          // console.log("Bharath",selectedModel)
          //   setLoad(true);
          let _object = {
            title: title,
            details: details,
            user_car_id: dropValue,
            images: uploads,
            service: selectedModel.id,
            customer_id: user_id,
            complaint_by: 'customer',
          };
          //   console.log("data", _object)
          let response = await create_report(_object);
          console.log('create issue response', response);
          if (!response.error) {
            setUploads([]);
            setImages([]);
            setDetails('');
            setSelectedModel(null);
            setSearchText('');
            setCleaner('');
            setTitle('');
            Toast.show('Report is submitted.');
            setLoad(false);
            navigation({
              path: navigator.issueList,
              params: {type: 'reverse'},
            });
          } else {
            showtoast('Message: ' + response.message);
          }
        } else {
          setLoad(false);
          Toast.show('Please select service');
        }
      } catch (err) {
        setLoad(false);
        console.log('error', err);
      }
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

  console.log('images', images);
  console.log('Uploaded Image ids', uploads);

  async function imagePick() {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let _images = [];
    let _uploads = [];
    try {
      ImagePicker.showImagePicker(options, async (response) => {
        console.log(
          'Response = ',
          response.uri,
          response.type,
          response.fileName,
        );
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          if (response.uri && response.type && response.fileName) {
            console.log('image upload if block: ', {
              fileName: response.fileName,
              type: response.type,
              uri: response.uri,
            });
            callImageUploadAPI(
              response.uri,
              response.type,
              response.fileName,
              response,
            );
          } else {
            let fileArray = response.fileName.split('.');
            let customFiletype = 'image/' + fileArray[fileArray.length - 1];

            // console.log("custom file type: ", customFiletype)
            // let fileName = response.fileName.split(" ").join("").replace("(", "").replace(")","")

            let fileName = response.fileName.replace(/[^A-Za-z0-9._]/g, '');
            let type = response.type ? response.type : customFiletype;
            console.log('image upload else block: ', {
              fileName: fileName,
              type: type,
              uri: response.uri,
            });

            // Toast.show('Image not compatible');

            response.type = type;
            response.fileName = fileName;
            callImageUploadAPI(response.uri, type, fileName, response);
          }
        }
      });
    } catch (err) {
      console.log('error===>', err);
    }
  }

  const callImageUploadAPI = async (uri, type, fileName, response) => {
    // console.log("callImageUploadAPI params: ", uri, type, fileName, response)
    setImageUploading(true);
    Toast.show('Uploading the Image, please wait....');
    var fd = new FormData();
    fd.append('files', {
      uri: uri,
      type: type,
      name: fileName,
    });
    fd.append('files', response);
    let response_image = await uploadImage(fd);
    console.log('Image uploaded response', response_image);
    setImages((images) => [
      ...images,
      {uri: uri, uploadedId: response_image[0].id},
    ]);
    setUploads((uploads) => [...uploads, response_image[0].id]);
    setImageUploading(false);
    Toast.show('Selected Image is uploaded.');
  };

  const items = images.map((item) => {
    if (item) {
      return (
        <View style={{marginRight: 15, marginBottom: 18}}>
          <Image
            source={{uri: item.uri}}
            style={{
              height: 80,
              width: 80,
              marginRight: 10,
              borderRadius: radius.default,
            }}
          />
          <TouchableOpacity
            style={{position: 'absolute', top: -10, right: 0}}
            onPress={() => deleteUploadedImage(item.uploadedId)}>
            <GIcon
              name="closecircle"
              type="AntDesign"
              size={25}
              color={'red'}
            />
          </TouchableOpacity>
        </View>
      );
    }
  });

  const deleteUploadedImage = (id) => {
    let tempArray = [...images];
    tempArray = tempArray.filter((item) => item.uploadedId !== id);
    setImages(tempArray);

    let uploadedImagesArray = [...uploads];
    uploadedImagesArray = uploadedImagesArray.filter((item) => item !== id);
    setUploads(uploadedImagesArray);
  };

  return (
    <ScrollView
      contentContainerStyle={style.scrollView}
      keyboardShouldPersistTaps={'handled'}>
      <View>
        {/* <GImageNameIconBox
          image={require('../../../../assets/car.jpg')}
        //   name={route.params.dataValue.car_number}
        //   description={route.params.dataValue.customer_userName}
          // iconName="local-phone"
        /> */}
      </View>
      <View style={{flex: 1, marginHorizontal: 18}}>
        <View style={{paddingVertical: 8}}>
          <GText
            textAlign={fAlign.left}
            fontFamily={ffamily.bold}
            color={color.blue}
            fontSize={fsize.p1}>
            Issue title
          </GText>
          <TextInput
            placeholder={'Please share your issue'}
            style={{
              marginTop: 10,
              paddingLeft: 12,
              borderColor: color.gray_Light,
              borderWidth: 1,
              borderRadius: radius.default,
              fontFamily: ffamily.semiBold,
              fontSize: fsize.p1,
            }}
            value={title}
            onChangeText={(value) => setTitle(value)}
          />
        </View>
        <View style={{paddingVertical: 8}}>
          <GText
            textAlign={fAlign.left}
            fontFamily={ffamily.bold}
            color={color.blue}
            fontSize={fsize.p1}>
            Select your car
          </GText>
          <RNPickerSelect
          useNativeAndroidPickerStyle={false}
            onValueChange={(value) => setDropValue(value)}
            value={dropValue}
            placeholder={{label: 'Select your car', color: color.black}}
            style={{
              inputAndroid: {color: 'black',borderWidth:1,borderColor:color.gray_Light,borderRadius:5,height:45,paddingLeft: 12,marginTop:10},
              flex: 1,
              padding: 6,
              paddingLeft: 12,
              fontFamily: ffamily.semiBold,
              fontSize: fsize.p1,
          
            }}
            items={cars}
          />
        </View>
        <View style={{paddingVertical: 8}}>
          <GText
            textAlign={fAlign.left}
            fontFamily={ffamily.bold}
            color={color.blue}
            fontSize={fsize.p1}>
            Select the service
          </GText>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
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
                    borderRadius = {1}
                    innerBorderRadius = {15}
                      image={
                        item.pictures.length > 0 &&
                        item.pictures[0].formats &&
                        item.pictures[0].formats.thumbnail
                          ? {
                              uri:
                                'http://3.239.78.166:1337' +
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
              <GText
                textAlign={fAlign.left}
                fontFamily={ffamily.bold}
                color={color.blue_Dark}
                fontSize={fsize.p1}>
                Selected service
              </GText>
              <GText
                textAlign={fAlign.left}
                fontFamily={ffamily.bold}
                color={color.black}
                fontSize={fsize.p1}
                style={{marginTop: 5}}>
                {selectedModel.title}
              </GText>
            </View>
          )}
        </View>

        <View style={{marginTop: 10}}>
          <GText
            textAlign={fAlign.left}
            fontFamily={ffamily.bold}
            color={color.blue}
            fontSize={fsize.p1}>
            Upload images
          </GText>
          <View style={{marginTop: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
            {items}
            {imageUploading ? (
              <Loader size={30} />
            ) : (
              <TouchableOpacity onPress={() => imagePick()}>
                <Image
                  source={require('../../../../assets/add-image.png')}
                  style={{
                    height: 80,
                    width: 80,
                    marginRight: 10,
                    borderRadius: radius.default,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{marginTop: 10}}>
            <GText
              textAlign={fAlign.left}
              fontFamily={ffamily.bold}
              color={color.blue}
              fontSize={fsize.p1}>
              Problem Description
            </GText>
            <TextInput
              placeholder="Enter your comment"
              style={{
                marginTop: 10,
                paddingLeft: 12,
                borderColor: color.gray_Light,
                borderWidth: 1,
                borderRadius: radius.default,
                justifyContent: 'flex-start',
                fontFamily: ffamily.semiBold,
                fontSize: fsize.p1,
              }}
              multiline
              numberOfLines={4}
              onChangeText={(value) => setDetails(value)}
              value={details}
            />
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <GButton
          loading={isLoad}
          buttonStyle={{marginVertical: 20}}
          onPress={() => createdIssue()}>
          Submit
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
  topCardWrapper: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.gray_Light,
    borderBottomWidth: 1,
  },
  topCardImage: {
    height: 45,
    width: 45,
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
