import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {ffamily, fsize, color, radius, fAlign} from '../../theme';

import {
  Badge,
  TextInput,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';

export default ({name, onPress, image, modalName, number}) => {
  return (
    <Card
      style={{
        width: '45%',
        height: 180,
        margin: 10,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      }}
      onPress={onPress}>
      {modalName != '' ? (
        <Badge
          style={[
            {zIndex: 1, margin: 5, color: '#fff'},
            {
              backgroundColor: color.blue_dark,
            },
          ]}>
          {modalName}
        </Badge>
      ) : (
        <Text style={[{zIndex: 1, margin: 5}]} />
      )}
      <Card.Cover
        source={image}
        style={{
          width: '100%',
          height: 100,
          position: 'relative',
          top: -30,
          overflow: 'hidden',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      />
      <Card.Content style={{position: 'relative', top: -28, padding: 0}}>
        <Paragraph style={{fontWeight: 'bold'}} numberOfLines={1}></Paragraph>
        <Paragraph
          numberOfLines={1}
          style={{
            fontSize: fsize.p1,
            color: color.blue_Dark,
            fontFamily: ffamily.bold,
          }}>
          {number}
        </Paragraph>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '100%', height: 30, marginRight: 2}}>
            <TouchableOpacity
              onPress={onPress}
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                borderWidth: 1,
                backgroundColor: color.blue,
                borderColor: color.blue,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 10,
                  color: '#fff',
                  textAlign: 'center',
                  padding: 4,
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
