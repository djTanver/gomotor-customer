import React from 'react';
import { View, Modal, TouchableHighlight } from 'react-native';

export default ({children,visible,wrapperStyle,containerStyle,handleClose}) =>{

    return(
        <Modal 
            visible={visible}
            transparent={true}
            onRequestClose={handleClose}>
            <TouchableHighlight style={{flex:1,backgroundColor:"rgba(0,0,0, .5)",...wrapperStyle}} onPress={handleClose}>
                <View style={[{margin:10,borderRadius:8,backgroundColor:"white",overflow:"hidden"},{...containerStyle}]}>
                    {children}
                </View>
            </TouchableHighlight>
        </Modal>
    )
}