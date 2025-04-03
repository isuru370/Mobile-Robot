import { FlatList, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { router } from 'expo-router';

type FoodItem = {
  id: string;
  name: string;
  price: string;
  category: 'Biscuits' | 'Snacks' | 'Spices' | 'Dairy' | 'Drinks' | 'Bakery';
  image: any; // Changed to any to handle require()
};

type Favorites = Record<string, boolean>;

export default function Home() {
  const [favorites, setFavorites] = useState<Favorites>({});
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const foodItems: FoodItem[] = [
    { id: '1', name: 'Oreo Chocolate Cookies', price: '$2.99', category: 'Biscuits', image: require('../../assets/images/products/1.png') },
    { id: '2', name: 'Lays Potato Chips', price: '$1.99', category: 'Snacks', image: require('../../assets/images/products/2.png') },
    { id: '3', name: 'McCormick Cinnamon Powder', price: '$3.49', category: 'Spices', image: require('../../assets/images/products/3.png') },
    { id: '4', name: 'Amul Butter 500g', price: '4.99', category: 'Dairy', image: require('../../assets/images/products/4.png') },
    { id: '5', name: 'Coca-Cola 2L Bottle', price: '$1.79', category: 'Drinks', image: require('../../assets/images/products/5.png') },
    { id: '6', name: 'Britannia Fruit Cake', price: '$5.99', category: 'Bakery', image: require('../../assets/images/products/6.png') },
    { id: '7', name: 'Parle-G Biscuits', price: '$0.99', category: 'Biscuits', image: require('../../assets/images/products/7.png') },
    { id: '8', name: 'Pringles Sour Cream', price: '$2.49', category: 'Snacks', image: require('../../assets/images/products/8.png') },
    { id: '9', name: 'Taj Mahal Tea 500g', price: '$8.99', category: 'Spices', image: require('../../assets/images/products/9.png') },
    { id: '10', name: 'Nestle Yogurt 1kg', price: '$3.29', category: 'Dairy', image: require('../../assets/images/products/10.png') },
    { id: '11', name: 'Tropicana Orange Juice', price: '$4.49', category: 'Drinks', image: require('../../assets/images/products/11.png') },
    { id: '12', name: 'Bourbon Chocolate Cream', price: '$1.49', category: 'Biscuits', image: require('../../assets/images/products/12.png') },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = ['All', 'Biscuits', 'Snacks', 'Spices', 'Dairy', 'Drinks', 'Bakery'];

  return (
    <SafeAreaView className="flex-1 bg-amber-50">
      {/* Header and Search Section */}
      <View className="px-4 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-sm text-gray-500">Delivery to</Text>
            <View className="flex-row items-center">
              <Text className="text-xl font-bold text-gray-900">Home</Text>
              <Ionicons name="chevron-down" size={20} color="#1f2937" />
            </View>
          </View>
          <View className="w-10 h-10 rounded-full bg-amber-100 overflow-hidden border border-amber-200">
            <Image
              source={require('../../assets/images/profile.jpg')}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity className="flex-row items-center bg-white rounded-full px-4 py-3 mb-6 shadow-sm">
          <FontAwesome name="search" size={16} color="#9ca3af" style={{ marginRight: 8 }} />
          <Text className="text-gray-400">Search for groceries...</Text>
        </TouchableOpacity>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`px-4 py-2 mr-3 rounded-full ${activeCategory === category ? 'bg-amber-500' : 'bg-white'}`}
              onPress={() => setActiveCategory(category)}
            >
              <Text className={`font-medium ${activeCategory === category ? 'text-white' : 'text-gray-700'}`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Items Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-900">Popular Groceries</Text>
          <TouchableOpacity>
            <Text className="text-amber-600">See all</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Grocery Items Grid */}
      <FlatList
        data={foodItems}
        numColumns={2}
        contentContainerClassName="px-4 pb-20"
        columnWrapperClassName="justify-between"
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-[48%] mb-6 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 relative"
            onPress={() => router.push({
              pathname: '/(product)/single_view_product',
              params: { id: item.id }
            })}
          >
            {/* Favorite Icon */}
            <TouchableOpacity
              className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/80 rounded-full items-center justify-center"
              onPress={(e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
            >
              <FontAwesome
                name={favorites[item.id] ? "heart" : "heart-o"}
                size={18}
                color="#ef4444"
              />
            </TouchableOpacity>

            {/* Product Image - Replaced icon with actual product image */}
            <View className="h-32 bg-white items-center justify-center">
              <Image
                source={item.image}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>

            {/* Product Details */}
            <View className="p-3">
              <Text className="text-lg font-semibold text-gray-900 mb-1" numberOfLines={1}>
                {item.name}
              </Text>
              <View className="flex-row items-center mb-2">
                <FontAwesome name="star" size={14} color="#f59e0b" />
                <Text className="text-xs text-gray-500 ml-1">4.5</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-amber-600 font-bold">{item.price}</Text>
                <TouchableOpacity
                  className="w-8 h-8 bg-amber-500 rounded-full items-center justify-center"
                  onPress={(e) => {
                    e.stopPropagation();
                    // Add to cart logic here
                  }}
                >
                  <FontAwesome name="plus" size={14} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}