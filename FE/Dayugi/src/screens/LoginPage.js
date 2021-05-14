import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginPage extends React.Component {
  state = {
    email: "",
    password: "",
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
          let uid = String(responseJson.data['uid']);
          let nickName = String(responseJson.data['nickname']);
          let Authorization = String(responseJson.Authorization);
          AsyncStorage.setItem('uid', uid);
          AsyncStorage.setItem('email', this.state.email);
          AsyncStorage.setItem('nickName', nickName);
          AsyncStorage.setItem('Authorization', Authorization);
          this.props.navigation.navigate("DiaryCalendar");
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
        <CustomHeader navigation={this.props.navigation} />
        <View style={styles.logoImage}>
          <Image source={require('../../assets/images/dayugi.png')} />
          <Text style={styles.logo}>Dayugi</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder=" Email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={this.handleEmail}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder=" Password"
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
            <Text style={styles.submitButtonText}>로 그 인</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
    width: '100%',
  },
  input: {
    margin: 10,
    marginBottom: 10,
    marginLeft: 70,
    marginRight: 70,
    height: 40,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#FF7E36",
    padding: 10,
    marginTop: 10,
    marginLeft: 70,
    marginRight: 70,
    height: 40,
    borderRadius: 5,
  },
  submitButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: 'bold'
  },
  logoImage: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  logo: {
    color: '#FF7E36',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily:'Chilgok_Cye'
  }
});

export default LoginPage