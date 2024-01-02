import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
// import {CartCountContext} from '../context/CartCountContext'
import {Ionicons, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Counter from '../components/Counter';
import { SafeAreaFrameContext } from 'react-native-safe-area-context';

const FoodPage = ({route, navigation}) => {
    const item = route.params.item;
    const [isChecked, setIsChecked] = useState(false);
    const [additives, setAdditives] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [restaurant, setRestaurant] = useState(1);
    const [count, setCount] = useState(1);
    const [preference, setPreference] = useState('');

    const handleAdditives = (newAdditive) => { 
      setAdditives(prev=>{
        const exists = prev.some(item=> item.id !==newAdditive.id);

        if(exists){
          return prev.filter(item=> item.id !== newAdditive.id);
        }
        else{
          return [...prev, newAdditive]
        }
      });
      
    }
    // const [cartCount, setCartCount] = useContext(CartCountContext);

    const handlePress = (item) => { 
      const cartItem = {
        productId: item._id,
        additives: additives,
        quantity: count,
        totalPrice: (item.price + totalPrice) * count
      }
      addToCart(cartItem)
     }

     const addToCart = async (cartItem) => { }

    useEffect(()=>{
      calculatePrice();
    }, [additives])


    const calculatePrice =()=>{
    const total =   additives.reduce((sum, additive)=>{
        return sum + parseFloat(additive.price);
      }, 0);
      setTotalPrice(total);
    }
  return (
    <View style={{backgroundColor: COLORS.lightWhite, height: SIZES.height}}>
      <View>
        <Image source={{uri: item.imageUrl[0]}}
          style={{
            width: SIZES.width, 
            height: SIZES.height/4, 
            borderBottomRightRadius: 30}}
        />
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backbtn}>
            <Ionicons name='chevron-back-circle' size={30} color={COLORS.tertiary}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}} style={styles.sharebtn}>
            <MaterialCommunityIcons name='share-circle' size={30} color={COLORS.tertiary}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}} style={{position:'absolute', bottom:20, right: 0}}>
           <View style={{borderColor: COLORS.tertiary, borderWidth: 1, borderRadius: 10, padding: 10, marginRight: 10, backgroundColor: COLORS.tertiary}}>
              <Text style={styles.restText}>Open the Store</Text>
           </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.title, {color: COLORS.tertiary}]}>${(item.price + totalPrice) * count}</Text>
        </View>

        <Text style={styles.small}>
          {item.description}
        </Text>

        <FlatList
          data={item.foodTags}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10}}
          horizontal
          scrollEnabled
          keyExtractor={item=>item}
          renderItem={({item})=>(
            <View style={styles.tags}>

              <Text style={{
                paddingHorizontal: 4,
                color: COLORS.lightWhite,

              }}>{item}</Text>
            </View>
          )}
        />

        <Text style={[styles.title, {marginBottom: 10, marginTop: 20,}]}>Additives and Toppings</Text>
        <FlatList
          data={item.additives}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10}}
          
          scrollEnabled
          keyExtractor={item=>item.id}
          renderItem={({item})=>(
            <View style={{flexDirection:'row', justifyContent: 'space-between', marginBottom:10}}>
              <BouncyCheckbox
                size={20}
                unfillColor='#FFFFFF'
                fillColor={COLORS.tertiary}
                innerIconStyle={{borderWidth: 1}}
                textStyle={styles.small}
                text={item.title}
                onPress={()=>handleAdditives(item)}
              />
              <Text style={[styles.small, ]}>${item.price}</Text>
            </View>
          )}
        />

<Text style={[styles.title, {marginBottom: 10, marginTop: 20,}]}>Preferences</Text>

            <View style={styles.input}>
              <TextInput
                placeholder='Add specific instructions'
                value={preference}
                onChangeText={value=>setPreference(value)}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={{flex: 1}}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                <Text style={[styles.title, {marginBottom: 10, }]}>Quantity</Text>
                <Counter count={count} setCount={setCount}/>
            </View>
      </View>

      <View style={{flex:1, justifyContent: 'flex-end'}}>

      <View style={styles.suspended}>
      <View style={styles.cart}>
      <View style={styles.cartRow}>
        <TouchableOpacity onPress={() => { }} style={styles.cartbtn}>
            <AntDesign name='pluscircleo' size={24} color={COLORS.lightWhite}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("order-page")} 
        style={{backgroundColor: COLORS.primary, paddingHorizontal: 80, borderRadius: 30}}>
            <Text style={[styles.title, {color: COLORS.lightWhite, marginTop: 3, alignItems: 'center'}]}>Order</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.cartbtn}>
        <Text style={[styles.title, {color: COLORS.lightWhite, marginTop: 3, alignItems: 'center'}]}>{0}</Text>
        </TouchableOpacity>

        </View>
        </View>
        </View>
      </View>
    </View>
  )
}

export default FoodPage

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
  restText:{
    color: COLORS.lightWhite,
    fontWeight: 'bold'

  },
  container:{
    marginHorizontal: 12,
    marginTop:10,
  },
  title:{
    fontSize: 22,
    color: COLORS.black,
    fontFamily:'medium'
  },
  small:{
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'justify',
    marginTop:5,
  },
  tags:{
    right: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 4,
  },
  input:{
    borderColor: COLORS.primary1,
    borderWidth: 1,
    backgroundColor: COLORS.offwhite,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row'
  },
  suspended:{
    
    position: 'absolute',
    zIndex:999,
    bottom: 0,
    width: '100%',
    alignItems: 'center'
  },
  cart:{
    width: SIZES.width-24,
    height: 60,
    marginHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.primary1,
    borderRadius: 30,
    
  },
  cartRow:{flexDirection: 'row', 
  justifyContent: 'space-between', 
  marginHorizontal: 12
},
cartbtn:{
  width:40,
  height: 40,
  borderRadius: 99,
  justifyContent: 'center',
  backgroundColor: COLORS.tertiary,
  alignItems: 'center'
}

})