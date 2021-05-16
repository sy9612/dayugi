import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

class DrawerContent extends React.Component {
    state = {
        routes:[
            {
                name:"DiaryCalendar",
                text:"Home",
            },
            {
                name: "UserInfo",
                text: "마이페이지"
            },
            {
                name:"DiaryArchive",
                text:"모아보기",
            },
            {
                name:"Gallery",
                text:"갤러리",
            },
            {
                name:"Analysis",
                text:"분석",
            },
            {
                name:"Setting",
                text:"설정",
            },
        ]
    }

    render() {
      async function reissueToken() {
        var uid = await AsyncStorage.getItem('uid');
        var token = await AsyncStorage.getItem('Authorization');
        if (uid == 'null' || uid == undefined || uid == '') {
          return;
        }
        else {
          let dataObj = { uid: parseInt(uid) };
          fetch('http://k4a206.p.ssafy.io:8080/dayugi/user/token', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization": token,
            },
            body: JSON.stringify(dataObj),
          }).then(response => response.json())
          .then(responseJson => {
          let success = responseJson.success;
            if (success == "success") {
              let Authorization = String(responseJson.Authorization);
              AsyncStorage.setItem('Authorization', Authorization);
            }
          });
        }
      }
      reissueToken();
      return (
        <View>
          <View style={styles.drawerContentTop}></View>
          <View style={styles.drawerContentDivider}></View>
          <FlatList
            style = {{ width : "50%", marginLeft : 30 }}
            data = {this.state.routes}
            renderItem = {({ item }) => 
              <Item
                item = {item} 
                navigate = {this.props.navigation.navigate}
              />
            }
            keyExtractor = {item => item.name}
          />
        </View>
      );
    }
}

function Item({ item, navigate }) {
    return (
        <TouchableOpacity style = {styles.drawerContentListItem} onPress={() => navigate(item.name)}>
            <Text style = {styles.drawerContentItemTitle}>{item.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    drawerContentTop : {
        height : 120,
        backgroundColor: '#FFFAF0'
    },
    drawerContentDivider : {
        height : 1,
        width : "100%",
        backgroundColor : "lightgray",
    },
    drawerContentListItem:{
        height : 50,
        alignItems : "center",
        flexDirection : "row",
    },
    drawerContentItemTitle:{
        fontSize : 16,
    },
});

export default DrawerContent;