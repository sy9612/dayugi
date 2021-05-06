import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';

class LoginPage extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleEmail = text => {
    this.setState({ email: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  login = (email, password) => {
    let dataObj= {email:email, password:password};
    fetch('http://k4a206.p.ssafy.io:8080/dayugi/user', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj),
      }).then(response => response.json())
      .then(responseJson => {
        let success = responseJson.success;
        if(success == "success"){
          let uid = responseJson.data['uid'];
          let email= responseJson.data['email'];
          let nickName = responseJson.data.['nickname'];
          alert("uid: " + uid + ", email: " + email + ", nickName: " + nickName);
        }
        else {
          alert("Id 또는 비밀번호를 확인해주세요.");
        }
      }
    );
    
  };
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation = {this.props.navigation}/>
        <View>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder=" Email"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={this.handleEmail}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder=" Password"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            secureTextEntry = { true }
            onChangeText={this.handlePassword}
          />
        </View>
        
        <View style={styles.Btn}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.login(this.state.email, this.state.password)}
          >
            <Text style={styles.submitButtonText}>로그인</Text>
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
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
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

export default LoginPage