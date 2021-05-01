import React from 'react'
import { StyleSheet, View, Text, Button, StatusBar } from 'react-native'
import ViewPager from "@react-native-community/viewpager"

class TutorialPage extends React.Component {
  render () {
    return (
        <ViewPager
            style={{ flex: 1 }}
            initialPage={0}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.pageStyle}>
                <View style={styles.tutorialImage}>
                    <Text>이미지 1</Text>
                </View>
                <View style={styles.tutorialText}>
                    <Text style={{ fontSize: 16 }}>안녕하세요 옆으로 드래그해서 움직여보세요</Text>
                </View>
                <View style={styles.tutorialBottom}>
                </View>
            </View>
            <View style={styles.pageStyle}>
                <View style={styles.tutorialImage}>
                    <Text>이미지 2</Text>
                </View>
                <View style={styles.tutorialText}>
                    <Text style={{ fontSize: 16 }}>일기를 써봐요 ~~ 기능 설명 짧게</Text>
                </View>
                <View style={styles.tutorialBottom}>       
                </View>
            </View>
            <View style={styles.pageStyle}>   
                <View style={styles.tutorialImage}>
                    <Text>이미지 3</Text>
                </View>
                <View style={styles.tutorialText}>
                    <Text style={{ fontSize: 16 }}>메뉴는 화면 왼쪽을 드래그하면 열 수 있어요</Text>
                </View>
                <View style={styles.tutorialBottom}>  
                </View>
            </View>
            <View style={styles.pageStyle}> 
                <View style={styles.tutorialImage}>
                    <Text>이미지 4</Text>
                </View>
                <View style={styles.tutorialText}>
                    <Text style={{ fontSize: 16 }}>이제 일기 쓰러 가요</Text>
                </View>
                <View style={styles.tutorialButton}>
                    <Button
                        color='#fff'
                        title="시작하기"
                        onPress={() => {this.props.navigation.navigate("DiaryCalendar")}}
                    />
                </View>
            </View>
        </ViewPager>
    )
  }
}

const styles = StyleSheet.create({
  pageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    flex: 1,
  },
  tutorialImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 8,
  },
  tutorialText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 3,
  },
  tutorialBottom: {
    flex: 1,
  },
  tutorialButton: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
    flex: 1,
  }
})

export default TutorialPage;