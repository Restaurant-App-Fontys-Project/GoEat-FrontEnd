import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Restaurant from './screens/Restaurant'
import Reservation from './screens/Reservation'

const Stack = createNativeStackNavigator();
//<StatusBar style='auto' />
export default function App () {
  return (
    
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName='Restaurant'>
          <Stack.Screen name='Restaurant' component={Restaurant} />
          <Stack.Screen name='Reservation' component={Reservation} />            
        </Stack.Navigator>
      </NavigationContainer>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  }
})