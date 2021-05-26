import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SelecPackageScreen from './selecPackageScreen';
import navigator from '../../../../navigation/navigator';
import navigation from '../../../../utils/navigation';
import { CommonActions } from '@react-navigation/native';
import {
  user_cars,
  cleaning_packages,
  cleaning_order,
  get_user_orders,
  qrCodeAvaibleSeries,
} from './../../../../store/cleaningPackage/services';
import moment from 'moment';
import authSelector from './../../../../store/auth/selector';
import {razorPay} from './../../../../utils/razorpay';
import {setAddressRouteData} from '../../../../store/cleaningPackage/slice';
import { showtoast } from '../../../../utils/error';


export default ({route}) => {
  const user_id = useSelector(authSelector.userId);
console.log('-----------------------route parsm of select car',route.params);
  const dispatch = useDispatch(); 

  const [userCarLoading, setUserCarsLoading] = useState(false);
  const [cleanPlanLoading, setCleanPlanLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [packData, setPackData] = useState([]);

  const [userCars, setUserCars] = useState([]);
  const [cleanPlans, setCleanPlans] = useState([]);
  const [selectedCar, setSelectedCar] = useState({});
  const [selectedPlan, setSelectedPlan] = useState({});
  const [orderCount, setOrderCount] = useState(null);

  useEffect(() => {
    getUserCars();
  }, [route.params.isCarAdded]);

  useEffect(() => {
    getCleanPlans();
    getUserOrders();
  }, []);

  const getUserOrders = async() => {
    try
    {
      
      const today = moment().add(1, 'days').format( 'YYYY-MM-DD' );
      const response = await get_user_orders( user_id, today );
     
      if(response){
        setOrderCount(response);
      }
      
    }catch(error){
      console.log("get users orders error "+error.message);
    }
  }

  
  const getUserCars = async () => {
    setUserCarsLoading(true);
    try {
      const response = await user_cars(user_id);
      if (response) {
        setUserCars(response);
     
      }
      setUserCarsLoading(false);
    } catch (error) {
      setUserCarsLoading(false);
      console.log('error', error);
    }
  };

  const getCleanPlans = async () => {
    setCleanPlanLoading(true);
    try {
      const response = await cleaning_packages();
      if (response) {
        setCleanPlans(response);
      }
      setCleanPlanLoading(false);
    } catch (error) {
      setCleanPlanLoading(false);
      console.log('error', error);
    }
  };

  const onContinue = async () => {
    try{

  const  isApartmentqrAvailable = await qrCodeAvaibleSeries(route.params.apartment_id);
if(isApartmentqrAvailable.length==0){
  showtoast("Qr code Not found for the apartment");
} else{
      setPaymentLoading(true);
      let paid_results;
      if (selectedPlan && selectedPlan.price) {
        paid_results = await razorPay(selectedPlan.price * 100);
      } else {
        showtoast("please choose your car and price");
        setPaymentLoading(false);
      }
      if (paid_results && paid_results.razorpay_payment_id) {
        try {
          const body = genOrderBody(paid_results.razorpay_payment_id);
          const response = await cleaning_order(body);
          if (response) {
            setPaymentLoading(false);
            dispatch(setAddressRouteData(null));
            navigation({path:navigator.paymentSucess});
          }
        } catch (error) {
          
          console.log('error', error);
          setPaymentLoading(false);
        }
      } else {
        setPaymentLoading(false);
        navigation.dispatch(CommonActions.goBack());
      }
    }
    } catch(e){
      console.log("error occurred while payment"+e.description);
      setPaymentLoading(false);
      if(e && e.description){
        if(e.reason == "payment_cancelled"){
          navigation.dispatch(CommonActions.goBack());
        }
      }
      
    }
    
  };

  const genOrderBody = (payment_id) => {
    const {
      apartment_id,
      cleaner_id,
      timeslot: {end_time, start_time, id},
    } = route.params;
    
    return {
      customer_id: user_id,
      cleaner_id: cleaner_id,
      apartment_id: apartment_id,
      start_time,
      end_time,
      customer_car: selectedCar.car_id,
      time_slot: id,
      order: {
        plan_id: selectedPlan.id,
        package_type: 'subscription_package',
        package_type_id: '2',
      },
      payment: {
        paid_id: payment_id,
        amount: selectedPlan.price,
        status: true,
        no_products: 1,
        payment_done_via: 'razor pay',
        payment_type: 'pre_paid',
      },
    };
  };

  const onCarAddPress = () => {
    dispatch(setAddressRouteData(route.params));
    navigation({path:navigator.selectCompany});
  };

  return (
    <SelecPackageScreen
      onContinue={onContinue}
      userCars={userCars}
      cleanPlans={cleanPlans}
      setCleanPlans={setCleanPlans}
      setSelectedCar={setSelectedCar}
      selectedCar={selectedCar}
      setSelectedPlan={setSelectedPlan}
      selectedPlan={selectedPlan}
      userCarLoading={userCarLoading}
      cleanPlanLoading={cleanPlanLoading}
      paymentLoading={paymentLoading}
      onCarAddPress={onCarAddPress}
      orderCount={orderCount}
      setOrderCount={setOrderCount}
    />
  );
};
