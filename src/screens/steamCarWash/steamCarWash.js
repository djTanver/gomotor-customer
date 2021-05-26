import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,Dimensions,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import {fsize, fWeight, color as colors, fAlign, radius, ffamily} from '../../theme';
import Carousel from 'react-native-snap-carousel';
import GText from '../../components/GText';
import GIcon from '../../components/GIcon';
import navigation from '../../utils/navigation';
import API_ENDPOINT from '../../config/api';
import {useSelector} from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const carouselHeight = (windowWidth*40)/100;
import LinearGradient from 'react-native-linear-gradient';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import {user_cars} from './../../store/cleaningPackage/services';
import Loader from '../../components/Loader';
import authSelector from './../../store/auth/selector';
import GButton from '../../components/GButton';
import navigator from '../../navigation/navigator';
import {bookSteamCarWsah,planData} from '../../store/steamCarWash/services';

import {showtoast} from '../../utils/error';





const steamCarWash=({route})=>{
 
    const [packageTitle,setPackageTitle]=useState('');
    const [isQuickWashActive,setQuickWashIsActive]=useState(false);
    const [isSuperWashActive,setSuperWashIsActive]=useState(false);
    const [isDazzleWashActive,setDazzleWashIsActive]=useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [show, setShow] = useState(false);
    const [useCars, setUserCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [planDataPrice,setPlanDataPrice]=useState(0.00);
    const [planDataId,setPlanDataId]=useState(null);
    const [carType,setCarType]=useState(null);
    const [userCarLoading, setUserCarsLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const [currentIndex,setCurrentIndex]=useState(0);
    const [isLoading,setIsLoading]=useState(false);
    const locationId=route.params.location_id;
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [submitLoading,setSubmitLoading]=useState(false);

    const user_id = useSelector(authSelector.userId);

    //console.log('------location ID',locationId);
    const onSubmit=async()=>{

     
      if (!packageTitle || packageTitle=="Select Package") {
        showtoast('Please Select Pacakge');
        return;
      }
      if (!locationId || locationId==undefined) {
        showtoast('Please Select Your Location');
        return;
      }
      if (!selectedTimeSlot || selectedTimeSlot==null) {
        showtoast('Please Select TimeSlot');
        return;
      }
      if (!selectedCar || selectedCar==null) {
        showtoast('Please Select Car');
        return;
      }
      


      const due_amount=planDataPrice+((planDataPrice*18)/100);
      let _object = {
        customer_id: user_id,
        date:date,
        timeslot:selectedTimeSlot,
        customer_car_id: selectedCar,
        address_id: locationId,
        order: {package_type: "service_package", package_type_id: 3,plan_id:planDataId},
        payment_type: "post_paid",
        invoice_due: due_amount
      };
//console.log('============object Data=======================',_object);
      try {
        setSubmitLoading(true);
        const response = await bookSteamCarWsah(_object);
        if (response) {
          console.log('===============my added response',response);
          navigation({path:navigator.steamCarSuccessScreen});
        }
      } catch (error) {
        console.log('error', error);
      }
      setSubmitLoading(false);
    }



    const onChange = (date) => {
        setDate(date.toISOString().split('T')[0]);
        hideDatePicker();
      };
      const showDatepicker = () => { 
        setShow(true);
      };
      const hideDatePicker=()=>{
        setShow(false);
      }
 
      useEffect(() => {
        getUserCars();
      }, []);

      useEffect(() => {
        getUserCars();
      }, [route.params.car_added]);
    
      const getUserCars = async () => {
        setUserCarsLoading(true);
        try {
          const response = await user_cars(user_id);
          if (response) {
           
            setUserCars(response);
          }
          setUserCarsLoading(false);
        } catch (error) {
          setUserCarsLoading(false);
          console.log('error', error);
        }
      };

      useEffect(()=>{
        getPlanData(carType);
      },[packageTitle]);

      const getPlanData = async (car_type) => {
        try {
          setIsLoading(true);
          const response = await planData(car_type);

          if (response) {            
            const filtrerData=await response.filter(fdata=>fdata.title===packageTitle);
            //console.log('--------plan dat res==========',filtrerData);
            setPlanDataPrice(filtrerData&&filtrerData[0]&&filtrerData[0].price);
            setPlanDataId(filtrerData&&filtrerData[0]&&filtrerData[0].id);
          }
          setIsLoading(false);
        } catch (error) {
          console.log('error', error);
        }
      };


      const onCarAddPress = () => {
        //dispatch(setAddressRouteData(route.params));
        navigation({path: navigator.selectCompany,params:{steam_car_wash:"steam_car_wash"}});
      };
    
    
    const _renderItem = ({item, index}) => {

    //console.log('-----------------item postion with current idex',currentIndex,item.position);
        return (
          <TouchableOpacity onPress={()=>{
            setPackageTitle(item.title);
            if(currentIndex==0 && item.position==0){
            setQuickWashIsActive(true);
            }
            else{
              setQuickWashIsActive(false);
            }
            if(currentIndex==1 && item.position==1){
              setSuperWashIsActive(true);
              
            }
            else{
              setSuperWashIsActive(false);
            }
            if(currentIndex==2 && item.position==2){
              setDazzleWashIsActive(true);
            }
            else{
              setDazzleWashIsActive(false);
            }
          }}
    
            style={{flex: 1, marginTop: 5, elevation:100}}>
        <LinearGradient
          colors={item.title=="Quick Wash"?[colors.green, colors.blue_Dark, colors.yellow]:item.title=="Super Wash"?[colors.purple, colors.blue_Dark, colors.red_pink]:[colors.red_pink, colors.blue_Dark, colors.green]}
          start={{x: 0.3, y: 0.3}}
          end={{x: 0.85, y: 0.95}}
          
          style={{height:170,borderRadius:20}}>
    <View style={{alignItems:'center',flexDirection:'row',justifyContent:"center"}}>
        <View style={{flex:10,alignItems:'center'}}>
        <GText
              fontFamily={ffamily.bold}
              color={colors.white}
              fontSize={fsize.h6}
              style={{marginTop: 6}}
              textAlign={fAlign.center}
              >
              {item.title}
             
            </GText>
            </View>
           <View style={{flex:1}}>
            {item.position===currentIndex&&<GIcon
                name="circle"
                size={15}
                color={isQuickWashActive && currentIndex==0?colors.blue:isSuperWashActive && currentIndex==1?colors.blue:isDazzleWashActive && currentIndex==2?colors.blue:colors.white}
                style={{marginRight:5,marginTop:9}} 
              />}
    </View>
    </View>
    <View style={{flexDirection:'row',padding:15}}>
    <View style={{flex:2}}>
        {item&&item.features.map(feature=>{
            return(
                <View style={{flexDirection:'row'}}>
                    <GIcon
                name="circle"
                size={8}
                color={colors.white}
                style={{marginRight:5,marginTop:9}}
              />
                   <GText
              fontFamily={ffamily.bold}
              color={colors.white}
              fontSize={fsize.p2}
              style={{marginBottom:5,marginTop:5}}
              textAlign={fAlign.start} 
              >
              {feature.title}
            </GText>  
                </View>
            )
      }
            )}
    </View>
    <View style={{flex:1}}>
    {item&&item.pricing.map(price=>{
            return(
                <View style={{flexDirection:'row'}}>
                       <GIcon
                name="circle"
                size={8}
                color={colors.white}
                style={{marginRight:5,marginTop:9}}
              />
                   <GText
              fontFamily={ffamily.bold}
              color={colors.white}
              fontSize={fsize.p2}
              style={{marginBottom:5,marginTop:5}}
              textAlign={fAlign.start} 
              >
              {price.title}
            </GText>  
                </View>
            )
      }
            )}
    
    </View>
    </View>
    
    
          </LinearGradient>
            
            
          </TouchableOpacity>
        );
      };

    
    return(
        <ScrollView contentContainerStyle={style.scrollView}>

        <Carousel
        data={corusedData}
        layout={"default"}
        renderItem={_renderItem}
        sliderWidth={windowWidth}
        sliderHeight={carouselHeight} 
        itemWidth={windowWidth-80}
        itemHeight={carouselHeight}
        inactiveSlideScale={.9}
        inactiveSlideOpacity={.5}
        activeSlideAlignment="center"
        loop={false}
        lockScrollWhileSnapping={true}
        onBeforeSnapToItem={(index) => {
          setCurrentIndex(index);
        }}
        
      />
        {/* selcted package */}
        <View style={{paddingHorizontal:15,marginVertical:5}}>
        <GText
          fontFamily={ffamily.bold}
          color={colors.blue}
          fontSize={fsize.h6}
          style={{marginBottom:5,marginTop:5}}
          textAlign={fAlign.start} 
          >
          Selected Package
        </GText> 
        <GText
          fontFamily={ffamily.semiBold}
          color={packageTitle?colors.black:colors.gray_Light}
          fontSize={fsize.h6}
          textAlign={fAlign.start} 
          >
          {packageTitle?packageTitle:'Select Package'}
        </GText>
        </View>

        {/* Location */}
        <View style={{paddingHorizontal:15,marginVertical:5}}>
       
            <TouchableOpacity 
            onPress={()=>{
              navigation({
                path: navigator.addressDetail,
                params: {steam_car_wash:'steam_car_wash'},
              })
            }}
            style={{position:'absolute',right:10,top:-5,width:50,height:50,zIndex:1}}
            >
              
        <GIcon
                name="my-location"
                size={35}
                color={colors.blue}
              />
              
              </TouchableOpacity>
              
        <GText
          fontFamily={ffamily.bold}
          color={colors.blue}
          fontSize={fsize.h6}
          style={{marginBottom:5,marginTop:5}}
          textAlign={fAlign.start} 
          >
          Your Location
        </GText> 
        <GText
        
          fontFamily={ffamily.semiBold}
          color={route.params.address?colors.black:colors.gray_Light}
          fontSize={fsize.h6}
          textAlign={fAlign.start} 
          >
          {route.params.address?route.params.address:'Select Location'}
        </GText>
        </View>


         {/* select date */}
         <View style={{paddingHorizontal:15,marginVertical:5}}>
        <GText
          fontFamily={ffamily.bold}
          color={colors.blue}
          fontSize={fsize.h6}
          style={{marginBottom:5,marginTop:5}}
          textAlign={fAlign.start} 
          >
          Select Date
        </GText> 
        <TouchableOpacity 
        onPress={showDatepicker}
        style={style.dateContainer}>
        <View style={{flex:1}}><Text>{date}</Text></View>
        <View style={{flex:1,alignItems:'flex-end'}}>
        <GIcon
                name="date-range"
                size={20}
                color={colors.blue}
        
              />
        </View>
      </TouchableOpacity> 
        <DateTimePickerModal
          mode="date"
          isVisible={show}
          onConfirm={onChange}
          onCancel={hideDatePicker}
        />
        </View>


        {/* Prefferd timeSlot */}
        <View style={{paddingHorizontal:15,marginVertical:5}}>
        <GText
          fontFamily={ffamily.bold}
          color={colors.blue}
          fontSize={fsize.h6}
          style={{marginBottom:5,marginTop:5}}
          textAlign={fAlign.start} 
          >
          Preferred Time Slot
        </GText> 
        <View
        
                style={{
                  borderWidth: 1,
                  borderColor: colors.gray_Light,
                  borderRadius: 5,
                  height: 45,
                }}>
                 <RNPickerSelect
                 useNativeAndroidPickerStyle={false}
          onValueChange={(value) => value && setSelectedTimeSlot(value)}
          items={timeSlotData.map((timeslot,index) => {
            return {
              label: `${timeslot.title}`,
              value: timeslot.title,
              key: index,
            };
          })}
          fixAndroidTouchableBug={true}
          placeholder={{label: 'select time slots', color: colors.black}}
          value={selectedTimeSlot}
          style={{
            inputAndroid: {
              color: colors.black,
              marginLeft:10,
              height:45
            },
          }}
        />
                </View>
        </View>


        <View style={{paddingHorizontal:15,marginVertical:5}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View>
        <GText
          fontFamily={ffamily.bold}
          color={colors.blue}
          fontSize={fsize.h6}
          style={{marginBottom:5,marginTop:5}}
          textAlign={fAlign.start} 
          >
          Select Car
        </GText>
          </View>
        <View>
            <TouchableOpacity onPress={onCarAddPress}>
              <GIcon
                name="add-box"
                size={fsize.h5}
                style={{
                  backgroundColor: colors.blue_Light,
                  borderRadius: radius.max,
                  padding: 4,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {userCarLoading ? (
          <Loader />
        ) : (  <View
            style={{
              borderWidth: 1,
              borderColor: colors.gray_Light,
              borderRadius: radius.default,
            }}>
            <RNPickerSelect
            useNativeAndroidPickerStyle={false}
              onValueChange={(value) =>{
                setSelectedCar(value&&value.id);
                setCarType(value&&value.car_type);
                getPlanData(value&&value.car_type)
              }}
              fixAndroidTouchableBug={true}
              items={useCars.map((usercar) => {
                
                const car_type=usercar&&usercar.car_type_id.name;
                const {
                  car_number,
                  car_model_id: {name},
                  id
                } = usercar;
                return {label: `${car_number} - ${name}`, value:{id,car_type}, key: id};
              })}
              placeholder={{label: 'Select Car', color: colors.black}}
              value={selectedCar&&selectedCar.id}
              style={{
                inputAndroid: {
                  color: colors.black,
                  marginLeft:10,
                  height:45
                },
              }}
            /> 
          </View>)
            }

        </View>


        {isLoading&&selectedCar?
        <ActivityIndicator size="small" color={colors.blue}/>:
        selectedCar&&packageTitle?
        <View style={{paddingHorizontal:15}}>
        <GText
          fontFamily={ffamily.bold}
          color={colors.blue}
          fontSize={fsize.h6}
          style={{marginTop:5}}
          textAlign={fAlign.start} 
          >
          Total Service Cost
        </GText>

            <View style={{flexDirection:'row',marginBottom:5}}>
            <View style={{flex:1}}>
            <GText
          fontFamily={ffamily.semiBold}
          color={colors.black}
          fontSize={fsize.h6}
          style={{marginTop:5}}
          textAlign={fAlign.start} 
          >
           Service Total
        </GText>
            </View>
            <View style={{flex:1}}>
            <GText
          fontFamily={ffamily.semiBold}
          color={colors.black}
          fontSize={fsize.h6}
          style={{marginTop:5}}
          textAlign={fAlign.right} 
          >
          {planDataPrice&&planDataPrice.toFixed(2)}
        </GText>
            </View>
            </View>

            <View style={{flexDirection:'row',marginBottom:5}}>
            <View style={{flex:1}}>
            <GText
          fontFamily={ffamily.semiBold}
          color={colors.black}
          fontSize={fsize.h6}
          style={{marginTop:5}}
          textAlign={fAlign.start} 
          >
           GST
        </GText>
            </View>
            <View style={{flex:1}}>
            <GText
          fontFamily={ffamily.semiBold}
          color={colors.black}
          fontSize={fsize.h6}
          style={{marginTop:5}}
          textAlign={fAlign.right} 
          >
          {((planDataPrice*18)/100).toFixed(2)}
        </GText>
            </View>
            </View>
            <View style={{flexDirection:'row',marginBottom:5}}>
            <View style={{flex:1}}>
            <GText
          fontFamily={ffamily.semiBold}
          color={colors.black}
          fontSize={fsize.h6}
          style={{marginTop:5}}
          textAlign={fAlign.start} 
          >
           Order Total
        </GText>
            </View>
            <View style={{flex:1}}>
            <GText
          fontFamily={ffamily.semiBold}
          color={colors.black}
          fontSize={fsize.h6}
          style={{marginTop:5}}
          textAlign={fAlign.right} 
          >
          {(planDataPrice+((planDataPrice*18)/100)).toFixed(2)}
        </GText>
            </View>
            </View>

            <View style={{flexDirection:'row',borderTopColor:colors.black,borderTopWidth:1}}>
            <View style={{flex:1}}>
            <GText
          fontFamily={ffamily.semiBold}
          color={colors.black}
          fontSize={fsize.h6}
          style={{marginTop:5}}
          textAlign={fAlign.start} 
          >
           Total
        </GText>
            </View>
            <View style={{flex:1}}>
            <GText
          fontFamily={ffamily.semiBold}
          color={colors.blue}
          fontSize={fsize.h6}
          style={{marginTop:5}}
          textAlign={fAlign.right}  
          >
           {(planDataPrice+((planDataPrice*18)/100)).toFixed(2)}
        </GText>
            </View>
            </View>


        <View>
            
        </View>

        </View>:null}

        {submitLoading?<ActivityIndicator  size="large" color={colors.orange} />
        :<GButton marginHorizontal={20} marginVertical={20} onPress={onSubmit}>
        Book Now 
      </GButton>}

        </ScrollView>
    )
}
const style=StyleSheet.create({
    scrollView: {
        flexGrow:1,
        backgroundColor: colors.white,
      },
      dateContainer:{
          borderColor:colors.gray_Light,
          borderRadius:5,
          paddingHorizontal:15,
          paddingVertical:8,
          borderWidth:1,
          flexDirection:'row'
      }
});


const corusedData = [
    {
      image: {
        uri:
          'http://3.239.78.166:1337/uploads/Go_Motar_Car_Service_Slider_One_583cdcaea1.jpg',
      },
      title:"Quick Wash",
      position :0,
      features:[
          {
            title:"Exterior Steam Car wash"
          },
          {
            title:"Wheel Dressing"
          }
      ],
      pricing:[
          {
        title:"Hatch Back -300"
          },
          {
        title:"Sedan -350"
        },
        {
        title:"SUV -400"
        }
      ]
    },
    {
      image: {
        uri:
          'http://3.239.78.166:1337/uploads/Go_Motar_Slider_Two_926c19ad39.jpg',
      },
      title:"Super Wash",
      position :1,
      features:[
          {
            title:"Vaccuming"
          },
          {
            title:"Interior Cleaning"
          },
          {
            title:"Interior Steam Wash"
          },
          {
            title:"Dash Board Polishing"
          },
          {
            title:"Deodorizing"
          }
      ],
      pricing:[
          {
        title:"Hatch Back -650"
          },
          {
        title:"Sedan -750"
        },
        {
        title:"SUV -850"
        }
      ]
    },
    {
      image: {
        uri:
          'http://3.239.78.166:1337/uploads/Go_Motar_Steam_Wash_Slider_Three_6f077bdb0a.jpg',
      },
      title:"Dazzle Wash",
      position :2,
      features:[
          {
            title:"Shampoo Shine Wash"
          },
          {
            title:"Engine Chamber Dressing"
          }
      ],
      pricing:[
          {
        title:"Hatch Back -750"
          },
          {
        title:"Sedan -850"
        },
        {
        title:"SUV -950"
        }
      ]
    },
  ];

  const timeSlotData=[
      {
          title:"6 AM - 10 AM"
      },
      {
        title:"10 AM - 2 PM"
     },
     {
        title:"2 PM - 6 PM"
     },
     {
        title:"6 PM - 10 PM"
     }
  ]

export default steamCarWash;