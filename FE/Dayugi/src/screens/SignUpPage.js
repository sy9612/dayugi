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
    rawDate: new Date(),
    date: "",
    mode: 'date',
    show: false,
    navigation: this.props,
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
  
  handleRawDate = date => {
    this.setState({ rawDate: date })
  }

  handleMode = text => {
    this.setState({ mode: text })
  }

  handleShow = Boolean => {
    this.setState({ show: Boolean })
  }

  handleDate = Date => {
    this.setState({ date: this.getFormatDate(Date) })
    console.log(this.state.date);
  }

  validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      return (true)
    return (false)
  }
  
  signUp = (email, password, nickname, birth, selectedDate) => {
    if (password != this.state.checkPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (selectedDate > new Date()) {
      alert("설정된 생일 날짜를 다시 확인해주세요.");
      return;
    }
    let dataObj= {email:email, password:password, nickname:nickname, birth:birth, uid:0};
    fetch('http://k4a206.p.ssafy.io:8080/dayugi/user/join', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj),
      }).then(response => response.json())
      .then(responseJson => {
        let success = responseJson.success;
        if(success == "success"){
          alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
          this.props.navigation.navigate('Login');
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
    fetch('http://k4a206.p.ssafy.io:8080/dayugi/email/mail?userEmail=' + email, {
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
    const currentDate = selectedDate || this.state.rawDate;
    this.handleShow(Platform.OS === 'ios');
    this.handleRawDate(currentDate);
    this.handleDate(currentDate);
  };

  showMode = (currentMode) => {
    this.handleShow(true);
    this.handleMode(currentMode);
  };

  showDatepicker = () => {
    this.showMode('date');
  };
  
  getFormatDate = (date) => {
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }

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
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              value={this.state.date}
              placeholder="birth"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              editable={false}
            />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.showDatepicker()}
              >
                <Text style={styles.submitButtonText}>생일 설정</Text>
              </TouchableOpacity>
            </View>
            { this.state.show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.rawDate}
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
              onPress={() => this.signUp(this.state.email, this.state.password, this.state.nickName, this.state.date, this.state.rawDate)}
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