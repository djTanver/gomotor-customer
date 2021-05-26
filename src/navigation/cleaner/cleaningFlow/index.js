import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {cleanerNavigator} from '../../navigator';
import GIcon from '../../../components/GIcon';
import GText from '../../../components/GText';
import {fsize, fWeight, color, fAlign, radius, ffamily} from './../../../theme';
import EndClean from '../../../screens/cleaner/cleaningProcess/endClean';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName={cleanerNavigator.endClean}>
      <Stack.Screen
        name={cleanerNavigator.endClean}
        component={EndClean}
        options={{
          headerStyle: {
            elevation: 0,
          },
          headerTitle: 'KA 06 MM 1997',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: ffamily.semiBold,
            fontSize: fsize.h5,
          },
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity>
                  <GIcon
                    name="error"
                    style={{
                      color: color.blue,
                      fontSize: fsize.h1,
                      marginRight: 18,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRightContainerStyle: {marginRight: 10},
        }}
      />
    </Stack.Navigator>
  );
};
