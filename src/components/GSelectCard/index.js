import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { ffamily, fsize, color, radius, fAlign } from './../../theme';
import GText from '../GText';

export default ({ 
        onPress,
        backgroundColor = color.white,
        borderColor = color.gray,
        borderWidth = 1,
        cardHeight = 180,
        cardWidth = 140,
        borderRadius = radius.default,
        cardStyle,
        image,
        imageHeight=100,
        imageWidth=100,
        imageStyle,
        fontColor = color.white, 
        fontFamily = ffamily.semiBold, 
        fontSize = fsize.h6, 
        textAlign = fAlign.center,
        title,
        textStyle,
    }) => {

    return(
        <TouchableOpacity style={{
            backgroundColor,
            borderColor,
            borderWidth,
            height:cardHeight,
            width:cardWidth,
            alignItems:"center",
            justifyContent:"center",
            borderRadius,
            ...cardStyle,
            }}
            onPress={onPress}
            >
            <Image
                source={image}
                style={{
                        height:imageHeight,
                        width:imageWidth,
                        ...imageStyle,
                    }}
            />
            <GText
                color={fontColor}
                fontSize={fontSize}
                textAlign={textAlign}
                fontFamily={fontFamily}
                style={{
                    marginTop:10,
                    ...textStyle,
                }}
                >{title}
            </GText>
        </TouchableOpacity>
    )
}
