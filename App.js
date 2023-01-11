import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return <View style={styles.container}>
    <View style={styles.city}>
      <Text style={styles.cityName}>서울</Text>
    </View>
    <ScrollView 
      pagingEnabled 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.weather}>

      <View style={styles.day}>
        <Text style={styles.temp}>27</Text>
        <Text style={styles.description}>Sunny</Text>
      </View>
      <View style={styles.day}>
        <Text style={styles.temp}>27</Text>
        <Text style={styles.description}>Sunny</Text>
      </View>
      <View style={styles.day}>
        <Text style={styles.temp}>27</Text>
        <Text style={styles.description}>Sunny</Text>
      </View>
      <View style={styles.day}>
        <Text style={styles.temp}>27</Text>
        <Text style={styles.description}>Sunny</Text>
      </View>
      <View style={styles.day}>
        <Text style={styles.temp}>27</Text>
        <Text style={styles.description}>Sunny</Text>
      </View>
      <View style={styles.day}>
        <Text style={styles.temp}>27</Text>
        <Text style={styles.description}>Sunny</Text>
      </View>
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
})
