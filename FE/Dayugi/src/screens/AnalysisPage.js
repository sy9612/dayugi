import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomHeader from '../components/CustomHeader';

class AnalysisPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} />
        <Text>분석 페이지</Text>
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

export default AnalysisPage;
