import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import FoodsComponent from './FoodsComponent'
import uidata from '../constants/uidata'

const FastestNearYou = () => {
    const renderItem = ({item})=>(
        <FoodsComponent item={item} onPress={()=>{}}/>
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

export default FastestNearYou

const styles = StyleSheet.create({})