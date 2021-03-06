import React from 'react'
import { AppLoading } from 'expo'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider } from 'react-native-paper'
import theme from './utils/theme'
import {
  fetchParks,
  setLocation,
  fetchActivities,
  fetchFacilities,
} from './utils/api'
import { DataProvider } from './utils/DataContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './navigation/TabNavigator'

const Main = () => {
  const [isLoading, setLoading] = React.useState(true)
  const [fontsLoaded] = useFonts({
    bcsans: require('../assets/fonts/BCSans.otf'),
    'bcsans-bold': require('../assets/fonts/BCSans-Bold.otf'),
    'bcsans-bold-italic': require('../assets/fonts/BCSans-Bold-Italic.otf'),
    'bcsans-italic-bold': require('../assets/fonts/BCSans-Bold-Italic.otf'),
    'bcsans-italic': require('../assets/fonts/BCSans-Italic.otf'),
  })

  React.useEffect(() => {
    async function loadData() {
      await fetchParks()
      await setLocation()
      await fetchActivities()
      await fetchFacilities()
      setLoading(false)
    }

    loadData()
  }, [])

  if (!fontsLoaded || isLoading) {
    return <AppLoading />
  } else {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <SafeAreaProvider>
            <DataProvider>
              <StatusBar style="light" />
              <TabNavigator />
            </DataProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </PaperProvider>
    )
  }
}

export default Main
