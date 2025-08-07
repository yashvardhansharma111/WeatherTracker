import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export type SavedLocation = {
  name: string;
  query: string; // city name or lat,long
  isDefault?: boolean;
};

const STORAGE_KEY = 'savedLocations';

export function useLocations() {
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setLocations(JSON.parse(stored));
    } catch (e) {
      setError('Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  const saveLocations = async (locs: SavedLocation[]) => {
    setLocations(locs);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(locs));
  };

  const addLocation = async (name: string, query: string) => {
    const updated = [...locations, { name, query }];
    await saveLocations(updated);
  };

  const removeLocation = async (query: string) => {
    const updated = locations.filter(l => l.query !== query);
    await saveLocations(updated);
  };

  const setDefault = async (query: string) => {
    const updated = locations.map(l => ({ ...l, isDefault: l.query === query }));
    await saveLocations(updated);
  };

  const detectCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('Permission denied');
      let loc = await Location.getCurrentPositionAsync({});
      return `${loc.coords.latitude},${loc.coords.longitude}`;
    } catch (e) {
      setError('Failed to get location');
      return null;
    }
  };

  return { locations, loading, error, addLocation, removeLocation, setDefault, detectCurrentLocation, loadLocations };
}
