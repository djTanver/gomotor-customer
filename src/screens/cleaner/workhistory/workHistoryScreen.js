import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {format, now} from 'momento';
import RNPickerSelect from 'react-native-picker-select';
import GIcon from '../../../components/GIcon';
import GText from '../../../components/GText';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import {FlatList} from 'react-native-gesture-handler';
import request from '../../../utils/fetch';
import {customerWorkHistory, userCars} from '../../../utils/services';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

export default () => {
  const [worklist, setWorklist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const {width, height} = Dimensions.get('window');
  const [userCarId, setUserCarId] = useState(0);
  const [userCarOptions, setUserCarOptions] = useState(null);
  const [isDataFound, setIsDataFound] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const fcmToken = useSelector((state) => state.auth.fcmToken);

  useEffect(() => {
    //loadWorklist();
    console.log('fcm token', fcmToken);
    loadCarOptions();

    // () =>{
    //     return setWorklist({});
    // }
  }, []);

  const loadCarOptions = async () => {
    setLoading(true);
    const userCarsUrl = userCars(user.id);
    request
      .getWithAuth(userCarsUrl, {}, token)
      .then((result) => {
        if (!result) {
          setIsDataFound(false);
        }
        if (result && result.length) {
          //setIsDataFound(true);
          setUserCarId(result[0].id);
          const startIndex = page * 10 + 1;
          const today = format('YYYY-MM-DD', now());
          setUserCarOptions(
            result.map((car) => {
              return {label: car.car_number, value: car.id, key: car.id};
            }),
          );

          const historyUrl = customerWorkHistory(
            result[0].id,
            today,
            startIndex,
          );
          return request.getWithAuth(historyUrl, {}, token);
        }
      })
      .then((carWorkHistory) => {
        if (carWorkHistory && carWorkHistory.length) {
          console.log(
            'hereererewrewrwerewrwerewrewrewr ============>' +
              JSON.stringify(carWorkHistory),
          );
          setIsDataFound(true);
          setWorklist(carWorkHistory);
          setLoading(false);
        }

        if (carWorkHistory && !carWorkHistory.length) {
          setIsDataFound(false);
          setWorklist(null);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.show(`An error has occurred ${error}`);
      });
  };

  const loadWorklist = async (user_car_id) => {
    try {
      const startIndex = page * 10 + 1;
      const today = format('YYYY-MM-DD', now());

      request
        .getWithAuth(
          customerWorkHistory(user_car_id, today, startIndex),
          {},
          token,
        )
        .then((result) => {
          if (result && result.length) {
            setLoading(false);
            setWorklist(result);
            setLoadingMore(false);
            setIsDataFound(true);
          }
          if (result && result.length == 0) {
            setLoading(false);
            setWorklist(null);
            setIsDataFound(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          Toast.show(`An error has occurred ${error}`);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast.show(`An error has occurred ${error}`);
    }
  };

  const carChangeHandler = (value) => {
    console.log('carChangeHandler =========>' + value);
    setWorklist(null);
    //write the logic to fetch the car
    setUserCarId(value);
    setLoading(true);
    loadWorklist(value);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    setLoadingMore(true);
    setLoading(false);

    loadWorklist(userCarId);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: height,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderColor: color.veryLightPink,
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const onRefresh = () => {
    setPage(1);
    setLoading(true);
    loadWorklist(userCarId);
  };

  return (
    <>
      {loading && <ActivityIndicator animating size="large" />}
      {!isDataFound ||
        (!worklist && (
          <View
            style={{flex: 1, marginHorizontal: 10, justifyContent: 'center'}}>
            <GText
              textAlign={fAlign.center}
              fontFamily={ffamily.semiBold}
              fontSize={fsize.h6}>
              Please subscribe to see cleaning history
            </GText>
          </View>
        ))}
      <ScrollView contentContainerStyle={style.scrollView}>
        <GText
          color={color.orange}
          fontSize={fsize.h6}
          fontFamily={ffamily.semiBold}
          style={{marginTop: 5, paddingLeft: 20, paddingTop: 10}}>
          Select Car
        </GText>
        <View style={{marginHorizontal: 15}}>
          {userCarOptions && (
            <RNPickerSelect
              onValueChange={(value) => value && carChangeHandler(value)}
              items={userCarOptions.map((usercar) => {
                return {
                  label: usercar.label,
                  value: usercar.value,
                  key: usercar.key,
                };
              })}
              placeholder={{label: 'Select Car', color: color.black}}
              value={userCarId}
              style={{
                inputAndroid: {
                  color: color.black,
                  height: 45,
                  borderColor: color.gray_Light,
                  padding: 10,
                  borderWidth: 1,
                  backgroundColor: color.blue_Light,
                  borderRadius: 5,
                  marginTop: 10,
                  // marginLeft: 20,
                  // marginRight: 20,
                },
                inputIOS: {
                  color: color.black,
                  height: 50,
                  borderColor: color.gray_Light,
                  padding: 10,
                  borderWidth: 1,
                  backgroundColor: color.blue_Light,
                  borderRadius: 5,
                  marginLeft: 20,
                  marginRight: 20,
                },
              }}
            />
          )}
        </View>

        {/* {!isDataFound && !worklist && (
          <View
            style={{flex: 1, marginHorizontal: 10, justifyContent: 'center'}}>
            <GText
              textAlign={fAlign.center}
              fontFamily={ffamily.semiBold}
              fontSize={fsize.h6}>
              Please subscribe to see cleaning history
            </GText>
          </View>
        )} */}

        <View style={{flex: 1, marginHorizontal: 18}}>
          {isDataFound && (
            <GText
              textAlign={fAlign.center}
              fontFamily={ffamily.semiBold}
              fontSize={fsize.p1}
              color={color.gray_Light}
              style={{
                borderTopWidth: 1,
                borderTopColor: color.blue_Light,
                paddingTop: 10,
              }}>
              You can see all the work history list
            </GText>
          )}

          {worklist && worklist.length && (
            <FlatList
              data={worklist}
              style={{marginTop: 10}}
              renderItem={(item) => {
                if (item.item) return <CardComp item={item.item} />;
              }}
              keyExtractor={(item) =>
                item && item.id
                  ? item.id.toString()
                  : Math.floor(Math.random() * 100)
              }
              onRefresh={() => onRefresh()}
              refreshing={loading}
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0.5}
              initialNumToRender={10}
              ListFooterComponent={renderFooter}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
});

const CardComp = ({item}) => {
  // debugger;
  // console.log('item'+JSON.stringify(item));
  //based on the status the color has to be decided
  let statusColor = color.blue;
  if ('cleanerSchedule' in item && 'status' in item.cleanerSchedule) {
    switch (item.cleanerSchedule.status) {
      case 'completed':
        statusColor = color.green;
        break;
      case 'cancelled':
        statusColor = color.red;
        break;
      case 'pending':
        statusColor = color.blue;
        break;
      default:
        statusColor = color.gray_Light;
        break;
    }
  }

  // console.log('item', item.item);
  // let time = item.item.time_slot;
  console.log('time --------', item.cleanerSchedule.start_time);
  let startTime = item.cleanerSchedule.start_time.slice(0, 5);
  let endTime = item.cleanerSchedule.end_time.slice(0, 5);
  // console.log('startTime - endTime', startTime, endTime);
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomColor: color.lineColor,
        borderBottomWidth: 1,
      }}>
      <Image
        source={require('../../../assets/individual.png')}
        style={{
          height: 45,
          width: 45,
          borderRadius: radius.max,
          marginRight: 10,
        }}
      />
      <View style={{flex: 1}}>
        <GText
          fontFamily={ffamily.semiBold}
          color={color.gray}
          fontSize={fsize.h6}>
          {item.cleanerSchedule.car_number}
        </GText>

        <GText
          color={color.blue}
          fontFamily={ffamily.semiBold}
          fontSize={fsize.p1}>
          {item.customerCleaner.cleaner_name}
        </GText>
      </View>
      <View style={{marginLeft: 10, alignItems: 'flex-end'}}>
        <GText
          color={color.gray_Light}
          fontFamily={ffamily.bold}
          fontSize={fsize.p1}>
          {item.cleanerSchedule.cleaning_type}&nbsp;&nbsp;&nbsp;
          <GIcon name="brightness-1" size={fsize.p1} color={statusColor} />
        </GText>

        <GText
          fontFamily={ffamily.semiBold}
          color={color.gray}
          fontSize={fsize.p1}>
          {moment(item.cleanerSchedule.date).format('DD-MMM-YYYY')}
        </GText>
        {/* <GText fontFamily={ffamily.semiBold} fontSize={fsize.h6}>
          {item.cleanerSchedule.start_time} - {item.cleanerSchedule.end_time}
        </GText> */}
        <GText
          fontFamily={ffamily.semiBold}
          color={color.gray}
          fontSize={fsize.p1}>
          {startTime} - {endTime}
          {/* {moment(item.cleanerSchedule.start_time).format('hh:mm')}
          {moment(endTime).format('hh:mm')}
          {moment(item.cleanerSchedule.start_time).format('LT')}
          {moment(endTime).format('LT')} */}
        </GText>
      </View>
    </View>
  );
};
