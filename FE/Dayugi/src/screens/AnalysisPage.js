import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import Separator from '../components/Separator';
import CustomHeader from '../components/CustomHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart, PieChart } from 'react-native-chart-kit';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import { floor } from 'react-native-reanimated';

class AnalysisPage extends React.Component {
  state = {
    startDate: new Date(),
    startDateString: moment(new Date()).format('YYYY-MM-DD'),
    startMode: 'date',
    startShow: false,

    endDate: new Date(),
    endDateString: moment(new Date()).format('YYYY-MM-DD'),
    endMode: 'date',
    endShow: false,

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
      legend: ['긍/부정 그래프'], // optional
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

  // handleDateString = (startDateString) => {};

  handleStartDate = (Date) => {
    this.setState({ startDate: Date });
    // console.log(this.state.startDate);
    this.setState({
      startDateString: moment(this.state.startDate).format('YYYY-MM-DD'),
    });
    if (this.state.startDate > this.state.endDate) {
      //시작날짜가 종료 날짜보다 앞서면
      this.handleEndDate(Date);
    }
  };

  onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.startDate;
    this.handleStartShow(Platform.OS === 'ios');
    this.handleStartDate(currentDate);
  };

  handleStartMode = (text) => {
    this.setState({ startMode: text });
  };

  startShowMode = (currentMode) => {
    this.handleStartShow(true);
    this.handleStartMode(currentMode);
  };

  startShowDatepicker = () => {
    this.startShowMode('date');
  };

  handleStartShow = (Boolean) => {
    this.setState({ startShow: Boolean });
  };

  //----
  handleEndDate = (Date) => {
    this.setState({ endDate: Date });
    // console.log(this.state.startDate);
    this.setState({
      endDateString: moment(this.state.endDate).format('YYYY-MM-DD'),
    });
  };

  onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.endDate;
    this.handleEndShow(Platform.OS === 'ios');
    this.handleEndDate(currentDate);
  };

  handleEndMode = (text) => {
    this.setState({ endMode: text });
  };

  endShowMode = (currentMode) => {
    this.handleEndShow(true);
    this.handleEndMode(currentMode);
  };

  endShowDatepicker = () => {
    this.endShowMode('date');
  };

  handleEndShow = (Boolean) => {
    this.setState({ endShow: Boolean });
  };

  //---
  analysis = (startDate, endDate) => {
    let tmp = 'start date : ' + startDate + '   /    end date : ' + endDate;
    alert(tmp);
    // let dataObj = { email: email, password: password };
    // fetch('http://k4a206.p.ssafy.io:8080/dayugi/user', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(dataObj),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     let success = responseJson.success;
    //     if (success == 'success') {
    //       let uid = String(responseJson.data['uid']);
    //       let nickName = String(responseJson.data['nickname']);
    //       let Authorization = String(responseJson.Authorization);
    //       AsyncStorage.setItem('uid', uid);
    //       AsyncStorage.setItem('email', this.state.email);
    //       AsyncStorage.setItem('nickName', nickName);
    //       AsyncStorage.setItem('Authorization', Authorization);
    //       this.props.navigation.navigate('DiaryCalendar');
    //     } else {
    //       alert('Id 또는 비밀번호를 확인해주세요.');
    //     }
    //   });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <CustomHeader navigation={this.props.navigation} />
          <Text>분석 페이지</Text>
          <Separator />
          <Text>조회 날짜</Text>
          {/* <Text style={styles.text}>{this.state.startDateString}</Text> */}
          {/* <Icon name="calendar" size={20} color="#3143e8" /> */}
          <View style={styles.setDateText}>
            <TouchableOpacity onPress={() => this.startShowDatepicker()}>
              <Text style={styles.text}>
                {this.state.startDateString}&nbsp;
                <Icon name="calendar" size={15} color="#3143e8" />
              </Text>
            </TouchableOpacity>
            <Text>&nbsp;&nbsp;~&nbsp;&nbsp;</Text>
            {this.state.startShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.startDate}
                mode={this.state.startMode}
                is24Hour={true}
                display="default"
                onChange={this.onStartChange}
              />
            )}
            <TouchableOpacity onPress={() => this.endShowDatepicker()}>
              <Text style={styles.text}>
                {this.state.endDateString}&nbsp;
                <Icon name="calendar" size={15} color="#3143e8" />
              </Text>
            </TouchableOpacity>
            {this.state.endShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.endDate}
                mode={this.state.endMode}
                is24Hour={true}
                display="default"
                onChange={this.onEndChange}
                minimumDate={this.state.startDate}
              />
            )}
            <View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.analysis(this.state.startDate, this.state.endDate)}
              >
                <Text style={styles.submitButtonText}>조회</Text>
              </TouchableOpacity>
            </View>
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
        </ScrollView>
      </SafeAreaView>
    );
  }
} //class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    color: 'purple',
  },
  setDateText: {
    flexDirection: 'row',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 2,
    margin: 2,
    height: 20,
    marginRight: 0,
  },
  submitButtonText: {
    color: 'white',
  },
});

export default AnalysisPage;
