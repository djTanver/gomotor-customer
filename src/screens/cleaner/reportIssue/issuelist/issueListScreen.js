import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import authSelector from '../../../../store/auth/selector';
import GCardIssueList from '../../../../components/GCardIssueList';
import GButton from '../../../../components/GButton';
import moment from 'moment'
import navigation from '../../../../utils/navigation';
import navigator, { authNavigator } from './../../../../navigation/navigator';

import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from '../../../../theme';
import {FlatList} from 'react-native-gesture-handler';
import {get_issues} from '../../../../store/report/service';
import { showtoast } from '../../../../utils/error';
import GText from '../../../../components/GText';

export default ({onContinue, route}) => {
  const user_id = useSelector( authSelector.userId );
  const token = useSelector( authSelector.token );
  // console.log("Bearere token", token)
  const user = useSelector( authSelector.user );
  console.log("user", user)
  const [issueList, setIssueList] = useState( [] );
  
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getSearchServices();
  }, [route]);
  const getSearchServices = async () =>
  {
    setLoading( true );
    
    try {
      const result = await get_issues(user_id);
      // console.log("issues :", result) 
      if(!result.error){
        setIssueList( result );
      }else{
        showtoast("Something went Wrong, try again!!!")
      }
      setLoading( false );
    } catch ( error )
    {
      setLoading( false );
      console.log('error in issueList', error);
    }
  };
  return (
    <View style={style.scrollView}>
      <FlatList
        data={issueList}
        style={{ marginVertical: 12, marginHorizontal: 12, flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => getSearchServices()}
          />
        }
        ListEmptyComponent={()=>{
        if(isLoading){
          return(
            <View style={{alignSelf:"center", marginTop:30}}>
             
            </View>
          )
        }else{
          return(
            <View style={{alignSelf:"center", marginTop:30}}>
              <GText>No issues found</GText>
            </View>
          )
        }
        }}
        renderItem={({item}) => {
          return (
            <GCardIssueList
              status={item.status}
              onPress={() => navigation({path: navigator.createdIssue, params:item})}
              centerTopText={item.user_car_id? item.user_car_id.car_number? item.user_car_id.car_number : "" : ""}
              centerMiddleText={item.title? item.title : ""}
              centerBottomTextA={item.issueCreatedDate? moment(item.issueCreatedDate).format("DD-MMM-YYYY") :""}
              image={item.images.length > 0? item.images[0].url : ""}
              iconName="chevron-right"
            />
          );
        }}
      />

      <View
        style={{
          backgroundColor: color.white,
          // position: 'absolute',
          // left: 0,
          // right: 0,
          // bottom: 10,
          paddingTop: 10,
          paddingBottom:10,
          justifyContent: 'center',
        }}>
        <GButton onPress={onContinue} buttonStyle={{marginHorizontal: 20}}>Report Issue</GButton>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: color.white,
  },
});
