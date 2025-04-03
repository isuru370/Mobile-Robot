import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { 
  DrawerContentScrollView, 
  DrawerItemList, 
  DrawerContentComponentProps 
} from '@react-navigation/drawer';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define types for navigation
type ProfileDrawerParamList = {
  Profile: undefined;
  // Add other screens here if needed
};

type ProfileScreenNavigationProp = DrawerNavigationProp<ProfileDrawerParamList, 'Profile'>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

// Custom Drawer Content with proper typing
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 bg-white">
        {/* Drawer Header */}
        <View className="p-4 border-b border-gray-100">
          <Image
            source={require('../../assets/images/profile.jpg')}
            className="w-16 h-16 rounded-full mb-3"
          />
          <Text className="text-xl font-bold">Mandara Pabasara</Text>
          <Text className="text-gray-500">mandarapabasara2001@gmail.com</Text>
        </View>

        {/* Drawer Items */}
        <View className="flex-1">
          <DrawerItemList {...props} />
        </View>

        {/* Drawer Footer */}
        <View className="p-4 border-t border-gray-100">
          <TouchableOpacity className="flex-row items-center py-2">
            <Ionicons name="log-out-outline" size={22} color="#ef4444" />
            <Text className="ml-4 text-red-500">Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

// Menu item type
type MenuItem = {
  icon: string;
  title: string;
};

// Main Profile Screen with proper typing
function ProfileScreen({ navigation }: ProfileScreenProps) {
  const menuItems: MenuItem[] = [
    { icon: 'person-outline', title: 'Personal Info' },
    { icon: 'location-outline', title: 'Addresses' },
    { icon: 'card-outline', title: 'Payment Methods' },
    { icon: 'time-outline', title: 'Order History' },
    { icon: 'heart-outline', title: 'Favorites' },
    { icon: 'settings-outline', title: 'Settings' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="p-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={28} color="#1f2937" />
            </TouchableOpacity>
            <Text className="text-xl font-bold">My Profile</Text>
            <View className="w-8" />
          </View>

          {/* Profile Card */}
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6 items-center">
            <Image
              source={require('../../assets/images/profile.jpg')}
              className="w-32 h-32 rounded-full mb-4 border-4 border-amber-100"
            />
            <Text className="text-2xl font-bold mb-1">Mandara Pabasara</Text>
            <Text className="text-gray-500 mb-4">Food Enthusiast</Text>
            <TouchableOpacity className="bg-amber-100 px-6 py-2 rounded-full">
              <Text className="text-amber-800 font-medium">Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View className="flex-row justify-between mb-6">
            {[
              { value: 24, label: 'Orders' },
              { value: 12, label: 'Favorites' },
              { value: 4.8, label: 'Rating' },
            ].map((stat, index) => (
              <View 
                key={index}
                className="bg-white p-4 rounded-xl shadow-sm flex-1 mx-1 items-center"
              >
                <Text className="text-2xl font-bold text-amber-600">{stat.value}</Text>
                <Text className="text-gray-500">{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Menu Items */}
          <View className="bg-white rounded-xl shadow-sm overflow-hidden">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center p-4 ${index !== 0 ? 'border-t border-gray-100' : ''}`}
              >
                <Ionicons name={item.icon as any} size={22} color="#6b7280" />
                <Text className="ml-4 flex-1">{item.title}</Text>
                <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Create Drawer Navigator
const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

export default function ProfileDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#d97706',
        drawerInactiveTintColor: '#6b7280',
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}