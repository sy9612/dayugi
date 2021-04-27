import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class GalleryPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text>갤러리 페이지</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GalleryPage