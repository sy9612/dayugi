import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Separator from '../components/Separator';

class DiaryDetailPage extends React.Component{
    constructor() {
        super();
        
        this.state = {
            
        };
    }

    render(){
        return (
        <View style={styles.container}>
            <CustomHeader navigation = {this.props.navigation}/>
            <View style={styles.diaryContentContainer}>
                <Text style={styles.diaryDate}>날짜</Text>
                <Separator />
                <Text style={styles.diaryContent}>{this.props.navigation.getParam('did')}</Text>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  diaryContentContainer: {
    height: '100%',
    width: '100%',
  },
  diaryDate: {
    fontSize: 14,
    marginLeft: 8,
  },
  diaryContent: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default DiaryDetailPage;