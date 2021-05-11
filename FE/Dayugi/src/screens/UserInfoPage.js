import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import DialogInput from 'react-native-dialog-input';

class UserInfoPage extends React.Component {
  state = {
    uid: "none",
    email: '',
    password: '',
    nickName: '',
    birth: '',
    visible: false,
    checkText: '',
  };

  handleUid = text => {
    this.setState({ uid: text });
  };
  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  handleNickName = text => {
    this.setState({ nickName: text });
  };
  handleBirth = text => {
    this.setState({ birth: text });
  };
  handleVisible = bool => {
    this.setState({ visible: bool })
  };
  handleCheckTest = text => {
    this.setState({ checkText: text });
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
    

  withdraw = async (checkText, email) => {
    this.handleVisible(false);
    if(checkText === '확인'){
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
  };

  changeInfo = async () => {
    console.log(this.state.email);
    var dataObj = {
      birth: this.state.birth, email: this.state.email, nickname: this.state.nickName,
      password: this.state.password, uid: 0
    }
    console.log(dataObj);
    fetch('http://k4a206.p.ssafy.io:8080/dayugi/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await AsyncStorage.getItem('Authorization'),
      },
      body: JSON.stringify(dataObj),
    }).then(response => response.json())
      .then(responseJson => {
        if (responseJson.success)
          alert('성공적으로 회원정보가 변경되었습니다.');
        else
          alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      })

  }
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} />
        <View>
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
            Password: 
          </Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.handlePassword}
            editable={true}
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
            onChangeText={this.handleNickName}
            editable={true}
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
            onPress={() => this.changeInfo()}
          >
            <Text style={styles.submitButtonText}>회원정보 변경</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Btn}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.handleVisible(true)}
          >
            <Text style={styles.submitButtonText}>회원탈퇴</Text>
          </TouchableOpacity>
          <DialogInput isDialogVisible={this.state.visible}
            title={"회원 탈퇴 확인"}
            message={"정말 탈퇴를 원하실 경우 입력창에 '확인'을 입력해주세요"}
            hintInput ={"확인"}
            submitInput={ (inputText) => {this.withdraw(inputText, this.state.email)} }
            closeDialog={ () => {this.handleVisible(false)}}>
          </DialogInput>
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
