import React, {useState,useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import GImageNameBox from '../../../../components/GImageNameBox';
import GText from '../../../../components/GText';
import GIcon from '../../../../components/GIcon';
import GButton from '../../../../components/GButton';
import API_ENDPOINT from '../../../../config/api';

import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from '../../../../theme';
import Loader from '../../../../components/Loader';

export default ({
  onContinue,
  cleanPlans,
  userCars,
  selectedCar,
  setSelectedCar,
  setSelectedPlan,
  selectedPlan,
  userCarLoading,
  cleanPlanLoading,
  paymentLoading,
  onCarAddPress,
  setCleanPlans,
  orderCount,
  setOrderCount,
}) => {
  const [selectedCarPlans, setselectedCarPlans] = useState(cleanPlans);
  const [carSelcted,setCarSelected]=useState(false);
  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [select]);
// useEffect(()=>{
//   getPlans(userCars);
// },[]);



  const getPlans = async (car) => {

    if (cleanPlans && cleanPlans.length) {
      const carPlanData =await cleanPlans&&cleanPlans.filter(
      data => data.model_type ==car.car_type_id.name,
      );

      if (JSON.stringify(cleanPlans) != JSON.stringify(carPlanData))
        setselectedCarPlans(carPlanData);
     
    }
  };
  if (paymentLoading) {
    return <Loader text="payment processing..." />;
  }

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          <GText
            color={color.orange}
            fontFamily={ffamily.bold}
            fontSize={fsize.h6}>
            Choose a Car
          </GText>
          <TouchableOpacity onPress={onCarAddPress}>
            <GIcon
              name="plus-circle"
              type="MaterialCommunityIcons"
              size={fsize.h1}
              style={{
                backgroundColor: color.blue,
                borderRadius: radius.max,
                padding: 4,
              }}
            />
          </TouchableOpacity>
        </View>

        {userCarLoading ? (
          <Loader />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}>
            {userCars&&userCars.map(car=> {
              console.log('------------------------car data---------------',car)
                if (car && car.car_model_id) {
                  return (
                    <View style={{height:120}}>
                    <GImageNameBox
                    
                      image={{
                        uri: API_ENDPOINT + car.car_model_id.icon.url,
                      }}
                      name={car.car_model_id.name + '\n' + car.car_number}
                      imageHeight={60}
                      imageWidth={60}
                      isImageSelected={
                        selectedCar && selectedCar.car_id == car.id
                      }
                      containerStyle={{flex: 0}}
                      onPress={() => {
                        setSelectedCar({
                          car_id: car.id,
                          car_type: car.car_type_id.name,
                          qr_code: car.qr_code_id ? car.qr_code_id.id : null,
                        });
                        getPlans(car);
                        setCarSelected(true);
                      }}
                    />
                    </View>
                  );
                }
              })}
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {userCars.length == 0 && !userCarLoading && (
                <GText
                  color={color.gray_Light}
                  fontFamily={ffamily.bold}
                  fontSize={fsize.h6}>
                  Please add your car
                </GText>
              )}
            </View>
          </ScrollView>
        )}

        {carSelcted && (
          <  >
            <GText
              fontFamily={ffamily.bold}
              color={color.orange}
              fontSize={fsize.h6}
              style={{marginTop: 10}}>
              Choose subscription pack
            </GText>
            {cleanPlanLoading ? (
              <Loader />
            ) : (
              <FlatList
                data={selectedCarPlans}
                style={{flex: 1}}
                renderItem={({item,index}) => {                 
                  return (
                      <Packages
                      item={item}
                      selectedCar={selectedCar}
                      setSelectedPlan={setSelectedPlan}
                      selectedPlan={selectedPlan}
                      orderCount={orderCount}
                    />
                  );
                }}
              />
            )}
          </>
        )}
      </View>

      <GButton marginHorizontal={20} marginVertical={10} onPress={onContinue}>
        Pay Now
      </GButton>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
});

const Packages = ({
  item,
  selectedCar,
  setSelectedPlan,
  selectedPlan,
  orderCount,
}) => {
  const {
    id: id,
    title,
    service_duration,
    sales_tax,
    price,
    service_details: {full_exterior_cleaning_per_month},
    service_details: {full_interior_cleaning_per_month},
    offers,
  } = item;

  let plan_price = price;
  let isApplicable=false;
  //const [isApplicable, setIsApplicable] = useState(false);
  if (offers && offers.length) {
    //check it applies for first or second
    const applicable_to = offers[0].applicable_to;

    //setIsApplicable(false);
    switch (applicable_to) {
      case 'first': //setOfferDetails(offer);
        plan_price = price - offers[0].discount_amount;
        //setIsApplicable(true);
        isApplicable=true;
        break;
      case 'second':
        if (orderCount >= 1) {
          isApplicable=true;
        //  setIsApplicable(true);
          plan_price = price - offers[0].discount_amount;
        }
        break;
      case 'third':
        if (orderCount >= 2) {
          isApplicable=true;
          //setIsApplicable(true);
          plan_price = price - offers[0].discount_amount;
        }
        break;
        default:
          isApplicable=false;
         // setIsApplicable(false);
    }
    console.log('isApplicable =======>' + isApplicable + ' ' + orderCount);
  }
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 5,
        }}>
        {isApplicable && offers[0] && (
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
              Offer amount
            </GText>
            <GText
              color={color.gray}
              fontSize={fsize.p1}
              textAlign={fAlign.center}
              fontFamily={ffamily.semiBold}>
              ₹ {offers[0].discount_amount}
            </GText>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={{
          marginTop: 12,
          backgroundColor:
            selectedPlan && selectedPlan.id == id ? color.blue : color.blue_Light,
          borderColor:
            selectedPlan && selectedPlan.id == id ? color.blue : color.blue_Light,
          borderWidth: selectedPlan == id ? 2 : 1,
          padding: 8,
          borderRadius: radius.default,
        }}
        onPress={() => {
          setSelectedPlan({
            id: id,
            price: plan_price,
            tax: sales_tax,
          });
        }}>
        <View style={{
          flexDirection: 'row', 
          justifyContent: 'space-between'}}>
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
            color={color.black}
            fontSize={fsize.h6}
            fontFamily={ffamily.semiBold}
            textAlign={fAlign.center}
            style={{flex: 1}}>
            {isApplicable && (
              <GText
                color={color.black}
                fontSize={fsize.h6}
                fontFamily={ffamily.semiBold}
                textAlign={fAlign.center}
                textDecorationLine="line-through">
                {' '}
                ₹ {price}
              </GText>
            )}{' '}
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
    </View>
  );
};
