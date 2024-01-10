import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import {Ionicons, MaterialCommunityIcons,} from '@expo/vector-icons'
import RestaurantPage from '../../navigation/RestaurantPage'
import NetworkImage from '../../components/NetworkImage'
import { SIZES, COLORS } from '../../constants/theme'
import { useRoute } from '@react-navigation/native'
import {RatingInput} from 'react-native-stock-star-rating'
import GoogleApiServices from '../../hook/GoogleApiServices'
import {UserLocationContext} from '../../context/UserLocationContext'

const Restaurant = ({navigation}) => {
    const route = useRoute();
    const item = route.params;
    
    const [distanceTime, setDistanceTime] = useState({})
    const{location, setLocation} = useContext(UserLocationContext);
    console.log(item.coords.latitude, item.coords.longitude);
    console.log(location.coords.latitude, location.coords.longitude)
   
    useEffect(()=>{
        GoogleApiServices.calculateDistanceAndTime(
          item.coords.latitude,
          item.coords.longitude,
          location.coords.latitude,
          location.coords.longitude,
        ).then(result=>{
          if(result){
           
            setDistanceTime(result)
          }else{
            console.log('request failed')
            setDistanceTime({
              distance: '0.9 km',
              duration: '4 mins',
              finalPrice: '$6.99'
            })
          }
        })
    }, [])

    const totalTime =GoogleApiServices.extractNumbers(distanceTime.duration)[0] + GoogleApiServices.extractNumbers(item.time)[0]
   
  return (
    <View>
        <View>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backbtn}>
            <Ionicons name='chevron-back-circle' size={30} color={COLORS.tertiary}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}} style={styles.sharebtn}>
            <MaterialCommunityIcons name='share-circle' size={30} color={COLORS.tertiary}/>
        </TouchableOpacity>

        <NetworkImage 
        source={item.imageUrl}
         height={SIZES.height/3.4} 
         width={SIZES.width} 
         radius={15}/>

            <View style={styles.rating}>
                <View style={styles.innerRating}>
                    <RatingInput
                        rating={Number(item.rating)}
                        size={20}
                    />
                    <TouchableOpacity style={styles.ratingBtn} onPress={() => { navigation.navigate("rating") }}>
                        <Text style={styles.btnText}>Rate this store</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

       
         <View style={{marginTop: Platform.OS =='android'? -35: 8, marginBottom: 10, marginHorizontal: 10}}>
            <Text style={styles.title}>{item.title}</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.small, {color: COLORS.gray}]}>Distance</Text>
                <Text style={[styles.small, {fontFamily: 'regular'}]}>{distanceTime.distance}</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.small, {color: COLORS.gray}]}>Prep and Delivery Time</Text>
                <Text style={[styles.small, {fontFamily: 'regular'}]}>{totalTime} min</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.small, {color: COLORS.gray}]}>Cost</Text>
                <Text style={[styles.small, {fontFamily: 'regular'}]}>{distanceTime.finalPrice}</Text>
            </View>
         </View>
      <View style={{height: SIZES.height/1.5}}>
        <RestaurantPage/>
      </View>
    </View>
  )
}

export default Restaurant

const styles = StyleSheet.create({
    backbtn:{
        marginLeft: 12,
        alignItems: 'center',
        zIndex: 999,
        position: 'absolute',
        top: SIZES.xxLarge,
    
      },
      sharebtn:{
        marginRight: 12,
        alignItems: 'center',
        zIndex: 999,
        position: 'absolute',
        right: 0,
        top: SIZES.xxLarge+3,
      },
      title:{
        fontSize: 22,
        color: COLORS.black,
        fontFamily:'medium'
      },
      small:{
        fontSize: 13,
        color: COLORS.black,
        fontFamily:'medium'
      },
      btnText:{
        fontSize: 16,
        color: COLORS.lightWhite,
        fontFamily:'medium'
      },
      rating:{
        height: 50,
        justifyContent: 'center',
        width: '100%',
        positiion: 'absolute',
        backgroundColor: '#00fff53c',
        zIndex: 999,
        bottom: Platform.OS=='ios'? 0 : 50,
        borderRadius: 15,

      },
      innerRating:{
        flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginHorizontal: 12
    },
    ratingBtn:{
        borderColor: COLORS.lightWhite,
        borderWidth: 1,
        borderRadius: 9,
        padding: 6
    }
})