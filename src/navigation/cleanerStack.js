// import React from 'react';
// import { Image, View, TouchableOpacity } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { cleanerNavigator } from './navigator';
// import SelectSubscription from '../screens/cleaner/subscription/initialSubscription';
// import GIcon from '../components/GIcon';
// import GText from '../components/GText';
// import { fsize, fWeight, color, fAlign, radius, ffamily } from './../theme';
// import Account from '../screens/cleaner/profile/account';
// import Dashboard from '../screens/cleaner/dashboard';
// import CleaningFlow from './cleaner/cleaningFlow';
// import WorkHistory from '../screens/cleaner/workhistory';
// import CustomerList from '../screens/cleaner/customers';
// import CustomerHistoryDetails from '../screens/cleaner/customerHistoryDetails';
// import CustomerCleanComplete from '../screens/cleaner/customerCleanComplete/customerCleanCompleteScreen';
// import CreateIssue from '../screens/cleaner/reportIssue/createIssue';
// import CreatedIssue from '../screens/cleaner/reportIssue/createdIssue';
// import UpdateProfile from '../screens/cleaner/profile/updateProfile';
// import BankDetails from '../screens/cleaner/profile/bankDetails';
// import PaymentHistory from '../screens/cleaner/profile/paymentHistory';
// import ApartmentDetail from '../screens/cleaner/customers/apartmentDetails';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const CleanerStack  = () => {

//     return (
//         <Stack.Navigator initialRouteName={cleanerNavigator.dashBoard}>
//             <Stack.Screen name={cleanerNavigator.selectSubscription} component={SelectSubscription} options={{title:"user name"}}  />
//             <Stack.Screen name={cleanerNavigator.dashBoard} component={TabStack} options={{ headerShown:false }} />
//             <Stack.Screen name={cleanerNavigator.endClean} component={CleaningFlow} options={{ headerShown:false }} />
//             <Stack.Screen
//                 name={cleanerNavigator.customerHistoryDetails}
//                 component={CustomerHistoryDetails}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerTitle:"KA 06 MM 1997",
//                     headerTitleAlign:"center",
//                     headerTitleStyle:{
//                         fontFamily:ffamily.semiBold,
//                         fontSize:fsize.h6,
//                     },
//                     headerRight: () => {
//                             return(
//                                 <View style={{flexDirection:"row",alignItems:"center"}}>
//                                     <TouchableOpacity>
//                                         <GIcon
//                                             name="qr-code-scanner"
//                                             style={{fontSize:fsize.h1,marginRight:18}}
//                                         />
//                                     </TouchableOpacity>
//                                 </View>
//                             )
//                         },
//                     headerRightContainerStyle:{marginRight:10},
//                 }}
//             />
//              <Stack.Screen
//                 name={cleanerNavigator.customerCleanComplete}
//                 component={CustomerCleanComplete}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerTitle:"KA 06 MM 1997",
//                     headerTitleAlign:"center",
//                     headerTitleStyle:{
//                         fontFamily:ffamily.semiBold,
//                         fontSize:fsize.h6,
//                     },
//                 }}
//             />
//              <Stack.Screen
//                 name={cleanerNavigator.createIssue}
//                 component={CreateIssue}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerTitle:"KA 06 MM 1997",
//                     headerTitleAlign:"center",
//                     headerTitleStyle:{
//                         fontFamily:ffamily.semiBold,
//                         fontSize:fsize.h6,
//                     },
//                 }}
//             />
//             <Stack.Screen
//                 name={cleanerNavigator.createdIssue}
//                 component={CreatedIssue}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerTitle:"KA 06 MM 1997",
//                     headerTitleAlign:"center",
//                     headerTitleStyle:{
//                         fontFamily:ffamily.semiBold,
//                         fontSize:fsize.h6,
//                     },
//                 }}
//             />
//             <Stack.Screen
//                 name={cleanerNavigator.updateProfile}
//                 component={UpdateProfile}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerTitle:"Update Profile",
//                     headerTitleAlign:"center",
//                     headerTitleStyle:{
//                         fontFamily:ffamily.semiBold,
//                         fontSize:fsize.h6,
//                     },
//                 }}
//             />
//             <Stack.Screen
//                 name={cleanerNavigator.bankDetails}
//                 component={BankDetails}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerTitle:"Bank Details",
//                     headerTitleAlign:"center",
//                     headerTitleStyle:{
//                         fontFamily:ffamily.semiBold,
//                         fontSize:fsize.h6,
//                     },
//                 }}
//             />
//             <Stack.Screen
//                 name={cleanerNavigator.paymentHistory}
//                 component={PaymentHistory}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerTitle:"Payment History",
//                     headerTitleAlign:"center",
//                     headerTitleStyle:{
//                         fontFamily:ffamily.semiBold,
//                         fontSize:fsize.h6,
//                     },
//                 }}
//             />
//             <Stack.Screen
//                 name={cleanerNavigator.apartmentDetail}
//                 component={ApartmentDetail}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerTitle:"Apartment",
//                     headerTitleAlign:"center",
//                     headerTitleStyle:{
//                         fontFamily:ffamily.semiBold,
//                         fontSize:fsize.h6,
//                     },
//                 }}
//             />
//         </Stack.Navigator>
//     )
// }

// export default CleanerStack;

// const TabStack = () => {
//     return(
//         <Tab.Navigator
//         initialRouteName={cleanerNavigator.dashBoard}
//         tabBarOptions={{
//             showLabel:false,
//             style:{
//                 backgroundColor:color. blue_Light,
//             },
//             activeTintColor: color.blue,
//             inactiveTintColor:color.black,
//             keyboardHidesTabBar:true,
//             }}
//         >
//             {
//                 TabData.map((data,index)=>{
//                     return(
//                         <Tab.Screen
//                             key={index}
//                             name={data.routeName}
//                             component={data.component}
//                             options={{
//                                 tabBarIcon: ({ color = "black" }) => (
//                                 <GIcon name={data.iconName} type={data.iconType} style={{color:color,fontSize:data.iconSize}} />
//                                 ),
//                             }}
//                         />
//                     )
//                 })
//             }
//         </Tab.Navigator>
//     )
// }

// const DashBoardStack  = () => {

//     return (
//         <Stack.Navigator initialRouteName={cleanerNavigator.dashBoard}>
//             <Stack.Screen
//                 name={cleanerNavigator.dashBoard}
//                 component={Dashboard}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerLeft:()=>(
//                         <GText
//                             fontSize={fsize.h5}
//                             fontFamily={ffamily.semiBold}
//                             >Hi, Manoj kumar
//                         </GText>),
//                     headerLeftContainerStyle:{marginLeft:10},
//                     headerTitle:"",
//                     headerRight: () => {
//                             return(
//                                 <View style={{flexDirection:"row",alignItems:"center"}}>
//                                     <TouchableOpacity>
//                                         <GIcon
//                                             name="qr-code-scanner"
//                                             style={{color:color.black,fontSize:fsize.h1,marginRight:18}}
//                                         />
//                                     </TouchableOpacity>
//                                     <TouchableOpacity>
//                                         <Image
//                                             source={require('../assets/individual.png')}
//                                             style={{height:30,width:30,borderRadius:100}}
//                                         />
//                                     </TouchableOpacity>
//                                 </View>
//                             )
//                         },
//                     headerRightContainerStyle:{marginRight:10},
//                 }}
//             />
//         </Stack.Navigator>
//     )
// }

// const AccountStack  = () => {

//     return (
//         <Stack.Navigator initialRouteName={cleanerNavigator.account}>
//             <Stack.Screen
//                 name={cleanerNavigator.account}
//                 component={Account}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerLeft:()=>(
//                         <GIcon
//                             type="arrow-back"
//                             color={color.black}
//                         />),
//                     headerTitle:"Account",
//                     headerTitleStyle:{
//                         fontFamily:ffamily.semiBold,
//                         fontSize:fsize.h4
//                     },
//                     headerTitleAlign:"center",
//                 }}
//             />
//         </Stack.Navigator>
//     )
// }

// const WorkHistoryStack  = () => {

//     return (
//         <Stack.Navigator initialRouteName={cleanerNavigator.workHistory}>
//             <Stack.Screen
//                 name={cleanerNavigator.workHistory}
//                 component={WorkHistory}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerLeft:()=>(
//                         <GIcon
//                             type="arrow-back"
//                             color={color.black}
//                         />),
//                     headerTitle:"Work history",
//                     headerTitleStyle:{
//                         fontFamily:ffamily.semiBold,
//                         fontSize:fsize.h4
//                     },
//                     headerTitleAlign:"center",
//                 }}
//             />
//         </Stack.Navigator>
//     )
// }

// const CustomerStack  = () => {

//     return (
//         <Stack.Navigator initialRouteName={cleanerNavigator.customerStack}>
//             <Stack.Screen
//                 name={cleanerNavigator.customerStack}
//                 component={CustomerList}
//                 options={{
//                     headerStyle:{
//                         elevation:0,
//                     },
//                     headerLeft:()=>(
//                         <GIcon
//                             type="arrow-back"
//                             color={color.black}
//                         />),
//                     headerTitle:"Customers",
//                     headerTitleStyle:{
//                         fontFamily:ffamily.semiBold,
//                         fontSize:fsize.h4
//                     },
//                     headerTitleAlign:"center",
//                 }}
//             />
//         </Stack.Navigator>
//     )
// }

// const TabData = [
//     {
//         iconName:"home",
//         iconType:"AntDesign",
//         iconSize:26,
//         routeName:cleanerNavigator.dashBoard,
//         component:DashBoardStack,
//     },
//     {
//         iconName:"account-multiple-outline",
//         iconType:"MaterialCommunityIcons",
//         iconSize:26,
//         routeName:cleanerNavigator.customerStack,
//         component:CustomerStack,
//     },
//     {
//         iconName:"swap-horiz",
//         iconType:"MaterialIcons",
//         iconSize:26,
//         routeName:cleanerNavigator.workHistory,
//         component:WorkHistoryStack,
//     },
//     {
//         iconName:"person-outline",
//         iconType:"MaterialIcons",
//         iconSize:26,
//         routeName:cleanerNavigator.account,
//         component:AccountStack,
//     }
// ]
