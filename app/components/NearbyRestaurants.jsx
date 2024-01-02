import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import uidata from '../constants/uidata'
import StoreCompon from './StoreCompon'
const NearbyRestaurants = () => {
  return (
    <View style={{marginLeft: 20, marginTop: 10}}>
     <FlatList
        data={uidata.restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 5, rowGap: 10,}}
        scrollEnabled
        renderItem={({item})=>(
            <StoreCompon item={item} onPress={()=>{}}/>
        )}
     />
    </View>
  )
}

export default NearbyRestaurants

const styles = StyleSheet.create({})