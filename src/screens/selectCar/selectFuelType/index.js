import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import SelectFuelTypeScreen from './selectFuelTypeScreen';
import navigator from '../../../navigation/navigator';
import { fuel_types, car_types, add_car } from './../../../store/car/services';
import { showtoast } from '../../../utils/error';
import authSelector from './../../../store/auth/selector';
import cleanPackageSelector from './../../../store/cleaningPackage/selector';

export default ({route, navigation}) =>{

    const userId = useSelector(authSelector.userId);
    
const addressRouteData = useSelector(cleanPackageSelector.AddressRouteData);

console.log('====================daresss detail==============',addressRouteData);

    const [ carFuelTypeLoading, setCarFuelTypeLoading ] = useState(false);
    const [ carFuelTypes, setFuelTypes ] = useState([]);
    const [carTypes, setTypes] = useState( [] );
    const [ carType, setType ] = useState("");
    
    const [ selectedCarTypes, setSelectedCarTypes ] = useState(null);
    const [ selectedFuelType, setSelectedFuelType ] = useState(null);
    const [ carNumber, setCarNumber ] = useState('');
    const [ addCarLoading, setAddCarLoading ] = useState(false);

    useEffect( () =>
    {
        getCarFuelType();
        getCarType();
        setType( route.params.car_types );

    },[])

    const getCarFuelType = async() =>{
        setCarFuelTypeLoading(true);
        try
        {
            const response = await fuel_types();
            if (response) {
                setFuelTypes(response);
            }
            setCarFuelTypeLoading(false);
        } catch (error) {
            setCarFuelTypeLoading(false);
        }
    }

    const getCarType = async() =>{
        try
        {
            const response = await car_types();
            if (response) {
                setTypes(response);
            }
        } catch (error) {
        }
    }

    const onContinue = async() =>{

        const carRegNumberRegx = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _][^\s]*)$/;

        if(!selectedFuelType){
            return showtoast("Please select your car fuel type")
        }
        // else if(!selectedCarTypes){
        //     return showtoast("Please select your car category")
        // }
        else if(!carNumber){
            return showtoast("Please enter your car number")
        }
        else if(carNumber && !carRegNumberRegx.test(carNumber)){
            return showtoast("Please enter car number in format KA06MH1234 and no spaces are alllowed.")
        }
        else{
            const { car_company, car_model  } = route.params;
            setAddCarLoading( true );
            try {
                const body = {
                    user_id: userId,
                    car_company_id: car_company,
                    car_model_id: car_model,
                    car_type_id: carType.id,
                    fuel_type_id: selectedFuelType.id,
                    car_number: carNumber.toUpperCase()
                }
                const response = await add_car( body );
                console.log("response",response,addressRouteData)
                if (response) {
                    if(addressRouteData){
                        try {
                            navigation.navigate(navigator.selecPackage,{...addressRouteData,isCarAdded:carNumber});
                          // navigation.navigate(navigator.packageDetail,{isCarAdded:carNumber});
                        } catch (error) {
                            console.log("error",error);
                        }
                    }
                    else{
                        try {
                            console.log("route data missing");
                            if(route.params.steam_car_wash!=''){
                                
                                navigation.navigate(navigator.steamCarWash,{car_added:'success'});  
                            }
                            else{
                            navigation.navigate(navigator.packageDetail,{isCarAdded:carNumber});
                            }
                        } catch (error) {
                            console.log("error",error);
                        }
                    }
                }
                setAddCarLoading(false);
            } catch (error) {
                setAddCarLoading(false);
            }  
        }
   }

    return(
        <SelectFuelTypeScreen
            onContinue={onContinue}
            setSelectedFuelType={setSelectedFuelType}
            carFuelTypes={carFuelTypes}
            carFuelTypeLoading={carFuelTypeLoading}
            selectedFuelType={selectedFuelType}
            carTypes={carTypes}
            carType={carType}
            setSelectedCarTypes={setSelectedCarTypes}
            selectedCarTypes={selectedCarTypes}
            carNumber={carNumber}
            addCarLoading={addCarLoading}
            setCarNumber={setCarNumber}
        />
    )
}
