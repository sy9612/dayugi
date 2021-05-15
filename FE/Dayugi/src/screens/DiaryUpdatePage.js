import React from 'react';
import { Keyboard, StyleSheet, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Separator from '../components/Separator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

class DiaryUpdatePage extends React.Component{
  state = {
    year : '',
    month : '',
    day : '',
    diaryContent : '',
    uid : '',
    diary : {},
    authorization : '',
  }

  async componentDidMount() {
    let diary = this.props.navigation.getParam('diary');
    this.state.uid = await AsyncStorage.getItem('uid');
    this.state.authorization = await AsyncStorage.getItem('Authorization');
    this.setState({
      diary : diary, 
      diaryContent : diary.diary_content, 
      year : moment(diary.diary_date).format('YYYY'), 
      month : moment(diary.diary_date).format('MM'), 
      day : moment(diary.diary_date).format('DD')
    });
  }

  updateDiary = () => {
    let date = this.state.year + '-' + this.state.month + '-' + this.state.day;
    let dataObj = {
      "diary_content" : this.state.diaryContent,
      "diary_date" : date,
      "did" : this.state.diary.did,
      "user" : {
        "uid" : this.state.uid
      }
    }
    fetch(`http://k4a206.p.ssafy.io:8080/dayugi/diary`, {
      method: "PUT",
      headers: {
        "accept": "*/*",
        "authorization": this.state.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataObj),
      }).then(response => response.json())
      .then(responseJson => {
        let success = responseJson.success;
        if(success === "success"){
          // ????
        }
        else if(success === "fail"){
          this.props.navigation.navigate("DiaryCalendar");
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
            <TextInput 
              style={styles.diaryContent}
              underlineColorAndroid="transparent"
              placeholder="내용을 입력하세요."
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              multiline={true}
              onChangeText={(text) => this.setState({diaryContent : text})}>
              {this.state.diaryContent}
            </TextInput>
            
        </View>

        <View style={styles.buttons}>
          <View style={styles.diaryNavigationButton}>
            <TouchableOpacity style={styles.touchArea} onPress={() => {
                this.props.navigation.navigate("DiaryCalendar");
              }}>
              <Text style={{color: 'white'}}>돌아가기</Text>
            </TouchableOpacity>
          </View>

          <View style={this.state.diaryContent != '' ? styles.diaryUpdateButton : styles.diaryUpdateButtonDiabled }>
            <TouchableOpacity style={styles.touchArea} onPress={() => {
                if(this.state.diaryContent != '')
                  this.updateDiary();
                else
                  alert("내용을 입력해주세요")
              }}>
              <Text style={{color: 'white'}}>수정하기</Text>
            </TouchableOpacity>
          </View>
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
  },
  touchArea:{
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    position: 'absolute',
    bottom : 8,
    height: 40,
    width: '100%',
    flexDirection: 'row',
  },
  diaryNavigationButton: {
    flex: 1,
    marginLeft: 8,
    marginRight: 4,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  diaryUpdateButton: {
    flex: 1,
    marginLeft: 4,
    marginRight: 8,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  diaryUpdateButtonDisabled: {
    flex: 1,
    marginLeft: 4,
    marginRight: 8,
    backgroundColor: '#aaa',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiaryUpdatePage;