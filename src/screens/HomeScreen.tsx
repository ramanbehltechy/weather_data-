import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { WEATHER_API_KEY } from '../constants';


const HomeScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (text: string) => {
    setQuery(text);
    if (text.length < 3) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${text}&appid=${WEATHER_API_KEY}`
      );
      setSuggestions(response.data.list);
    } catch (error) {
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocationWeather = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
        );
        navigation.navigate('Details', { weather: response.data });
      },
      (error) => {
        alert('Location permission denied.');
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a city"
        value={query}
        onChangeText={fetchSuggestions}
      />
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text
              style={styles.suggestion}
              onPress={() => navigation.navigate('Details', { weather: item })}
            >
              {item.name}
            </Text>
          )}
        />
      )}
      <Button title="Current Location Weather" onPress={getCurrentLocationWeather} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16 },
  suggestion: { padding: 8, borderBottomWidth: 1 },
});

export default HomeScreen;
