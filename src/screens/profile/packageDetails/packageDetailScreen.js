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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import GText from '../../../components/GText';
import GIcon from '../../../components/GIcon';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import Loader from '../../../components/Loader';
import GImageNameBox from '../../../components/GImageNameBox';
import {
  get_user_car_packages,
  single_apartment,
  cleaning_order,
} from '../../../store/cleaningPackage/services';
import GButton from '../../../components/GButton';
import {showtoast} from '../../../utils/error';
import {razorPay} from '../../../utils/razorpay';
import GModal from '../../../components/GModal';

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
}) => {
  const [index, setIndex] = React.useState(0);

  const renderScene = ({route}) => {
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
      />
    );
  };

  if (userCarLoading) {
    return <Loader />;
  }

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 15}}>
        <View
          style={{
            // flex: 1,
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
              fontFamily={ffamily.semiBold}
              style={{color: '#000000'}}>
              My Cars
            </GText>
          </View>
          <View>
            <TouchableOpacity onPress={onCarAddPress}>
              <GIcon
                name="add-box"
                size={fsize.h5}
                style={{
                  backgroundColor: color.blue,
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
                  style={{backgroundColor: '#F3FCFE'}}
                  // getLabelText={({route}) =>  route.title}
                  getLabelText={({route}) => {
                    return (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: 30, height: 30}}
                          source={{
                            uri: `${route.image}`,
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
    borderWidth: 1,
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
}) => {
  const [carPlan, setCarPlan] = useState([]);
  const [planLoading, setPlanLoading] = useState(false);

  useEffect(() => {
    const {id} = data;
    getPlans(id);
  }, []);

  const getPlans = async (carId) => {
    setPlanLoading(true);
    try {
      const today = format('YYYY-MM-DD', now());
      const response = await get_user_car_packages(user_id, today, carId);

      if (response) {
        if (response && response.currentPlanData && !aptDetails) {
          setAptDetails(response.currentPlanData.apartment_id);
          getApartmentTimings(response.currentPlanData.apartment_id.id);
        }
        setCarPlan(response);
      }
      setPlanLoading(false);
    } catch (error) {
      setPlanLoading(false);
      console.log('error', error);
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

  if (carPlan && carPlan.currentPlanData) {
    return (
      <ActivePlanCard
        carPlan={carPlan}
        data={data}
        packData={packData}
        aptTimings={aptTimings}
        user_id={user_id}
        getUserCars={getUserCars}
      />
    );
  } else {
    return (
      <NewSubscription
        packData={packData}
        aptDetails={aptDetails}
        aptTimings={aptTimings}
        data={data}
        getUserCars={getUserCars}
        user_id={user_id}
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
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const {car_type, id: car_id} = data;

  let time_slots = [];

  if (aptTimings && aptTimings.apartment) {
    if (aptTimings.apartment.time_slots) {
      time_slots = aptTimings.apartment.time_slots;
    }
  }

  const onPayNow = async () => {
    setPaymentLoading(true);
    let paid_results;
    if (selectedPack && selectedPack.price && selectedTimeSlot) {
      paid_results = await razorPay((selectedPack.price - 100) * 100);
    } else {
      showtoast('please choose your car and price');
      setPaymentLoading(false);
    }
    if (paid_results && paid_results.razorpay_payment_id) {
      try {
        const body = genOrderBody(paid_results.razorpay_payment_id);
        const response = await cleaning_order(body);

        if (response) {
          getUserCars();
          setPaymentLoading(false);
        }
      } catch (error) {
        console.log('error', error);
        setPaymentLoading(false);
      }
    } else {
      setPaymentLoading(false);
    }
  };

  const genOrderBody = (payment_id) => {
    let timeslot;
    aptTimings.apartment.time_slots.map((time) => {
      if (time.id == selectedTimeSlot) {
        timeslot = {end_time: time.end_time, start_time: time.start_time};
      }
    });

    return {
      customer_id: user_id,
      cleaner_id: aptTimings.cleaner_id,
      apartment_id: aptDetails.id,
      start_time: timeslot.start_time,
      end_time: timeslot.end_time,
      customer_car: car_id,
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

          let plan_price = price;
          // if (car_type == 'HatchBack') {
          //   plan_price = price_Hatch_Back;
          // } else if (car_type == 'Sedan') {
          //   plan_price = price_Sedan;
          // } else if (car_type == 'SUV') {
          //   plan_price = price_SUV;
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
        }}>
        100 Rs discount
      </GText>

      {aptTimings && (
        <>
          <GText color={color.blue} fontSize={fsize.h6} style={{marginTop: 12}}>
            Apartment Details
          </GText>
          <GText
            color={color.gray}
            fontSize={fsize.p1}
            style={{
              marginTop: 6,
              paddingBottom: 15,
            }}>
            <GText fontSize={fsize.h6}>Name:&nbsp;</GText>
            {aptTimings.apartment.name}
            {'\n'}
            <GText fontSize={fsize.h6}>Address:&nbsp;</GText>
            {aptTimings.apartment.address.address}
            {'\n'}
            <GText fontSize={fsize.h6}>Land mark:&nbsp;</GText>
            {aptTimings.apartment.address.land_mark}
            {'\n'}
            <GText fontSize={fsize.h6}>City:&nbsp;</GText>
            {aptTimings.apartment.address.city}
            {'\n'}
            <GText fontSize={fsize.h6}>Pincode:&nbsp;</GText>
            {aptTimings.apartment.address.pincode}
            {'\n'}
          </GText>
        </>
      )}

      <GText color={color.blue} fontSize={fsize.h6} style={{marginTop: 20}}>
        Select the time slot
      </GText>

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
          style={{inputAndroid: {color: color.black}}}
        />
      )}

      <GButton
        marginHorizontal={20}
        marginVertical={10}
        loading={paymentLoading}
        onPress={onPayNow}>
        Pay Now
      </GButton>
    </View>
  );
};
const ChangePlan = ({packData, setSelectedPack, selectedPack, car_type}) => {
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
                  {item.full_exterior_cleaning_per_month} {'\n'}
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
                  {item.full_interior_cleaning_per_month} {'\n'}
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
  aptTimings = {},
}) => {
  const [changePlanModal, setChangePlanModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null);

  const [successModal, setSuccessModal] = useState(false);

  const {
    id: plan_id,
    title,
    service_duration,
    price,
    service_details: {full_exterior_cleaning_per_month},
    service_details: {full_interior_cleaning_per_month},
  } = carPlan.currentPlanData.plan_details;

  const {start_time, end_time} = carPlan.currentPlanData.time_slot;

  const {id: apartment_id} = carPlan.currentPlanData.apartment_id;

  const {
    isUpcommingPlanSubscribed,
    isCurrentPlanEnding,
    currentPlanEndingDays,
  } = carPlan;

  const {cleaner_id, apartment} = aptTimings || {};

  const {car_type, id: car_id} = data;

  let plan_price = price;
  // if (car_type == 'HatchBack') {
  //   plan_price = price_Hatch_Back;
  // } else if (car_type == 'Sedan') {
  //   plan_price = price_Sedan;
  // } else if (car_type == 'SUV') {
  //   plan_price = price_SUV;
  // }

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
    setPaymentLoading(true);
    if (plan_id && start_time && end_time && plan_price) {
      try {
        const paid_response = await razorPay(plan_price * 100);
        handleSucessModal();
        if (paid_response && paid_response.razorpay_payment_id) {
          const body = genOrderBody(
            plan_id,
            start_time,
            end_time,
            paid_response.razorpay_payment_id,
            plan_price,
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
  };

  const onChangePlan = async () => {
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
              timeslot = {end_time: time.end_time, start_time: time.start_time};
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
  };

  const genOrderBody = (plan_id, start_time, end_time, paid_id, amount) => {
    return {
      customer_id: user_id,
      cleaner_id: cleaner_id,
      apartment_id: apartment_id,
      start_time: start_time,
      end_time: end_time,
      customer_car: car_id,
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
        <View>
          <GText
            fontSize={fsize.h6}
            fontFamily={ffamily.semiBold}
            style={{marginTop: 20, color: '#0EC1F5'}}>
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
            borderColor: color.gray_Light,
            borderWidth: 1,
            padding: 8,
            borderRadius: radius.default,
          }}>
          <GText fontSize={fsize.p1} fontFamily={ffamily.semiBold}>
            Morning ( {start_time.substring(0, 5)}- {end_time.substring(0, 5)} )
          </GText>
          <GText
            fontSize={fsize.p1}
            fontFamily={ffamily.semiBold}
            textAlign={fAlign.right}
            color={color.blue}>
            Change
          </GText>
        </View>
      </View>

      {isCurrentPlanEnding && (
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

      {isUpcommingPlanSubscribed && (
        <GButton
          marginHorizontal={10}
          marginVertical={10}
          onPress={handleModalVisible}>
          Change Plan
        </GButton>
      )}
    </>
  );
};

const carResponse = {
  isUpcommingPlanSubscribed: true,
  isCurrentPlanEnding: true,
  currentPlanEndingDays: 4,
  currentPlanData: {
    order_id: 19,
    from_date: '2021-02-25',
    to_date: '2021-03-20',
    plan_details: {
      id: 2,
      title: 'Exterior Cleaning only',
      description: 'Exterior Cleaning only',
      price_Hatch_Back: 400,
      sales_tax: 10,
      keywords: 'Exterior Cleaning only',
      service_duration: 1,
      service_mode: 'doorstep',
      price_SUV: 400,
      price_Sedan: 500,
      full_exterior_cleaning_per_month: 24,
      full_interior_cleaning_per_month: 0,
      photo: null,
    },
    offer: null,
    customer_car: {
      id: 45,
      user_id: 51,
      car_number: 'KA05F8323',
      qr_code_id: null,
      car_model_id: 1,
      car_type_id: 1,
      fuel_type_id: 1,
      car_company_id: 2,
      car_images: [],
    },
    time_slot: {
      start_time: '7:00',
      end_time: '8:00',
    },
    apartment_id: {
      id: 1,
      name: 'Anjanadri Apartments Domlur',
      address: 2,
      starting_qr_code_id: '213424',
      ending_qr_code_id: '43454',
      approved: true,
    },
  },
  upcomingPlanData: {
    order_id: 19,
    from_date: '2021-02-25',
    to_date: '2021-03-20',
    plan_details: {
      id: 2,
      title: 'Exterior Cleaning only',
      description: 'Exterior Cleaning only',
      price_Hatch_Back: 400,
      sales_tax: 10,
      keywords: 'Exterior Cleaning only',
      service_duration: 1,
      service_mode: 'doorstep',
      price_SUV: 400,
      price_Sedan: 500,
      full_exterior_cleaning_per_month: 24,
      full_interior_cleaning_per_month: 0,
      photo: null,
    },
    offer: {
      id: 1,
      // "offer_name": "second car way of for full",
      offer_start_date: '2020-02-21T00:00:00.000Z',
      offer_end_date: '2020-02-28T00:00:00.000Z',
      description: 'offers',
      discount_amount: 100,
      discount_percentage: 10,
      duration_months: 1,
      duration_end_date: '2020-02-22T00:00:00.000Z',
      applicable_to: 'second',
    },
    customer_car: {
      id: 45,
      user_id: 51,
      car_number: 'KA05F8323',
      qr_code_id: null,
      car_model_id: 1,
      car_type_id: 1,
      fuel_type_id: 1,
      car_company_id: 2,
      car_images: [],
    },
    time_slot: {
      start_time: '7:00',
      end_time: '8:00',
    },
    apartment_id: {
      id: 1,
      name: 'Anjanadri Apartments Domlur',
      address: 2,
      starting_qr_code_id: '213424',
      ending_qr_code_id: '43454',
      approved: true,
    },
  },
};
