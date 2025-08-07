import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
  Keyboard,
} from 'react-native';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { useWeather } from '../../hooks/useWeather';
import { useAuth } from '../../hooks/useAuth';

const SKY_BLUE = '#38b6ff';
const WHITE = '#fff';
const LIGHT_GRAY = '#f5f5f5';
const GRAY = '#666';

interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    condition: {
      text: string;
    };
  };
}

export default function HomeScreen() {
  const [query, setQuery] = useState<string | null>('auto:ip');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { weather, loading, error, fetchCurrentLocationWeather } = useWeather(query);
  const { user, logout } = useAuth();

  useEffect(() => {
    setQuery('auto:ip');
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    try {
      setIsSearching(true);
      Keyboard.dismiss();
      setQuery(searchQuery.trim());
    } catch (err) {
      Alert.alert('Error', 'Failed to search for city. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCurrentLocation = async () => {
    try {
      setSearchQuery(''); // Clear search when using current location
      await fetchCurrentLocationWeather();
    } catch (err) {
      Alert.alert(
        'Location Error', 
        'Unable to get your current location. Please check your location permissions and try again.'
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setQuery('auto:ip');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          {user && (
            <Text style={styles.welcomeText}>Welcome, {user.email}</Text>
          )}
          
          <Text style={styles.title}>Weather Tracker</Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <IconSymbol name="magnifyingglass" color={GRAY} size={18} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a city..."
                placeholderTextColor={GRAY}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                autoCapitalize="words"
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                  <IconSymbol name="xmark.circle.fill" color={GRAY} size={18} />
                </TouchableOpacity>
              )}
            </View>
            
            <TouchableOpacity 
              style={[styles.searchButton, isSearching && styles.searchButtonDisabled]} 
              onPress={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              activeOpacity={0.8}
            >
              {isSearching ? (
                <ActivityIndicator size="small" color={WHITE} />
              ) : (
                <Text style={styles.searchButtonText}>Search</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Current Location Button */}
          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8} 
            onPress={handleCurrentLocation}
            disabled={loading}
          >
            <IconSymbol name="location.fill" color={WHITE} size={20} />
            <Text style={styles.buttonText}>Use Current Location</Text>
          </TouchableOpacity>

          {/* Loading Indicator */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={SKY_BLUE} />
              <Text style={styles.loadingText}>Getting weather data...</Text>
            </View>
          )}

          {/* Error Display */}
          {error && (
            <View style={styles.errorContainer}>
              <IconSymbol name="exclamationmark.triangle.fill" color="#e53935" size={20} />
              <Text style={styles.error}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton} 
                onPress={() => setQuery('auto:ip')}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Weather Display */}
          {weather && !loading && (
            <View style={styles.weatherBox}>
              <View style={styles.locationHeader}>
                <IconSymbol name="location" color={SKY_BLUE} size={16} />
                <Text style={styles.location}>
                  {weather.location.name}, {weather.location.country}
                </Text>
              </View>
              
              <Text style={styles.temp}>
                {Math.round(weather.current.temp_c)}°C
              </Text>
              
              <Text style={styles.condition}>
                {weather.current.condition.text}
              </Text>

              <View style={styles.weatherDetails}>
                <View style={styles.weatherDetailItem}>
                  <IconSymbol name="drop.fill" color={SKY_BLUE} size={16} />
                  <Text style={styles.weatherDetailText}>
                    Humidity: {weather.current.humidity}%
                  </Text>
                </View>
                
                <View style={styles.weatherDetailItem}>
                  <IconSymbol name="wind" color={SKY_BLUE} size={16} />
                  <Text style={styles.weatherDetailText}>
                    Wind: {weather.current.wind_kph} kph
                  </Text>
                </View>
              </View>

              {weather.forecast?.forecastday && weather.forecast.forecastday.length > 0 && (
                <>
                  <Text style={styles.forecastTitle}>7-Day Forecast:</Text>
                  {weather.forecast.forecastday.map((day: ForecastDay) => (
                    <View key={day.date} style={styles.forecastDay}>
                      <Text style={styles.forecastDate}>
                        {new Date(day.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </Text>
                      <Text style={styles.forecastTemp}>
                        {Math.round(day.day.avgtemp_c)}°C
                      </Text>
                      <Text style={styles.forecastCondition}>
                        {day.day.condition.text}
                      </Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          )}
        </ScrollView>

        {/* Fixed logout button at bottom center */}
        {user && (
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <IconSymbol name="person.fill" color={WHITE} size={18} />
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
  },
  screen: {
    flex: 1,
    position: 'relative',
  },
  container: {
    padding: 16,
    paddingBottom: 100, // to prevent overlap with logout button
  },
  welcomeText: {
    color: SKY_BLUE,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: SKY_BLUE,
    alignSelf: 'center',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_GRAY,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  searchButton: {
    backgroundColor: SKY_BLUE,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
    minWidth: 80,
    alignItems: 'center',
  },
  searchButtonDisabled: {
    opacity: 0.6,
  },
  searchButtonText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SKY_BLUE,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginVertical: 12,
    alignSelf: 'center',
    shadowColor: SKY_BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    letterSpacing: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    color: GRAY,
    fontSize: 14,
  },
  errorContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 12,
  },
  error: {
    color: '#e53935',
    marginVertical: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  retryButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e53935',
    borderRadius: 16,
  },
  retryButtonText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  weatherBox: {
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#eaf6ff',
    width: '100%',
    alignItems: 'center',
    shadowColor: SKY_BLUE,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SKY_BLUE,
    marginLeft: 4,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
    color: SKY_BLUE,
  },
  condition: {
    fontSize: 16,
    color: GRAY,
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  weatherDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherDetailText: {
    marginLeft: 4,
    fontSize: 14,
    color: GRAY,
  },
  forecastTitle: {
    marginTop: 12,
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 16,
    color: SKY_BLUE,
    alignSelf: 'flex-start',
  },
  forecastDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  forecastDate: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  forecastTemp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: SKY_BLUE,
    marginHorizontal: 12,
  },
  forecastCondition: {
    flex: 1,
    fontSize: 12,
    color: GRAY,
    textAlign: 'right',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e53935',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});