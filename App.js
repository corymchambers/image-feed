import React from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import Constants from 'expo-constants'

import Feed from './screens/Feed'

export default function App() {
  return (
    <View style={styles.container}>
      <Feed style={styles.feed} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    feed: {
        flex: 1,
        marginTop:
            Platform.OS === 'android' || Platform.version < 11
                ? Constants.statusBarHeight
                : 0
  }
});
