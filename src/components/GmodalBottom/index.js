import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import GIcon from '../GIcon';
import { fsize, color, radius } from '../../theme';

export default ({
        visible,
        handleClose,
        cardHeight = 200,
        children,
        }) =>{

    return(
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={handleClose}
            >
            <View style={{ flex:1,backgroundColor:color.transparent, justifyContent:"flex-end" }}>
                <TouchableOpacity
                    style={{flex:1,width:"100%"}}
                    onPress={handleClose}
                >
                    <View style={{backgroundColor:"white",padding:6,right:10,position:"absolute",bottom:10,borderRadius:radius.max}}>
                        <GIcon
                            name="clear"
                            size={fsize.h1}
                        />
                    </View>
                </TouchableOpacity>
                <View style={{
                    backgroundColor:color.white,
                    width:"100%",
                    borderTopRightRadius:radius.h4,
                    borderTopLeftRadius:radius.h4,
                    height:cardHeight,
                    overflow:"hidden",
                }}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}
