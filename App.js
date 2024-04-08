// import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Restaurant from './screens/Restaurant'
import ReservationOverview from './screens/ReservationOverview'
import CustomerInfo from './screens/ReservationScreens/CustomerInfo'
import DateTimePicker from './screens/ReservationScreens/DateTimePicker'
import TableLayout from './screens/ReservationScreens/TableLayout'
import Confirmation from './screens/ReservationScreens/Confirmation'
import LoginOptions from './screens/LoginOptions'
import Categories from './screens/Categories'
import Welcome from './screens/Welcome'
import Location from './screens/Location'
import Home from './screens/Home'
import Registration from './screens/Registration'

const Stack = createNativeStackNavigator()
//<StatusBar style='auto' />
export default function App () {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        initialRouteName='Welcome'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#D69F3B'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen
          name='Welcome'
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='LoginOptions'
          component={LoginOptions}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Restaurant' component={Restaurant} />
        <Stack.Screen name='Reservation 1/3' component={DateTimePicker} />
        <Stack.Screen name='Reservation 2/3' component={TableLayout} />
        <Stack.Screen name='Reservation 3/3' component={CustomerInfo} />
        <Stack.Screen name='Confirmation' component={Confirmation} />
        <Stack.Screen name='Categories' component={Categories} />
        <Stack.Screen name='Location' component={Location} />
        <Stack.Screen name='Registration' component={Registration} /> 
        <Stack.Screen
          name='ReservationOverview'
          component={ReservationOverview}
        />
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
