import React from 'react';
import AppContainer from './src/navigation/AppContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, Modal } from 'react-native';

import * as Font from 'expo-font';

class App extends React.Component {
  state = {
    isReady: false
  }
  async componentDidMount() {
    await Font.loadAsync({
      빙그레: require('./assets/fonts/BinggraeSamanco-Bold.ttf'),
      나눔손글씨_느릿느릿: require('./assets/fonts/nanum_nurit.ttf'),
      나눔손글씨_동화또박: require('./assets/fonts/nanum_ddobbak.ttf'),
      메이플스토리: require('./assets/fonts/Maplestory_Bold.ttf')
    });
    this.handleIsReady(true);
  }
  handleIsReady = boolean => {
    this.setState({ isReady: boolean });
  }

  render() {
    // AsyncStorage.clear();
    if(this.state.isReady){
      return (
        <AppContainer />
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Modal transparent animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.loading}>
                <Text style={styles.loadingText}>로딩중입니다...</Text>
              </View>
            </View>
          </Modal>
        </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    width:200,
    height:200,
    backgroundColor: '#000',
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  loadingText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
    width: '100%',
    height: '100%',
  },
});
export default App;