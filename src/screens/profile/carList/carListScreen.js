import React, {useEffect, useState} from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
  RefreshControl
} from 'react-native';
import CardListItem from '../../../components/cardListItem';
import {fsize, fWeight, color, fAlign, ffamily, radius} from '../../../theme';
import navigator from '../../../navigation/navigator';
import navigation from '../../../utils/navigation';
import Helper from '../../../providers/helper-service';
import {environment} from '../../../../enviornment';
import authSelector from './../../../store/auth/selector';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { useFocusEffect } from '@react-navigation/native';
import {showtoast} from '../../../utils/error';

export default ({user}) => {
  const [componies, setComponies] = useState( [] );
  const [isLoading, setLoading] = useState(false);
  const userId = user.id;

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const getUserAllCars = async () => {
        try
        {
          setLoading( true );
          let res = await Helper.getUserAllCars( user.id );
          
          if ( res && isActive)
          {
            
            setComponies( res );
            setLoading( false );
            
          }
        } catch (err) {
          console.log( 'error', err );
          setLoading( false );
          showtoast(`Some error occurred ${err.message}`);
        }
      }
      getUserAllCars();
      return () => {
        isActive = false;
        
      };
    },[])
  );
  
  if ( isLoading )
  {
    return(<Loader />)
  }
  return (
    <View style={{flex:1}}>
      {componies.length>0?<FlatList
        data={componies}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={
              componies && componies.length > 0 && !isLoading ? false : true
            }
            onRefresh={async() => {
              try
              {
                setLoading( true );
                let res = await Helper.getUserAllCars( user.id );
                
                if (res)
                {
                 
                  setComponies( res );
                  setLoading( false );
                  
                }
              } catch (err) {
                console.log( 'error', err );
                setLoading( false );
                showtoast(`Some error occurred ${err.message}`);
              }
            }}
          />
        }
        renderItem={({item}) => {
          if ( item  )
          {
            return (
              <CardListItem
                modalName={item.car_model_id&&item.car_model_id.name?item.car_model_id.name:""}
                number={item.car_number?item.car_number:""}
                image={{
                  uri:
                   item.car_model_id&&item.car_model_id?
                   environment.API_URL +item.car_model_id.icon.url:""
                }}
                onPress={() =>
                  navigation({path: navigator.editCar, params: item})
                }
              />
            );
          }
        }}
      />:<View style={{alignItems:'center',justifyContent:"center",flex:1}}><Text style={{color:color.gray,fontSize:16,fontWeight:"500"}}>No car found, please add your car</Text></View>}
    </View>
  );
};

const style = StyleSheet.create({});
