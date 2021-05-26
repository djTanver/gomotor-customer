import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  ImageBackground,
  Platform
} from 'react-native';
import {Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import authSelector from '../../store/auth/selector';
import API_ENDPOINT from '../../config/api';
import navigation from '../../utils/navigation';
import GText from '../../components/GText';
import GIcon from '../../components/GIcon';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../theme';
import Loader from '../../components/Loader';
import {getOneServiceData} from '../../store/ncsp/services';
import navigator from '../../navigation/navigator';
import {services} from '../../store/categories/services';

function serviceProviderDetail({route}) {
  const user = useSelector(authSelector.user);
  // console.log('user -------------', user);
  // const {serviceId} = route.params;
  const [serviceIDRoute, setServiceIDRoute] = useState('');
  const [loadingServiceData, setLoadingServiceData] = useState(false);
  const [serviceData, setServiceData] = useState();
  const [editButton, setEditButton] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const {id,serviceId,city,land_mark,closest,contact_detail} = route.params;
  const ourServicesDetailsFun = async () => {
   
    //console.log('---------service-id',serviceId);
    try {
      setLoadingServiceData(true);
      const responseResult = await getOneServiceData(id,serviceId);
      console.log('One Services Detail responseResult', responseResult);
      if (responseResult) {
        setServiceData(responseResult[0]);
        setLoadingServiceData(false);
       getCategory(responseResult[0].service_id.category_id);
      }
    } catch (error) {
      setLoadingServiceData(false);
      console.log('error: ', error);
    }
  };

  const onContinue = (id) => {
    navigation({
      path: ncspNavigator.updateServicesDetail,
      params: {serviceId: id, backType: 'forward'},
    });
  };

  const getCategory = async (catId) => {
    try {
      const responseResultCat = await services(catId);
      // console.log('inside fun response', responseResultCat[0].category_id.name);
      setCategoryName(responseResultCat[0].category_id.name);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('route -----------', route);
    // console.log('route.params.editButton -----------', route.params.editButton);
    if (route && route.params) {
      setServiceIDRoute(route.params.serviceId);
      setEditButton(route.params.editButton);
    }
    ourServicesDetailsFun();
  }, [route]);

  const location = `${route.params.latitude},${route.params.longitude}`
  const url = Platform.select({
    ios: `maps:${location}`,
    android: `geo:${location}?center=${location}&q=${location}&z=16`,
  });

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View>
        {loadingServiceData ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Loader />
          </View>
        ) : (
          <>
            {!serviceData ? (
              <Loader />
            ) : (
              <>
                <View>
                  <ImageBackground
                    source={
                      serviceData.service_id.pictures&&
                      serviceData.service_id.pictures[0].formats &&
                      serviceData.service_id.pictures[0].formats.thumbnail
                        ?{
                            uri:
                              API_ENDPOINT +
                              serviceData.service_id.pictures[0].formats
                                .thumbnail.url,
                          }
                        : require('../../assets/bodyRepair.png')
                    }
                    style={style.image}>
                    {/* <GText
                      fontSize={fsize.h5}
                      fontFamily={ffamily.bold}
                      color={color.white}
                      style={style.text}>
                      {serviceData.service_id.title} {'\n'}
                      <GText
                        fontFamily={ffamily.bold}
                        color={color.blue}
                        fontSize={fsize.p1}
                        style={{marginTop: 3}}>
                        {categoryName == '' ? null : categoryName}
                      </GText>
                    </GText> */}

<View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomColor: color.blue_dark,
                    backgroundColor: color.blue_dark,
                    borderBottomWidth: 0,
                    paddingVertical: 10,
                    
                  }}>
                  <Image
                    source={
                     {
                            uri: `${API_ENDPOINT}/uploads/Service2_b9dca4969a.png`,
                          }
                    }
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: radius.max,
                  
                    }}
                  />

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: '1%',
                    }}>
                    <GText
                      fontFamily={ffamily.bold}
                      color={color.orange}
                      style={{marginTop: 10}}
                      fontSize={fsize.h6}>
                      {/* {serviceData.service_id.title} */}{' '}
                      {serviceData.service_id.title}
                    </GText>
                    <GText
                      fontFamily={ffamily.bold}
                      color={color.orange}
                      fontSize={fsize.p1}
                      style={{marginTop: 3}}>
                      ( {categoryName == '' ? null : categoryName} )
                    </GText>
                  </View>
                </View>
                  </ImageBackground>
                </View>
               
                
                <View style={{marginHorizontal: 20}}>
                  <View
                    style={{
                      marginVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: color.lightGray2,
                      paddingBottom: 8,
                    }}>
                    <GText
                      fontSize={fsize.h6}
                      fontFamily={ffamily.bold}
                      color={color.blue_dark}
                      style={{marginBottom: 5}}>
                      {serviceData.ncsp_id.company_name}
                    </GText>
                    
                      <GText
                        fontSize={fsize.p1}
                        fontFamily={ffamily.semiBold}
                        color={color.gray}>
                        {closest
                          ? closest +
                            ' ' +
                            land_mark +
                            ' ' +
                            city +
                            ' '
                          : 'no address'}
                      </GText>
                   
                  </View>

                  <View
                    style={{
                      marginVertical: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignContent: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: color.lightGray2,
                      paddingBottom: 10,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={{
                          uri: `${API_ENDPOINT}/uploads/user_One_ad3de0ab78.png`,
                        }}
                        style={{
                          height: 22,
                          width: 22,
                          borderRadius: 100,
                          marginRight: 10,
                        }}
                      />
                      <GText
                        fontSize={fsize.p1}
                        fontFamily={ffamily.bold}
                        color={color.gray}
                        style={{marginBottom: 5}}>
                         {serviceData.ncsp_id&&serviceData.ncsp_id.contact_details!=null&&serviceData.ncsp_id.contact_details.nameprimary ? (
                          serviceData.ncsp_id.contact_details.nameprimary
                        ) : (
                          <GText
                            fontSize={fsize.p1}
                            fontFamily={ffamily.bold}
                            color={color.lightgray}
                            style={{marginBottom: 5}}>
                            Contact Name
                          </GText>
                        )} 
                        
                      </GText>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                    <GIcon
                        onPress={() => {
                          Linking.openURL(url);
                        }}
                        name="map"
                        type="Fontisto"
                        color={color.white}
                        size={fsize.h5}
                        style={{
                          backgroundColor:color.orange,
                          borderRadius: 25,
                          padding: 5,
                        }}
                      />
                      <GIcon
                        onPress={() => {
                          Linking.openURL(
                            `tel:${
                              serviceData.ncsp_id.contact_details!=null&&serviceData.ncsp_id.contact_details
                                .mobileprimary
                                ? serviceData.ncsp_id.contact_details
                                    .mobileprimary
                                : '9742977577'
                            }`,
                          );
                        }}
                        name="phone-call"
                        type="Feather"
                        color={color.white}
                        size={fsize.h5}
                        style={{
                          backgroundColor: color.green,
                          borderRadius: 25,
                          padding: 5,
                          marginHorizontal: 15,
                        }}
                      />
                      {/* <GText
                      fontSize={fsize.p1}
                      fontFamily={ffamily.bold}
                      color={color.blue_dark}
                      style={{marginBottom: 5}}
                      onPress={() =>
                        Linking.openURL(
                          `mailto:${serviceData.ncsp_id.contact_details.emailsecondary}`,
                        )
                      }>
                      {serviceData.ncsp_id.contact_details.emailsecondary}
                        </GText> */}
                      <GIcon
                        onPress={() => {
                          Linking.openURL(
                            `mailto:${
                                serviceData.ncsp_id.contact_details!=null&&serviceData.ncsp_id.contact_details
                              .emailprimary
                                ? serviceData.ncsp_id.contact_details
                                    .emailprimary
                                : 'info@gomotorcar.com'
                            }`,
                          );
                        }}
                        name="email"
                        type="Fontisto"
                        color={color.white}
                        size={fsize.h5}
                        style={{
                          backgroundColor:color.orange,
                          borderRadius: 25,
                          padding: 5,
                        }}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: color.lightGray2,
                      paddingBottom: 8,
                    }}>
                    <View
                      style={{
                        marginVertical: 5,
                      }}>
                      <GText
                        fontSize={fsize.p1}
                        fontFamily={ffamily.semiBold}
                        color={color.orange}
                        style={{marginBottom: 5}}>
                        Service Mode
                      </GText>
                      <GText
                        fontFamily={ffamily.bold}
                        color={color.gray}
                        style={{marginTop: 10, textAlign: 'center'}}
                        fontSize={fsize.p1}>
                        {serviceData.service_mode=="atwork"?"At Work":serviceData.service_mode=="home"?"Door Step":serviceData.service_mode=="both"?"At Work & Door Step ":""}
                      </GText>
                    </View>
                    <View
                      style={{
                        marginVertical: 5,
                      }}>
                      <GText
                        fontSize={fsize.p1}
                        fontFamily={ffamily.semiBold}
                        color={color.orange}
                        style={{marginBottom: 5}}>
                        Hatch Back
                      </GText>
                      <GText
                        fontFamily={ffamily.bold}
                        color={color.gray}
                        style={{marginTop: 10, textAlign: 'left'}}
                        fontSize={fsize.p1}>
                        {'\u20B9'} {''} {serviceData.price_hatch_back}
                      </GText>
                    </View>
                    <View
                      style={{
                        marginVertical: 5,
                      }}>
                      <GText
                        fontSize={fsize.p1}
                        fontFamily={ffamily.semiBold}
                        color={color.orange}
                        style={{marginBottom: 5}}>
                        Sedan
                      </GText>
                      <GText
                        fontFamily={ffamily.bold}
                        color={color.gray}
                        style={{marginTop: 10, textAlign: 'left'}}
                        fontSize={fsize.p1}>
                        {'\u20B9'} {''} {serviceData.price_sedan}
                      </GText>
                    </View>
                    <View
                      style={{
                        marginVertical: 5,
                      }}>
                      <GText
                        fontSize={fsize.p1}
                        fontFamily={ffamily.semiBold}
                        color={color.orange}
                        style={{marginBottom: 5}}>
                        SUV
                      </GText>
                      <GText
                        fontFamily={ffamily.bold}
                        color={color.gray}
                        style={{marginTop: 10, textAlign: 'left'}}
                        fontSize={fsize.p1}>
                        {'\u20B9'} {''} {serviceData.price_suv}
                      </GText>
                    </View>
                  </View>
                  <View
                    style={{
                      marginVertical: 5,
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignContent: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: color.lightGray2,
                      paddingBottom: 8,
                    }}>
                    <GText
                      fontSize={fsize.p1}
                      fontFamily={ffamily.semiBold}
                      color={color.orange}
                      style={{marginBottom: 5}}>
                      Service Description
                    </GText>
                    <GText
                      fontSize={fsize.p1}
                      color={color.gray}
                      style={{marginVertical: 5}}>
                      {serviceData.content == '' ? null : serviceData.content}
                    </GText>
                  </View>
                  <View
                    style={{
                      marginVertical: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignContent: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: color.lightGray2,
                      paddingBottom: 8,
                    }}>
                    <GText
                      fontSize={fsize.p1}
                      fontFamily={ffamily.semiBold}
                      color={color.orange}
                      style={{marginBottom: 5}}>
                      Service Images
                    </GText>
                  </View>
                  <View
                    style={{
                      marginVertical: 5,
                    }}>
                    {serviceData.images && serviceData.images.length !== 0 ? (
                      <>
                        {/* <View style={{marginBottom: 1}}>
                          <GText
                            fontSize={fsize.p1}
                            fontFamily={ffamily.bold}
                            color={color.gray}>
                            ALl Images
                          </GText>
                        </View> */}
                        <View>
                          <FlatList
                            data={serviceData.images}
                            numColumns={4}
                            style={{
                              marginTop: 1,
                              flexDirection: 'row',
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                              return (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 6,
                                  }}>
                                  <Image
                                    key={{index}}
                                    source={
                                      item.formats && item.formats.thumbnail
                                        ? {
                                            uri:
                                              API_ENDPOINT +
                                              item.formats.thumbnail.url,
                                          }
                                        : ''//require('../../../assets/bodyRepair.png')
                                    }
                                    style={{
                                      height: 80,
                                      width: 80,
                                    }}
                                  />
                                </View>
                              );
                            }}
                          />
                        </View>
                      </>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginVertical: 10,
                        }}>
                        <GText
                          fontSize={fsize.p1}
                          fontFamily={ffamily.bold}
                          color={color.gray}>
                          No Images
                        </GText>
                      </View>
                    )}
                  </View>
                </View>
              </>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default serviceProviderDetail;

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    // color: 'white',
    //  fontSize: fsize.h4,
    // fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 65,
    backgroundColor: '#000000a0',
  },
});