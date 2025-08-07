import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../constants/WeatherAPI';

export type WeatherData = {
  current: any;
  forecast: any;
  location: any;
};

export function useWeather(locationQuery: string | null) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (locationQuery) fetchWeather(locationQuery);
  }, [locationQuery]);

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${WEATHER_API_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${query}&days=7&aqi=no&alerts=no`);
      const data = await res.json();
      setWeather(data);
      await AsyncStorage.setItem('lastWeather', JSON.stringify(data));
    } catch (e: any) {
      setError('Failed to fetch weather');
      // Try to load cached data
      const cached = await AsyncStorage.getItem('lastWeather');
      if (cached) setWeather(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentLocationWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('Location permission denied');
      let loc = await Location.getCurrentPositionAsync({});
      const query = `${loc.coords.latitude},${loc.coords.longitude}`;
      await fetchWeather(query);
    } catch (e: any) {
      setError('Failed to get location');
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather, fetchCurrentLocationWeather };
}
