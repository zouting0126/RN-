import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableNativeFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'
import store from '../../../store/index'
import { changeLinkAction } from '../../../store/actionCreator'

class BookChapter extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    store.subscribe(this.storeChange) // 订阅Redux的状态
  }
  // 订阅Redux的状态
  storeChange = () => {
    this.setState(store.getState())
  }

  // 处理章节列表数据
  // 加载刷新
  // loadNextPage = () => {
  //   console.log('下一页')
  // }

  goToBookContent = (link) => {
    const actionLink = changeLinkAction(link)
    store.dispatch(actionLink)
    Actions.bookContent()
  }

  // 渲染章节列表
  renderChapter = (item, index) => {
    return (
      <TouchableNativeFeedback onPress={() => { this.goToBookContent(item.link) }}>
        <View key={item._id} style={styles.chapters}>
          <Text style={styles.chapterNum}>{index + 1}.</Text>
          <Text style={styles.chapterContent}>{item.title}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
  // 渲染分割线
  renderSeparator = () => {
    return <View style={{ borderBottomColor: '#e1e1e1', borderBottomWidth: 1, marginLeft: 15, marginRight: 15 }}></View>
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.name}>{this.props.title}</Text>
        </View>
        <FlatList
          data={this.state.chapter}
          renderItem={({ item, index }) => this.renderChapter(item, index)}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
        // onEndReachedThreshold={0.3}
        // onEndReached={loadNextPage}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  head: {
    height: 48,
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  name: {
    height: 48,
    lineHeight: 48,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9A6A'
  },
  chapters: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    height: 48
  },
  chapterNum: {
    color: '#888',
    lineHeight: 48,
    fontSize: 16,
    fontWeight: 'bold'
  },
  chapterContent: {
    color: '#888',
    lineHeight: 48,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default BookChapter