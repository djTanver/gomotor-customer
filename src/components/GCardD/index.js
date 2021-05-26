import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import GText from '../GText';
import GIcon from '../GIcon';
import { ffamily, fsize, color } from '../../theme';

export default ({
        onPress,
        leftIconName,
        leftIconType,
        rightIconName,
        rightIconType,
        title,
        }) =>{

    return(
        <TouchableOpacity 
            onPress={onPress}
            style={{flexDirection:"row",alignItems:"center",padding:8,}}>
            <GIcon
                name={leftIconName}
                type={leftIconType}
                size={fsize.h1}
                style={{marginRight:14}}
            />
            <View style={{flex:1}}>
                <GText
                    fontSize={fsize.p1}
                    fontFamily={ffamily.semiBold}
                    >{title}
                </GText>
            </View>
            <GIcon
                name={rightIconName}
                type={rightIconType}
                size={fsize.h1}
                style={{marginRight:10}}
            />
        </TouchableOpacity>
    )
}
