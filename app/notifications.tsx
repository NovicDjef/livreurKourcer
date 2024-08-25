import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

const notificationData = [
  {
    id: '1',
    icon: 'medical',
    iconColor: '#FF6B6B',
    message: "You can't do medical procedures for Tomography",
    time: '10 min',
  },
  {
    id: '2',
    icon: 'medkit',
    iconColor: '#FFD93D',
    message: 'You have checked your medication at the hospital',
    time: '2h ago',
  },
  {
    id: '3',
    icon: 'alert-circle',
    iconColor: '#6BCB77',
    message: 'You have a new allergy and intolerance: Milk Coffee Allergy',
    time: '2d ago',
  },
  {
    id: '4',
    icon: 'lock-closed',
    iconColor: '#4D96FF',
    message:
      'OB Health 7757345 is your token verification code. For your security, do not share this code.',
    time: '3d ago',
  },
  {
    id: '5',
    icon: 'document-text',
    iconColor: '#9D65C9',
    message: 'You have just had the vaccine for further information please contact your doctor',
    time: 'Last Month',
  },
];

const NotificationItem = ({ item, onDelete }) => {
  const renderRightActions = (progress, dragX) => {
    return (
      <RectButton
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert('Delete Notification', 'Are you sure you want to delete this notification?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => onDelete(item.id) },
          ]);
        }}>
        <Ionicons name="trash-outline" size={24} color="white" />
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.notificationItem}>
        <View style={[styles.iconContainer, { backgroundColor: item.iconColor }]}>
          <Ionicons name={item.icon} size={24} color="white" />
        </View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationText}>{item.message}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationData);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const onDelete = useCallback((id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simuler un chargement de données
    setTimeout(() => {
      setNotifications(notificationData);
      setRefreshing(false);
    }, 2000);
  }, []);

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
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={[styles.backbotton, { backgroundColor: '#20B2AA' + '20' }]}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={[styles.header, { top: 8 }]}>Notifications User </Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} onDelete={onDelete} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
    top: 34,
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  backbotton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'red',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Notifications;
