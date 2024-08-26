import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import hamburgerIcon from '../assets/images/resto.png';
import { COLORS } from '../constants/theme';

const DOUALA_REGION = {
  latitude: 4.0511,
  longitude: 9.7679,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const POINTS_OF_INTEREST = [
  {
    id: 1,
    title: 'Marché Central',
    coordinate: { latitude: 4.0469, longitude: 9.7064 },
    icon: require('../assets/images/resto.png'),
  },
  {
    id: 2,
    title: 'Port de Douala',
    coordinate: { latitude: 4.0015, longitude: 9.6868 },
    icon: require('../assets/images/resto.png'),
  },
  {
    id: 3,
    title: 'Aéroport de Douala',
    coordinate: { latitude: 4.0118, longitude: 9.7194 },
    icon: require('../assets/images/resto.png'),
  },
];

export default function MapViews() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [manualMarker, setManualMarker] = useState(null);
  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setIsLoading(false);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 15000,
        });
        setLocation(location);

        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              ...DOUALA_REGION,
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            1000
          );
        }
      } catch (error) {
        setErrorMsg('Unable to get current location. Using default Douala location.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const fetchDirections = async (startLat, startLng, endLat, endLng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${endLat},${endLng}&key=VOTRE_CLE_API_GOOGLE`
      );
      const data = await response.json();
      if (data.routes.length) {
        const route = data.routes[0];
        const points = route.overview_polyline.points;
        const decodedPoints = decodePolyline(points);
        setRouteCoordinates(decodedPoints);
        setDuration(route.legs[0].duration.text);
        setDistance(route.legs[0].distance.text);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'itinéraire:", error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  const handleMarkerPress = (point) => {
    setSelectedPoint(point);
    if (location) {
      const dist = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        point.coordinate.latitude,
        point.coordinate.longitude
      );
      setDistance(dist);
      bottomSheetRef.current?.expand();
    }
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setManualMarker(coordinate);
    setLocation({ coords: coordinate });
    bottomSheetRef.current?.collapse();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement de la carte...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={DOUALA_REGION}
        mapType="standard"
        showsUserLocation
        showsMyLocationButton
        onPress={handleMapPress}>
        {(location || manualMarker) && (
          <Marker
            coordinate={
              manualMarker || {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }
            }
            title="Votre position">
            <Image source={require('../assets/images/loc.jpg')} style={styles.userLocationIcon} />
          </Marker>
        )}
        {POINTS_OF_INTEREST.map((point) => (
          <Marker
            key={point.id}
            coordinate={point.coordinate}
            title={point.title}
            onPress={() => handleMarkerPress(point)}>
            <Image source={point.icon} style={styles.markerIcon} />
          </Marker>
        ))}
        {selectedPoint && location && (
          <Polyline
            coordinates={[
              manualMarker || {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              selectedPoint.coordinate,
            ]}
            strokeColor="#000"
            strokeWidth={2}
          />
        )}
      </MapView>
      <SafeAreaView style={styles.topBarContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Ionicons style={styles.topBarText} name="options" size={26} color="white"/>
          </TouchableOpacity>
          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.marchesButton}>
              <Text style={styles.marchesButtonText}>MARCHÉS</Text>
              <Text style={styles.marchesCount}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("notifications")} style={styles.closeButton}>
            <Ionicons style={styles.topBarText} name="notifications" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {/* <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose>
        <View style={styles.bottomSheetContent}>
          {selectedPoint && (
            <>
              <Text style={styles.bottomSheetTitle}>{selectedPoint.title}</Text>
              {distance && <Text style={styles.bottomSheetDistance}>Distance: {distance} km</Text>}
              <Text style={styles.bottomSheetCoordinates}>
                Latitude: {selectedPoint.coordinate.latitude.toFixed(4)}
                {'\n'}
                Longitude: {selectedPoint.coordinate.longitude.toFixed(4)}
              </Text>
            </>
          )}
        </View>
      </BottomSheet> */}
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose>
        <View style={styles.bottomSheetContent}>
          {selectedPoint && (
            <>
              <Text style={styles.bottomSheetTitle}>{selectedPoint.title}</Text>
              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={24} color={COLORS.primary} />
                <Text style={styles.infoText}>{duration || 'Calcul en cours...'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={24} color={COLORS.primary} />
                <Text style={styles.infoText}>{distance || 'Calcul en cours...'}</Text>
              </View>
              <TouchableOpacity style={styles.callButton} 
              //</>onPress={handleCall}
              >
                <Ionicons name="call-outline" size={24} color="white" />
                <Text style={styles.callButtonText}>Appeler</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },


  // map: {
  //   width: Dimensions.get('window').width,
  //   height: Dimensions.get('window').height - 50,
  // },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  topBarContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButton: {
    borderRadius: 5,
    padding: 5,
  },
  menuButtonText: {
    color: '#007AFF',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marchesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  marchesButtonText: {
    color: 'white',
    marginRight: 5,
  },
  marchesCount: {
    color: 'white',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: 'red',
    fontSize: 18,
  },
  userLocationIcon: {
    width: 24,
    height: 24
  },
  markerIcon :{
    width: 24,
    height: 24
  },


  bottomSheetContent: {
    flex: 1,
    padding: 16,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  callButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },

});
