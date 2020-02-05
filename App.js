import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'

import AuthorRow from './components/AuthorRow'

export default function App() {
  return (
    <View style={styles.container}>
      <AuthorRow
        fullname={'First Last'}
        linkText={'Comments'}
        onPressLinkText={() => {
            console.log('pressed')
        }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
});
