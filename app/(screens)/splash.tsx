import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after delay
    const timer = setTimeout(() => {
      router.push('/(auth)');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Animated.View 
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-gray-800 mt-4">
          My Awesome App
        </Text>
        <Text className="text-lg text-gray-500 mt-2">
          Loading...
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },
});