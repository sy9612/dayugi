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
      selectedContent : '',
    }

    async componentDidMount() {
      const isFirstLaunch = await checkFirstLaunch();
      
      if(isFirstLaunch){
        this.props.navigation.navigate("Tutorial");
      }
      else{
        var y = new Date().getFullYear(); 
        var m = ("0" + (1 + new Date().getMonth())).slice(-2);
        var d = ("0" + (new Date().getDate())).slice(-2);

        this.setState({
          currentYear: y,
          currentMonth: m,
          currentDay: d
        });
      }
    }

    getAllDiary = () => {
      fetch(`http://k4a206.p.ssafy.io:8080/dayugi/diary/all?uid=20`, {
        method: "GET",
        headers: {
          "accept" : "*/*",
          "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMCIsImlhdCI6MTYyMDYyNTkzMiwiZXhwIjoxNjIwNjMzMTMyfQ.lHMJGPtEUx36tFWQYf09UX3YeajoegG3XwaPNEq22aY" 
        },
        }).then(response => response.json())
        .then(responseJson => {
          let success = responseJson.success;
          if(success === "success"){
            this.setState({contents : responseJson.data});
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
                <Text style={styles.diaryDate}>{this.state.currentYear}-{this.state.currentMonth}-{this.state.currentDay}</Text>
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