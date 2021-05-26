import React, {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import color from './../../theme/color';

export default ({route, scene}) => {
  const [index, setIndex] = useState(0);

  const [routes] = useState(route);

  const renderScene = SceneMap(scene);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: color.blue, padding: 1.7}}
      getLabelText={({route}) => route.title}
      style={{backgroundColor: color.white}}
      labelStyle={{
        color: color.blue,
        fontSize: 16,
        fontFamily: 'SourceSerifPro-SemiBold',
      }}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};
