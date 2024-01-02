import { StyleSheet, Text, View } from 'react-native'
import  {SIZES, COLORS} from '../constants/theme'
import React, { useContext, useEffect } from 'react'
import * as  Location from 'expo-location'
import AssetImage from './AssetImage'
import { UserReversedGeoCode } from '../context/UserReversedGeoCode'
import { UserLocationContext } from '../context/UserLocationContext'
import { useState } from 'react'

const HomeHeader = () => {
    const{address, setAddress}   = useContext(UserReversedGeoCode)
    const [time, setTime] = useState(null)
    const {location,setLocation}  = useContext(UserLocationContext);

    useEffect(()=>{
   if(location !== null){
   
     reverseGeoCode(location.coords.latitude,location.coords.longitude);
   }
    }, [location])
const reverseGeoCode = async (latitude,longitude)=>{
const reversedGeoCodeAddress = await Location.reverseGeocodeAsync({
    longitude: longitude,
    latitude: latitude,
})

 setAddress(reversedGeoCodeAddress[0]);
 const greeting = getTimeOfDay();
 setTime(greeting)
 
}

const getTimeOfDay = ()=>{
const now  =new Date();
const hour = now.getHours();
if(hour>=0 && hour<=12){
  return '🌞 '
}
else if(hour >=12 < 17){
return '🌄 '
}else{
return '🌙 '
}
}
  return (
    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
      <View style={styles.outerStyle}>
           <AssetImage 
           data={require('../../assets/images/profile.jpg')}
           width={50}
           radius={99}
           mode={'cover'}
           height={50}
           />   
           <View style={styles.headerStyle}>
            <Text style={styles.heading}>Delivering to</Text>
            <Text style={styles.location}>{`${address?.city} ${address?.name}`}</Text>
           </View>
      </View>
      <Text style={{fontSize: 36}}>{time}</Text>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    outerStyle:{
        marginBottom: 10,
        marginHorizontal:  20,
        flexDirection:  'row',

    },
    headerStyle:{
        justifyContent:'center',
        marginLeft:15,
    },
    heading:{
        fontFamily: 'medium',
        fontSize: SIZES.medium,
        color: COLORS.secondary
    },
    location:{
        fontFamily: 'regular',
        fontSize: SIZES.small+2,
        color: COLORS.gray
    }
})