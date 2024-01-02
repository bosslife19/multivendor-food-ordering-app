import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import uidata from '../constants/uidata'
import { useState } from 'react'
import { COLORS } from '../constants/theme'

const ChoicesList = ({setSelectedChoice, setSelectedSection}) => {
  const [selected, setSelected] = useState(null);

  const handlePress = (item)=>{
    
    if(selected === item.value){
      setSelected(null);
      setSelectedChoice(null);
      setSelectedSection(null);
    }else{
      setSelected(item.value);
      setSelectedChoice(item.value);
      setSelectedSection('restaurant');
    }
  }
  return (
    <View>
      <Text style={{
        marginLeft: 16,
        marginVertical: 12,
        fontSize:18,
        fontWeight: 'bold',
      }}>Pick Restaurants</Text>
      

      <FlatList 
      data={uidata.choicesList}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item=>item.id.toString()}
      horizontal
      scrollEnabled
      style={{marginTop: 10}}
      renderItem={({item})=>(
        <TouchableOpacity
          style={{
            backgroundColor: selected === item.value? COLORS.secondary : COLORS.lightWhite,
            height: 40,
            borderRadius: 12,
            marginHorizontal: 8,
            justifyContent: 'center'
          }}
          
          onPress={()=>handlePress(item)}
        >
          {console.log(item.value)}
          <Text style={{
            marginHorizontal: 10,
            fontFamily: 'regular',
            fontSize: 18,
            fontWeight: 'bold',
            color: item?.value === selected?.value? COLORS.lightWhite : COLORS.gray
          }}>{item.name}</Text>
         
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

export default ChoicesList

const styles = StyleSheet.create({})