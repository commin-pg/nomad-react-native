import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Ionicons, Feather } from '@expo/vector-icons'

const windowWidth = Dimensions.get('window').width;
export default function App() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState()
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const API_KEY = 'e1553f9159be1ff4bd4b4fd3ee70e245';

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
    }
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    console.log(location[0].city);
    setLocation(location);
    setCity(location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${latitude}&appid=${API_KEY}&units=metric`
    ).then(response => response.json())
      .then(response => {

        const item = response.list.map(m => {
          return {
            "temp": parseFloat(m.main.temp).toFixed(1),
            "weather": m.weather[0].main,
            "description": m.weather[0].description,
          }
        });
        setDays(item);
      })

  }
  useEffect(() => {
    getWeather();
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.weather} horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        {
          days.length == 0 ?
            <View style={styles.weatherBox}>
              <ActivityIndicator color="white" size="large"></ActivityIndicator>
            </View>
            :
            days.map((item, index) => (
              <View style={styles.weatherBox} key={index}>
                <View style={styles.day}>
                  <View style={styles.iconBox}>
                    <Text style={styles.temp}>{item.temp}</Text>
                    <Feather name="cloud" size={88} color="white" />
                  </View>

                  <Text style={styles.description}>{item.weather}</Text>
                  <Text style={styles.tinyText}>{item.description}</Text>
                </View>

              </View>

            ))
        }
      </ScrollView>
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  city: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 68,
    fontWeight: "600",
    color: 'white'
  },

  weatherBox: {
    flex: 2,
    paddingTop: 25,

  },
  weather: {
    // flex: 3,
  },
  day: {
    flex: 0.5,
    width: windowWidth,
    padding: 10

  },
  temp: {
    fontSize: 109,
    color: "white"
  },
  description: {
    fontSize: 37,
    marginTop: -20,
    color: "white"

  },
  iconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  tinyText: {
    fontSize: 14,
    color: "white"
  }
});
