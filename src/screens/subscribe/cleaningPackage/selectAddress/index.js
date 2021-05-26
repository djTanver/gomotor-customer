import React, {useState, useEffect} from 'react';
import SelectAddressScreen from './selectAddressScreen';
import navigator from '../../../../navigation/navigator';
import {
  all_apartments,
  single_apartment,
  update_user_address
} from './../../../../store/cleaningPackage/services';
import {showtoast} from '../../../../utils/error';
import authSelector from './../../../../store/auth/selector';
import {useSelector} from 'react-redux';

export default ({navigation}) => {
  const user_id = useSelector(authSelector.userId);
  const [aptLoading, setAptLoading] = useState(false);
  const [aptDetailLoading, setAptDetailLoading] = useState(false);
  const [switchValue, setSwitchValue] = useState(true);
  const [allApartments, setAllApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedApartmentDetails, setSelectedApartmentDetails] = useState(
    null,
  );
  const [flatNumber, setFlatNumber] = useState('');

  useEffect(() => {
    getAllApartments();
  }, []);

  const toggleSwitch = (value) => {
    setSwitchValue(value);
  };

  const onContinue = async() => {
    if (selectedApartment && selectedApartmentDetails && selectedTimeSlot) {
      if(flatNumber){
        try{
          
          let address = allApartments.find(apartment => apartment.id == selectedApartment).address;
          let addressBody = {
            ...address,
            id:null,
            belongs_to: 'Customer',
            user_id,
            address_type: 'home',
            flat_number:flatNumber
          }
          const addressUpdate = await update_user_address(addressBody);
          
        }catch(err){
          console.log("Error updating apartment flat number"+err.message);
        };
      }else{
        showtoast("Please enter flat number.");
      }
      let timeslot;
      selectedApartmentDetails.apartment.time_slots.map((time) => {
        if (time.id == selectedTimeSlot) {
          timeslot = {end_time: time.end_time, start_time: time.start_time, id:time.id};
        }
      });
      const params = {
        apartment_id: selectedApartment,
        cleaner_id: selectedApartmentDetails.cleaner_id,
        timeslot: timeslot,
      };
      navigation.navigate(navigator.selecPackage, params);
    } else {
      showtoast('Please select apartment and time slot');
    }
  };

  const getAllApartments = async () => {
    setAptLoading(true);
    try {
      const response = await all_apartments();
      if (response) {
        setAllApartments(response);
      }
      setAptLoading(false);
    } catch (error) {
      console.log('error', error);
      setAptLoading(false);
    }
  };

  const getSelectedApartment = async (apartment_id) => {
    setAptDetailLoading(true);
    setSelectedApartment(apartment_id);
    try {
      const response = await single_apartment(apartment_id);
      if (response) {
        setSelectedApartmentDetails(response);
      }
      setAptDetailLoading(false);
    } catch (error) {
      setAptDetailLoading(false);
      console.log('error', error);
    }
  };
  
  const addNewApartment = () => {
    navigation.navigate(navigator.googleLocation,{isApartment:true});
  };

  const onNonApartmentClick = () => {
    navigation.navigate(navigator.cleanerListNonApartment,{from:''});
  };

  return (
    <SelectAddressScreen
      onContinue={onContinue}
      toggleSwitch={toggleSwitch}
      switchValue={switchValue}
      allApartments={allApartments}
      getSelectedApartment={getSelectedApartment}
      selectedApartment={selectedApartment}
      selectedApartmentDetails={selectedApartmentDetails}
      setSelectedTimeSlot={setSelectedTimeSlot}
      selectedTimeSlot={selectedTimeSlot}
      aptLoading={aptLoading}
      aptDetailLoading={aptDetailLoading}
      addNewApartment={addNewApartment}
      onNonApartmentClick={onNonApartmentClick}
      flatNumber={flatNumber}
      setFlatNumber={setFlatNumber}
    />
  );
};
