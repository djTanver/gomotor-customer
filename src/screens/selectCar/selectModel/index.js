import React, { useState, useEffect } from 'react';
import SelectModelScreen from './selectModelScreen';
import navigator from '../../../navigation/navigator';
import { car_models } from '../../../store/car/services';
import { showtoast } from '../../../utils/error';

export default ({route, navigation}) =>{

    const [ carModelLoading, setCarModelLoading ] = useState(false);
    const [ carModels, setModels ] = useState([]);
    const [ selectedModel, setSelectedModel ] = useState(null);

    useEffect(()=>{
        getCarCompanies();
    },[])

    const getCarCompanies = async() =>{
        setCarModelLoading(true);
        try
        {
            const { car_company } = route.params;
            const response = await car_models( car_company );
            
            if (response) {
                setModels(response);
            }
            setCarModelLoading(false);
        } catch (error) {
            setCarModelLoading(false);
        }
    }

    const onContinue = () =>{

        if(!selectedModel){
            return showtoast("Please select your car model")
        }
        else{
            const { car_company,steam_car_wash } = route.params;
            console.log("car company",selectedModel)
            const params = { car_company: car_company, car_model: selectedModel.id,car_types:selectedModel.car_type,steam_car_wash:steam_car_wash };
            navigation.navigate(navigator.selectFuelType,params);
        }
    }

    return(
        <SelectModelScreen
            onContinue={onContinue}
            carModelLoading={carModelLoading}
            setSelectedModel={setSelectedModel}
            carModels={carModels}
            selectedModel={selectedModel}
        />
    )
}
