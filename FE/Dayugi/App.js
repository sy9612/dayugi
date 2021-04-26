import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function App() {
  return (
    <View style={styles.container}>
      <Calendar
          onDayPress={day => {
            console.log('selected day', day);
          }}

          monthFormat={'yyyy MM'}

          onMonthChange={month => {
            console.log('month changed', month);
          }}

          hideExtraDays={true}
          firstDay={1}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
