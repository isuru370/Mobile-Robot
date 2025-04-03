import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

// Dummy cart data
const cartItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    price: 12.99,
    quantity: 2,
    image: require('../../assets/images/logo.png'),
  },
  {
    id: '2',
    name: 'Chicken Burger',
    price: 8.99,
    quantity: 1,
    image: require('../../assets/images/logo.png'),
  },
  {
    id: '3',
    name: 'Caesar Salad',
    price: 9.99,
    quantity: 1,
    image: require('../../assets/images/logo.png'),
  },
];

export default function CartScreen() {
  // Calculate total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-900">Your Cart</Text>
          <Text className="text-gray-500">{cartItems.length} items</Text>
        </View>

        {/* Cart Items List */}
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View className="flex-row bg-white rounded-lg p-4 mb-4 shadow-sm">
              <Image 
                source={item.image} 
                className="w-20 h-20 rounded-lg"
                resizeMode="cover"
              />
              <View className="flex-1 ml-4">
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-amber-600 font-bold">${item.price.toFixed(2)}</Text>
                <View className="flex-row items-center mt-2">
                  <TouchableOpacity className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                    <Text className="text-gray-500">-</Text>
                  </TouchableOpacity>
                  <Text className="mx-4">{item.quantity}</Text>
                  <TouchableOpacity className="w-8 h-8 bg-amber-100 rounded-full items-center justify-center">
                    <Text className="text-amber-600">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity className="p-2">
                <FontAwesome name="trash-o" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />

        {/* Order Summary */}
        <View className="bg-white rounded-lg p-4 mt-4 shadow-sm">
          <Text className="text-lg font-bold mb-4">Order Summary</Text>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Subtotal</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Delivery Fee</Text>
            <Text>${deliveryFee.toFixed(2)}</Text>
          </View>
          
          <View className="border-t border-gray-200 my-3" />
          
          <View className="flex-row justify-between">
            <Text className="font-bold text-lg">Total</Text>
            <Text className="font-bold text-lg">${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity 
          className="bg-amber-500 rounded-full p-4 mt-6 mb-8 items-center"
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold text-lg">Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}