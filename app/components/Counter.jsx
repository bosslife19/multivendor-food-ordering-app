import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {AntDesign} from '@expo/vector-icons'
import { COLORS } from '../constants/theme'

const Counter = ({count, setCount}) => {
    const increment = () => { 
        setCount(count + 1);
     }

     const decrement = () => { 
        if(count > 1){
            setCount(count -1);
        }
     }
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
     <AntDesign name='minuscircleo' size={20} color={COLORS.tertiary} onPress={decrement}/>
     <Text style={{fontFamily: 'medium', marginTop: 1, fontSize: 20}}>  {count}  </Text>
     <AntDesign name='pluscircleo' size={20} color={COLORS.tertiary} onPress={increment}/>
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({})