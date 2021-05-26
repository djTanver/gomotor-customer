import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Picker,
  Text,
} from 'react-native';
import GImageNameBox from '../../../../components/GImageNameBox';
import GText from '../../../../components/GText';
import GIcon from '../../../../components/GIcon';
import GButton from '../../../../components/GButton';
import GModal from '../../../../components/GModal';
import {
  fsize,
  fWeight,
  color,
  fAlign,
  ffamily,
  radius,
} from '../../../../theme';
import navigator from '../../../../navigation/navigator';
import navigation from '../../../../utils/navigation';

export default ({onContinue}) => {
  const [switchValue, setSwitchValue] = useState(false);
  // const [toggle, setToggle] = useState(false);
  const [ModalShow, setModalShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState('java');

  const toggleSwitch = (value) => {
    //To handle switch toggle
    setSwitchValue(value);
    //State changes according to switch
  };

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <GModal visible={false} wrapperStyle={{justifyContent: 'center'}}>
        <View style={{paddingBottom: 20, marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <GText fontSize={fsize.h6} fontFamily={ffamily.semiBold}>
              Select Address
            </GText>
            <TouchableOpacity>
              <GIcon
                name="add-box"
                size={fsize.h1}
                style={{
                  backgroundColor: color.blue,
                  borderRadius: radius.max,
                  padding: 4,
                }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginHorizontal: 10,
            }}>
            <GIcon
              name="circle"
              size={fsize.h1}
              color={color.blue}
              style={{marginRight: 12}}
            />
            <GText
              color={color.gray}
              fontSize={fsize.p1}
              style={{
                flex: 1,
                paddingBottom: 12,
                marginRight: 12,
                borderBottomColor: color.gray_Light,
                borderBottomWidth: 1.6,
              }}>
              #77, 2nd cross, 1st block jakkasandra extension, kormangala,
              bangalore - 560091
            </GText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginHorizontal: 10,
            }}>
            <GIcon
              name="circle"
              size={fsize.h1}
              color={color.gray_Light}
              style={{marginRight: 12}}
            />
            <GText
              color={color.gray}
              fontSize={fsize.p1}
              style={{
                flex: 1,
                paddingBottom: 12,
                marginRight: 12,
                borderBottomColor: color.gray_Light,
                borderBottomWidth: 1.6,
              }}>
              #78, 3rd cross, 1st block jakkasandra extension, kormangala,
              bangalore - 560091
            </GText>
          </TouchableOpacity>
        </View>

        <GButton marginHorizontal={20} marginVertical={10} onPress={onContinue}>
          Select
        </GButton>
      </GModal>

      <GModal visible={false} wrapperStyle={{justifyContent: 'center'}}>
        <View style={{paddingVertical: 30, marginHorizontal: 20}}>
          <GText
            fontSize={fsize.h6}
            fontFamily={ffamily.semiBold}
            textAlign={fAlign.center}>
            Thanks for registering{'\n'} Our Admin get back to you soon
          </GText>

          <GButton
            marginHorizontal={20}
            marginVertical={10}
            gradientColors={[color.white, color.white]}
            buttonStyle={{
              borderColor: color.gray_Light,
              borderWidth: 1.6,
              marginTop: 40,
            }}
            color={color.black}>
            Ok
          </GButton>
        </View>
      </GModal>

      <View
        style={{
          marginHorizontal: 34,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}>
        <View>
          <GText color={color.blue} fontSize={fsize.h6} style={{marginTop: 12}}>
            Are you staying in Apartment ?
          </GText>
        </View>
        <View>
          <Switch
            style={{marginTop: 8}}
            onValueChange={toggleSwitch}
            value={switchValue}
          />
          {/* <Switch
           style={{marginTop: 8}}
        trackColor={{false: 'gray', true: 'teal'}}
        thumbColor="white"
        ios_backgroundColor="gray"
        onValueChange={(value) => setToggle(value)}
        value={toggle}
      /> */}
        </View>
      </View>

      {/* <View style={{flex: 1, marginHorizontal: 34, paddingTop: 10}}>
          <GText
                    color={color.blue}
                    fontSize={fsize.h6}
                    style={{marginTop:12}}
                    >
                    Select one of the below
                </GText>

                <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:12}}>
                    <GImageNameBox
                        image={require('../../../../assets/home.jpg')}
                        name={"Home"}
                        isSelected={true}
                        onPress={()=>{"aaaaaaa"}}
                    />
                    <GImageNameBox
                        image={require('../../../../assets/apartment.png')}
                        name={"Apartment"}
                        isSelected={false}
                        containerStyle={{borderWidth:1,borderColor:color.gray_Light}}
                        onPress={()=>{"aaaaaaa"}}
                    />
                </View>   */}

      {/* <ApartmentAddress /> */}
      {/* </View> */}
      <View style={{flex: 1, marginHorizontal: 34, paddingTop: 10}}>
        <HomeAddress />
      </View>

      {/* <GButton
                marginHorizontal={20}
                marginVertical={10}
                paddingHorizontal={10}
                onPress={onContinue}
                >
                Register my apartment
            </GButton> */}

      <GButton marginHorizontal={20} marginVertical={10} onPress={onContinue}>
        Continue
      </GButton>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: color.white,
  },
});

const HomeAddress = () => {
  return (
    <View style={{}}>
      <View>
        <GText fontFamily={ffamily.semiBold} fontSize={fsize.p1}>
          Looking for car cleaner to service your car?
        </GText>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            paddingVertical: 20,
            backgroundColor: '#F7F7F7',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('cleanerListNonApartment')}>
            <GIcon
              name="addusergroup"
              type="AntDesign"
              size={fsize.h1}
              style={{
                backgroundColor: color.blue,
                borderRadius: radius.max,
                padding: 4,
                marginVertical: 20,
              }}
            />
          </TouchableOpacity>
          <GText fontFamily={ffamily.semiBold} fontSize={fsize.p1}>
            Click here to search for Cleaners
          </GText>
        </View>
      </View>

      <View
        style={{backgroundColor: 'yellow', color: 'white', marginVertical: 20}}>
        <GText> Apartment is exisits </GText>
      </View>

      <GText
        color={color.orange}
        fontSize={fsize.h6}
        fontFamily={ffamily.bold}
        style={{marginTop: 20}}>
        Select Apartment
      </GText>
      <Picker
        // selectedValue={selectedValue}
        style={{height: 50, width: '100%'}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item
          label="KAKA Aprtment, Bangalore"
          value="KAKA Aprtment, Bangalore"
        />
        <Picker.Item
          label="Rose Apartment, Bangalore"
          value="Rose Apartment, Bangalore"
        />
        <Picker.Item
          label="Thada Apartment, Bangalore"
          value="Thada Apartment, Bangalore"
        />
        <Picker.Item label="No Apartment" value="No Apartment" />
      </Picker>

      <GText color={color.blue} fontSize={fsize.h6} style={{marginTop: 20}}>
        Select the time slot
      </GText>
      <Picker
        // selectedValue={selectedValue}
        style={{height: 50, width: '100%'}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item
          label="Morning - (6 AM - 9 AM)"
          value="Morning - (6 AM - 9 AM)"
        />
        <Picker.Item
          label="Evening - (5 PM - 9 PM)"
          value="Evening - (5 PM - 9 PM)"
        />
      </Picker>

      {/* <GText
        color={color.gray}
        fontSize={fsize.p1}
        style={{
          marginTop: 12,
          borderColor: color.gray_Light,
          borderWidth: 1,
          padding: 6,
          borderRadius: radius.default,
        }}>
        Morning 6 AM - 9 AM
      </GText> */}

      <View
        style={{backgroundColor: 'yellow', color: 'white', marginVertical: 20}}>
        <GText> If No Apartment Add </GText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}>
        <GText color={color.blue} fontSize={fsize.h6}>
          Add your Apartment here
        </GText>
        <TouchableOpacity>
          <GIcon
            name="domain-plus"
            type="MaterialCommunityIcons"
            size={fsize.h1}
            style={{
              backgroundColor: color.blue,
              borderRadius: radius.max,
              padding: 4,
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
        }}>
        <GText color={color.blue} fontSize={fsize.h6}>
          Confirm the address
        </GText>
        <TouchableOpacity>
          <GIcon
            name="shuffle"
            size={fsize.h1}
            style={{
              backgroundColor: color.blue,
              borderRadius: radius.max,
              padding: 4,
            }}
          />
        </TouchableOpacity>
      </View>

      <GText
        color={color.gray}
        fontSize={fsize.p1}
        style={{
          marginTop: 20,
          paddingBottom: 15,
          borderBottomColor: color.gray_Light,
          borderBottomWidth: 1.6,
        }}>
        #77, 2nd cross, 1st block jakkasandra extension, kormangala, bangalore -
        560091
      </GText>
    </View>
  );
};

const ApartmentAddress = () => {
  return (
    <View>
      <GText
        color={color.orange}
        fontSize={fsize.h6}
        fontFamily={ffamily.bold}
        style={{marginTop: 12}}>
        Select Apartment
      </GText>
      <GText
        color={color.gray}
        fontSize={fsize.p1}
        style={{
          marginTop: 12,
          borderColor: color.gray_Light,
          borderWidth: 1,
          padding: 6,
          borderRadius: radius.default,
        }}>
        No Apartment Name
      </GText>

      <GText
        color={color.gray}
        fontSize={fsize.p1}
        textAlign={fAlign.center}
        style={{
          marginTop: 12,
          borderColor: color.blue,
          borderWidth: 1.6,
          padding: 6,
          borderRadius: radius.default,
        }}>
        Add New Apartment
      </GText>

      <GText
        fontSize={fsize.h6}
        fontFamily={ffamily.semiBold}
        style={{marginTop: 18}}>
        Apartment details
      </GText>

      <TextInput
        placeholder="Apartment Name and Address"
        style={{
          borderBottomColor: color.gray_Light,
          borderBottomWidth: 1.4,
          paddingBottom: 4,
          fontSize: fsize.p1,
          fontFamily: ffamily.semiBold,
        }}
      />

      <TextInput
        placeholder="Street / Area"
        style={{
          borderBottomColor: color.gray_Light,
          borderBottomWidth: 1.4,
          paddingBottom: 4,
          fontSize: fsize.p1,
          fontFamily: ffamily.semiBold,
        }}
      />

      <TextInput
        placeholder="Land mark"
        style={{
          borderBottomColor: color.gray_Light,
          borderBottomWidth: 1.4,
          paddingBottom: 4,
          fontSize: fsize.p1,
          fontFamily: ffamily.semiBold,
        }}
      />

      <TextInput
        placeholder="City"
        style={{
          borderBottomColor: color.gray_Light,
          borderBottomWidth: 1.4,
          paddingBottom: 4,
          fontSize: fsize.p1,
          fontFamily: ffamily.semiBold,
        }}
      />
    </View>
  );
};
