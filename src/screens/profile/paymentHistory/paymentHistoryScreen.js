import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import GCardB from '../../../components/GCardB';
import GButton from '../../../components/GButton';
import GText from '../../../components/GText';
import moment from 'moment';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import {FlatList} from 'react-native-gesture-handler';
import navigation from '../../../utils/navigation';
import authSelector from './../../../store/auth/selector';
import {useSelector} from 'react-redux';
import {get_payment_history} from '../../../store/profile/services';
export default ({}) => {
  const [isLoading, setLoading] = useState(false);
  const userId = useSelector(authSelector.userId);
  const [paymentHistory, setPaymentHistory] = useState(null);
  useEffect(() => {
    getPaymentHistory();
  }, []);

  const getPaymentHistory = async () => {
    setLoading(true);
    try {
      const response = await get_payment_history(userId);
      // console.log("response",response)
      if (response) {
        setPaymentHistory(response);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);

      console.log('error', err);
    }
  };

  return (
    <View style={style.scrollView}>
      <>
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            borderTopColor: '#D2F8FF',
            borderTopWidth: 1,
          }}></View>
        <FlatList
          data={paymentHistory}
          ListEmptyComponent={()=>{
            if(isLoading){
              return(
                <View style={{alignItems:"center",justifyContent:'center',flex:1,marginTop:50}}>
                 
                </View>
              )
            }else{
              return(
                <View style={{alignItems:"center",justifyContent:'center',flex:1,marginTop:50}}>
                  <GText>No history found</GText>
                </View>
              )
            }
            }}
          style={{marginVertical: 12, marginHorizontal: 12}}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => getPaymentHistory()}
            />
          }
          renderItem={({item}) => {
            console.log('item', item);
            return (
              <View
                style={{
                  paddingHorizontal: 10,
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: color.lineColor,
                }}>
                {item.order && (
                  <View>
                    <GText fontSize={fsize.h6} fontFamily={ffamily.semiBold}>
                      {item.order
                        ? item.order.plan_id
                          ? item.order.plan_id.title
                            ? item.order.plan_id.title
                            : ''
                          : ''
                        : ''}
                    </GText>
                    <GText
                      style={{padding: 5}}
                      fontSize={fsize.p1}
                      fontFamily={ffamily.semiBold}
                      color={color.gray}>
                      {moment(item.order.from_date).format('DD-MMM-YYYY')}
                    </GText>
                  </View>
                )}

                <GText
                  fontSize={fsize.h5}
                  color={color.blue}
                  fontFamily={ffamily.semiBold}>
                  ₹ {item.amount}
                </GText>
              </View>
            );
          }}
        />
      </>

      {/* <View
        style={{
          backgroundColor: color.white,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 10,
          paddingTop: 10,
          justifyContent: 'center',
        }}>
        <GButton onPress={onContinue} buttonStyle={{marginHorizontal: 20}}>
          Create Issue
        </GButton>
      </View> */}
    </View>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
});
