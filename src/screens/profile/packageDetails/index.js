import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import navigator from '../../../navigation/navigator';
import navigation from '../../../utils/navigation';
import {
  active_clean_plans,
  cleaning_packages,
  get_service,
} from '../../../store/cleaningPackage/services';
import PackageDetailScreen from './packageDetailScreen_2';
import authSelector from './../../../store/auth/selector';
import {
  user_cars,
  get_user_car_packages,
  get_offer_for_service,
  get_user_orders,
} from './../../../store/cleaningPackage/services';
import {ImageUriHandler} from './../../../utils/imageHandler';
import moment from 'moment';
import {store} from '../../../../App';
import {useFocusEffect} from '@react-navigation/native';
import {setAddressRouteData} from './../../../store/cleaningPackage/slice';

export default ({route}) => { 

  console.log('----------------iscreated is comping',route);
  const user_id = useSelector(authSelector.userId);

  const [userCarLoading, setUserCarsLoading] = useState(false);
  const [userCars, setUserCars] = useState([]);
  const [planLoading, setPlanLoading] = useState(false);
  const [packData, setPackData] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cleaningService, setCleaningService] = useState(null);
  //const [offers, setOffers] = useState(null);
  const [orderCount, setOrderCount] = useState(null);

  const [tabData, setTabData] = useState([]);
  const [aptDetails, setAptDetails] = useState(null);
  const [aptTimings, setAptTimings] = useState(null);
//console.log('packdata=================>',packData);
  useEffect(() => {
    getUserOrders();
    //getUserCars();
    getService();
    getPlans();
    console.log('auth token', store.getState().auth.token);
  }, []);

  useEffect(() => {
    getUserCars();
  }, [route.params.isCarAdded]);

  const getPlans = async (car) => { 
    setPlanLoading(true);
    try {
      const response = await cleaning_packages();
    //  console.log('-------cleaning_packages---------------------->',response);
      if (response) {

  
        setPackData(response);
        //const ids = response.map(pack => pack.id);
        //getOffers(ids);
      }
      setPlanLoading(false);
    } catch (error) {
      setPlanLoading(false);
      console.log('cleaning_packages', error);
    }
  };

  // const getOffers = async(ids) => {
  //   try {
  //     const offers = await get_offers_plan(ids);
  //     setOffers(offers);
  //   } catch(error){
  //     console.log("get offers error "+error.message);
  //   }
  // }

  const getUserOrders = async () => {

    
    try {
      const today = moment().add(1, 'days').format('YYYY-MM-DD');
      const response = await get_user_orders(user_id, today);

      if (response) {
        setOrderCount(response);
      }
    } catch (error) {
      console.log('get users orders error ' + error.message);
    }
  };

  const getUserCars = async () => {
    setUserCarsLoading(true);
    try {
      const response = await user_cars(user_id);
      if (response) {
      
        setUserCars(response);
        setTabData(genTabData(response));
      }
      setUserCarsLoading(false);
    } catch (error) {
      setUserCarsLoading(false);
      console.log('user_cars', error); 
    }
  };

  const onCarAddPress = () => {
    //dispatch(setAddressRouteData(route.params));
    navigation({path: navigator.selectCompany});
  };

  const genTabData = (data) => {
    return data.map((car) => {
      const {
        id,
        car_model_id,
        car_number,
        car_company_id,
        car_type_id,
        car_images,
      } = car;
      return {
        id,
        name: car_model_id.name,
        car_number,
        image: ImageUriHandler(car_company_id.brand_logo.url),
        carImg: car_model_id.icon.formats.thumbnail.url,
        car_type: car_type_id.name,
        key: car_model_id.name + car_number,
        title: 'BMW',
        number: 'KA 36 MH 4567',
        image:
          'https://i.pinimg.com/originals/bb/30/a5/bb30a552838b5eddbb98459ed010d931.jpg',
      };
    });
  };

  const getService = async () => {
    try {
      const response = await get_service('Everyday');
      if (response) {
        setCleaningService(response);
      }
      //const service_id = response ? response[0].id : 0;
      // let offers;
      // if(service_id){
      //   offers = await get_offer_for_service(service_id);
      //   setOffers(offers);
      // }
    } catch (error) {
      console.log('user_cars', error);
    }
  };

  return (
    <PackageDetailScreen
      packData={packData}
      planLoading={planLoading}
      userCars={userCars}
      userCarLoading={userCarLoading}
      setSelectedCar={setSelectedCar}
      selectedCar={selectedCar}
      getPlans={getPlans}
      tabData={tabData}
      user_id={user_id}
      setAptDetails={setAptDetails}
      aptDetails={aptDetails}
      setAptTimings={setAptTimings}
      aptTimings={aptTimings}
      getUserCars={getUserCars}
      onCarAddPress={onCarAddPress}
      orderCount={orderCount}
      setOrderCount={setOrderCount}
    />
  );
};
