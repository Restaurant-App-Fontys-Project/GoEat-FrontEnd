import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Restaurant from './screens/Restaurant';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Restaurant />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
