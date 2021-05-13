import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gallery from 'react-native-image-gallery';

class GalleryPage extends React.Component {
  state = {
    files: [],
    uid: '',
    // authorization: '',
    currentYear: '',
    currentMonth: '',
    currentDay: '',

    
  };

  async componentDidMount() {
    this.state.uid = await AsyncStorage.getItem('uid');
    console.log(this.state.uid);
    this.state.authorization = await AsyncStorage.getItem('Authorization');
    this.getAllDiary();
  };

  getAllDiary = () => {
    fetch(`http://k4a206.p.ssafy.io:8080/dayugi/diary/diaryfile?uid=${encodeURIComponent(this.state.uid)}`, {
      method: "GET",
      headers: {
        "accept" : "*/*",
        "authorization": this.state.authorization
      },
      }).then(response => response.json())
      .then(responseJson => {
        let success = responseJson.success;
        if(success === "success"){
          // let mDate = {};
          for (let i = 0; i < responseJson.diaries.length; i++) {
            // let file = responseJson.diaries[i];
            let fid = responseJson.diaries[i].fid;
            let file_name = responseJson.diaries[i].file_name;
            let file_origname = responseJson.diaries[i].file_origname;
            let file_path = responseJson.diaries[i].file_path;
            const { files } = this.state;
            this.setState({
              files: files.concat({
                fid: fid,
                file_name: file_name,
                file_origname: file_origname,
                file_path: file_path,
              })
            });

          }
        }
        else if(success === "fail"){
          this.setState({contents : []});
        }
      }
    );
  };

  render() {
    console.log("###");
    console.log(this.state.files[0]);
    return (
    
      <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        images={[
          { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
          { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
          { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
          { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
        ]}
      />
      // <View style={styles.container}>
      //   <CustomHeader navigation = {this.props.navigation}/>
      //   <Text>바껴라ㅠㅠ</Text>
      //   <Gallery
      //     style={{ flex: 1, backgroundColor: 'black' }}
      //     images={[
      //     // { source: require(this.state.files[0].file_path), dimensions: { width: 150, height: 150 } },
      //     { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg'  } },
      //     { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg'  } },
         
      //   ]}
      // />
      // </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  stretch: {
    flex: 1,
    width: '30%',
    height: 200,
    resizeMode: 'stretch',
  },
 

});

export default GalleryPage