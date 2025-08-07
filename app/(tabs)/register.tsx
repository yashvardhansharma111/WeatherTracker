import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { IconSymbol } from '../../components/ui/IconSymbol';

const SKY_BLUE = '#38b6ff';
const WHITE = '#fff';

import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { register, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(email, password);
      Alert.alert('Registration Successful', 'Your account has been created!');
      (navigation as any).navigate('home');
    } catch (e) {
      // error is handled by useAuth
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <IconSymbol name="person.badge.plus.fill" size={48} color={SKY_BLUE} style={{ alignSelf: 'center', marginBottom: 8 }} />
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={SKY_BLUE}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={SKY_BLUE}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error && <Text style={styles.error}>{error}</Text>}
        {loading ? (
          <ActivityIndicator color={SKY_BLUE} />
        ) : (
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleRegister}>
            <IconSymbol name="person.badge.plus.fill" color={WHITE} size={20} />
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.link} onPress={() => (navigation as any).navigate('login')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    padding: 16,
  },
  card: {
    backgroundColor: '#eaf6ff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: SKY_BLUE,
    shadowOpacity: 0.13,
    shadowRadius: 16,
    elevation: 3,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: SKY_BLUE,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderColor: SKY_BLUE,
    borderWidth: 1.5,
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    color: SKY_BLUE,
    backgroundColor: WHITE,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SKY_BLUE,
    paddingVertical: 14,
    borderRadius: 24,
    marginVertical: 10,
    shadowColor: SKY_BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    letterSpacing: 1,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  link: {
    marginTop: 12,
    alignSelf: 'center',
  },
  linkText: {
    color: SKY_BLUE,
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: '500',
  },
});
