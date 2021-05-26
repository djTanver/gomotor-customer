import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GText from '../../../components/GText';
import GIcon from '../../../components/GIcon';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import {useSelector} from 'react-redux';
import authSelector from '../../../store/auth/selector';
import request from '../../../utils/fetch';
import {format, now} from 'momento';
import Toast from 'react-native-simple-toast';
import API_ENDPOINT from '../../../config/api';

export default () => {
  const [cleaner, setCleaner] = useState({});
  const [supervisor, setSupervisor] = useState({});
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [isDataFound, setIsDataFound] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    loadData();
    () => {
      return setCleaner({});
    };
  }, []);

  const loadData = async () => {
    try {
      const today = format('YYYY-MM-DD', now());
      console.log('user id ======>' + user.id);
      const url = `/customer-cleaners?customer_id.id=${user.id}&start_date_lte=${today}`;
      setLoading(true);
      //fetch the worklist
      request
        .getWithAuth(url, {}, token)
        .then((result) => {
          console.log(
            'cleaner supervisor =============> ',
            JSON.stringify(result),
          );
          if (!result && !result.length) {
            setLoading(false);

            return setIsDataFound(false);
          }
          if (result && result.length && result[0].cleaner_id) {
            setCleaner(result[0].cleaner_id);
            setLoading(false);

            const supervisorAptCleanerUrl = `/supervisor-apartment-cleaners?cleaner_id.id=${result[0].cleaner_id.id}`;
            return request.getWithAuth(supervisorAptCleanerUrl, {}, token);
          }
        })
        .then((supervisorApt) => {
          setIsDataFound(true);
          if (supervisorApt) {
            setSupervisor(supervisorApt.apartments[0].supervisor_id);
          }
          if (!supervisorApt) {
            setIsDataFound(false);
          }
        })
        .catch((error) => Toast.show(`Error occurred ${error}`, 10000));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isDataFound && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
          }}>
          <GText
            fontSize={fsize.h6}
            fontFamily={ffamily.semiBold}
            style={{marginTop: 12, color: '#333333'}}>
            Please subscribe to our cleaning package to start the service.
          </GText>
        </View>
      )}
      <ScrollView contentContainerStyle={style.scrollView}>
        <View style={{flex: 1, marginHorizontal: 20}}>
          <Card
            type="Supervisor"
            name={supervisor.username}
            photo={supervisor.photo}
            phone={supervisor.phone}
            email={supervisor.email}
          />

          <Card
            type="cleaner"
            name={cleaner.username}
            photo={cleaner.photo}
            phone={cleaner.phone}
            email={cleaner.email}
          />
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
  gradientWrapper: {
    marginTop: 12,
    borderColor: color.gray_Light,
    borderWidth: 1,
    padding: 8,
    borderRadius: radius.default,
  },
});

const Card = ({name, type, photo, phone, email}) => {
  const api_ep = API_ENDPOINT.slice(0, API_ENDPOINT.length - 1);
  return (
    <View
      style={{
        height: 240,
        backgroundColor: '#f5e4da',
        borderRadius: radius.default,
        overflow: 'hidden',
        marginTop: 18,
      }}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {photo && (
          <Image
            source={{uri: `${api_ep}${photo.url}`}}
            style={{height: 70, width: 70, borderRadius: radius.max}}
          />
        )}
        {!photo && (
          <Image
            source={require('../../../assets/individual.png')}
            style={{height: 70, width: 70, borderRadius: radius.max}}
          />
        )}
        <GText fontFamily={ffamily.semiBold} style={{marginTop: 12}}>
          {name}
        </GText>
        <GText
          color={color.white}
          fontSize={fsize.h6}
          style={{
            backgroundColor: color.blue,
            bottom: -16,
            zIndex: 100,
            paddingVertical: 2,
            paddingHorizontal: 30,
            borderRadius: radius.h5,
            position: 'absolute',
          }}>
          {type}
        </GText>
      </View>
      <View
        style={{
          flex: 0.5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: color.white,
          borderWidth: 1,
          borderColor: color.gray_Light,
        }}>
        <TouchableOpacity
          style={{
            borderRightColor: color.gray_Light,
            borderRightWidth: 1,
            flex: 1,
            alignItems: 'center',
          }}
          onPress={() => Linking.openURL(`mailto:${email}`)}>
          <GIcon name="mail-outline" size={36} color={color.blue} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRightColor: color.gray_Light,
            borderRightWidth: 1,
            flex: 1,
            alignItems: 'center',
          }}
          onPress={() => Linking.openURL(`tel:${phone}`)}>
          <GIcon name="phone" size={36} color={color.blue} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={() =>
            Linking.openURL(`whatsapp://send?text=hello&phone=${phone}`)
          }>
          <GIcon name="whatsapp" type="Fontisto" size={36} color={color.blue} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
