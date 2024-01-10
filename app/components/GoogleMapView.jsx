import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserLocationContext } from '../context/UserLocationContext'
import { COLORS, SIZES } from '../constants/theme'
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps'
const GoogleMapView = ({placeList}) => {
    const [directions, setDirections] = useState([])
    const [coordinates, setCoordinates] = useState([])
    const {location, setLocation} = useContext(UserLocationContext);
    
    const [mapRegion, setMapRegion] = useState({
        latitude:location.coords.latitude ,
        longitude:location.coords.longitude,
        latitudeDelta:0.0522 ,
        longitudeDelta:0.0421,
    })
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
      provider={PROVIDER_GOOGLE} showsUserLocation={true} 
        region={mapRegion}
      />
    </View>
  )
}

export default GoogleMapView

const styles = StyleSheet.create({
    mapContainer:{
        marginVertical: 9,
        width: SIZES.width - 20,
        height: 300,
        borderRadius: 12,
        borderColor: COLORS.gray,
        borderWidth: 1,
    },
    map:{
        width: '100%',
        height: '100%',
        borderRadius: 12,
    }
})