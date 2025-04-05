import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function SingleViewProjectScreen() {
  const router = useRouter();
  const product = {
    id: '2',
    name: 'Oreo Original Sandwich Cookies',
    price: 3.99,
    description: 'America\'s favorite cookie! Oreo sandwich cookies feature a delicious combination of crunchy chocolate wafers and sweet creme filling. Perfect for dunking in milk or enjoying straight from the package.',
    rating: 4.9,
    reviews: 8563,
    colors: ['#000000', '#FFFFFF', '#D4AF37'], // Black, White, Gold (for special editions)
    variants: [
      'Original',
      'Double Stuf',
      'Mega Stuf',
      'Golden',
      'Mint'
    ],
    features: [
      'Iconic sandwich cookie design',
      'Perfect cookie-to-creme ratio',
      'Great for dunking in milk',
      'Satisfying crunch with smooth filling',
      'Twist, lick, dunk tradition'
    ],
    nutritionalInfo: {
      servingSize: '3 cookies (34g)',
      calories: 160,
      totalFat: '7g',
      sugars: '14g'
    },
    images: [
      require('../../assets/images/products/1.png'),
      require('../../assets/images/products/1_1.png'),
      require('../../assets/images/products/1_2.png'),
    ],
    funFacts: [
      'First introduced in 1912',
      'Over 500 billion Oreos have been sold worldwide',
      'The Oreo twist-off rate is about 50/50 worldwide',
      'There\'s a proper way to eat an Oreo (twist, lick, dunk)'
    ]
  };

  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);
  const [quantity, setQuantity] = React.useState(1);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between p-5 pt-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Product Images Carousel */}
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        className="w-full"
        style={{ height: width * 0.1 }}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveImageIndex(index);
        }}
        scrollEventThrottle={16}
      >
        {product.images.map((image, index) => (
          <Image 
            key={index}
            source={image}
            className="w-full"
            style={{ width, height: width * 0.8 }}
            resizeMode="contain"
          />
        ))}
      </ScrollView>

      {/* Image Pagination Dots */}
      <View className="flex-row justify-center items-center my-2">
        {product.images.map((_, index) => (
          <View 
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${activeImageIndex === index ? 'bg-blue-500 w-3' : 'bg-gray-300'}`}
          />
        ))}
      </View>

      {/* Product Details */}
      <ScrollView className="flex-1 px-5">
  {/* Price and Rating */}
  <View className="flex-row justify-between items-center mb-3">
    <Text className="text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</Text>
    <View className="flex-row items-center">
      <FontAwesome name="star" size={16} color="#FFD700" />
      <Text className="ml-1 text-gray-500">{product.rating} ({product.reviews})</Text>
    </View>
  </View>

  {/* Product Name and Description */}
  <Text className="text-xl font-semibold text-gray-800 mb-3">{product.name}</Text>
  <Text className="text-gray-600 mb-6 leading-6">{product.description}</Text>

  {/* Variant Selection */}
  <View className="mb-6">
    <Text className="text-lg font-semibold text-gray-800 mb-2">Variants</Text>
    <View className="flex-row flex-wrap">
      {product.variants.map((variant, index) => (
        <TouchableOpacity
          key={index}
          
          onPress={()=>{}}
        >
          
        </TouchableOpacity>
      ))}
    </View>
  </View>

  {/* Features */}
  <View className="mb-6">
    <Text className="text-lg font-semibold text-gray-800 mb-2">Cookie Features</Text>
    {product.features.map((feature, index) => (
      <View key={index} className="flex-row items-center mb-2">
        <MaterialIcons name="check-circle" size={16} color="#2ECC71" />
        <Text className="ml-2 text-gray-700">{feature}</Text>
      </View>
    ))}
  </View>

  {/* Nutritional Information */}
  <View className="mb-6">
    <Text className="text-lg font-semibold text-gray-800 mb-2">Nutritional Info</Text>
    <View className="bg-gray-50 p-4 rounded-lg">
      <Text className="text-gray-700 mb-1">Serving Size: {product.nutritionalInfo.servingSize}</Text>
      <Text className="text-gray-700 mb-1">Calories: {product.nutritionalInfo.calories}</Text>
      <Text className="text-gray-700 mb-1">Total Fat: {product.nutritionalInfo.totalFat}</Text>
      <Text className="text-gray-700">Sugars: {product.nutritionalInfo.sugars}</Text>
    </View>
  </View>

  {/* Fun Facts */}
  <View className="mb-6">
    <Text className="text-lg font-semibold text-gray-800 mb-2">Fun Facts</Text>
    {product.funFacts.map((fact, index) => (
      <View key={index} className="flex-row items-start mb-2">
        <Ionicons name="happy-outline" size={16} color="#F59E0B" style={{ marginTop: 2, marginRight: 8 }} />
        <Text className="text-gray-700 flex-1">{fact}</Text>
      </View>
    ))}
  </View>

  {/* Quantity Selector */}
  <View className="flex-row justify-between items-center mb-8">
    <Text className="text-lg font-semibold text-gray-800">Quantity</Text>
    <View className="flex-row items-center border border-gray-300 rounded-full px-3">
      <TouchableOpacity 
        className="p-2"
        onPress={() => setQuantity(Math.max(1, quantity - 1))}
      >
        <Text className="text-blue-500 text-xl">-</Text>
      </TouchableOpacity>
      <Text className="mx-4 text-gray-800">{quantity}</Text>
      <TouchableOpacity 
        className="p-2"
        onPress={() => setQuantity(quantity + 1)}
      >
        <Text className="text-blue-500 text-xl">+</Text>
      </TouchableOpacity>
    </View>
  </View>
</ScrollView>

      {/* Add to Cart Button */}
      <LinearGradient
        colors={['#3498DB', '#2C3E50']}
        className="py-5 px-6 rounded-t-3xl"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity className="items-center">
          <Text className="text-white font-bold text-lg">
            Add to Cart - ${(product.price * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}