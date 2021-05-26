import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import GText from '../../components/GText';
import GIcon from '../../components/GIcon';
import GButton from '../../components/GButton';
import { fsize, fWeight, color, fAlign, ffamily, radius } from './../../theme';
import navigator from '../../navigation/navigator';
import navigation from '../../utils/navigation';

const steamCarWashSuccessScreen=()=>{

    const onContinue = () =>{
        navigation({path:navigator.dashBoard});
    }

    return(
        <ScrollView contentContainerStyle={style.scrollView}>

            <View style={{flex:1,marginHorizontal:34,justifyContent:"center"}}>


                <GIcon
                    name="checkmark-circle"
                    type="Ionicons"
                    size={fsize.xlarge}
                    color={color.green}
                    style={{textAlign:"center"}}
                />

                <GText
                    fontFamily={ffamily.bold}
                    style={{marginTop:12}}
                    fontSize={fsize.h6}
                    textAlign={fAlign.center}
                    >
                    Thank you for booking steam car wash
                </GText>

                <GText
                    fontFamily={ffamily.semiBold}
                    color={color.gray}
                    fontSize={fsize.p1}
                    style={{marginTop:12,marginHorizontal:30}}
                    textAlign={fAlign.center}
                    >
                    We will contact you shortly.
                </GText>

                <GButton
                    marginHorizontal={0}
                    marginVertical={10}
                    onPress={onContinue}
                    buttonStyle={{marginTop:20}}
                    >
                    Ok
                </GButton>

            </View>

        </ScrollView>
    )
}

const style = StyleSheet.create({
    scrollView:{
        flexGrow:1,
        backgroundColor:color.white,
    },
});


export default steamCarWashSuccessScreen;