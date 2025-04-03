import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

const { width } = Dimensions.get('window');

export default function SingleViewProjectScreen() {
  const product = {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring 40mm drivers, active noise cancellation, and 30-hour battery life.',
    rating: 4.8,
    reviews: 124,
    colors: ['#2C3E50', '#E74C3C', '#3498DB'],
    features: [
      'Active Noise Cancellation',
      '30-hour Battery Life',
      'Bluetooth 5.0',
      'Built-in Microphone',
      'Foldable Design'
    ],
    images: [
      require('../../assets/images/logo.png'),
      require('../../assets/images/logo.png'),
      require('../../assets/images/logo.png'),
    ]
  };

  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);
  const [quantity, setQuantity] = React.useState(1);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Product Images Carousel */}
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        style={styles.imageCarousel}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveImageIndex(index);
        }}
      >
        {product.images.map((image, index) => (
          <Image 
            key={index}
            source={image}
            style={styles.productImage}
            resizeMode="contain"
          />
        ))}
      </ScrollView>

      {/* Image Pagination Dots */}
      <View style={styles.pagination}>
        {product.images.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.paginationDot,
              activeImageIndex === index && styles.activeDot
            ]}
          />
        ))}
      </View>

      {/* Product Details */}
      <ScrollView style={styles.detailsContainer}>
        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{product.rating} ({product.reviews})</Text>
          </View>
        </View>

        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorOptions}>
            {product.colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColor
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {product.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={16} color="#2ECC71" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <LinearGradient
        colors={['#3498DB', '#2C3E50']}
        style={styles.addToCartButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity style={styles.addToCartTouchable}>
          <Text style={styles.addToCartText}>Add to Cart - ${(product.price * quantity).toFixed(2)}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  imageCarousel: {
    width,
    height: width * 0.1,
  },
  productImage: {
    width,
    height: width * 0.8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCC',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#3498DB',
    width: 12,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: '#7F8C8D',
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#34495E',
  },
  description: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 20,
    lineHeight: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2C3E50',
  },
  colorOptions: {
    flexDirection: 'row',
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#3498DB',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    color: '#34495E',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  quantityButton: {
    padding: 10,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#3498DB',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 15,
    color: '#2C3E50',
  },
  addToCartButton: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addToCartTouchable: {
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});