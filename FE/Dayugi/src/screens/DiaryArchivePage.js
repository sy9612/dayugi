import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Separator from '../components/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MonthPicker from 'react-native-month-picker';
import moment from 'moment';

class DiaryArchivePage extends React.Component {
  state = {
    currentYear: '',
    currentMonth: '',
    isModalOpen: false,
    contents:[
      {
          diaryDate:"2021-04-01",
          diaryContent:"안녕안녕",
      },
      {
          diaryDate:"2021-04-21",
          diaryContent:"안녕안녕안녕안녕",
      },
      {
          diaryDate:"2021-05-01",
          diaryContent:"안녕안녕안녕안녕안녕안녕",
      },
      {
          diaryDate:"2021-05-03",
          diaryContent:"안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕",
      },
      {
          diaryDate:"2021-05-04",
          diaryContent:"1",
      },
      {
          diaryDate:"2021-05-08",
          diaryContent:"1",
      },
      {
          diaryDate:"2021-07-03",
          diaryContent:"1",
      },
      {
          diaryDate:"2021-08-03",
          diaryContent:"1",
      },
      {
          diaryDate:"2021-09-03",
          diaryContent:"1",
      },
      {
          diaryDate:"2021-10-03",
          diaryContent:"1",
      },
      {
          diaryDate:"2021-11-03",
          diaryContent:"1",
      },
      {
          diaryDate:"2021-12-03",
          diaryContent:"1",
      },
    ]
  }

  componentDidMount() {
    var y = new Date().getFullYear(); 
    var m = ("0" + (1 + new Date().getMonth())).slice(-2);
    
    this.setState({
      currentYear: y,
      currentMonth : m
    });
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
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
              onYearChange={this.yearChanged}
              onMonthChange={this.closeModal}
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
          keyExtractor = {item => item.diaryDate}
        />
      </View>
    );
  }
}

function Item({ item, navigation }) {
  return (
    <TouchableOpacity style = {styles.drawerContentListItem} onPress={() => alert(item.diaryDate + " " + item.diaryContent)}>
        <Text style = {styles.drawerContentItemDiaryDate}>{item.diaryDate}</Text>
        <Separator />
        <Text style = {styles.drawerContentItemDiaryContent}>{item.diaryContent}</Text>
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