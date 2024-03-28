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
import Home from './screens/Home'

const Stack = createNativeStackNavigator()
//<StatusBar style='auto' />
export default function App () {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName='LoginOptions'>
        <Stack.Screen name='LoginOptions' component={LoginOptions} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Restaurant' component={Restaurant} />
        <Stack.Screen name='DateTimePicker' component={DateTimePicker} />
        <Stack.Screen name='TableLayout' component={TableLayout} />
        <Stack.Screen name='CustomerInfo' component={CustomerInfo} />
        <Stack.Screen name='Confirmation' component={Confirmation} />
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
