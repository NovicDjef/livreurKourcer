import { Ionicons } from '@expo/vector-icons';
import { DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={({ navigation }) => ({
          drawerPosition: 'left',
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#021520',
            width: 250,
          },
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="options" size={24} />
            </TouchableOpacity>
          ),
          drawerInactiveTintColor: '#021520',
          drawerLabelStyle: {
            color: 'white',
          },
        })}
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 200,
                  width: '100% ',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#021520',
                  paddingBottom: 12,
                }}>
                <Image
                  source={require('../assets/images/novic.png')}
                  resizeMode="contain"
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 999,
                  }}
                />
                <Text
                  style={{
                    fontSize: 22,
                    color: 'white',
                    borderRadius: 8,
                  }}>
                  Novic Melataguia
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'gray',
                  }}>
                  Frontend developer
                </Text>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: () => (
              <Ionicons
                name="home"
                size={26}
                style={{
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="orderHistory"
          options={{
            drawerLabel: 'Order History',
            drawerIcon: () => (
              <Ionicons
                name="cart"
                size={26}
                style={{
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="notifications"
          options={{
            drawerLabel: 'Notifications',
            drawerIcon: () => (
              <Ionicons
                name="notifications"
                size={26}
                style={{
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="setting"
          options={{
            drawerLabel: 'Settings',
            drawerIcon: () => (
              <Ionicons
                name="cog"
                size={26}
                style={{
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: 'A propos',
            drawerIcon: () => (
              <Ionicons
                name="trail-sign"
                size={26}
                style={{
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="logout"
          options={{
            drawerLabel: 'Logout',
            drawerIcon: () => (
              <Ionicons
                name="log-out"
                size={26}
                style={{
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
