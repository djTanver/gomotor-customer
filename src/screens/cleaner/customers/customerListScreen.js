import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';
import GIcon from '../../../components/GIcon';
import GText from '../../../components/GText';
import GCardB from '../../../components/GCardB';
import { fsize, fWeight, color, fAlign, ffamily, radius } from '../../../theme';
import { FlatList } from 'react-native-gesture-handler';
import navigation from '../../../utils/navigation';
import { cleanerNavigator } from './../../../navigation/navigator';

export default () =>{

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'customers', title: 'customers' },
        { key: 'apartments', title: 'apartments' },
    ]);

    const renderScene = SceneMap({
        customers: Customers,
        apartments: Customers,
      });

    return(
        <ScrollView contentContainerStyle={style.scrollView}>


            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={props => <TabBar 
                    {...props} 
                    indicatorStyle={{ backgroundColor: color.blue }}
                    style={{ backgroundColor: color.white }}    
                    getLabelText={({ route }) => route.title}
                    labelStyle={{color:color.black}}
                />}
                onIndexChange={setIndex}
                />

        </ScrollView>
    )
}

const style = StyleSheet.create({
    scrollView:{
        flexGrow:1,
        backgroundColor:color.white,
    },
});

const Customers = () =>{
    return(
        <FlatList
            data={[1,2,3,4,5,6,7,8,9,10,11,12]}
            style={{marginVertical:12,marginHorizontal:12}}
            renderItem={()=>{
                return(
                    <GCardB
                        image={require('../../../assets/individual.png')}
                        centerTopText="Kamli khan"
                        centerMiddleText="RARA Apratment, BTM Layout"
                        centerBottomTextA="KA 06 10 1997"
                        centerBottomTextB="5 PM - 9 AM"
                        iconName="chevron-right"
                        onPress={()=>{navigation({path:cleanerNavigator.apartmentDetail})}}
                    />
                )
            }}
        />
    )
}
