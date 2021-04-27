import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { Calendar } from 'react-native-calendars';

class DiaryCalendarPage extends React.Component{
    constructor() {
        super();
        
        this.state = {
            
        };
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
            <View style={styles.diaryContent}>
                <Text>DAYUGI 일기</Text>
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
  },
  diaryContent: {
    backgroundColor: '#eee',
    marginTop: 12,
    height: '100%'
  }
});

export default DiaryCalendarPage;