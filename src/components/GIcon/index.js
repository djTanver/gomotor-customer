import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { color as colors } from '../../theme';

const Icon = ({ type, name, color = colors.black, size=10, style ,onPress}) =>{

    let IconType = MaterialIcons;

    switch (type){
        case "FontAwesome":
            IconType = FontAwesome;
            break;
        case "AntDesign":
            IconType = AntDesign;
            break;
        case "Entypo":
            IconType = Entypo;
            break;
        case "EvilIcons":
            IconType = EvilIcons;
            break;
        case "Feather":
            IconType = Feather;
            break;
        case "FontAwesome5":
            IconType = FontAwesome5;
            break;
        case "Fontisto":
            IconType = Fontisto;
            break;
        case "Foundation":
            IconType = Foundation;
            break;
        case "Ionicons":
            IconType = Ionicons;
            break;
        case "MaterialCommunityIcons":
            IconType = MaterialCommunityIcons;
            break;
        case "MaterialIcons":
            IconType = MaterialIcons;
            break;
        case "Octicons":
            IconType = Octicons;
            break;
        case "SimpleLineIcons":
            IconType = SimpleLineIcons;
            break;
        case "Zocial":
            IconType = Zocial;
            break;
    }

    return(
        <IconType
        onPress={onPress}
            name={name}
            color={color}
            size={size}
            style={{
                color:color,
                ...style,
            }}
        />
    )

}

export default Icon;
