import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Separator from '../components/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MonthPicker from 'react-native-month-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

class DiaryArchivePage extends React.Component {
  state = {
    uid: '',
    authorization: '',
    currentYear: '',
    currentMonth: '',
    isModalOpen: false,
    contents:[
      
    ]
  }

  async componentDidMount() {
    this.state.uid = await AsyncStorage.getItem('uid');
    this.state.authorization = await AsyncStorage.getItem('Authorization');

    var y = new Date().getFullYear(); 
    var m = ("0" + (1 + new Date().getMonth())).slice(-2);
    
    this.setState({
      currentYear: y,
      currentMonth : m
    });
  }

  getDiaryWithMonth = (year, month) => {
    fetch(`http://k4a206.p.ssafy.io:8080/dayugi/diary/monthly?month=${encodeURIComponent(month)}&uid=${encodeURIComponent(this.state.uid)}&year=${encodeURIComponent(year)}`, {
      method: "GET",
      headers: {
        "accept" : "*/*",
        "authorization": this.state.authorization
      },
      }).then(response => response.json())
      .then(responseJson => {
        let success = responseJson.success;
        let diaries = responseJson.diaries;

        diaries.sort(function(a, b) {
          if(a.diary_date < b.diary_date) return -1;
          if(a.diary_date > b.diary_date) return 1;
        });

        if(success === "success"){
          this.setState({contents : diaries});
        }
        else if(success === "fail"){
          this.setState({contents : [{diary_date : 0, diary_content : '작성한 내용이 없습니다.'}]});
        }
      }
    );
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.getDiaryWithMonth(this.state.currentYear, this.state.currentMonth);
    this.setState({ isModalOpen: false });
  };

  render() {
    this.getDiaryWithMonth(this.state.currentYear, this.state.currentMonth);
    
    return (
      <View style={styles.container}>
        <CustomHeader navigation = {this.props.navigation}/>
        <View style = {styles.pickerContainer}>
          <TouchableOpacity onPress={this.openModal}>
            <Text>
              {this.state.currentYear}-{this.state.currentMonth} 
              <Ionicons name="arrow-down"></Ionicons>
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          transparent
          animationType="fade"
          visible={this.state.isModalOpen}>
          <View style={styles.modalContainer}>
            <MonthPicker
              selectedDate={new moment(this.state.currentYear + '-' + this.state.currentMonth,'YYYY-MM')}
              initialView={new moment(this.state.currentYear + '-' + this.state.currentMonth,'YYYY-MM')}
              onMonthChange={(date) => {
                this.state.currentYear = moment(date).format('YYYY');
                this.state.currentMonth = moment(date).format('MM');
                this.closeModal()
              }}
              seperatorColor='#eee'
              nextText='>  '
              prevText='  <'
              monthFormat= "MM" 
            />
          </View>
        </Modal>

        <FlatList
          style = {{ width : "100%", marginTop : 8 }}
          data = {this.state.contents}
          renderItem = {({ item }) => 
            <Item
              item = {item}
              navigation = {this.props.navigation}
            />
          }
          keyExtractor = {item => item.diary_date}
        />
      </View>
    );
  }
}

function Item({ item, navigation }) {
  return (
    <TouchableOpacity style = {styles.drawerContentListItem} onPress={() =>  navigation.navigate("DiaryDetail", {did : item.did}) }>
        <Text style = {styles.drawerContentItemDiaryDate}>{(item.diary_date != 0) && moment(item.diary_date).format('YYYY-MM-DD')}</Text>
        <Separator />
        <Text style = {styles.drawerContentItemDiaryContent}>{item.diary_content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    width: '100%',
  },
  pickerContainer: {
    backgroundColor : '#fff',
    height: 40, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: 120,
    width: '100%',
  },
  drawerContentListItem:{
    backgroundColor : '#fff',
    padding: 8,
    margin: 8,
    marginTop: 0,
    borderRadius: 5,
  },
  drawerContentItemDiaryDate:{
    fontSize : 12,
  },
  drawerContentItemDiaryContent:{
    fontSize : 14,
  },
});

export default DiaryArchivePage