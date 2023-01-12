import { getPermissionsAsync } from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "573fd4540496ede4b4cac91aca9e1d3d";

const icons = {
  Clouds: "cloudy",
  Clear : "day-sunny",
  Atomosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Locading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
     const {granted} = await Location.requestForegroundPermissionsAsync();
     if(!granted) {
      setOk(false);
     }
     const {
      coords : { latitude, longitude }
    } = await Location.getCurrentPositionAsync({accuracy:5});
     const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
     setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily);
  }
  useEffect(() => {
    getWeather();
  }, [])
  return <View style={styles.container}>
    <View style={styles.city}>
      <Text style={styles.cityName}>{city}</Text>
    </View>
    <ScrollView 
      pagingEnabled 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.weather}>

{days.length === 0 ? (<View style={{ ...styles.day, alignItems:"center" }}> <ActivityIndicator style={{marginTop:10}} color="write" size="large"/></View> 
    ) : (days.map((day, index) =>
          <View key={index} style={styles.day}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width:"100%"}}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Fontisto name={icons[day.weather[0].main]} size={68} color="white" />
            </View>

            <Text style={styles.description}>{day.weather[0].main}</Text>
            <Text style={styles.tinyText}>{day.weather[0].description}</Text>
          </View> 
      )
    )}
    </ScrollView>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:"purple",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
    color: "white"
  },
  weather: {
  },
  day : {
    width: SCREEN_WIDTH,
    alignItems:"center",    
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 30,
  },
})
