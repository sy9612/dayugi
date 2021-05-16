import AsyncStorage from '@react-native-async-storage/async-storage';
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
  Button,
} from 'react-native';
import Separator from '../components/Separator';
import CustomHeader from '../components/CustomHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart, PieChart } from 'react-native-chart-kit';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import Plotly from 'react-native-plotly'; // 걍 안됨

class AnalysisPage extends React.Component {
  state = {
    uid: '',
    email: '',
    nickName: '',
    authorization: '',

    startDate: new Date(),
    startDateString: moment(new Date()).format('YYYY-MM-DD'),
    startMode: 'date',
    startShow: false,
    diaries: [],

    endDate: new Date(),
    endDateString: moment(new Date()).format('YYYY-MM-DD'),
    endMode: 'date',
    endShow: false,

    screenWidth: Dimensions.get('window').width * 0.9,
    data: {
      labels: ['asdf', 'sdfg', 'dfgh', '', 'qwer'],
      datasets: [
        {
          data: [1, 3, 7, null, 2],
          color: () => `#337EFF`, // optional
          // strokeWidth: 2, // optional
        },
      ],
      // legend: ['행복 지수 그래프'], // optional
    },

    chartConfig: {
      // backgroundGradientFrom: '#1E2923',
      // backgroundGradientTo: '#08130D',
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0,
      fillShadowGradientOpacity: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 2, // optional, default 3
    },
    radarData: [
      // 차트에 들어갈 data를 먼저 지정해주고!
      {
        type: 'scatterpolar', // chart type
        r: [0, 0, 0, 0, 0, 0, 0, 0, 0], // data
        theta: ['행복', '분노', '역겨움', '공포', '슬픔', '놀람', '보통', '행복'], // data category
        fill: 'toself', // fill option
        name: 'Group A', // data group name
      },
    ],
    radarLayout: {
      // data를 꾸며주는 layout을 지정!
      polar: {
        radialaxis: {
          // 방사축이라는 의미인데 아래 그림에서 파란색으로 표시된 부분을 말한다!
          visible: true, // 방사축 display
          range: [0, 100], // 방사축의 시작값, 끝 값
          showticklabels: false, // @1-1
          showline: false, // @1-2
          ticklen: 0, // @1-3
        },
        angularaxis: {
          // 각축 꾸미기 시작!
          // rotation: 210, // 차트 회전율! (KDA가 제일 위로 올 수 있도록 돌려주었당)
          color: '#eee', // 각축의 선 색깔
          ticklen: 0, // @2-1
          tickfont: {
            // @2-2
            color: '#888',
            size: 13,
          },
        },
        gridshape: 'linear', // @3
      },
      showlegend: false, // @4
    },
  };

  // handleDateString = (startDateString) => {};
  componentDidMount() {
    this.getUid();
    this.getEmail();
    this.getNickName();
    this.getAuthorization();
  }

  async getUid() {
    let tmp = String(await AsyncStorage.getItem('uid'));
    this.setState({ uid: tmp });
  }
  async getEmail() {
    let tmp = String(await AsyncStorage.getItem('email'));
    this.setState({ email: tmp });
  }
  async getNickName() {
    let tmp = String(await AsyncStorage.getItem('nickName'));
    this.setState({ nickName: tmp });
  }

  async getAuthorization() {
    let tmp = String(await AsyncStorage.getItem('Authorization'));
    this.setState({ authorization: tmp });
  }

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
  analysis = () => {
    const url = `http://k4a206.p.ssafy.io:8080/dayugi/diary/period?uid=${encodeURIComponent(
      46
    )}&startDate=${encodeURIComponent(this.state.startDateString)}&endDate=${encodeURIComponent(
      this.state.endDateString
    )}`;
    // console.log(url);
    // console.log(this.state.authorization);

    fetch(url, {
      method: 'GET',
      headers: {
        accept: '*/*',
        authorization: this.state.authorization,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        let success = responseJson.success;
        let data = responseJson.data;

        if (success === 'success') {
          data.sort(function (a, b) {
            if (a.diary_date < b.diary_date) return -1;
            if (a.diary_date > b.diary_date) return 1;
          });
          this.setState({ diaries: data });
          // console.log('--------------------------');
          
          let sum = [0, 0, 0, 0, 0, 0, 0, 0];
          let cnt = 0;
          for (let index = 0; index < data.length; index++) {
            const d = data[index];
            // console.log(d);
            if (d.happiness == null) continue;
            
            cnt++;
            sum[0] += Number(d.happiness);
            sum[1] += Number(d.angry);
            sum[2] += Number(d.disgust);
            sum[3] += Number(d.fear);
            sum[4] += Number(d.sadness);
            sum[5] += Number(d.surprise);
            sum[6] += Number(d.neutral);
          }
          // console.log('----------sum : 더한 후----------');
          // console.log(sum + '/n');
          
          for (let index = 0; index < 7; index++) {
            sum[index] = (sum[index] / cnt) * 100;
          }
          sum[7] = sum[0];
          
          // console.log('----------sum : 나눈 후----------');
          // console.log(sum + '/n');
          let tmpData = [
            {
              type: 'scatterpolar', // chart type
              r: sum, // data
              theta: ['행복', '분노', '역겨움', '공포', '슬픔', '놀람', '보통', '행복'], // data category
              fill: 'toself', // fill option
              name: 'Group A', // data group name
            },
          ];
          this.setState({ radarData: tmpData });
          let values = []
          s = data[0]['diary_date']
          e = data[data.length-1]['diary_date']
          let sday = [Number(s.slice(0, 4)), Number(s.slice(5, 7)), Number(s.slice(8, 10))]
          let eday = [Number(e.slice(0, 4)), Number(e.slice(5, 7)), Number(e.slice(8, 10))]
          let day = [s.slice(5, 10)]
          while (sday[2] != eday[2] || sday[1] != eday[1] || sday[1] != eday[1]) {
            sday[2]++
            if ((sday[1] == 2 && ((sday[0] % 4 == 0 && sday[2]==30) || (sday[0] % 4 != 0 && sday[2] == 29)))
              || ([4, 6, 9, 11].includes(sday[1]) && sday[2] == 30)
              || ([1, 3, 5, 7, 8, 10, 12].includes(sday[1]) && sday[2] == 31)) {
                sday[1]++
                sday[2] = 1
            }
            let month = String(sday[1])
            if (month.length == 1) {
              month = '0' + month
            }
            let days = String(sday[2])
            if (days.length == 1) {
              days = '0' + days
            }
            day.push(month+'-'+days)
          }
          console.log(day)
          let i = 0
          for (let index = 0; index < data.length; index++) {
            const d = data[index];
            // console.log(d['diary_date'].slice(5, 7))
            // console.log(d['diary_date'].slice(8, 10))
            // labels.push(d['diary_date'])
            // values.push(Number(d['happiness']))
            while (true) {
              if (d['diary_date'].slice(5, 10) == day[i]) {
                values.push(Number(d['happiness']))
                i++
                break
              } else {
                values.push(null)
              }
              i++
            }
          }
          let l = 1 + parseInt(day.length / 8)
          for (let index = 0; index < day.length; index++) {
            if (index % l != 0) {
              day[index] = ''
            }
          }
          console.log(day)
          console.log(values)
          let lineData = {
            labels: day,
            datasets: [
              {
                data: values,
                color: () => `#337EFF`, // optional
                // strokeWidth: 2, // optional
              },
            ],
            // legend: ['행복 지수 그래프'], // optional
          };
          this.setState({ data: lineData })

          // console.log('------------연산 후--------------');
          // console.log(this.state.radarData);
        } else {
          this.setState({
            diaries: [],
          });
        }
      });
  };

  //--
  // radarUpdate = () => {
  //   this.setState({
  //     radarData: (radarData = [
  //       {
  //         type: 'scatterpolar', // chart type
  //         r: sum, // data
  //         theta: ['행복', '분노', '역겨움', '공포', '슬픔', '놀람', '보통', '행복'], // data category
  //         fill: 'toself', // fill option
  //         name: 'Group A', // data group name
  //       },
  //     ]),
  //   });
  //   // plotly.react(sum, this.state.radarLayout);
  // };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title="다이어리 분석" navigation={this.props.navigation} />
        <ScrollView style={styles.scrollView} contentContainerStyle={{ width: '100%' }}>
          <Separator />
          <View style={styles.setDateText}>
            <Text>기간 설정 : &nbsp;</Text>
            <TouchableOpacity onPress={() => this.startShowDatepicker()}>
              <Text style={styles.text}>
                {this.state.startDateString}&nbsp;
                <Icon name="calendar" size={15} color="#FF7E36" />
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
                <Icon name="calendar" size={15} color="#FF7E36" />
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
              <TouchableOpacity style={styles.submitButton} onPress={() => this.analysis()}>
                <Text style={styles.submitButtonText}>조회</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Separator />
          <View>
            <Text>평균 감정 그래프</Text>
            <View style={styles.chartRow}>
              <Plotly
                data={this.state.radarData}
                layout={this.state.radarLayout}
                // update={this.radarUpdate}
                debug
                enableFullPlotly
              />
            </View>
          </View>
          <Separator />
          <Text>곡선 그래프</Text>
          <View style={styles.lineChartRow}>
            <LineChart
              data={this.state.data}
              width={this.state.screenWidth}
              height={256}
              // withDots='false'
              fromZero='true'
              // withVerticalLines='false'
              // hidePointsAtIndex='[2]'
              yAxisInterval='365'
              chartConfig={this.state.chartConfig}
              
              // bezier
              />
          </View>
          {/* <Separator />
          <Text>파이 그래프</Text>
          <View style={styles.pieChartRow}>
            <PieChart
              data={this.state.pieData}
              width={this.state.screenWidth}
              height={180}
              chartConfig={this.state.chartConfig}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              center={[10, 10]}
              absolute
            />
          </View> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
} //class

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    // paddingTop: StatusBar.currentHeight,
  },
  headerView: {
    flexDirection: 'row',
  },
  headerText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FF7E36',
    fontSize: 20,
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    color: 'dimgray',
    fontSize: 16,
  },
  setDateText: {
    flexDirection: 'row',
  },
  submitButton: {
    backgroundColor: '#FF7E36',
    paddingBottom: 2,
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 2,
    height: 20,
    marginRight: 0,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 12,
  },
  chartRow: {
    flex: 1,
    width: '100%',
    height: 400,
  },
  lineChartRow: {
    flex: 1,
    width: '100%',
    height: 350,
  },
  pieChartRow: {
    flex: 1,
    width: '100%',
    height: 280,
  },
});

export default AnalysisPage;
