import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }: any) => {
  const { weather } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{weather.name}</Text>
      <Text>Temperature: {weather.main.temp}°K</Text>
      <Text>Humidity: {weather.main.humidity}%</Text>
      <Text>Wind Speed: {weather.wind.speed} m/s</Text>
      <Text>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</Text>
      <Text>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});

export default DetailsScreen;
