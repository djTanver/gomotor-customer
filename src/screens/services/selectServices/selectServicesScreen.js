import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {showtoast} from '../../../utils/error';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  Image,
  RefreshControl,
} from 'react-native';
import GText from '../../../components/GText';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import GSearchInput from '../../../components/GSearchInput';
import GImageNameBox from '../../../components/GImageNameBox';
import {services} from '../../../store/categories/services';
import Loader from '../../../components/Loader';
import navigation from '../../../utils/navigation';
import navigator from '../../../navigation/navigator';
import API_ENDPOINT from '../../../config/api';
import {get_user_orders} from '../../../store/cleaningPackage/services';
import moment from 'moment';
import authSelector from './../../../store/auth/selector';

export default ({route, onContinue}) => {
  const userId = useSelector(authSelector.userId);
  const [_services, setServices] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log('route', route);
    getServices();
  }, []);
  const getServices = async () => {
    try {
      if (route.params && route.params.item) {
        const response = await services(route.params.item.id);

        console.log('------------steam car wash---------',response);
        setServices(response);
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const onCleanPackage = async () => {
    try {

      
      
      if (userId) {
      

        const today = moment().add(1, 'days').format( 'YYYY-MM-DD' );
      const result = await get_user_orders(userId, today );
      
      if (result > 0) {
        navigation({path: navigator.packageDetail, params:{isCarAdded:''}});
      } else {
        navigation({path: navigator.selectAddress});
      }

        // const result = await check_active_plans(userId);

        // setCleanLoading(false);
        // if (result) {
        //   if (result.length > 0) {
        //     navigation({
        //       path: navigator.packageDetail,
        //       params: {isCarAdded: ''},
        //     });
        //   } else {
        //     navigation({path: navigator.selectAddress});
        //   }
        // }
      }
    } catch (error) {
      
      console.log('error: ', error);
    }
  };


  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 18}}>
        <GText
          fontFamily={ffamily.semiBold}
          color={color.blue}
          fontSize={fsize.h6}
          style={{marginTop: 12}}>
          {route.params.item.name + ' - Services'}
        </GText>

        {/* <GSearchInput placeholder="Search for services" /> */}
        {isLoading && <Loader />}
        <FlatList
          data={_services}
          numColumns={3}
          style={{marginTop: 12}}
          refreshControl={
            <RefreshControl
              refreshing={
                _services && _services.length > 0 && !isLoading ? false : true
              }
              onRefresh={() => getServices()}
            />
          }
          renderItem={({item, index}) => {
            if (item&&item.title!="Cleaner") {

              console.log("===========================item dataaa===============",item);
              
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
                      : require('../../../assets/bodyRepair.png')
                  }
                  name={item.title}
                  onPress={() => {
                    setSelectedModel(item);
                    if(item.title=="Steam Wash at Door Step"){
                    navigation({
                      path: navigator.steamCarWash,
                      params: item,
                    });
                  }
                  else if(item.id==249){
                    onCleanPackage();
                  }
                  else{ 
                    navigation({
                      path: navigator.cleanerListNonApartment,
                      params: item,
                    });
                  }
                  }}
                  isSelected={(selectedModel && selectedModel.id) == item.id}
                />
              );
            }
          }}
        />

        <View></View>
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
