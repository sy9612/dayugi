import React from 'react';
import AppContainer from './src/navigation/AppContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends React.Component {
  render() {
    AsyncStorage.clear();

    return (
      <AppContainer />
    );
  }
}

export default App;