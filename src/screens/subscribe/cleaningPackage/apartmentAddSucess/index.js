import React from 'react';
import ApartmentAddSucessScreen from './apartmentAddSucess';
import navigator from '../../../../navigation/navigator';
import navigation from '../../../../utils/navigation';

export default () => {
  const onContinue = () => {
    navigation({path: navigator.dashBoard});
  };

  return <ApartmentAddSucessScreen onContinue={onContinue} />;
};
