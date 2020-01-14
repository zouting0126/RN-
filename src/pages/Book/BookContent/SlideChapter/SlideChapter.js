import React, { Component } from 'react'
import { View, Modal, Text, TouchableNativeFeedback, FlatList, ScrollView, StyleSheet, TouchableHighlight } from 'react-native'
import store from '../../../../store/index'

class SlideChapter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chapter: store.getState().chapter,
      info: store.getState().info,
      showReverse: false
    }
    store.subscribe(this.storeChange) // 订阅Redux的状态
  }

  // 订阅Redux的状态
  storeChange = () => {
    this.setState(store.getState())
  }

  // 倒序
  reverseList = () => {
    this.setState({
      chapter: this.state.chapter.reverse(),
      showReverse: !this.state.showReverse
    })
  }

  // 渲染目录
  renderChapter = (item, index) => {
    return (
      <View style={{ height: 46 }} key={item._id}>
        <Text style={{ lineHeight: 46 }}>{this.state.showReverse ? (--this.state.chapter.length) : (index + 1)}.</Text>
        <Text numberOfLines={1} style={{ paddingLeft: 32, lineHeight: 46 }}>{item.title}</Text>
      </View>
    )
  }
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => { this.props.closeSlideModal() }}
      >
        <View style={styles.container}>
          <View style={styles.wrap}>
            <View style={styles.head}>
              <Text style={{ fontSize: 17, color: '#444' }}>{this.state.info.title}</Text>
              <View style={styles.listChapter}>
                <Text style={{ color: '#444' }}>目录</Text>
                <Text style={{ color: '#666' }} onPress={() => { this.reverseList() }}>顺序</Text>
              </View>
            </View>
            <FlatList
              data={this.state.chapter}
              renderItem={({ item, index }) => this.renderChapter(item, index)}
              keyExtractor={item => { item._id }}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  wrap: {
    width: '84%',
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20
  },
  head: {
    width: '100%',
    height: 90,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: '#f1f1f1'
  },
  listChapter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default SlideChapter