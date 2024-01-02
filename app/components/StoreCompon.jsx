import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/theme'
import {RatingInput} from 'react-native-stock-star-rating'
import NetworkImage from './NetworkImage'

const StoreCompon = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{marginHorizontal: 10}}>
        <NetworkImage source={item.imageUrl} width={SIZES.width - 80} height={SIZES.height/5.8} radius={16} mode={'cover'}/>
      <Text style={styles.heading}>{item.title}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.small}>Delivery unders</Text> 
         <Text style={styles.small}>{item.time}</Text> 
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <RatingInput 
        rating={item.rating} 
        size={14}
        maxStars={5}
        setRating={item.rating}
        bordered={false}
        color={COLORS.primary}
        />
        <Text style={styles.small}>{item.ratingCount}+ ratings</Text>
      </View>
    </TouchableOpacity>
  )
}

export default StoreCompon

const styles = StyleSheet.create({
    wrapper:{
        marginRight: 15,
        backgroundColor: COLORS.lightWhite,
        padding: 8,
        borderRadius: 16
    },
    heading:{
        fontSize: 14,
        color: COLORS.gray,

    },
    small:{
        fontSize: 12,
        color: COLORS.gray,
    }
})