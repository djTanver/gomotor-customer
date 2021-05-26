import React from 'react';
import { Text } from 'react-native';
import { ffamily, fsize, fWeight, color as colors } from './../../theme';

export default ({ 
        children, 
        color = colors.black, 
        fontWeight = fWeight.normal, 
        fontFamily = ffamily.regular, 
        fontSize = fsize.h5, 
        letterSpacing,
        lineHeight,
        textAlign,
        style,
        textDecorationLine,
    numberOfLines,
    onPress,
    }) => {

    return(
        <Text 
            style={{
                    fontFamily,
                    fontWeight,
                    fontSize,
                    color,
                    letterSpacing,
                    lineHeight,
                textAlign,
                textDecorationLine,
                    ...style,
                    }}
            numberOfLines={numberOfLines}
            onPress={onPress}
            >
            {children}
        </Text>
    )
}
