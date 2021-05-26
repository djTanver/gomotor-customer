import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Alert } from 'react-native';
import { tabNavigator } from './navigator';
import TabStack from './tabStack';
import color from './../theme/color';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
    return(
        <Drawer.Navigator 
            initialRouteName={tabNavigator.home} 
            drawerStyle={{
                backgroundColor: color.white,
                width: 240,
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
            <Drawer.Screen name={tabNavigator.home} component={TabStack} />
        </Drawer.Navigator>
    )
}

export default DrawerStack;

function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem 
            label="Go Motor Car" 
            labelStyle={{paddingBottom:20,fontSize:20,borderBottomColor:color.blue,borderBottomWidth:4,fontFamily:"SourceSerifPro-SemiBold"}}
        />
        <DrawerItem 
            label="Login" 
            labelStyle={{paddingHorizontal:10,fontSize:20,fontFamily:"SourceSerifPro-SemiBold"}}
            onPress={()=>{Alert.alert(null,"Logged in!")}}
        />
        <DrawerItem 
            label="Logout" 
            labelStyle={{paddingHorizontal:10,fontSize:20,fontFamily:"SourceSerifPro-SemiBold"}}
            onPress={()=>{Alert.alert(null,"Logged out!")}}
        />
      </DrawerContentScrollView>
    );
  }