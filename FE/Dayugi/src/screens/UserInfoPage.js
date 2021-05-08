import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, BackHandler } from 'react-native';
import CustomHeader from '../components/CustomHeader';

class UserInfoPage extends React.Component {
  state = {
    uid: "none",
    email: '',
    nickName: '',
    birth: '',
  };

  handleUid = text => {
    this.setState({ uid: text });
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handleNickName = text => {
    this.setState({ nickName: text });
  };
  handleBirth= text => {
    this.setState({ birth: text });
  };

  componentDidMount() {
    this.callApi().then(res => {
      this.handleUid(String(res.data['uid']));
      this.handleBirth(String(res.data['birth']).substring(0, 10));
      this.handleNickName(String(res.data['nickname']));
    });
  }

  async checkLogin() {
    this.handleUid(String(await AsyncStorage.getItem("uid")));
    if (this.state.uid === 'null') {
        alert("로그인 후 이용해주세요.");
        this.props.navigation.navigate("DiaryCalendar");
    }  
  }
  callApi = async () => {
    this.checkLogin();
    this.handleEmail(String(await AsyncStorage.getItem("email")));
    const response = await fetch('http://k4a206.p.ssafy.io:8080/dayugi/user?email=' + this.state.email, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await AsyncStorage.getItem('Authorization'),
      },
    });
    const body = await response.json();
    return body;
  };
    

  withdraw = async (email) => {
    fetch('http://k4a206.p.ssafy.io:8080/dayugi/user?email=' + email, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await AsyncStorage.getItem('Authorization'),
      },
    }).then(response => response.json())
      .then(responseJson => {
        let success = responseJson.success;
        if (success == 'success') {
          alert('지금까지 이용해주셔서 감사합니다.');
          AsyncStorage.clear();
          this.props.navigation.navigate("TutorialPage");
        }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} />
        <View>
          <Text>
            Uid: 
          </Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            value={this.state.uid}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            editable={false}
          />
          <Text>
            Email: 
          </Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            value={this.state.email}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            editable={false}
          />
          <Text>
            NickName: 
          </Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            value={this.state.nickName}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            editable={false}
          />
          <Text>
            Birth: 
          </Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            value={this.state.birth}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            editable={false}
          />
        </View>
        <View style={styles.Btn}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.withdraw(this.state.email)}
          >
            <Text style={styles.submitButtonText}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
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
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});

export default UserInfoPage;
