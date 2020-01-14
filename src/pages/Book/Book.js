import React from 'react'
import { Container, Tab, Tabs, ScrollableTab } from 'native-base'
import Recommend from './Recommend/Recommend'
import Male from './Male/Male'
import Female from './Female/Female'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native'
import { Actions } from 'react-native-router-flux'

const { width, height } = Dimensions.get('screen')

const Book = () => {
  return (
    <View style={styles.container}>
      <Container>
        <Tabs
          style={{ width: '100%' }}
          locked={true}
          initialPage={1}
          tabBarUnderlineStyle={{ backgroundColor: '#FF9A6A', height: 2, width: 42, marginLeft: 24 }}
          renderTabBar={
            () => <ScrollableTab
              style={{ width: '100%' }}
              tabsContainerStyle={{ backgroundColor: '#fff' }}
            />}
        >
          <Tab
            heading="女生"
            textStyle={{ color: '#000' }}
            tabStyle={{ backgroundColor: '#fff' }}
            activeTabStyle={{ color: '#FF9A6A', backgroundColor: '#fff' }}
            activeTextStyle={{ color: '#FF9A6A' }}
          >
            <Female />
          </Tab>
          <Tab
            heading="推荐"
            textStyle={{ color: '#000' }}
            tabStyle={{ backgroundColor: '#fff' }}
            activeTabStyle={{ color: '#FF9A6A', backgroundColor: '#fff' }}
            activeTextStyle={{ color: '#FF9A6A' }}
          >
            <Recommend />
          </Tab>
          <Tab
            heading="男生"
            textStyle={{ color: '#000' }}
            tabStyle={{ backgroundColor: '#fff' }}
            activeTabStyle={{ color: '#FF9A6A', backgroundColor: '#fff' }}
            activeTextStyle={{ color: '#FF9A6A' }}
          >
            <Male />
          </Tab>
        </Tabs>
        <TouchableNativeFeedback onPress={() => {Actions.bookSearch()}}>
          <Text
            style={{ fontFamily: 'iconfont', position: 'absolute', left: width - 46, top: '11%', fontSize: 24, color: '#FF9A6A' }}
          >&#xe8b9;</Text>
        </TouchableNativeFeedback>
      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  }
})

export default Book