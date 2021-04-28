import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Separator from '../components/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons'

class DiaryArchivePage extends React.Component {
  state = {
    current: {
      year: '',
      month: '',
    },
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
    var that = this;
    var currentYear = new Date().getFullYear(); 
    var currentMonth = ("0" + (1 + new Date().getMonth())).slice(-2);
    
    that.setState({
      current: {
        year: currentYear,
        month : currentMonth
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation = {this.props.navigation}/>
        <View style = {styles.pickerContainer}>
          <TouchableOpacity>
            <Text>
              {this.state.current.year}-{this.state.current.month} 
              <Ionicons name="arrow-down"></Ionicons>
            </Text>
          </TouchableOpacity>
        </View>
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