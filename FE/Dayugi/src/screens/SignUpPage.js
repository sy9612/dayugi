import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import DateTimePicker from '@react-native-community/datetimepicker';

class SignUpPage extends React.Component {
  state = {
    email: "",
    password: "",
    checkPassword: "",
    nickName: "",
    checkedEmail: false,
    notDuplicated: false,
    authorizedEmail: false,
    sendEmail: false,
    authCode: "",
    inputCode: "",
    date: new Date(),
    mode: 'date',
    show: false,
  };

  handleEmail = text => {
    this.setState({ email: text });
    this.setState({ checkedEmail: false });
    this.setState({ notDuplicated: false });
    this.setState({ sendEmail: false });
  };

  handleCode = text => {
    this.setState({ inputCode: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };
  
  handleCheckPassword = text => {
    this.setState({ checkPassword: text });
  };

  handleNickName = text => {
    this.setState({ nickName: text });
  };
  
  handleDate = Date => {
    this.setState({ date: Date })
    console.log(this.state.date);
  }

  handleMode = text => {
    this.setState({ mode: text })
  }

  handleShow = Boolean => {
    this.setState({ show: Boolean })
  }

  validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      return (true)
    return (false)
  }
  
  signUp = (email, password) => {
    let dataObj= {email:email, password:password, uid:0};
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
          let nickName = responseJson.data['nickname'];
          alert("uid: " + uid + ", email: " + email + ", nickName: " + nickName);
        }
        else {
          alert("Id 또는 비밀번호를 확인해주세요.");
        }
      }
    );
  };

  checkEmail = (email) => {
    if (!this.validateEmail(email)) {
      alert("유효하지 않은 이메일 형식입니다.");
      return;
    }
    fetch('http://k4a206.p.ssafy.io:8080/dayugi/user/check?email=' + this.state.email, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(response => response.json())
      .then(responseJson => {
        let success = responseJson.success;
        if (success == "success") {
          this.setState({ checkedEmail: true });
          this.setState({ notDuplicated: true });
          alert('사용 가능한 Email입니다.');
        }
        else {
          alert('이미 가입된 Email입니다.');
        }
      }
    );
  };

  sendAuthMail = (email) => {
    let dataObj = { userEmail : email };
    fetch('http://k4a206.p.ssafy.io:8080/dayugi/email/mail?userEmail=' + this.state.email, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        let success = responseJson.success;
        if (success == "success") {
          this.setState({ authCode: responseJson.result });
          this.setState({ sendEmail: true });
          alert(responseJson.message);
        }
        else {
          alert('인증 이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      }
    );
  };
  emailAuth = (inputCode) => {
    if (inputCode == this.state.authCode) {
      alert('이메일 인증에 성공했습니다.');
      this.setState({ notDuplicated: false });
      this.setState({ authorizedEmail: true });
      this.setState({ sendEmail: false });

    }
    else {
      alert('인증번호를 다시 확인해주세요.');
    }
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.handleShow(Platform.OS === 'ios');
    this.handleDate(currentDate);
  };

  showMode = (currentMode) => {
    this.handleShow(true);
    this.handleMode(currentMode);
  };

  showDatepicker = () => {
    this.showMode('date');
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
            autoCompleteType="email"
            keyboardType="email-address"
            editable={!this.state.authorizedEmail}
            onChangeText={this.handleEmail}
          />
          {
            this.state.sendEmail &&
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="인증코드"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleCode}
            />
          }
          <View style={styles.Btn}>
            {
              this.state.sendEmail &&
              <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => this.emailAuth(this.state.inputCode)}
                >
                  <Text style={styles.submitButtonText}>이메일 인증</Text>
                </TouchableOpacity>
            }
            {
              !this.state.checkedEmail &&
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.checkEmail(this.state.email)}
              >
                <Text style={styles.submitButtonText}>중복확인</Text>
              </TouchableOpacity>
            }
            {
              this.state.notDuplicated && 
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.sendAuthMail(this.state.email)}
              >
                <Text style={styles.submitButtonText}>인증메일 전송</Text>
              </TouchableOpacity>
            }
          </View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder=" Password"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              secureTextEntry = { true }
              onChangeText={this.handlePassword}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder=" PasswordCheck"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={this.handleCheckPassword}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder=" nickName"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleNickName}
            />
            <View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.showDatepicker()}
              >
                <Text style={styles.submitButtonText}>Show date picker!</Text>
              </TouchableOpacity>
            </View>
            { this.state.show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.date}
                mode={this.state.mode}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
            )}
          </View>
        
        <View style={styles.Btn}>
          {
            this.state.authorizedEmail &&
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.signUp(this.state.email, this.state.password)}
            >
              <Text style={styles.submitButtonText}>회원가입</Text>
            </TouchableOpacity>
          }
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

export default SignUpPage