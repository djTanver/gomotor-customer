import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import GCardA from '../../../components/GCardA';
import GCardB from '../../../components/GCardB';
import GCardC from '../../../components/GCardC';
import Scanner from '../../../components/scanner';
import { fsize, fWeight, color, fAlign, ffamily, radius } from './../../../theme';
import GmodalBottom from '../../../components/GmodalBottom';
import StartClean from '../cleaningProcess/startClean';
import navigation from '../../../utils/navigation';
import { cleanerNavigator } from './../../../navigation/navigator';

export default () =>{

    const [ visible, setVisible ] = useState(false);
    const [ visible2, setVisible2 ] = useState(false);

    return(
        <ScrollView contentContainerStyle={style.scrollView}>


            <View style={{flex:1,marginHorizontal:18}}>
          
                <View style={style.topCardWrapper}>
                   <GCardA
                    onPress={()=>{setVisible(!visible)}}
                    topText="90"
                    bottomText="All Services"
                   />
                   <GCardA
                    onPress={()=>{navigation({path:cleanerNavigator.endClean})}}
                    topText="4.7"
                    bottomText="Ratings"
                   />
                   <GCardA
                    topText="12"
                    onPress={()=>{setVisible2(!visible2)}}
                    bottomText="Customers"
                   />
                </View>

                <View style={{marginTop:10}}>
                    <GCardC
                        leftText="Todays Services List"
                        rightTextA="2"
                        rightTextB="4"
                    />
                    <View style={{marginTop:8}}>
                        <FlatList 
                            data={[1,2,3]}
                            renderItem={()=>{
                                return(
                                    <GCardB
                                        onPress={()=>{navigation({path:cleanerNavigator.customerHistoryDetails})}}
                                        image={require('../../../assets/individual.png')}
                                        centerTopText="Kamli khan"
                                        centerMiddleText="RARA Apratment, BTM Layout"
                                        centerBottomTextA="KA 06 10 1997"
                                        centerBottomTextB="5 PM - 9 AM"
                                        iconName="chevron-right"
                                />
                                )
                            }}
                        />
                    </View>
                </View>

                <View style={{marginTop:10}}>
                    <GCardC
                        leftText="Todays Completed Tasks"
                        rightTextA="2"
                        rightTextB="4"
                    />
                    <View style={{marginTop:8,marginBottom:20}}>
                        <FlatList 
                            data={[1,2,3]}
                            renderItem={()=>{
                                return(
                                    <GCardB
                                        onPress={()=>{navigation({path:cleanerNavigator.customerCleanComplete})}}
                                        image={require('../../../assets/individual.png')}
                                        centerTopText="Kamli khan"
                                        centerMiddleText="RARA Apratment, BTM Layout"
                                        centerBottomTextA="KA 06 10 1997"
                                        centerBottomTextB="5 PM - 9 AM"
                                        iconName="stop-circle"
                                        iconSize={fsize.h6}
                                        iconColor={color.green}
                                    />
                                )
                            }}
                        />
                    </View>
                </View>

            </View>

        </ScrollView>
    )
}

const style = StyleSheet.create({
    scrollView:{
        flexGrow:1,
        backgroundColor:color.white,
    },
    topCardWrapper:{
        marginTop:16,
        alignItems:"center",
        justifyContent:"space-around",
        flexDirection:"row",
    },
    textInput:{
        flex:1.5,
        fontSize:fsize.h2,
        color:color.black,
        fontWeight:fWeight.bold,
    },
    buttonWrapper:{
        marginVertical:10,
        alignItems:"center",
        justifyContent:"center",
    },
    footerWrapper:{
        flex:0.5,
        alignItems:"center",
        justifyContent:"center",
    }
});
