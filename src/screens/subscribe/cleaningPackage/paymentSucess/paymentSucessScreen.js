import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import GImageNameBox from '../../../../components/GImageNameBox';
import GText from '../../../../components/GText';
import GIcon from '../../../../components/GIcon';
import GButton from '../../../../components/GButton';
import GModal from '../../../../components/GModal';
import { fsize, fWeight, color, fAlign, ffamily, radius } from './../../../../theme';

export default ({
        onContinue,
    }) =>{

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
                    Payment Accepted Thank you
                </GText>

                <GText
                    fontFamily={ffamily.semiBold}
                    color={color.gray}
                    fontSize={fsize.p1}
                    style={{marginTop:12,marginHorizontal:30}}
                    textAlign={fAlign.center}
                    >
                    Full cleaning package is activated for 1 month
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
