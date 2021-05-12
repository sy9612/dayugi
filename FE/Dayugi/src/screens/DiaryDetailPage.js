import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Separator from '../components/Separator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Dialog from "react-native-dialog";

class DiaryDetailPage extends React.Component{
    state = {
      did : '',
      diary : {},
      dialogVisible : false,
    }

    async componentDidMount() {
      this.state.did = this.props.navigation.getParam('did')
      this.state.authorization = await AsyncStorage.getItem('Authorization');
      
      this.getDiaryByDid();
    }

    getDiaryByDid = () => {
      fetch(`http://k4a206.p.ssafy.io:8080/dayugi/diary?did=${encodeURIComponent(this.state.did)}`, {
        method: "GET",
        headers: {
          "accept" : "*/*",
          "authorization": this.state.authorization
        },
        }).then(response => response.json())
        .then(responseJson => {
          let success = responseJson.success;
          if(success === "success"){
            
          }
          else if(success === "fail"){
            if(responseJson.diary != undefined)
              this.setState({diary : responseJson.diary});
          }
        }
      );
    };

    deleteDiaryByDid = () => {
      fetch(`http://k4a206.p.ssafy.io:8080/dayugi/diary?did=${encodeURIComponent(this.state.did)}`, {
        method: "DELETE",
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

          }
        }
      );
    };


    render(){
        return (
        <View style={styles.container}>
            <CustomHeader navigation = {this.props.navigation}/>
            <View style={styles.diaryContentContainer}>
                <Text style={styles.title}>작성 날짜</Text>
                <Separator />
                <Text style={styles.dateContent}>{moment(this.state.diary.diary_date).format('YYYY-MM-DD')}</Text>
                <Separator />
                <Text style={styles.title}>내용</Text>
                <Separator />
                <Text style={styles.diaryContent}>{this.state.diary.diary_content}</Text>
                <Separator />
                <Text style={styles.title}>한줄평</Text>
                <Separator />
                <Text style={styles.reviewContent}>{this.state.diary.review_content}</Text>
            </View>

            <View style={styles.buttons}>
              <View style={styles.diaryNavigationButton}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("DiaryCalendar");
                  }}>
                  <Text style={{color: 'white'}}>돌아가기</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.diaryUpdateButton}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("DiaryCalendar");
                  }}>
                  <Text style={{color: 'white'}}>수정하기</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.diaryDeleteButton}>
                <TouchableOpacity onPress={() => {
                    this.setState({dialogVisible : true});
                  }}>
                  <Text style={{color: 'white'}}>삭제하기</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>다이어리 삭제</Dialog.Title>
              <Dialog.Description>삭제하시겠습니까?</Dialog.Description>
              <Dialog.Button label="취소" onPress={() => this.setState({dialogVisible : false})}/>
              <Dialog.Button label="삭제" onPress={() => this.deleteDiaryByDid()}/>
            </Dialog.Container>
        </View>
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
    height: 200,
  },
  reviewContent: {
    fontSize: 16,
    marginLeft: 8,
    height: 100,
  },
  buttons: {
    position: 'absolute',
    bottom : 8,
    height: 40,
    width: '100%',
    flexDirection: 'row',
  },
  diaryUpdateButton: {
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaryDeleteButton: {
    flex: 1,
    marginLeft: 4,
    marginRight: 8,
    backgroundColor: '#FF4343',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaryNavigationButton: {
    flex: 1,
    marginLeft: 8,
    marginRight: 4,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiaryDetailPage;