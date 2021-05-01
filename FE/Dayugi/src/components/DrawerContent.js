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
                name:"DiaryArchive",
                text:"모아보기",
            },
            {
                name:"GrowthDiary",
                text:"성장일지",
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
        backgroundColor: '#D7B397'
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