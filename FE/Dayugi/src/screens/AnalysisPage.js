import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Separator from '../components/Separator';
import CustomHeader from '../components/CustomHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart, PieChart } from 'react-native-chart-kit';

class AnalysisPage extends React.Component {
  state = {
    startDate: new Date(),
    startMode: 'date',
    show: false,
    screenWidth: Dimensions.get('window').width,
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
      legend: ['Rainy Days'], // optional
    },
    chartConfig: {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#08130D',
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    },
    pieData: [
      {
        name: '행복',
        population: 21500000,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: '슬픔',
        population: 2800000,
        color: '#F00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: '분노',
        population: 527612,
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: '공포',
        population: 8538000,
        color: '#ffffff',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: '우울',
        population: 11920000,
        color: 'rgb(0, 0, 255)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ],
  };

  handleDate = (Date) => {
    this.setState({ startDate: Date });
    console.log(this.state.startDate);
  };

  onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.startDate;
    this.handleShow(Platform.OS === 'ios');
    this.handleDate(currentDate);
  };

  handleMode = (text) => {
    this.setState({ startMode: text });
  };

  showMode = (currentMode) => {
    this.handleShow(true);
    this.handleMode(currentMode);
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  handleShow = (Boolean) => {
    this.setState({ show: Boolean });
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} />
        <Text>분석 페이지</Text>
        <Separator />
        <Text>날짜</Text>
        <View>
          <TouchableOpacity style={styles.submitButton} onPress={() => this.showDatepicker()}>
            <Text style={styles.submitButtonText}>start date picker</Text>
          </TouchableOpacity>
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.startDate}
              mode={this.state.startMode}
              is24Hour={true}
              display="default"
              onChange={this.onStartChange}
            />
          )}
        </View>
        <Separator />
        <Text>곡선 그래프</Text>
        <LineChart
          data={this.state.data}
          width={this.state.screenWidth}
          height={256}
          verticalLabelRotation={30}
          chartConfig={this.state.chartConfig}
          bezier
        />

        <Separator />
        <Text>파이 그래프</Text>
        <PieChart
          data={this.state.pieData}
          width={this.state.screenWidth}
          height={220}
          chartConfig={this.state.chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[10, 50]}
          absolute
        />
      </View>
    );
  }
} //class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
});

export default AnalysisPage;
