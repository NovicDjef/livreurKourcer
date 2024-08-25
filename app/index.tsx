import { Stack } from 'expo-router';
import { View } from 'react-native';

import MapViews from '../components/MapViews';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={{ flex: 1 }}>
        <MapViews />
      </View>
    </>
  );
}
