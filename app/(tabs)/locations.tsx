import React, { useState } from 'react';
import { 
  ActivityIndicator, 
  Alert, 
  FlatList, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { useLocations } from '../../hooks/useLocations';

const SKY_BLUE = '#38b6ff';
const WHITE = '#fff';
const LIGHT_BLUE = '#e8f4fd';
const GRADIENT_BLUE = '#4facfe';
const DARK_BLUE = '#2196f3';

const { width } = Dimensions.get('window');

export default function LocationsScreen({ navigation }: any) {
  const { locations, loading, error, addLocation, removeLocation, setDefault, detectCurrentLocation, loadLocations } = useLocations();
  const [city, setCity] = useState('');
  const [animatedValue] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAdd = async () => {
    if (!city) return;
    
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    await addLocation(city, city);
    setCity('');
    loadLocations();
  };

  const handleDetect = async () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    
    const query = await detectCurrentLocation();
    if (query) {
      await addLocation('Current Location', query);
      loadLocations();
    } else {
      Alert.alert('Could not detect location');
    }
  };

  const handleSetDefault = (query: string) => {
    if (Platform.OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setDefault(query);
  };

  const handleRemove = (query: string) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    removeLocation(query);
  };

  const renderLocationItem = ({ item, index }: any) => {
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [50 * (index + 1), 0],
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View 
        style={[
          styles.locationCard,
          {
            transform: [{ translateY }],
            opacity,
          }
        ]}
      >
        <LinearGradient
          colors={[WHITE, LIGHT_BLUE]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.locationInfo}>
            <View style={styles.locationIconContainer}>
              <IconSymbol name="location.fill" color={SKY_BLUE} size={24} />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationName}>{item.name}</Text>
              <Text style={styles.locationQuery}>{item.query}</Text>
            </View>
            {item.isDefault && (
              <View style={styles.defaultBadge}>
                <IconSymbol name="star.fill" color={WHITE} size={16} />
              </View>
            )}
          </View>
          
          <View style={styles.locationActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.starButton]} 
              onPress={() => handleSetDefault(item.query)}
              activeOpacity={0.7}
            >
              <IconSymbol name="star.fill" color={WHITE} size={18} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.removeButton]} 
              onPress={() => handleRemove(item.query)}
              activeOpacity={0.7}
            >
              <IconSymbol name="trash.fill" color={WHITE} size={18} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={[WHITE, LIGHT_BLUE, WHITE]}
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: animatedValue,
            transform: [{
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              })
            }]
          }
        ]}
      >
        <Text style={styles.title}>🌍 My Locations</Text>
        <Text style={styles.subtitle}>Manage your favorite places</Text>
      </Animated.View>

      <Animated.View 
        style={[
          styles.inputSection,
          {
            opacity: animatedValue,
            transform: [{
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              })
            }]
          }
        ]}
      >
        <BlurView intensity={20} style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputWrapper}>
              <IconSymbol name="magnifyingglass" color={SKY_BLUE} size={20} />
              <TextInput
                style={styles.input}
                placeholder="Enter city name..."
                placeholderTextColor={`${SKY_BLUE}80`}
                value={city}
                onChangeText={setCity}
                returnKeyType="done"
                onSubmitEditing={handleAdd}
              />
            </View>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAdd}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[GRADIENT_BLUE, SKY_BLUE]}
                style={styles.addButtonGradient}
              >
                <IconSymbol name="plus" color={WHITE} size={24} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>

        <TouchableOpacity 
          style={styles.detectButton} 
          onPress={handleDetect}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[DARK_BLUE, SKY_BLUE, GRADIENT_BLUE]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.detectButtonGradient}
          >
            <View style={styles.detectButtonContent}>
              <IconSymbol name="location.fill" color={WHITE} size={22} />
              <Text style={styles.detectButtonText}>📍 Detect My Location</Text>
              <View style={styles.detectButtonPulse} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={SKY_BLUE} size="large" />
          <Text style={styles.loadingText}>Finding locations...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle.fill" color="#ff4757" size={24} />
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      <FlatList
        data={locations}
        keyExtractor={item => item.query}
        renderItem={renderLocationItem}
        style={styles.locationsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: SKY_BLUE,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: `${SKY_BLUE}CC`,
    fontWeight: '500',
    textAlign: 'center',
  },
  inputSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: SKY_BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: SKY_BLUE,
    marginLeft: 12,
    fontWeight: '500',
  },
  addButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  addButtonGradient: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: SKY_BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  detectButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  detectButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  detectButtonText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 12,
    letterSpacing: 0.5,
  },
  detectButtonPulse: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80',
    right: -20,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    color: SKY_BLUE,
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff5f5',
    borderRadius: 16,
    marginBottom: 16,
  },
  error: {
    color: '#ff4757',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  locationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  locationCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: SKY_BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  cardGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${SKY_BLUE}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    color: SKY_BLUE,
    fontWeight: '700',
    marginBottom: 4,
  },
  locationQuery: {
    fontSize: 14,
    color: `${SKY_BLUE}80`,
    fontWeight: '500',
  },
  defaultBadge: {
    backgroundColor: SKY_BLUE,
    borderRadius: 12,
    padding: 6,
    marginRight: 12,
  },
  locationActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    borderRadius: 16,
    padding: 12,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  starButton: {
    backgroundColor: '#ffd700',
  },
  removeButton: {
    backgroundColor: '#ff4757',
  },
});
