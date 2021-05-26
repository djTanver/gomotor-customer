import React, { useState, useEffect } from 'react';
import SelectCompanyScreen from './selectCompanyScreen';
import navigator from '../../../navigation/navigator';
import { car_companies } from './../../../store/car/services';
import { showtoast } from '../../../utils/error';

export default ({ navigation,route }) =>{

    const [ carCmpLoading, setCarCmpLoading ] = useState(false);
    const [ carCompanies, setCarCompanies ] = useState([]);
    const [ selectedModel, setSelectedModel ] = useState(null);

    useEffect(()=>{
        getCarCompanies();
    },[])

    const getCarCompanies = async() =>{
        setCarCmpLoading(true);
        try
        {
            const response = await car_companies();
            if (response) {
                setCarCompanies(response);
            }
            setCarCmpLoading(false);
        } catch (error) {
            setCarCmpLoading(false);
        }
    }

    const onContinue = () =>{

        if(!selectedModel){
            return showtoast("Please select you car company")
        }
        else{
            const params = { car_company: selectedModel.id,steam_car_wash:route.params?route.params.steam_car_wash:''}

            navigation.navigate(navigator.selectModel,params);
        }
        
    }

    return(
        <SelectCompanyScreen
            onContinue={onContinue}
            carCmpLoading={carCmpLoading}
            carCompanies={carCompanies}
            setSelectedModel={setSelectedModel}
            selectedModel={selectedModel}
        />
    )
}
