import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Switch } from 'react-native';

const Settings = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Fallback si on ne peut pas revenir en arrière
      // Par exemple, naviguer vers un écran d'accueil
      navigation.navigate('Home');
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleGoBack}
        style={[styles.menuIconContainer, { backgroundColor: '#20B2AA' + '20', borderRadius: 12 }]}>
        <Ionicons name="chevron-back" size={24} />
      </TouchableOpacity>
      <View style={styles.profileSection}>
        <Image source={require('../assets/images/novic.png')} style={styles.profileImage} />
        <Text style={styles.username}>Novic Tonleu</Text>
        <Text style={styles.joinDate}>Frontend Developer</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1.002</Text>
            <Text style={styles.statLabel}>Total post</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2.102</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2.712</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="card-outline" size={24} color="#FF69B4" />
          </View>
          <Text style={styles.menuText}>Payment</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="heart-outline" size={24} color="#FF69B4" />
          </View>
          <Text style={styles.menuText}>Favorites</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="settings-outline" size={24} color="#FF69B4" />
          </View>
          <Text style={styles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="language" size={24} color="#FF69B4" />
          </View>
          <Text style={styles.menuText}>Language</Text>
          <Text style={styles.languageValue}>English</Text>
        </View>

        <View style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="moon-outline" size={24} color="#FF69B4" />
          </View>
          <Text style={styles.menuText}>Dark Mode</Text>
          <Switch value={false} />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F5',
    padding: 20,
    top: 28,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#20B2AA',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  joinDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
  languageValue: {
    fontSize: 16,
    color: '#888',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#20B2AA',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
