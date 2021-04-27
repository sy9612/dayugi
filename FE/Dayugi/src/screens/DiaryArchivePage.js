import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomHeader from '../components/CustomHeader';

class DiaryArchivePage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation = {this.props.navigation}/>
        <Text>모아보기 페이지</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
});

export default DiaryArchivePage