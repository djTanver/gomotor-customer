import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {format, now} from 'momento';
import RNPickerSelect from 'react-native-picker-select';
import GIcon from '../../components/GIcon';
import GText from '../../components/GText';
import {fsize, fWeight, color, fAlign, ffamily, radius} from './../../theme';
import {FlatList} from 'react-native-gesture-handler';
import request from '../../utils/fetch';
import {customerWorkHistory, userCars} from '../../utils/services';
import Toast from 'react-native-simple-toast';
import {user_cars, workhistory} from './../../store/cleaningPackage/services';
import authSelector from './../../store/auth/selector';
import Loader from '../../components/Loader';

export default () => {
  // const [worklist, setWorklist] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const {width, height} = Dimensions.get('window');
  const [userCarId, setUserCarId] = useState(0);
  const [userCarOptions, setUserCarOptions] = useState({});
  const [isDataFound, setIsDataFound] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const [userCarLoading, setUserCarsLoading] = useState(false);
  const [worklistLoading, setWorklistLoading] = useState(false);
  const [useCars, setUserCars] = useState([]);
  const [worklist, setWorklist] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const user_id = useSelector(authSelector.userId);

  useEffect(() => {
    getUserCars();
  }, []);

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

  const getWorkList = async (car_id) => {
    setSelectedCar(car_id);
    setWorklistLoading(true);
    try {
      const startIndex = page * 10 + 1;
      const today = format('YYYY-MM-DD', now());
      const response = await workhistory(user_id, today, startIndex);

      if (response) {
        setWorklist(response);
      }
      setWorklistLoading(false);
    } catch (error) {
      setWorklistLoading(false);
      console.log('error', error);
    }
  };

  const loadCarOptions = async () => {
    setLoading(true);
    const userCarsUrl = userCars(user.id);

    request
      .getWithAuth(userCarsUrl, {}, token)
      .then((result) => {
        if (result && result.length) {
          setIsDataFound(true);
          setUserCarId(result[0].id);
          const startIndex = page * 10 + 1;
          const today = format('YYYY-MM-DD', now());
          setUserCarOptions(
            result.map((car) => {
              return {label: car.car_number, value: car.id};
            }),
          );
          return request.getWithAuth(
            customerWorkHistory(result[0].id, today, startIndex),
            {},
            token,
          );
        }
        if (!result) {
          setIsDataFound(false);
        }
      })
      .then((carWorkHistory) => {
        if (carWorkHistory) {
          setWorklist(carWorkHistory);
          setLoading(false);
        }

        if (!carWorkHistory) {
          setIsDataFound(false);
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
          if (!result) {
            setIsDataFound(false);
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.show(`An error has occurred ${error}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const carChangeHandler = (value) => {
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
    <ScrollView contentContainerStyle={style.scrollView}>
      <View>
        {userCarLoading ? (
          <Loader/>
        ) : (
          <View
            style={{
              marginHorizontal: 12,
              borderWidth: 1.5,
              borderColor: color.gray_Light,
              borderRadius: radius.default,
            }}>
            <RNPickerSelect
            useNativeAndroidPickerStyle={false}
              onValueChange={(value) => value && getWorkList(value)}
              items={useCars.map((usercar) => {
                const {
                  car_number,
                  car_model_id: {name},
                  id,
                } = usercar;
                return {label: `${car_number} - ${name}`, value: id, key: id};
              })}
              placeholder={{label: 'Select Car', color: color.black}}
              value={selectedCar}
              style={{inputAndroid: {color: color.black,borderRadius:5,borderWidth:1,borderColor:color.blue_Light}}}
            />
          </View>
        )}
      </View>

      <View style={{flex: 1, marginTop: 12, marginHorizontal: 20}}>
        <GText textAlign={fAlign.center} color={color.gray} fontSize={fsize.p1}>
          You can see all the work history list
        </GText>

        {worklistLoading ? (
          <Loader />
        ) : (
          worklist &&
          worklist.length && (
            <FlatList
              data={worklist}
              style={{marginTop: 20}}
              renderItem={({item}) => {
                return <CardComp item={item} />;
              }}
              keyExtractor={(item) => item.id}
              onRefresh={() => onRefresh()}
              refreshing={loading}
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0.5}
              initialNumToRender={10}
              ListFooterComponent={renderFooter}
            />
          )
        )}
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

const CardComp = ({item}) => {
  const {
    customerCleaner: {cleaner_name},
    cleanerSchedule: {cleaning_type, date, start_time, end_time},
  } = item;

  const statusColor = color.blue;

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 8,
        marginTop: 12,
        borderBottomColor: color.gray_Light,
        borderBottomWidth: 1,
      }}>
      <Image
        source={require('../../assets/individual.png')}
        style={{
          height: 45,
          width: 45,
          borderRadius: radius.max,
          marginHorizontal: 12,
        }}
      />
      <View style={{flex: 1}}>
        <GText fontFamily={ffamily.semiBold} fontSize={fsize.h6}>
          {cleaner_name}
        </GText>
        <GText
          color={color.blue}
          fontFamily={ffamily.semiBold}
          fontSize={fsize.p2}>
          {cleaning_type}
        </GText>
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          {cleaning_type && (
            <>
              <GText
                color={color.green}
                fontFamily={ffamily.bold}
                fontSize={fsize.p2}>
                {cleaning_type}
              </GText>
              <GIcon name="brightness-1" size={fsize.p1} color={statusColor} />
            </>
          )}
        </View>
        <GText fontFamily={ffamily.semiBold} fontSize={fsize.p3}>
          {date}
        </GText>
        <GText fontFamily={ffamily.semiBold} fontSize={fsize.p3}>
          {start_time} - {end_time}
        </GText>
      </View>
    </View>
  );
};
