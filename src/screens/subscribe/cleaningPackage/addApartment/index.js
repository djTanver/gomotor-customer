import React, { useState } from 'react';
import GoogleLocationScreen from './googleLocationScreen';
import {add_apartment} from '../../../../store/cleaningPackage/services';
import Toast from 'react-native-simple-toast';

import navigator from '../../../../navigation/navigator';

export default ({route, navigation}) =>{
    
    const [ parsedDetails, setParsedDetails ] = useState(null);

    const parseData = (details) =>{

        let parsingData = {};

        if(details){
            details.address_components.map((data)=>{
                data.types.map( type =>{
                    if(type == "postal_code"){
                        parsingData.pincode = data.long_name;
                    }
                    else if(type == "administrative_area_level_1"){
                        parsingData.state = data.long_name;
                    }
                    else if(type == "administrative_area_level_2"){
                        parsingData.city = data.long_name;
                    }
                    else if(type == "premise"){
                        parsingData.land_mark = data.long_name;
                    }
                })
            });
            parsingData.coordinates = {};
            parsingData.coordinates.latitude = details.geometry.location.lat;
            parsingData.coordinates.longitude = details.geometry.location.lng;
            parsingData.address = details.formatted_address;
            parsingData.apartment_name = details.name;
            parsingData.address_type = "other";
            parsingData.belongs_to = "Apartment";
            setParsedDetails({...parsingData});
        }
    }

    const addApartment = async() => {
        try{
            const result = await add_apartment(parsedDetails);
           
            if(result){
                navigation.navigate(navigator.apartmentAddSucess);
            }
        }catch(error){
            console.log('what the hell ---->'+error.message);
            if(error.statusCode == 409){
                Toast.show(`Apartment already exists please wait, we will cater you soon.`);
            }else
                Toast.show(`Add apartment failed!! ${error.message}`);
        }
    }
    
    return(
    
        <GoogleLocationScreen 
            props={route} 
            parseData={parseData}
            parsedDetails={parsedDetails}
            saveApartment={addApartment}
        />
    )
}


