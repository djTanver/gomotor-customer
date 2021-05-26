import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import GButton from '../../../components/GButton';
import GText from '../../../components/GText';
import GIcon from '../../../components/GIcon';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import {store} from '../../../../App';
import Helper from '../../../providers/helper-service';
import {showtoast} from '../../../utils/error';
import ImagePicker from 'react-native-image-picker';
import {uploadImage} from '../../../utils/uploadImage';
import API_ENDPOINT from '../../../config/api';
import {updateProfileDataAction} from '../../../store/auth/slice';
import {useDispatch, useSelector} from 'react-redux';

export default ({user}) => {
  const dispatch = useDispatch();
  const [userProData, setUserProData] = useState(user);

  //update user profile using PUT Method
  const [updateProData, setUpdateProData] = useState({});
  const [loading, setLoading] = useState(false);
  const [uName, setUName] = useState('');
  const [uEmail, setUEmail] = useState('');
  const [uPhone, setUPhone] = useState('');
  const [uPhoto, setUPhoto] = useState('');
  const [uPhotoUrl, setUPhotoUrl] = useState('');
  const [uPhotoId, setUPhotoId] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [imageIdState, setImageIdState] = useState(false);

  useEffect(() => {
    initDatavalue();
  }, []);

  const initDatavalue = async () => {
    try {
      let res = await Helper.getUserDetails(userProData.id);
      console.log('userdetails', res);
      setUName(res.username);
      setUEmail(res.email);
      setUPhone(res.phone);
      if (res && Object.keys(res.photo).length != 0) {
        setUPhotoUrl(API_ENDPOINT + res.photo.url);
      }
    } catch (err) {
      console.log('Error', err);
    }
  };

  console.log('userProData.id', userProData.id);
  const onsubmit = async () => {
    if (!imageIdState) {
    let initData;
    if(!uPhotoId){
      initData = {
        username: uName,
        email: uEmail,
        phone: uPhone,
      };
    }
    else{
      initData = {
        username: uName,
        email: uEmail,
        phone: uPhone,
        photo: {
          id: uPhotoId,
        },
      };
    }
   

      dispatch(
        updateProfileDataAction(
          'token',
          userProData.id,
          initData,
          updateProfileResult,
        ),
      );

      return showtoast('Profile details updated.');
    }
  };

  // fun
  const updateProfileResult = (token, res) => {
    console.log('response update profile', res);

    setUName(res.username);
    setUEmail(res.email);
    setUPhone(res.phone);
    if (res && Object.keys(res.photo).length != 0) {
      setUPhotoUrl(API_ENDPOINT + res.photo.url);
    }
  };

  // fun
  async function imagePick() {

    console.log('image is uploading');
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      ImagePicker.showImagePicker(options, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          // Alert.alert("Image Upload Alert",
          // "Something went wrong while uploading the image"+err.message,
          // [
          //   {
          //     text: "Cancel",
          //     onPress: () => console.log("Cancel Pressed"),
          //     style: "cancel"
          //   },
          //   { text: "OK", onPress: () => console.log("OK Pressed") }
          // ]);

        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          showtoast('Uploading....');

          var fd = new FormData();
          fd.append('files', {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          });
          fd.append('files', response);
          setImageIdState(true);
          setUPhotoUrl(response.uri);
          let response_image = await uploadImage(fd);
          setUPhotoId(response_image[0].id);

          setImageIdState(false);
          showtoast('Image is uploaded.');
        }
      });
    } catch (err) {
      console.log("Error uploading photo =======>"+err.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 20}}>
        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 12}}
          onPress={() => imagePick()}>
          {uPhotoUrl == '' ? (
            <Image
              // source={{
              //   uri: `${API_ENDPOINT}/uploads/individual_d17f0b8618.png?124569071.61500002`,
              // }}
              source={{
                uri: `${API_ENDPOINT}/uploads/usera_f4108126ae.png`,
              }}
              style={{height: 100, width: 100, borderRadius: radius.max}}
            />
          ) : (
            <Image
              source={{uri: uPhotoUrl}}
              style={{height: 100, width: 100, borderRadius: radius.max}}
            />
          )}
          <GIcon
            name="add-circle"
            color={color.blue}
            size={fsize.h1}
            style={{marginLeft: 80, marginTop: -20}}
          />
        </TouchableOpacity>
        <View style={{marginTop: 20, marginHorizontal: 12}}>
          <View
            style={{
              borderBottomWidth: 1.4,
              borderBottomColor: color.gray_Light,
              marginTop: 10,
            }}>
            <GText
              fontSize={fsize.p1}
              fontFamily={ffamily.semiBold}
              color={color.gray}>
              Full Name
            </GText>
            <TextInput
              placeholder="User Name"
              style={{
                paddingVertical: 4,
                fontFamily: ffamily.semiBold,
                fontSize: fsize.p1,
              }}
              placeholderTextColor={color.black}
              value={uName}
              onChangeText={(uName) => {
                setUName(uName);
              }}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 1.4,
              borderBottomColor: color.gray_Light,
              marginTop: 10,
            }}>
            <GText
              fontSize={fsize.p1}
              fontFamily={ffamily.semiBold}
              color={color.gray}>
              Mobile Number
            </GText>
            <TextInput
              placeholder="Phone Number"
              style={{
                paddingVertical: 4,
                fontFamily: ffamily.semiBold,
                fontSize: fsize.p1,
              }}
              placeholderTextColor={color.black}
              value={uPhone}
              onChangeText={(uPhone) => setUPhone(uPhone)}
              editable={false}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 1.4,
              borderBottomColor: color.gray_Light,
              marginTop: 10,
            }}>
            <GText
              fontSize={fsize.p1}
              fontFamily={ffamily.semiBold}
              color={color.gray}>
              Email Id
            </GText>
            <TextInput
              placeholder="example@gmail.com"
              style={{
                paddingVertical: 4,
                fontFamily: ffamily.semiBold,
                fontSize: fsize.p1,
              }}
              placeholderTextColor={color.black}
              value={uEmail}
              onChangeText={(uEmail) => setUEmail(uEmail)}
            />
          </View>
        </View>
      </View>
      <View style={{marginVertical: 20}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '5%',
          }}>
          {imageIdState ? (
            <GText
              fontSize={fsize.p1}
              fontFamily={ffamily.semiBold}
              color={color.blue}>
              {' '}
              Image is uploading please wait ...{' '}
            </GText>
          ) : null}
        </View>
        <GButton
          paddingHorizontal={10}
          paddingVertical={10}
          marginHorizontal={60}
          backgroundColor={color.blue}
          textAlign={fAlign.center}
          fontSize={fsize.p1}
          fontFamily={ffamily.semiBold}
          onPress={onsubmit}>
          UPDATE
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
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
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
