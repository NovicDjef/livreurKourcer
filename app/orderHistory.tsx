import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const historyData = [
  {
    id: '1',
    title: 'Eru, TochopEtYamo, bonamoussadi',
    icon: 'document-text-outline',
    iconColor: '#8080FF',
    time: '10:00 AM - 12:30 PM',
    duration: '3 Days running',
    durationColor: '#E6E6FF',
    name: 'Stephane Loic',
    phone: '+237 690089951',
    location: 'Akwa, rue memoz, michelin',
  },
  {
    id: '2',
    title: 'Poulet pane, KMC, Deido',
    icon: 'cube-outline',
    iconColor: '#FFA07A',
    time: '02:00 PM - 12:30 PM',
    duration: '5 Days running',
    durationColor: '#FFE4E1',
    name: 'Jane Smith',
    phone: '+237 690089951',
    location: 'Makepe rond poulin',
  },
  {
    id: '3',
    title: 'Sauce blanche, Lepop',
    icon: 'pencil-outline',
    iconColor: '#20B2AA',
    time: '04:00 PM - 10:30 PM',
    duration: '1 Days running',
    durationColor: '#E0FFFF',
    name: 'Novic Tonleu',
    phone: '+237 690089951',
    location: 'logpom, Chateau rouge',
  },
];

const HistoryItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.itemContainer}>
    <View style={[styles.iconContainer, { backgroundColor: item.iconColor + '20' }]}>
      <Ionicons name={item.icon} size={24} color={item.iconColor} />
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.detailsContainer}>
        <Ionicons name="time-outline" size={12} color="#888" />
        <Text style={styles.time}>{item.time}</Text>
        <View style={[styles.durationContainer, { backgroundColor: item.durationColor }]}>
          <Text style={[styles.duration, { color: item.iconColor }]}>{item.duration}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const OrderHistory = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();

  const handleItemPress = (item) => {
    setSelectedItem(item);
    bottomSheetRef.current?.expand();
  };

  const handlePhonePress = (phone) => {
    const phoneUrl = `tel:${phone}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          console.log('Phone number is not available');
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const handleViewRoute = () => {
    // Fermez le BottomSheet
    bottomSheetRef.current?.close();
    // Naviguez vers la carte avec les paramètres nécessaires
    navigation.navigate('index', {
      destination: selectedItem.location,
      title: selectedItem.title,
    });
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Fallback si on ne peut pas revenir en arrière
      // Par exemple, naviguer vers un écran d'accueil
      navigation.navigate('index');
    }
  };

  const renderBottomSheetContent = () => (
    <View style={styles.bottomSheetContent}>
      {selectedItem && (
        <>
          <Text style={styles.bottomSheetTitle}>{selectedItem.title}</Text>
          <View style={styles.infoRow}>
            <View style={[styles.backbotton, { backgroundColor: '#20B2AA' + '30' }]}>
              <Ionicons name="person-outline" size={24} color="#555" />
            </View>
            <Text style={styles.infoText}>{selectedItem.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.infoRow}
            //onPress={() => handlePhonePress(selectedItem.phone)}
          >
            <View style={[styles.backbotton, { backgroundColor: '#20B2AA' + '30' }]}>
              <Ionicons name="call-outline" size={24} color="#007AFF" />
            </View>
            <Text style={[styles.infoText, styles.phoneText]}>{selectedItem.phone}</Text>
          </TouchableOpacity>
          <View style={styles.infoRow}>
            <View style={[styles.backbotton, { backgroundColor: '#20B2AA' + '30' }]}>
              <Ionicons name="location-outline" size={24} color="#555" />
            </View>
            <Text style={styles.infoText}>{selectedItem.location}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => bottomSheetRef.current?.close()}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.routeButton]} onPress={handleViewRoute}>
              <Text style={styles.buttonText}>Voir itinéraire</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={[styles.backbotton, { backgroundColor: '#20B2AA' + '20' }]}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={[styles.header, { top: 8 }]}>Historique des Commandes</Text>
      </View>
      <View style={{ flex: 1, top: 12 }}>
        <FlatList
          data={historyData}
          renderItem={({ item }) => <HistoryItem item={item} onPress={handleItemPress} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={['50%']} enablePanDownToClose>
        {renderBottomSheetContent()}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
    top: 34,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
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
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
    marginRight: 8,
  },
  durationContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  duration: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
  phoneText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  routeButton: {
    backgroundColor: '#007AFF',
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default OrderHistory;
