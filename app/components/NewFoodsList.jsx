import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import uidata from '../constants/uidata'
import FoodsComponent from './FoodsComponent'



const NewFoodsList = () => {
  const navigation = useNavigation();
const renderItem = ({item})=>(
    <FoodsComponent item={item} onPress={()=>{navigation.navigate('food-nav', item)}}/>
)
  return (
    
       <View style={{marginLeft: 12, marginBottom: 10}}>
        <FlatList
        data={uidata.foods}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginTop: 5, rowGap: 10,}}
        scrollEnabled
        renderItem={renderItem}
     />
       </View>
    
  )
}

export default NewFoodsList

const styles = StyleSheet.create({})