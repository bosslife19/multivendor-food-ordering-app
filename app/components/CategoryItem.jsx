import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SHADOWS } from '../constants/theme'

const CategoryItem = ({category, selected}) => {
  return (
    <View style={{marginLeft: 12, padding: 5, alignItems: 'center', 
    width:80, height: 55, justifyContent: 'center', borderWidth: 0.5,
    borderRadius: 15, borderColor:category.value == selected? 
    COLORS.secondary: 'transparent',
    shadowColor: SHADOWS.small}}>
      <Image source={{uri: category.imageUrl}} style={{width:30, height: 30}}/>
      <Text style={{fontSize:13,fontFamily: 'Regular'}}>{category.title}</Text>
    </View>
  )
}

export default CategoryItem

