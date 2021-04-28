import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Separator from '../components/Separator';

class DiaryArchivePage extends React.Component {
  state = {
    contents:[
      {
          diaryDate:"2000-01-01",
          diaryContent:"안녕안녕",
      },
      {
          diaryDate:"2011-01-01",
          diaryContent:"안녕안녕안녕안녕",
      },
      {
          diaryDate:"2111-01-01",
          diaryContent:"안녕안녕안녕안녕안녕안녕",
      },
      {
          diaryDate:"2222-01-01",
          diaryContent:"안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕",
      },
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation = {this.props.navigation}/>
        <FlatList
          style = {{ width : "100%" }}
          data = {this.state.contents}
          renderItem = {({ item }) => 
            <Item
              item = {item}
              navigation = {this.props.navigation}
            />
          }
          keyExtractor = {item => item.date}
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
  drawerContentListItem:{
    backgroundColor : '#fff',
    padding: 8,
    margin: 8,
    marginBottom: 0,
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