import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import { COLORS } from '../constants/theme'
const Heading = ({heading, onPress}) => {
  return (
    <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 7, justifyContent: 'space-between'}}>
      <Text style={styles.text}>{heading}</Text>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Ionicons name='grid' size={20} color={COLORS.secondary}/>
      </TouchableOpacity>
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({
    text:{marginLeft: 16, fontSize: 18, fontWeight: 'bold'},
    button:{
        right: Platform.OS === 'android'? 10 : 0,
        top: Platform.OS === 'android' && 5
    }
})