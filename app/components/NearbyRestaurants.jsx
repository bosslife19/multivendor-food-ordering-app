import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import uidata from '../constants/uidata'
import StoreCompon from './StoreCompon'
import { useNavigation } from '@react-navigation/native'
import { RestaurantContext } from '../context/RestaurantContext'
const NearbyRestaurants = () => {
  const navigation = useNavigation()
  const {restaurantObj, setRestaurantObj} = useContext(RestaurantContext)
  return (
    <View style={{marginLeft: 20, marginTop: 10}}>
     <FlatList
        data={uidata.restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 5, rowGap: 10,}}
        scrollEnabled
        renderItem={({item})=>(
            <StoreCompon item={item} onPress={()=>{
              setRestaurantObj(item);
              navigation.navigate('restaurant', item);
              
            }}/>
        )}
     />
    </View>
  )
}

export default NearbyRestaurants

const styles = StyleSheet.create({})