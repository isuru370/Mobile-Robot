import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Ionicons } from '@expo/vector-icons';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    // Terms validation
    if (!formData.agreedToTerms) {
      newErrors.terms = 'You must agree to the terms';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // You might want to save additional user data (like name) to Firestore here
      router.replace('/(tabs)');
    } catch (error: any) {
      let errorMessage = 'Sign up failed. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
      }
      
      Alert.alert('Sign Up Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50" keyboardShouldPersistTaps="handled">
      <View className="px-6 py-12">
        {/* Header */}
        <View className="items-center mb-8">
          <Image 
            source={require('../../assets/images/logo.png')} 
            className="w-32 h-32 mb-4"
          />
          <Text className="text-3xl font-bold text-gray-800">Create Account</Text>
          <Text className="text-gray-500 mt-2">Join us today!</Text>
        </View>

        {/* Form */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Full Name</Text>
          <TextInput
            className={`bg-white p-4 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
          />
          {errors.name ? <Text className="text-red-500 text-xs mt-1">{errors.name}</Text> : null}
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Email</Text>
          <TextInput
            className={`bg-white p-4 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
          {errors.email ? <Text className="text-red-500 text-xs mt-1">{errors.email}</Text> : null}
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Password</Text>
          <View className="relative">
            <TextInput
              className={`bg-white p-4 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'} pr-12`}
              placeholder="Create password"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
            />
            <TouchableOpacity 
              className="absolute right-4 top-4"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? 'eye-off' : 'eye'} 
                size={20} 
                color="#6b7280" 
              />
            </TouchableOpacity>
          </View>
          {errors.password ? <Text className="text-red-500 text-xs mt-1">{errors.password}</Text> : null}
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Confirm Password</Text>
          <TextInput
            className={`bg-white p-4 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
            placeholder="Confirm your password"
            secureTextEntry={!showPassword}
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          />
          {errors.confirmPassword ? <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text> : null}
        </View>

        {/* Terms Checkbox */}
        <View className="flex-row items-start mb-6">
          <TouchableOpacity 
            className={`w-5 h-5 border ${errors.terms ? 'border-red-500' : 'border-gray-300'} rounded mr-2 items-center justify-center mt-1`}
            onPress={() => setFormData({...formData, agreedToTerms: !formData.agreedToTerms})}
          >
            {formData.agreedToTerms && (
              <Ionicons name="checkmark" size={14} color="#3B82F6" />
            )}
          </TouchableOpacity>
          <Text className="text-gray-600 text-sm flex-1">
            I agree to the <Text className="text-blue-500">Terms</Text> and <Text className="text-blue-500">Privacy Policy</Text>
          </Text>
        </View>
        {errors.terms ? <Text className="text-red-500 text-xs mb-2 -mt-4">{errors.terms}</Text> : null}

        {/* Sign Up Button */}
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg items-center mb-6"
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-4 text-gray-400">OR</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Social Login */}
        <View className="flex-row justify-center space-x-4 mb-8">
          <TouchableOpacity className="p-3 border border-gray-200 rounded-full">
            <Image 
              source={require('../../assets/images/google.png')} 
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        {/* Sign In Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/sign_in')}>
            <Text className="text-blue-500 font-medium">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}