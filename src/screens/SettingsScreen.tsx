import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UNIT_PREFERENCE, FAHRENHEIT, CELSIUS } from '../constants';

const SettingsScreen = () => {
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const storedValue = await AsyncStorage.getItem(UNIT_PREFERENCE);
      setIsFahrenheit(storedValue === FAHRENHEIT);
    };
    loadSettings();
  }, []);

  const toggleUnit = async () => {
    const newUnit = !isFahrenheit;
    setIsFahrenheit(newUnit);
    await AsyncStorage.setItem(UNIT_PREFERENCE, newUnit ? FAHRENHEIT : CELSIUS);
  };

  return (
    <View style={styles.container}>
      <Text>Use Fahrenheit</Text>
      <Switch value={isFahrenheit} onValueChange={toggleUnit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flexDirection: 'row', alignItems: 'center' },
});

export default SettingsScreen;
