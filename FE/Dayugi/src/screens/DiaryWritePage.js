import React from 'react';
import { Keyboard, StyleSheet, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Separator from '../components/Separator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

class DiaryWritePage extends React.Component{
  state = {
    year : '',
    month : '',
    day : '',
    diaryContent : '',
    uid : '',
    authorization : '',
  }

  async componentDidMount() {
    let y = this.props.navigation.getParam('year');
    let m = this.props.navigation.getParam('month')
    let d = this.props.navigation.getParam('day')
    this.state.uid = await AsyncStorage.getItem('uid');
    this.state.authorization = await AsyncStorage.getItem('Authorization');
    this.setState({year : y, month : m, day : d});
  }

  writeDiary = () => {
    let date = this.state.year + '-' + this.state.month + '-' + this.state.day;
    fetch(`http://k4a206.p.ssafy.io:8080/dayugi/diary?diary_content=${encodeURIComponent(this.state.diaryContent)}&diary_date=${encodeURIComponent(date)}&did=0&user.uid=${encodeURIComponent(this.state.uid)}`, {
      method: "POST",
      headers: {
        "accept" : "*/*",
        "authorization": this.state.authorization
      },
      }).then(response => response.json())
      .then(responseJson => {
        let success = responseJson.success;
        if(success === "success"){
          this.props.navigation.navigate("DiaryCalendar");
        }
        else if(success === "fail"){
          alert("오류 발생!")
        }
      }
    );
  };

  render(){
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomHeader navigation = {this.props.navigation}/>
        <View style={styles.diaryContentContainer}>
            <Text style={styles.title}>작성 날짜</Text>
            <Separator />
            <Text style={styles.dateContent}>{this.state.year}-{this.state.month}-{this.state.day}</Text>
            <Separator />
            <Text style={styles.title}>내용</Text>
            <Separator />
            <ScrollView>
              <TextInput 
                style={styles.diaryContent}
                underlineColorAndroid="transparent"
                placeholder="내용을 입력해주세요."
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                multiline={true}
                onChangeText={(text) => this.setState({diaryContent : text})}
              />
            </ScrollView>
            <Separator />
            <Text style={styles.title}>이미지</Text>
            <Separator />
            <View style={styles.diaryImageContainer}>
              <TouchableOpacity style={styles.diaryImage}>
                <Text style={{color:'#aaa'}}>이미지 추가하기</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={this.state.diaryContent != '' ? styles.diaryNavigationButton : styles.diaryNavigationButtonDisabled }>
          <TouchableOpacity onPress={() => {
              if(this.state.diaryContent != '')
                this.writeDiary();
              else
                alert("내용을 입력해주세요")
            }}>
            <Text style={{color: 'white'}}>작성하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
    )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  diaryContentContainer: {
    height: '100%',
    width: '100%',
    marginTop: 8,
  },
  title: {
    fontSize: 14,
    marginLeft: 8,
  },
  dateContent: {
    fontSize: 16,
    marginLeft: 8,  
  },
  diaryContent: {
    fontSize: 16,
    marginLeft: 8,
    height: '100%',
  },
  diaryImageContainer:{
    height : 180,
    margin : 8,
    marginBottom : 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaryImage: {
    backgroundColor: '#eee',
    borderRadius : 5,
    width: "100%",
    height: "100%", 
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaryNavigationButton: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaryNavigationButtonDisabled: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    height: 40,
    backgroundColor: '#aaa',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiaryWritePage;