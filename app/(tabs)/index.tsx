import { StyleSheet, Platform, Alert, StatusBar } from 'react-native'
import { View, Dimensions } from 'react-native'
import WebView from 'react-native-webview'
import { BackHandler } from 'react-native'
import { createRef, useEffect, useState } from 'react'

const { width, height } = Dimensions.get('window')

export default function HomeScreen() {
  const webViewRef = createRef()
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    const backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (canGoBack) {
          webViewRef.current.goBack()
          return true
        } else {
          Alert.alert(
            'Exit App',
            'Are you sure you want to exit the app?',
            [
              { text: 'Cancel', onPress: () => {}, style: 'cancel' },
              { text: 'Exit', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
          )

          return true
        }
      }
    )

    return () => backHandlerSubscription.remove()
  }, [canGoBack])

  const handleCanGoBackChange = (state) => setCanGoBack(state.canGoBack)

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#d44a01"
        barStyle={'default'}
      />
      <WebView
        source={{ uri: 'https://f7.rvbmatrimony.com/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        ref={webViewRef}
        onNavigationStateChange={handleCanGoBackChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
  webview: {
    marginTop: 45,
    width,
    height,
  },
})
