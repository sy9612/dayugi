import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { Calendar } from 'react-native-calendars';
import Separator from '../components/Separator';
import checkFirstLaunch from '../utils/CheckFirstLaunch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

class DiaryCalendarPage extends React.Component{
    state = {
      uid: '',
      authorization: '',
      currentYear: '',
      currentMonth: '',
      currentDay: '',
      contents:[
      
      ],
      markedDate: {},
      selectedContent : '',
      selectedDiaryID : '',
    }

    async componentDidMount() {
      const isFirstLaunch = await checkFirstLaunch();
      this.state.uid = await AsyncStorage.getItem('uid');
      this.state.authorization = await AsyncStorage.getItem('Authorization');
      
      if(isFirstLaunch){
        this.props.navigation.navigate("Tutorial");
      }
      else{
        this.getAllDiary();
      }
    }

    getAllDiary = () => {
      fetch(`http://k4a206.p.ssafy.io:8080/dayugi/diary/all?uid=${encodeURIComponent(this.state.uid)}`, {
        method: "GET",
        headers: {
          "accept" : "*/*",
          "authorization": this.state.authorization
        },
        }).then(response => response.json())
        .then(responseJson => {
          let success = responseJson.success;
          if(success === "success"){
            let mDate = {};
            for (let i = 0; i < responseJson.diaries.length; i++) {
              let date = moment(responseJson.diaries[i].diary_date).format('YYYY-MM-DD');
              mDate[date] = {marked : true};
            }
            this.setState({markedDate : mDate});
            this.setState({contents : responseJson.diaries});
          }
          else if(success === "fail"){
            this.setState({contents : []});
          }
        }
      );
    };

    render(){

        return (
        <View style={styles.container}>
            <CustomHeader navigation = {this.props.navigation}/>
            <Calendar
                theme={{
                    calendarBackground: '#fff',
                }} 
                markedDates={this.state.markedDate}
                onDayPress={d => {
                  this.setState({
                    currentYear: d.year,
                    currentMonth: ("0" + (d.month)).slice(-2),
                    currentDay: ("0" + (d.day)).slice(-2),
                  });

                  var content = "작성한 내용이 없습니다.";
                  var did = -1;
                  this.state.contents.forEach((data) => {
                    if(d.dateString == moment(data.diary_date).format('YYYY-MM-DD')){
                      content = data.diary_content;
                      did = data.did;
                    }
                  });
                  this.setState({selectedContent : content});
                  this.setState({selectedDiaryID : did});
                }}
                monthFormat={'yyyy MM'}
                hideExtraDays={false}
                firstDay={1}
            />
            <Separator />
            <View style={styles.diaryContentContainer}>
                <Text style={styles.diaryDate}>{this.state.currentYear}{this.state.currentYear != '' ? '-' : ''}{this.state.currentMonth}{this.state.currentYear != '' ? '-' : ''}{this.state.currentDay}</Text>
                <Separator />
                <Text style={styles.diaryContent}>{this.state.selectedContent}</Text>
            </View>
            
            <View style={this.state.selectedContent != '' ? styles.diaryNavigationButton : null}>
              <TouchableOpacity onPress={() => {
                  this.state.selectedContent != "작성한 내용이 없습니다." 
                  ? this.props.navigation.navigate("DiaryDetail", {did : this.state.selectedDiaryID}) 
                  : this.props.navigation.navigate("DiaryWrite", {year : this.state.currentYear, month : this.state.currentMonth, day : this.state.currentDay}) 
                }}>
                <Text style={{color: 'white'}}>{ this.state.selectedContent != "작성한 내용이 없습니다." ? "상세조회" : "작성하기" }</Text>
              </TouchableOpacity>
            </View>
            
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
  },
  diaryDate: {
    fontSize: 14,
    marginLeft: 8,
  },
  diaryContent: {
    fontSize: 16,
    marginLeft: 8,
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
});

export default DiaryCalendarPage;