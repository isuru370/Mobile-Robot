import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    // Handle sign up logic
    //router.replace('/home');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
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
            className="bg-white p-4 rounded-lg border border-gray-200"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="mb-4">
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

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Password</Text>
          <View className="relative">
            <TextInput
              className="bg-white p-4 rounded-lg border border-gray-200 pr-12"
              placeholder="Create password"
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
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Confirm Password</Text>
          <TextInput
            className="bg-white p-4 rounded-lg border border-gray-200"
            placeholder="Confirm your password"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Terms Checkbox */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity className="w-5 h-5 border border-gray-300 rounded mr-2 items-center justify-center">
            <View className="w-3 h-3 bg-blue-500 rounded-sm" />
          </TouchableOpacity>
          <Text className="text-gray-600 text-sm">
            I agree to the <Text className="text-blue-500">Terms</Text> and <Text className="text-blue-500">Privacy Policy</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg items-center mb-6"
          onPress={handleSignUp}
        >
          <Text className="text-white font-bold text-lg">Sign Up</Text>
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