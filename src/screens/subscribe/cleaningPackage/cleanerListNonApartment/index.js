import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CleanerListNonApartment from './cleanerListNonApartment';
import navigator from '../../../../navigation/navigator';
import navigation from '../../../../utils/navigation';
import authSelector from '../../../../store/auth/selector';
import { search_nearby_cleaners,pushLeads } from './../../../../store/cleaningPackage/services';
import { services } from '../../../../store/categories/services';
import {user_address} from '../../../../store/address/service';
import Geocoder from 'react-native-geocoding';


export default ({route}) =>{

    const user_id = useSelector(authSelector.userId);
    const user = useSelector(authSelector.user);
    const [ loading, setLoading ] = useState(false);
    const [ cleaners, setCleaners ] = useState([]);
    const [home, setHome] = useState(null);
    const [work, setWork] = useState(null);

    const onContinue = () =>{
        navigation({path:navigator.dashBoard});
    }
   
    const onSearch = async(lat, lng) =>{
       
        //const { lat, lng } = data.geometry.location;
        setLoading(true);
        try
        {
          let json = await Geocoder.from(lat, lng);
          let addressComponent = '';
          for(let component of json.results[0].address_components){
            addressComponent += component.short_name + ' ';
          }
          console.log("============addressComponent-============>"+ JSON.stringify(json.results[0].address_components));
          console.log(user_id, lat, lng,addressComponent,route && route.params && route.params.id?route.params.id: 52);
          const response = await search_nearby_cleaners(user_id, lat, lng,addressComponent,route && route.params && route.params.id?route.params.id: 52);
          if(response){
              setCleaners(response);
              //console.log('=============response data',response);
              //const pushedLead = await pushLeads(response[0]);
          }
          if(response && !response.length)
            setCleaners(null);
            
          setLoading(false);
        } catch (error) {
            setCleaners(null);
            console.log("error",error);
            setLoading(false);
        }
    }

    //get address type when clicked on home/work
    const getAddressType = async(type) => {
        
    }
    const addressData = async () => {
        try {
          let res = await user_address(user.id);
         
          if (res && res.length > 0) {
            res.map((item, index) => {
              if (item.address_type == 'home') {
                setHome(item);
              } else if (item.address_type == 'work') {
                setWork(item);
              }
            });
          }
        } catch (err) {
          console.log('error', err);
        }
      };
    
      useEffect(() => {
        addressData();
      }, []);

      useEffect(() => {
        addressData();
      }, [route.params.from]);

     

    

    return(
        <CleanerListNonApartment
            onContinue={onContinue}
            onSearch={onSearch}
            loading={loading}
            cleaners={cleaners}
            route={route}
            home={home}
            work={work}
        />
    )
}
