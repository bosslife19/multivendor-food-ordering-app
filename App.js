import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import {UserLocationContext}from './app/context/UserLocationContext';
import {UserReversedGeoCode} from './app/context/UserReversedGeoCode'
import {RestaurantContext} from './app/context/RestaurantContext'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import * as Location from 'expo-location';
import BottomTab from './app/navigation/BottomTab';
import FoodNavigator from './app/navigation/FoodNavigator';
import RestaurantPage from './app/navigation/RestaurantPage';
import Restaurant from './app/screens/restaurant/Restaurant';
import AddRating from './app/screens/AddRating';
const Stack = createNativeStackNavigator();
export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] =  useState(null);
  const [restaurantObj, setRestaurantObj] = useState(null)
  const [error, setError] =  useState(null);
  const defaultAddresss = { "city": "Shanghai", "country": "China", "district": "Pudong", "isoCountryCode": "CN", "name": "33 East Nanjing Rd", "postalCode": "94108", "region": "SH", "street": "Stockton St", "streetNumber": "1", "subregion": "San Francisco County", "timezone": "America/Los_Angeles" }
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(()=>{
    
(async ()=>{

  setAddress(defaultAddresss);
  let {status} = await Location.requestForegroundPermissionsAsync();
  if(status!== 'granted'){
    setError('Permission to access location was denied')
    console.log(error);
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  setLocation(location);
  
  console.log(location);
  
})();
  }, [])

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    

  }
  return (
    <UserReversedGeoCode.Provider value={{location, address,setAddress}}>
      <UserLocationContext.Provider value={{location, address,setAddress}}>
      <RestaurantContext.Provider value={{restaurantObj, setRestaurantObj}}>

     
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='bottom-navigation'
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='food-nav'
          component={FoodNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='restaurant-page'
          component={RestaurantPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='restaurant'
          component={Restaurant}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='rating'
          component={AddRating}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </RestaurantContext.Provider>
      </UserLocationContext.Provider>
     
    </UserReversedGeoCode.Provider>
    
  );
}
