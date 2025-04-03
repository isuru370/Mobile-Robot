import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {auth} from "../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to home screen after successful login
      router.replace('/(tabs)');
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Account temporarily disabled due to too many failed attempts';
          break;
      }
      
      Alert.alert('Login Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="bg-white">
        <SafeAreaView>
        <View className="flex-1 bg-gray-50 px-6 justify-center">
      {/* Header */}
      <View className="items-center mb-10">
        <Image 
          source={require('../../assets/images/logo.png')} 
          className="w-32 h-32 mb-4"
        />
        <Text className="text-3xl font-bold text-gray-800">Welcome Back</Text>
        <Text className="text-gray-500 mt-2">Sign in to continue</Text>
      </View>

      {/* Form */}
      <View className="mb-6">
        <Text className="text-gray-700 mb-2">Email</Text>
        <TextInput
          className="bg-white p-4 rounded-lg border border-gray-200"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 mb-2">Password</Text>
        <View className="relative">
          <TextInput
            className="bg-white p-4 rounded-lg border border-gray-200 pr-12"
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity 
            className="absolute right-4 top-4"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text className="text-blue-500">
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="self-end mt-2">
          <Text className="text-blue-600 text-sm">Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-lg items-center mb-6"
        onPress={handleSignIn}
      >
        <Text className="text-white font-bold text-lg">Sign In</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="mx-4 text-gray-400">OR</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>

      {/* Social Login */}
      <View className="flex-row justify-center space-x-4">
        <TouchableOpacity className="p-3 border border-gray-200 rounded-full">
          <Image 
            source={require('../../assets/images/google.png')} 
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <View className="flex-row justify-center mt-8">
        <Text className="text-gray-500">Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/sign_up')}>
          <Text className="text-blue-500 font-medium">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
        </SafeAreaView>
    </ScrollView>
  );
}