import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  FlatList,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import GText from '../../../components/GText';
import GIcon from '../../../components/GIcon';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import Loader from '../../../components/Loader';
import GImageNameBox from '../../../components/GImageNameBox';
import navigator from '../../../navigation/navigator';
import navigation from '../../../utils/navigation';
import {
  get_user_car_packages,
  single_apartment,
  cleaning_order,
  offers_plan,
  cleaning_time,
  cleaning_renew,
} from '../../../store/cleaningPackage/services';
import GButton from '../../../components/GButton';
import {showtoast} from '../../../utils/error';
import {razorPay} from '../../../utils/razorpay';
import GModal from '../../../components/GModal';
import {now, format} from 'momento';
import {navigationRef} from '../../../../App';
import CleanPackageCard from '../account/cleanPackageCard';
import API_ENDPOINT from '../../../config/api';
import {
  qrCodeAvaibleSeries,
} from './../../../store/cleaningPackage/services';
import moment from 'moment';

export default ({
  planLoading,
  userCarLoading,
  packData,
  userCars,
  getUserCars,
  onCarAddPress,
  tabData,
  user_id,
  setAptDetails,
  aptDetails,
  aptTimings,
  setAptTimings,
  orderCount,
  setOrderCount,
  getPlans,
}) => {
  const [index, setIndex] = React.useState(0);

  const renderScene = ({route}) => {
//console.log('----get what is there in-routes---------------------------------------------->',{route});

    return (
      <TabBody
        packData={packData}
        data={route}
        user_id={user_id}
        setAptDetails={setAptDetails}
        aptDetails={aptDetails}
        setAptTimings={setAptTimings}
        aptTimings={aptTimings}
        getUserCars={getUserCars}
        orderCount={orderCount}
        setOrderCount={setOrderCount}
        getPlans={getPlans}
      />
    );
  };

  if (userCarLoading) {
    return <Loader />;
  }

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View
          style={{
            // flex: 1,
            marginHorizontal: 12,
            marginVertical: 15,
            // backgroundColor: '#E6F9FF',
            padding: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <GText
              fontSize={fsize.h6}
              fontFamily={ffamily.bold}
              color={color.orange}>
              My Cars
            </GText>
          </View>
          <View>
            <TouchableOpacity onPress={onCarAddPress}>
              <GIcon
                name="add-box"
                size={fsize.h5}
                style={{
                  backgroundColor: color.blue_Light,
                  borderRadius: radius.max,
                  padding: 4,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={style.scrollView}>
          {tabData.length > 0 && (
            <TabView
              navigationState={{index, routes: tabData}}
              lazy={true}
              lazyPreloadDistance={1}
              renderScene={renderScene}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  indicatorStyle={{backgroundColor: color.blue}}
                  style={{backgroundColor: color.white}}
                  // getLabelText={({route}) =>  route.title}
                  getLabelText={({route}) => {
                    return (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{
                            width: '100%',
                            height: 40,
                            borderRadius: 5,
                          }}
                          source={{
                            // uri: `${route.image}`,
                            uri: `${API_ENDPOINT}${route.carImg}`,
                          }}
                        />
                        <GText
                          fontSize={fsize.p2}
                          fontFamily={ffamily.semiBold}
                          textAlign={fAlign.right}
                          style={{marginVertical: 3}}>
                          {route.name}{' '}
                        </GText>
                        <GText
                          fontSize={fsize.p1}
                          color={color.black}
                          fontFamily={ffamily.semiBold}
                          textAlign={fAlign.right}>
                          {' '}
                          {route.car_number}{' '}
                        </GText>
                      </View>
                    );
                  }}
                  labelStyle={{color: color.black}}
                  scrollEnabled={true}
                />
              )}
              onIndexChange={setIndex}
            />
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
  gradientWrapper: {
    marginTop: 12,
    borderColor: color.gray_Light,
    borderWidth: 0,
    padding: 8,
    borderRadius: radius.default,
  },
});

const TabBody = ({
  packData,
  data,
  user_id,
  setAptDetails,
  aptDetails,
  setAptTimings,
  aptTimings,
  getUserCars,
  orderCount,
  getPlans,
  setOrderCount,
}) => {
  const [carPlan, setCarPlan] = useState([]);
  const [planLoading, setPlanLoading] = useState(false);
  const [planData, setPlanData] = useState([]);

  useEffect(() => {
    const {id} = data;

    getCarPlans(id);
  }, []);

  const getCarPlans = async (carId) => {
    setPlanLoading(true);

    const {id, car_type} = data;
    if (packData && packData.length) {
      const carModelData = packData&&packData.filter(
        (data) => data.model_type === car_type,
      );
      if (JSON.stringify(planData) != JSON.stringify(carModelData))
        setPlanData(carModelData);
    }

    const today = format('YYYY-MM-DD', now());
    try {
      const response = await get_user_car_packages(user_id, today, carId);
      if (response) {

        console.log('----->get all user car package-------------->,',response);
        if (response && response.currentPlanData&&response.currentPlanData&&!aptDetails) {
          setAptDetails(response &&response.currentPlanData&&response.currentPlanData.apartment_id);
          getApartmentTimings(response &&response.currentPlanData&&response.currentPlanData.apartment_id.id);
        } else if (response && response.upcomingPlanData) {
          setAptDetails(response&&response.upcomingPlanData&&response.upcomingPlanData.apartment_id);
          getApartmentTimings(response&&response.upcomingPlanData&&response.upcomingPlanData.apartment_id.id);
        }
        setCarPlan(response);
      }
      setPlanLoading(false);
    } catch (error) {
      setPlanLoading(false);
    }
  };

  const getApartmentTimings = async (apartment_id) => {
    try {
      const response = await single_apartment(apartment_id);
      if (response) {
        setAptTimings(response);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  if (planLoading) {
    return <Loader />;
  }
  console.log('current plan', carPlan);
  if (carPlan && !carPlan.error) {
    return (
      <View>
        {carPlan && carPlan.upcomingPlanData && (
          <UpcommingPlanCard
            carPlan={carPlan}
            data={data}
            packData={planData}
            aptTimings={aptTimings}
            user_id={user_id}
            getUserCars={getUserCars}
          />
        )}
        {carPlan && carPlan.currentPlanData && (
          <ActivePlanCard
            carPlan={carPlan}
            data={data}
            packData={planData}
            aptTimings={aptTimings}
            user_id={user_id}
            getUserCars={getUserCars}
            getPlans={getPlans}
          />
        )}
      </View>
    );
  } else {
    return (
      <NewSubscription
        packData={planData}
        aptDetails={aptDetails}
        aptTimings={aptTimings}
        data={data}
        getUserCars={getUserCars}
        user_id={user_id}
        orderCount={orderCount}
        setOrderCount={setOrderCount}
      />
    );
  }
};

const NewSubscription = ({
  packData,
  aptDetails,
  aptTimings,
  data,
  user_id,
  getUserCars,
  orderCount,
  setOrderCount,
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isApplicable, setIsApplicable] = useState(false);
  const [selectedOfferDetails, setSelectedOfferDetails] = useState();
  const {car_type, id: car_id} = data;

  let time_slots = [];
  let plan_price = null;

  if (aptTimings && aptTimings.apartment) {
    if (aptTimings &&aptTimings.apartment&&aptTimings.apartment.time_slots) {
      time_slots = aptTimings.apartment.time_slots;
    }
  }

  const onPayNow = async () => {
  
    try {
      //console.log("===============================appartment",aptTimings.apartment);
      setPaymentLoading(true);
      let paid_results;
      if (!selectedTimeSlot) {
        showtoast('please choose package and time slot');
        setPaymentLoading(false);
        return;
      }
      const isApartmentqrAvailable = await qrCodeAvaibleSeries(aptTimings.apartment.id);
      if(isApartmentqrAvailable.length==0){
        showtoast("Qr code Not found for the apartment");
        setPaymentLoading(false);
      } else{

      //console.log( "selectedPack", JSON.stringify(selectedPack) )
      if (selectedPack && selectedPack.price) {
        paid_results = await razorPay(selectedPack.price * 100);
      } else {
        showtoast('please choose package');
        setPaymentLoading(false);
      }

     
      if (paid_results && paid_results.razorpay_payment_id) {
        try {
          const body = genOrderBody(
            paid_results.razorpay_payment_id,
            selectedPack.offers,
          );

          const response = await cleaning_order(body);

          if (response) {
            setOrderCount(orderCount + 1);
            getUserCars();
            setPaymentLoading(false);
            navigation({path: navigator.paymentSucess});
          }
        } catch (error) {
          console.log('error', error);
          setPaymentLoading(false);
        }
      } else {
        setPaymentLoading(false);
      }
    }
    } catch (e) {
      if (e && e.description) {
        if (e.reason == 'payment_cancelled') {
          navigationRef.current?.goBack();
        }
      }
    }
  };

  const genOrderBody = (payment_id, offers, isApplicable, price) => {
    let timeslot;
    aptTimings&&aptTimings.apartment&&aptTimings.apartment.time_slots.map((time) => {
      if (time.id == selectedTimeSlot) {
        timeslot = {end_time: time.end_time, start_time: time.start_time};
      }
    });
    debugger;
    return {
      customer_id: user_id,
      cleaner_id: aptTimings.cleaner_id,
      apartment_id: aptDetails.id,
      start_time: timeslot.start_time,
      end_time: timeslot.end_time,
      time_slot: selectedTimeSlot,
      customer_car: car_id,
      offer_id: offers.length > 0 ? offers[0].id : null,
      offer_start_date: offers.length > 0 ? offers[0].offer_start_date : null,
      offer_end_date: offers.length > 0 ? offers[0].offer_end_date : null,

      order: {
        plan_id: selectedPack.id,
        package_type: 'subscription_package',
        package_type_id: '2',
      },
      payment: {
        paid_id: payment_id,
        amount: selectedPack.price,
        status: true,
        no_products: 1,
        payment_done_via: 'razor pay',
        payment_type: 'pre_paid',
      },
    };
  };

  return (
    <View>
      <GText
        // textAlign={fAlign.center}
        fontSize={fsize.h6}
        color={color.orange}
        fontFamily={ffamily.bold}
        style={{marginTop: 20}}>
        Choose Subscription Pack
      </GText>
      <FlatList
        data={packData}
        renderItem={({item, index}) => {
          const {
            id: pack_id,
            title,
            service_duration,
            sales_tax,
            price,
            service_details: {full_exterior_cleaning_per_month},
            service_details: {full_interior_cleaning_per_month},
            offers,
          } = item;

          let plan_price_item = price;
          if (offers && offers.length) {
            //check it applies for first or second
            const applicable_to = !selectedOfferDetails
              ? offers[0].applicable_to
              : selectedOfferDetails;

            //setIsApplicable(false);
            switch (applicable_to) {
              case 'first': //setOfferDetails(offer);
                plan_price_item = price - offers[0].discount_amount;
                setIsApplicable(true);
                break;
              case 'second':
                if (orderCount >= 1) {
                  setIsApplicable(true);
                  plan_price_item = price - offers[0].discount_amount;
                }
                break;
              case 'third':
                if (orderCount >= 2) {
                  setIsApplicable(true);
                  plan_price_item = price - offers[0].discount_amount;
                }
                break;
            }
            console.log(
              'isApplicable =======>' + isApplicable + ' ' + orderCount,
            );
          }

          return (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 5,
                }}>
                {/* {isApplicable && offers[0] && (
                  <View>
                    <GText
                      textAlign={fAlign.center}
                      fontSize={fsize.h6}
                      fontFamily={ffamily.semiBold}>
                      Offer
                    </GText>
                    <GText
                      color={color.gray}
                      fontSize={fsize.p1}
                      textAlign={fAlign.center}
                      fontFamily={ffamily.semiBold}>
                      {offers[0].offer_name}
                    </GText>
                  </View>
                )}
                {isApplicable && offers[0] && (
                  <View>
                    <GText fontSize={fsize.h6} fontFamily={ffamily.semiBold}>
                      Offer amount  ₹ {offers[0].discount_amount}
                    </GText>
                    <GText
                      color={color.gray}
                      fontSize={fsize.p1}
                      textAlign={fAlign.center}
                      fontFamily={ffamily.semiBold}>
                      ₹ {offers[0].discount_amount}
                    </GText>
                  </View>
                )} */}
              </View>
              <TouchableOpacity
                onPress={() =>
                  setSelectedPack({...item, price: plan_price_item})
                }
                style={{
                  marginTop: 10,
                  backgroundColor:
                    (selectedPack && selectedPack.id) == item.id
                      ? color.blue
                      : color.blue_Light,
                  borderColor:
                    (selectedPack && selectedPack.id) == item.id
                      ? color.blue
                      : color.blue_Light,
                  borderWidth:
                    (selectedPack && selectedPack.id) == item.id ? 2 : 1,
                  // padding: 8,
                  borderRadius: radius.default,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 8,
                    paddingHorizontal: 8,
                  }}>
                  <GText fontSize={fsize.h6} fontFamily={ffamily.bold}>
                    {title}
                  </GText>
                  <GText
                    color={color.white}
                    fontSize={fsize.p1}
                    fontFamily={ffamily.semiBold}
                    style={{
                      backgroundColor: color.blue,
                      paddingHorizontal: 12,
                      paddingVertical: 2,
                      borderRadius: radius.h3,
                    }}>
                    {service_duration} month
                  </GText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    paddingHorizontal: 8,
                  }}>
                  <GText
                    fontSize={fsize.h6}
                    fontFamily={ffamily.semiBold}
                    textAlign={fAlign.center}
                    style={{
                      borderRightColor: color.gray_Light,
                      borderRightWidth: 1,
                      flex: 1,
                    }}>
                    {full_exterior_cleaning_per_month} {'\n'}
                    <GText
                      color={color.gray}
                      fontSize={fsize.p1}
                      textAlign={fAlign.center}
                      fontFamily={ffamily.semiBold}>
                      Exterior
                    </GText>
                  </GText>
                  <GText
                    fontSize={fsize.h6}
                    fontFamily={ffamily.semiBold}
                    textAlign={fAlign.center}
                    style={{
                      borderRightColor: color.gray_Light,
                      borderRightWidth: 1,
                      flex: 1,
                    }}>
                    {full_interior_cleaning_per_month} {'\n'}
                    <GText
                      color={color.gray}
                      fontSize={fsize.p1}
                      fontFamily={ffamily.semiBold}
                      textAlign={fAlign.center}>
                      Interior
                    </GText>
                  </GText>
                  <GText //₹ {plan_price_item}
                    color={color.blue}
                    fontSize={fsize.h6}
                    fontFamily={ffamily.semiBold}
                    textAlign={fAlign.center}
                    style={{flex: 1}}>
                    {isApplicable && (
                      <GText
                        fontSize={fsize.h6}
                        fontFamily={ffamily.semiBold}
                        textAlign={fAlign.center}>
                        {' '}
                        ₹ {price}
                      </GText>
                    )}{' '}
                    {'\n'}
                    <GText
                      color={color.gray}
                      fontSize={fsize.p1}
                      fontFamily={ffamily.semiBold}
                      textAlign={fAlign.center}>
                      per month
                    </GText>
                  </GText>
                </View>
                {isApplicable && offers[0] && (
                  <View
                    style={{
                      marginTop: 10,
                      backgroundColor: color.orange,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderBottomLeftRadius: radius.default,
                      borderBottomRightRadius: radius.default,
                    }}>
                    <GText
                      color={color.white}
                      fontFamily={ffamily.semiBold}
                      fontSize={fsize.p1}>
                      {offers[0].offer_name} 
                    </GText>
                    <GText
                      color={color.white}
                      fontFamily={ffamily.semiBold}
                      fontSize={fsize.p1}>
                      {' '}
                      Pay only ₹ {plan_price_item}
                    </GText>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* {aptTimings && (
        <GText
          color={color.white}
          fontSize={fsize.p1}
          fontFamily={ffamily.semiBold}
          style={{
            backgroundColor: color.blue,
            paddingHorizontal: 12,
            paddingVertical: 2,
            marginVertical: 12,
            borderRadius: radius.h3,
          }}> */}
      {/* 100 Rs discount */}
      {/* <RNPickerSelect
                onValueChange={(value) => value && setSelectedOfferDetails(value)}
                items={
                  offerArray
                }
                placeholder={{label:"select offer",color:color.black}}
                value={selectedOfferDetails}
                style={ {inputAndroid: {color: color.black} }}
            /> */}
      {/* </GText> */}
      {/* )} */}

      {time_slots.length > 0 && (
        <GText
          fontSize={fsize.h6}
          color={color.orange}
          fontFamily={ffamily.bold}
          style={{marginTop: 20}}>
          Select the time slot
        </GText>
      )}

      {time_slots.length > 0 && (
        <RNPickerSelect
          onValueChange={(value) => value && setSelectedTimeSlot(value)}
          items={time_slots.map((timeslot) => {
            return {
              label: `${timeslot.start_time.substring(
                0,
                5,
              )} to ${timeslot.end_time.substring(0, 5)}`,
              value: timeslot.id,
              key: timeslot.id,
            };
          })}
          placeholder={{label: 'select time slots', color: color.black}}
          value={selectedTimeSlot}
          style={{
            inputAndroid: {
              color: color.black,
            },
          }}
        />
      )}

      {aptTimings && (
        <>
          <GText
            fontSize={fsize.h6}
            color={color.orange}
            fontFamily={ffamily.bold}
            style={{marginTop: 12}}>
            Address
          </GText>
          <GText
            color={color.gray}
            fontSize={fsize.h6}
            fontFamily={ffamily.semiBold}
            style={{
              marginTop: 6,
              paddingBottom: 15,
            }}>
            {/* <GText fontSize={fsize.h6}>Name:&nbsp;</GText> */}
            {aptTimings.apartment.name},&nbsp;
            {/* {'\n'} */}
            {/* <GText fontSize={fsize.h6}>Address:&nbsp;</GText> */}
            {aptTimings.apartment.address.address}, &nbsp;
            {/* {'\n'} */}
            {/* <GText fontSize={fsize.h6}>Land mark:&nbsp;</GText> */}
            {aptTimings.apartment.address.land_mark}, &nbsp;
            {/* {'\n'} */}
            {/* <GText fontSize={fsize.h6}>City:&nbsp;</GText> */}
            {aptTimings.apartment.address.city}, &nbsp;
            {/* {'\n'} */}
            {/* <GText fontSize={fsize.h6}>Pincode:&nbsp;</GText> */}
            {aptTimings.apartment.address.pincode}
            {/* {'\n'} */}
          </GText>
        </>
      )}

      <GButton
        marginHorizontal={8}
        marginVertical={10}
        loading={paymentLoading}
        onPress={onPayNow}>
        Pay Now
      </GButton>
    </View>
  );
};
const ChangePlan = ({packData, setSelectedPack, selectedPack, car_type}) => {
  // useEffect(() => {
  //   packData = packData.filter(data => data.model_type === car_type);
  //   console.log("packData=======>",JSON.stringify(packData));
  // }, [])

  let plan_price = null;

  return (
    <View>
      <FlatList
        data={packData}
        renderItem={({item, index}) => {
          plan_price = item.price;

          // if (car_type == 'HatchBack') {
          //   plan_price = item.price_Hatch_Back;
          // } else if (car_type == 'Sedan') {
          //   plan_price = item.price_Sedan;
          // } else if (car_type == 'SUV') {
          //   plan_price = item.price_SUV;
          // }

          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedPack({...item, price: plan_price});
              }}
              style={{
                marginTop: 12,
                borderColor:
                  (selectedPack && selectedPack.id) == item.id
                    ? color.blue
                    : color.gray_Light,
                borderWidth:
                  (selectedPack && selectedPack.id) == item.id ? 2 : 1,
                padding: 8,
                borderRadius: radius.default,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <GText fontSize={fsize.h6} fontFamily={ffamily.semiBold}>
                  {item.title}
                </GText>
                <GText
                  color={color.white}
                  fontSize={fsize.p1}
                  fontFamily={ffamily.semiBold}
                  style={{
                    backgroundColor: color.blue,
                    paddingHorizontal: 12,
                    paddingVertical: 2,
                    borderRadius: radius.h3,
                  }}>
                  {item.service_duration} month
                </GText>
              </View>
              <View style={{flexDirection: 'row', marginTop: 16}}>
                <GText
                  fontSize={fsize.h6}
                  fontFamily={ffamily.semiBold}
                  textAlign={fAlign.center}
                  style={{
                    borderRightColor: color.gray_Light,
                    borderRightWidth: 1,
                    flex: 1,
                  }}>
                  {item.service_details.full_exterior_cleaning_per_month} {'\n'}
                  <GText
                    color={color.gray}
                    fontSize={fsize.p1}
                    textAlign={fAlign.center}
                    fontFamily={ffamily.semiBold}>
                    Exterior
                  </GText>
                </GText>
                <GText
                  fontSize={fsize.h6}
                  fontFamily={ffamily.semiBold}
                  textAlign={fAlign.center}
                  style={{
                    borderRightColor: color.gray_Light,
                    borderRightWidth: 1,
                    flex: 1,
                  }}>
                  {item.service_details.full_interior_cleaning_per_month} {'\n'}
                  <GText
                    color={color.gray}
                    fontSize={fsize.p1}
                    fontFamily={ffamily.semiBold}
                    textAlign={fAlign.center}>
                    Interior
                  </GText>
                </GText>
                <GText
                  color={color.blue}
                  fontSize={fsize.h6}
                  fontFamily={ffamily.semiBold}
                  textAlign={fAlign.center}
                  style={{flex: 1}}>
                  ₹ {plan_price} {'\n'}
                  <GText
                    color={color.gray}
                    fontSize={fsize.p1}
                    fontFamily={ffamily.semiBold}
                    textAlign={fAlign.center}>
                    per month
                  </GText>
                </GText>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const ActivePlanCard = ({
  carPlan,
  data,
  packData,
  user_id,
  getUserCars,
  getPlans,
  aptTimings = {},
}) => {
  const [changePlanModal, setChangePlanModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isTimeSlotUpdate, setTimeSlotUpdate] = useState(false);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    carPlan.currentPlanData.time_slot.id,
  );
  const [selectedPack, setSelectedPack] = useState(null);

  const [successModal, setSuccessModal] = useState(false);

  const {
    id: plan_id,
    title,
    service_duration,
    price,
    service_details: {full_exterior_cleaning_per_month},
    service_details: {full_interior_cleaning_per_month},
  } = carPlan.currentPlanData.subscription_plan_stats.current_plan;

  const {start_time, end_time, id} = carPlan.currentPlanData.time_slot;

  const {id: apartment_id} = carPlan.currentPlanData.apartment_id;
  const {from_date, to_date, customer_cleaner_id} = carPlan.currentPlanData;
  const {
    isUpcommingPlanSubscribed,
    isCurrentPlanEnding,
    currentPlanEndingDays,
  } = carPlan;

  const {cleaner_id, apartment} = aptTimings || {};

  const {car_type, id: car_id} = data;

  let plan_price = price;

  if (carPlan.currentPlanData && carPlan.currentPlanData.offer) {
    console.log(
      'carPlan.currentPlanData =============>' +
        JSON.stringify(carPlan.currentPlanData),
    );
    plan_price = price - carPlan.currentPlanData.offer.discount_amount;
  }

  const handleModalVisible = () => {
    setChangePlanModal(!changePlanModal);
  };

  const handleSucessModal = (isRefresh) => {
    if (successModal) {
      getUserCars();
    }
    if (isRefresh) {
      setSuccessModal(!successModal);
    }
  };

  const onCurrentPlanRenew = async () => {
    try {
      setPaymentLoading(true);
      const {start_time, end_time, id} = carPlan.currentPlanData.time_slot;
      // const {offer_start_date, offer_end_date } = carPlan.currentPlanData.offer;
      if (plan_id && end_time && plan_price) {
        try {
          const paid_response = await razorPay(plan_price * 100);
          handleSucessModal();
          if (paid_response && paid_response.razorpay_payment_id) {
            // const body = genOrderBody(
            //   plan_id,
            //   start_time,
            //   end_time,
            //   paid_response.razorpay_payment_id,
            //   plan_price,
            // );
            const body = {
              cleaner_id,
              offer_id:
                carPlan.currentPlanData.offer &&
                carPlan.currentPlanData.offer.id
                  ? carPlan.currentPlanData.offer.id
                  : null,
              offer_start_date:
                carPlan.currentPlanData.offer &&
                carPlan.currentPlanData.offer.offer_start_date
                  ? carPlan.currentPlanData.offer.offer_start_date
                  : null,
              offer_end_date:
                carPlan.currentPlanData.offer &&
                carPlan.currentPlanData.offer.offer_end_date
                  ? carPlan.currentPlanData.offer.offer_end_date
                  : null,
              start_time,
              end_time,
              time_slot: id,
              order: {
                id: carPlan.currentPlanData.order_id,
                package_type: 'subscription_package',
                package_type_id: '2',
              },
              payment: {
                paid_id: paid_response.razorpay_payment_id,
                amount: plan_price,
                description: 'Payment towards renewal of cleaning package.',
                status: true,
                no_products: 1,
                payment_done_via: 'razor pay',
                payment_type: 'pre_paid',
              },
            };
            debugger;
            try {
              const order_response = await cleaning_renew(body);
              if (order_response) {
                getUserCars();
                getPlans();
                setPaymentLoading(false);
              } else {
                setPaymentLoading(false);
                showtoast('Please try again later');
              }
            } catch (error) {
              setPaymentLoading(false);
              showtoast('Please try again later');
            }
          } else {
            setPaymentLoading(false);
            showtoast('Please try again later');
          }
        } catch (error) {
          setPaymentLoading(false);
          showtoast('Please try again later');
        }
      } else {
        setPaymentLoading(false);
        showtoast('Please try again later');
      }
    } catch (e) {
      if (e && e.description) {
        if (e.reason == 'payment_cancelled') {
          navigationRef.current?.goBack();
        }
      }
    }
  };

  const onChangePlan = async () => {
    try {
      setPaymentLoading(true);
      if (selectedPack && selectedTimeSlot) {
        try {
          const paid_response = await razorPay(selectedPack.price * 100);
          handleModalVisible();
          handleSucessModal();
          if (paid_response && paid_response.razorpay_payment_id) {
            let timeslot;
            apartment.time_slots.map((time) => {
              if (time.id == selectedTimeSlot) {
                timeslot = {
                  end_time: time.end_time,
                  start_time: time.start_time,
                };
              }
            });
            const body = genOrderBody(
              selectedPack.id,
              timeslot.start_time,
              timeslot.end_time,
              'paid_id',
              selectedPack.price,
            );
            try {
              const order_response = await cleaning_order(body);
              if (order_response) {
                setPaymentLoading(false);
              } else {
                setPaymentLoading(false);
                showtoast('Please try again later');
              }
            } catch (error) {
              setPaymentLoading(false);
              showtoast('Please try again later');
            }
          } else {
            setPaymentLoading(false);
            showtoast('Please try again later');
          }
        } catch (error) {
          setPaymentLoading(false);
          showtoast('Please try again later');
        }
      } else {
        setPaymentLoading(false);
        showtoast('Please try again later');
      }
    } catch (err) {
      if (e && e.description) {
        if (e.reason == 'payment_cancelled') {
          navigationRef.current?.goBack();
        }
      }
    }
  };

  const updateTimeSlot = async () => {
    setTimeSlotUpdate(true);
    try {
      let timeslot;
      apartment.time_slots.map((time) => {
        if (time.id == selectedTimeSlot) {
          timeslot = {
            start_time: time.start_time,
            end_time: time.end_time,
            id: time.id,
          };
        }
      });
      let _body = {
        ...timeslot,
      };

      let response = await cleaning_time(customer_cleaner_id, _body);
      if (response) {
        showtoast(response.message);
        getUserCars();
        setTimeSlotUpdate(false);
      }
    } catch (err) {
      setTimeSlotUpdate(false);

      console.log('error', err);
    }
  };

  const genOrderBody = (plan_id, start_time, end_time, paid_id, amount) => {
    return {
      customer_id: user_id,
      cleaner_id: cleaner_id,
      apartment_id: apartment_id,
      start_time: start_time,
      end_time: end_time,
      time_slot: selectedTimeSlot,
      customer_car: car_id,
      offer_id: offers.length > 0 ? offers[0].id : null,
      offer_start_date: offers.length > 0 ? offers[0].offer_start_date : null,
      offer_end_date: offers.length > 0 ? offers[0].offer_end_date : null,
      order: {
        plan_id,
        package_type: 'subscription_package',
        package_type_id: '2',
      },
      payment: {
        paid_id,
        amount,
        status: true,
        no_products: 1,
        payment_done_via: 'razor pay',
        payment_type: 'pre_paid',
      },
    };
  };
  return (
    <>
      <GModal
        wrapperStyle={{justifyContent: 'center'}}
        containerStyle={{marginVertical: 80, padding: 12}}
        visible={changePlanModal}>
        <View>
          <View>
            <ChangePlan
              onChangePlan={onChangePlan}
              packData={packData}
              car_type={car_type}
              setSelectedPack={setSelectedPack}
              selectedPack={selectedPack}
            />
          </View>
          <View>
            {apartment && apartment.time_slots && (
              <>
                <GText
                  color={color.blue}
                  fontSize={fsize.h6}
                  style={{marginTop: 20}}>
                  Select the time slot
                </GText>

                <RNPickerSelect
                  onValueChange={(value) => value && setSelectedTimeSlot(value)}
                  items={apartment.time_slots.map((timeslot) => {
                    return {
                      label: `${timeslot.start_time.substring(
                        0,
                        5,
                      )} to ${timeslot.end_time.substring(0, 5)}`,
                      value: timeslot.id,
                      key: timeslot.id,
                    };
                  })}
                  placeholder={{label: 'select time slots', color: color.black}}
                  value={selectedTimeSlot}
                  style={{inputAndroid: {color: color.black}}}
                />
              </>
            )}
          </View>
        </View>
        <GButton
          marginHorizontal={10}
          marginVertical={10}
          onPress={onChangePlan}>
          Pay Now
        </GButton>
      </GModal>

      <GModal
        visible={successModal}
        wrapperStyle={{justifyContent: 'center'}}
        handleClose={handleSucessModal}>
        {paymentLoading ? (
          <View style={{padding: 100}}>
            <Loader text="Payment processing" />
          </View>
        ) : (
          <>
            <View
              style={{
                padding: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <GIcon
                name="checkmark-circle"
                type="Ionicons"
                size={fsize.xlarge}
                color={color.green}
                style={{textAlign: 'center'}}
              />
              <GText
                fontSize={fsize.h5}
                fontFamily={ffamily.bold}
                style={{marginTop: 20}}>
                Payment accepted thank you
              </GText>
              <GText
                fontSize={fsize.h6}
                fontFamily={ffamily.regular}
                style={{marginTop: 8}}>
                Plan renewed for next 1 month
              </GText>
            </View>
            <GButton
              marginHorizontal={10}
              marginVertical={10}
              onPress={() => {
                handleSucessModal(true);
              }}>
              Ok
            </GButton>
          </>
        )}
      </GModal>

      <View style={{flex: 1}}>
        <View style={{marginTop: 10, borderRadius: 10}}>
          <CleanPackageCard
            planDetails={
              carPlan.currentPlanData ? carPlan.currentPlanData : null
            }
          />
        </View>
        <View
          style={{borderBottomColor: color.lineColor, borderBottomWidth: 1}}>
          {carPlan.currentPlanData.subscription_plan_cleaner_supervisor[0]
            .supervisor_apartment_id ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 5,
                marginVertical: 10,
              }}>
              <View style={{marginRight: 10}}>
                <Image
                  source={{
                    uri: `${API_ENDPOINT}/uploads/User_Two_f0e7c8d89c.png`,
                  }}
                  style={{height: 30, width: 30, borderRadius: 100}}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <GText
                    fontSize={fsize.p1}
                    fontFamily={ffamily.semiBold}
                    color={color.black}>
                    {carPlan.currentPlanData
                      .subscription_plan_cleaner_supervisor[0]
                      .supervisor_apartment_id.supervisor_id.username
                      ? carPlan.currentPlanData
                          .subscription_plan_cleaner_supervisor[0]
                          .supervisor_apartment_id.supervisor_id.username
                      : 'Supervisor Name'}
                  </GText>
                  <GText
                    fontSize={fsize.p1}
                    fontFamily={ffamily.bold}
                    color={color.blue}>
                    Supervisor
                  </GText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <GIcon
                      onPress={() => {
                        Linking.openURL(
                          `mailto:${
                            carPlan.currentPlanData
                              .subscription_plan_cleaner_supervisor[0]
                              .supervisor_apartment_id.supervisor_id.email
                              ? carPlan.currentPlanData
                                  .subscription_plan_cleaner_supervisor[0]
                                  .supervisor_apartment_id.supervisor_id.email
                              : 'info@gomotorcar.com'
                          }`,
                        );
                      }}
                      name="mail"
                      type="Feather"
                      color={color.blue}
                      size={fsize.h4}
                      style={{
                        backgroundColor: color.blue_dark,
                        borderRadius: 25,
                        padding: 5,
                      }}
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <GIcon
                      onPress={() => {
                        Linking.openURL(
                          `tel:${
                            carPlan.currentPlanData
                              .subscription_plan_cleaner_supervisor[0]
                              .supervisor_apartment_id.supervisor_id.phone
                              ? carPlan.currentPlanData
                                  .subscription_plan_cleaner_supervisor[0]
                                  .supervisor_apartment_id.supervisor_id.phone
                              : '9742977577'
                          }`,
                        );
                      }}
                      name="phone-call"
                      type="Feather"
                      color={color.white}
                      size={fsize.h4}
                      style={{
                        backgroundColor: color.green,
                        borderRadius: 25,
                        padding: 5,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text>No Supervisor</Text>
            </View>
          )}
        </View>
        <View>
          {carPlan.currentPlanData.subscription_plan_cleaner_supervisor[0]
            .cleaner_id ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 5,
                marginVertical: 10,
              }}>
              <View style={{marginRight: 10}}>
                <Image
                  source={{
                    uri: `${API_ENDPOINT}/uploads/cleaner_Two_9f1e96f74e.png`,
                  }}
                  style={{height: 35, width: 35, borderRadius: 100}}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <GText
                    fontSize={fsize.p1}
                    fontFamily={ffamily.semiBold}
                    color={color.black}>
                    {carPlan.currentPlanData
                      .subscription_plan_cleaner_supervisor[0].cleaner_id
                      .username
                      ? carPlan.currentPlanData
                          .subscription_plan_cleaner_supervisor[0].cleaner_id
                          .username
                      : 'Cleaner Name'}
                  </GText>
                  <GText
                    fontSize={fsize.p1}
                    fontFamily={ffamily.bold}
                    color={color.blue}>
                    Cleaner
                  </GText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <GIcon
                      onPress={() => {
                        Linking.openURL(
                          `mailto:${
                            carPlan.currentPlanData
                              .subscription_plan_cleaner_supervisor[0]
                              .cleaner_id.email
                              ? carPlan.currentPlanData
                                  .subscription_plan_cleaner_supervisor[0]
                                  .cleaner_id.email
                              : 'info@gomotorcar.com'
                          }`,
                        );
                      }}
                      name="mail"
                      type="Feather"
                      color={color.blue}
                      size={fsize.h3}
                      style={{
                        backgroundColor: color.blue_dark,
                        borderRadius: 25,
                        padding: 5,
                      }}
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <GIcon
                      onPress={() => {
                        Linking.openURL(
                          `tel:${
                            carPlan.currentPlanData
                              .subscription_plan_cleaner_supervisor[0]
                              .cleaner_id.phone
                              ? carPlan.currentPlanData
                                  .subscription_plan_cleaner_supervisor[0]
                                  .cleaner_id.phone
                              : '9742977577'
                          }`,
                        );
                      }}
                      name="phone-call"
                      type="Feather"
                      color={color.white}
                      size={fsize.h3}
                      style={{
                        backgroundColor: color.green,
                        borderRadius: 25,
                        padding: 5,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text>No Cleaner</Text>
            </View>
          )}
        </View>

        <View>
          <GText
            fontSize={fsize.h6}
            fontFamily={ffamily.bold}
            style={{marginTop: 10, color: color.orange}}>
            Activated subscription pack
          </GText>
        </View>

        <View>
          <LinearGradient
            colors={[color.blue_Dark, color.blue]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={style.gradientWrapper}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <GText
                fontSize={fsize.h6}
                fontFamily={ffamily.semiBold}
                color={color.white}>
                {title}
              </GText>
              <GText
                color={color.blue}
                fontSize={fsize.p1}
                fontFamily={ffamily.semiBold}
                style={{
                  backgroundColor: color.white,
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  borderRadius: radius.h3,
                }}>
                {service_duration} month
              </GText>
            </View>
            <View style={{flexDirection: 'row', marginTop: 16}}>
              <GText
                fontSize={fsize.h6}
                fontFamily={ffamily.semiBold}
                textAlign={fAlign.center}
                color={color.white}
                style={{
                  borderRightColor: color.gray_Light,
                  borderRightWidth: 1,
                  flex: 1,
                }}>
                {full_exterior_cleaning_per_month} {'\n'}
                <GText
                  color={color.gray}
                  fontSize={fsize.p1}
                  textAlign={fAlign.center}
                  fontFamily={ffamily.semiBold}
                  color={color.white}>
                  Exterior
                </GText>
              </GText>
              <GText
                fontSize={fsize.h6}
                fontFamily={ffamily.semiBold}
                textAlign={fAlign.center}
                color={color.white}
                style={{
                  borderRightColor: color.gray_Light,
                  borderRightWidth: 1,
                  flex: 1,
                }}>
                {full_interior_cleaning_per_month} {'\n'}
                <GText
                  color={color.gray}
                  fontSize={fsize.p1}
                  fontFamily={ffamily.semiBold}
                  textAlign={fAlign.center}
                  color={color.white}>
                  Interior
                </GText>
              </GText>
              <GText
                color={color.blue}
                fontSize={fsize.h6}
                fontFamily={ffamily.semiBold}
                textAlign={fAlign.center}
                style={{flex: 1}}
                color={color.white}>
                ₹ {plan_price} {'\n'}
                <GText
                  color={color.gray}
                  fontSize={fsize.p1}
                  fontFamily={ffamily.semiBold}
                  textAlign={fAlign.center}
                  color={color.white}>
                  per month
                </GText>
              </GText>
            </View>
          </LinearGradient>
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
            borderColor: color.gray_Light,
            borderWidth: 1,
            padding: 8,
            borderRadius: radius.default,
          }}> */}
        {/* <GText fontSize={fsize.p1} fontFamily={ffamily.semiBold}>
          Morning ( {start_time.substring(0,5)}- {end_time.substring(0,5)} )
        </GText> */}
        <View>
          {apartment && apartment.time_slots && (
            <>
              <GText
                fontSize={fsize.h6}
                fontFamily={ffamily.semiBold}
                style={{marginTop: 10, color: color.orange}}>
                Change time slot
              </GText>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: color.blue_Light,
                  marginVertical: 10,
                  borderRadius: 5,
                  height: 47,
                }}>
                <RNPickerSelect
                  onValueChange={(value) => {
                    console.log(`onValueChange ==============>${value}`);
                    value && setSelectedTimeSlot(value);
                  }}
                  items={apartment.time_slots.map((timeslot) => {
                    return {
                      label: `${timeslot.start_time.substring(
                        0,
                        5,
                      )} to ${timeslot.end_time.substring(0, 5)}`,
                      value: timeslot.id,
                      key: timeslot.id,
                    };
                  })}
                  placeholder={{label: 'select time slots', color: color.black}}
                  value={selectedTimeSlot}
                  style={{
                    inputAndroid: {
                      color: color.black,
                      height: 44,
                      borderColor: color.gray_Light,
                      padding: 10,
                      borderWidth: 1,
                      backgroundColor: color.blue_Light,
                      borderRadius: 5,
                      marginTop: 0,
                    },
                  }}
                />
              </View>

              <GButton
                onPress={() => updateTimeSlot()}
                loading={isTimeSlotUpdate}
                marginHorizontal={20}
                marginVertical={10}>
                Update
              </GButton>
            </>
          )}
        </View>
        {/* <GText
            fontSize={fsize.p1}
            fontFamily={ffamily.semiBold}
            textAlign={fAlign.right}
            color={color.blue}>
            Change
          </GText>
        </View> */}
      </View>

      {isCurrentPlanEnding && !isUpcommingPlanSubscribed && (
        <View>
          <GText
            fontSize={fsize.p1}
            fontFamily={ffamily.semiBold}
            textAlign={fAlign.center}
            color={color.blue}>
            Subscription plan will expire in {currentPlanEndingDays} days
          </GText>
          <GButton
            marginHorizontal={10}
            marginVertical={10}
            loading={paymentLoading}
            onPress={onCurrentPlanRenew}>
            Pay Now
          </GButton>
        </View>
      )}

      {/* {isUpcommingPlanSubscribed && (
        <GButton
          marginHorizontal={10}
          marginVertical={10}
          onPress={handleModalVisible}>
          Change Plan
        </GButton>
      )} */}
    </>
  );
};
const UpcommingPlanCard = ({
  carPlan,
  data,
  packData,
  user_id,
  getUserCars,
  aptTimings = {},
}) => {
  const [successModal, setSuccessModal] = useState(false);

  const {
    id: plan_id,
    title,
    service_duration,
    price,
    service_details: {full_exterior_cleaning_per_month},
    service_details: {full_interior_cleaning_per_month},
  } = carPlan.upcomingPlanData.subscription_plan_stats.current_plan;
  const {from_date, to_date} = carPlan.upcomingPlanData;

  const {start_time, end_time} = carPlan.upcomingPlanData.time_slot;

  const {id: apartment_id} = carPlan.upcomingPlanData.apartment_id;

  const {
    isUpcommingPlanSubscribed,
    isCurrentPlanEnding,
    currentPlanEndingDays,
  } = carPlan;

  const {cleaner_id, apartment} = aptTimings || {};

  const {car_type, id: car_id} = data;

  let plan_price = price;

  if (carPlan.upcomingPlanData && carPlan.upcomingPlanData.offer) {
    console.log(
      'carPlan.currentPlanData =============>' +
        JSON.stringify(carPlan.upcomingPlanData),
    );
    plan_price = price - carPlan.upcomingPlanData.offer.discount_amount;
  }

  return (
    <>


      <View style={{flex: 1, marginBottom: 0}}>
        <View>
          <GText
            fontSize={fsize.h6}
            fontFamily={ffamily.bold}
            color={color.orange}
            style={{marginTop: 20}}>
            Upcoming subscription pack
          </GText>
        </View>

        <View>
          <TouchableOpacity
            style={{
              marginTop: 12,
              // borderColor: color.gray_Light,
              // borderWidth: 1,
              borderRadius: radius.default,
              backgroundColor: color.blue_Light,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <GText
                fontSize={fsize.h6}
                fontFamily={ffamily.bold}
                color={color.blue_dark}>
                {title}
              </GText>
              <GText
                color={color.blue}
                fontSize={fsize.p1}
                fontFamily={ffamily.semiBold}
                style={{
                  backgroundColor: color.white,
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  borderRadius: radius.h3,
                }}>
                {service_duration} month
              </GText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <GText
                fontSize={fsize.h6}
                fontFamily={ffamily.semiBold}
                textAlign={fAlign.center}
                color={color.black}
                style={{
                  borderRightColor: color.gray,
                  borderRightWidth: 1,
                  flex: 1,
                }}>
                {full_exterior_cleaning_per_month} {'\n'}
                <GText
                  color={color.gray}
                  fontSize={fsize.p1}
                  textAlign={fAlign.center}
                  fontFamily={ffamily.semiBold}
                  color={color.gray}>
                  Exterior
                </GText>
              </GText>
              <GText
                fontSize={fsize.h6}
                fontFamily={ffamily.semiBold}
                textAlign={fAlign.center}
                color={color.black}
                style={{
                  borderRightColor: color.gray,
                  borderRightWidth: 1,
                  flex: 1,
                }}>
                {full_interior_cleaning_per_month} {'\n'}
                <GText
                  color={color.gray}
                  fontSize={fsize.p1}
                  fontFamily={ffamily.semiBold}
                  textAlign={fAlign.center}
                  color={color.gray}>
                  Interior
                </GText>
              </GText>
              <GText
                color={color.blue}
                fontSize={fsize.h6}
                fontFamily={ffamily.semiBold}
                textAlign={fAlign.center}
                style={{flex: 1}}
                color={color.black}>
                ₹ {plan_price} {'\n'}
                <GText
                  color={color.gray}
                  fontSize={fsize.p1}
                  fontFamily={ffamily.semiBold}
                  textAlign={fAlign.center}
                  color={color.gray}>
                  per month
                </GText>
              </GText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                backgroundColor: color.blue,
              }}>
              <GText
                fontSize={fsize.p1}
                fontFamily={ffamily.semiBold}
                color={color.white}>
                Plan Start From: {moment(from_date).format('DD-MMM-YYYY')} to
                {moment(to_date).format('DD-MMM-YYYY')}
              </GText>
              {/* <GText
                color={color.blue}
                fontSize={fsize.h6}
                fontFamily={ffamily.semiBold}
                style={{
                  backgroundColor: color.white,
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  borderRadius: radius.h3,
                }}>
                To Date:
              </GText> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
          style={{borderBottomColor: color.lineColor, borderBottomWidth: 1}}>
          {carPlan&&carPlan.upcomingPlanData&&carPlan.upcomingPlanData.subscription_plan_cleaner_supervisor[0]&&
          carPlan.upcomingPlanData.subscription_plan_cleaner_supervisor[0]
            .supervisor_apartment_id ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 5,
                marginVertical: 10,
              }}>
              <View style={{marginRight: 10}}>
                <Image
                  source={{
                    uri: `${API_ENDPOINT}/uploads/User_Two_f0e7c8d89c.png`,
                  }}
                  style={{height: 30, width: 30, borderRadius: 100}}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <GText
                    fontSize={fsize.p1}
                    fontFamily={ffamily.semiBold}
                    color={color.black}>
                    {carPlan&&carPlan.upcomingPlanData&&carPlan.upcomingPlanData
                      .subscription_plan_cleaner_supervisor[0]
                      .supervisor_apartment_id.supervisor_id.username
                      ? carPlan.upcomingPlanData
                          .subscription_plan_cleaner_supervisor[0]
                          .supervisor_apartment_id.supervisor_id.username
                      : 'Supervisor Name'}
                  </GText>
                  <GText
                    fontSize={fsize.p1}
                    fontFamily={ffamily.bold}
                    color={color.blue}>
                    Supervisor
                  </GText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <GIcon
                      onPress={() => {
                        Linking.openURL(
                          `mailto:${
                            carPlan.upcomingPlanData
                              .subscription_plan_cleaner_supervisor[0]
                              .supervisor_apartment_id.supervisor_id.email
                              ? carPlan.upcomingPlanData
                                  .subscription_plan_cleaner_supervisor[0]
                                  .supervisor_apartment_id.supervisor_id.email
                              : 'info@gomotorcar.com'
                          }`,
                        );
                      }}
                      name="mail"
                      type="Feather"
                      color={color.blue}
                      size={fsize.h4}
                      style={{
                        backgroundColor: color.blue_dark,
                        borderRadius: 25,
                        padding: 5,
                      }}
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <GIcon
                      onPress={() => {
                        Linking.openURL(
                          `tel:${
                            carPlan.upcomingPlanData
                              .subscription_plan_cleaner_supervisor[0]
                              .supervisor_apartment_id.supervisor_id.phone
                              ? carPlan.upcomingPlanData
                                  .subscription_plan_cleaner_supervisor[0]
                                  .supervisor_apartment_id.supervisor_id.phone
                              : '9742977577'
                          }`,
                        );
                      }}
                      name="phone-call"
                      type="Feather"
                      color={color.white}
                      size={fsize.h4}
                      style={{
                        backgroundColor: color.green,
                        borderRadius: 25,
                        padding: 5,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={{alignItems:'center',padding:10}}>
              <Text>No Supervisor</Text>
            </View>
          )}
        </View>
        <View>
          {carPlan&&carPlan.upcomingPlanData&&carPlan.upcomingPlanData.subscription_plan_cleaner_supervisor[0]&&
          carPlan.upcomingPlanData.subscription_plan_cleaner_supervisor[0]
            .cleaner_id ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 5,
                marginVertical: 10,
              }}>
              <View style={{marginRight: 10}}>
                <Image
                  source={{
                    uri: `${API_ENDPOINT}/uploads/cleaner_Two_9f1e96f74e.png`,
                  }}
                  style={{height: 35, width: 35, borderRadius: 100}}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <GText
                    fontSize={fsize.p1}
                    fontFamily={ffamily.semiBold}
                    color={color.black}>
                    {carPlan.upcomingPlanData
                      .subscription_plan_cleaner_supervisor[0].cleaner_id
                      .username
                      ? carPlan.upcomingPlanData
                          .subscription_plan_cleaner_supervisor[0].cleaner_id
                          .username
                      : 'Cleaner Name'}
                  </GText>
                  <GText
                    fontSize={fsize.p1}
                    fontFamily={ffamily.bold}
                    color={color.blue}>
                    Cleaner
                  </GText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <GIcon
                      onPress={() => {
                        Linking.openURL(
                          `mailto:${
                            carPlan.upcomingPlanData
                              .subscription_plan_cleaner_supervisor[0]
                              .cleaner_id.email
                              ? carPlan.upcomingPlanData
                                  .subscription_plan_cleaner_supervisor[0]
                                  .cleaner_id.email
                              : 'info@gomotorcar.com'
                          }`,
                        );
                      }}
                      name="mail"
                      type="Feather"
                      color={color.blue}
                      size={fsize.h3}
                      style={{
                        backgroundColor: color.blue_dark,
                        borderRadius: 25,
                        padding: 5,
                      }}
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <GIcon
                      onPress={() => {
                        Linking.openURL(
                          `tel:${
                            carPlan.upcomingPlanData
                              .subscription_plan_cleaner_supervisor[0]
                              .cleaner_id.phone
                              ? carPlan.upcomingPlanData
                                  .subscription_plan_cleaner_supervisor[0]
                                  .cleaner_id.phone
                              : '9742977577'
                          }`,
                        );
                      }}
                      name="phone-call"
                      type="Feather"
                      color={color.white}
                      size={fsize.h3}
                      style={{
                        backgroundColor: color.green,
                        borderRadius: 25,
                        padding: 5,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={{alignItems:'center',padding:10}}>
              <Text>No Cleaner</Text>
            </View>
          )}
        </View>
    </>
  );
};
