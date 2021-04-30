import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import ViewPager from "@react-native-community/viewpager"

class TutorialPage extends React.Component {
  render () {
    return (
      <ViewPager
        style={{ flex: 1 }}
        initialPage={0}>
        <View style={styles.pageStyle}>
            <Text>1번</Text>
        </View>
        <View style={styles.pageStyle}>
            <Text>2번</Text>
        </View>
        <View style={styles.pageStyle}>
            <Text>3번</Text>
        </View>
        <View style={styles.pageStyle}>
            <Text>4번</Text>
            <Button
                style={styles.tutorialEndButton}
                title="시작하기"
                onPress={() => {this.props.navigation.navigate("DiaryCalendar")}}
            />
        </View>
      </ViewPager>
    )
  }
}

const styles = StyleSheet.create({
  pageStyle: {
    backgroundColor: '#D7B397',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  tutorialEndButton: {
    position: 'absolute',
    bottom: 8,
  }
})

export default TutorialPage;