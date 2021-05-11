import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { Calendar } from 'react-native-calendars';
import Separator from '../components/Separator';
import checkFirstLaunch from '../utils/CheckFirstLaunch';
import moment from 'moment';

class DiaryCalendarPage extends React.Component{
    state = {
      currentYear: '',
      currentMonth: '',
      currentDay: '',
      contents:[
      
      ],
      markedDate: {},
      selectedContent : '',
    }

    async componentDidMount() {
      const isFirstLaunch = await checkFirstLaunch();
      
      if(isFirstLaunch){
        this.props.navigation.navigate("Tutorial");
      }
      else{
        
      }
    }

    getAllDiary = () => {
      fetch(`http://k4a206.p.ssafy.io:8080/dayugi/diary/all?uid=20`, {
        method: "GET",
        headers: {
          "accept" : "*/*",
          "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMCIsImlhdCI6MTYyMDcwNzIxMiwiZXhwIjoxNjIwNzE0NDEyfQ.Lp6dsO18ffbaYrT-syH9qnipUjiYXrcQGT-1z9TU-tk" 
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
      this.getAllDiary();

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

                  var content = "작성한 내용이 없습니다."
                  this.state.contents.forEach((data) => {
                    if(d.dateString == moment(data.diary_date).format('YYYY-MM-DD'))
                      content = data.diary_content;
                  });
                  this.setState({selectedContent : content});
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
});

export default DiaryCalendarPage;