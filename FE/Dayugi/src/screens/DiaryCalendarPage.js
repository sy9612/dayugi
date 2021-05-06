import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { Calendar } from 'react-native-calendars';
import Separator from '../components/Separator';
import checkFirstLaunch from '../utils/CheckFirstLaunch';

class DiaryCalendarPage extends React.Component{
    constructor() {
        super();
        
        this.state = {
            
        };
    }

    async componentDidMount() {
      const isFirstLaunch = await checkFirstLaunch();
      
      if(isFirstLaunch){
        this.props.navigation.navigate("Tutorial");
      }
      else{
        
      }
    }

    render(){
        return (
        <View style={styles.container}>
            <CustomHeader navigation = {this.props.navigation}/>
            <Calendar
                theme={{
                    calendarBackground: '#fff',
                }} 
                onDayPress={day => {
                    alert(day.dateString, day);
                }}
                monthFormat={'yyyy MM'}
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                hideExtraDays={false}
                firstDay={1}
            />
            <Separator />
            <View style={styles.diaryContentContainer}>
                <Text style={styles.diaryDate}>2000-01-01</Text>
                <Separator />
                <Text style={styles.diaryContent}>DAYUGI 일기 이런 일이 있었습니다</Text>
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