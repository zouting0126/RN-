import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableNativeFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'
import BookComment from './BookComment/BookComment'
import BookHot from './BookHot/BookHot'
import OtherBook from './OtherBook/OtherBook'
import store from '../../../store/index'
import { changeChapterAction, changeLinkAction, changeBookInfoAction } from '../../../store/actionCreator'

const Static = `http://statics.zhuishushenqi.com`

class BookDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      bookInfo: {},
      shortComments: [],
      bookComments: [],
      enableScroll: true,
      otherBooks: []
    }
  }

  componentDidMount() {
    this.getBookInfo(this.props.id)
    this.getShortComments(this.props.id)
    this.getBookComments(this.props.id)
    this.getOtherBooks(this.props.id)

    this.getChapterList(this.props.id)
      .then(data => {
        fetch(`http://novel.juhe.im/book-chapters/${data}`)
          .then(res => res.json())
          .then(data => {
            const actionChapter = changeChapterAction(data.chapters)
            const actionLink = changeLinkAction(data.chapters[0].link)
            store.dispatch(actionChapter)
            store.dispatch(actionLink)
          })
      })
      .catch(e => {
        console.log(e)
      })
  }

  // 得到小说信息的请求
  getBookInfo = (id) => {
    fetch(`http://novel.juhe.im/book-info/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          bookInfo: data
        }, () => {
          const actionBookInfo = changeBookInfoAction(this.state.bookInfo)
          store.dispatch(actionBookInfo)
        })
      })
  }

  // 得到短评的请求
  getShortComments = (id) => {
    fetch(`https://novel.juhe.im/book/short-reviews?book=${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          shortComments: data.docs
        })
      })
  }

  // 得到长评的请求
  getBookComments = (id) => {
    fetch(`https://novel.juhe.im/book/reviews?book=${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          bookComments: data.reviews
        })
      })
  }

  // 推荐书籍的请求
  getOtherBooks = (id) => {
    fetch(`http://novel.juhe.im/recommend/${id}`)
      .then(res => res.json())
      .then(data => {
        let { books } = data
        books = books.filter((item, index) => {
          if (index < 8) {
            return true
          }
          return false
        })
        this.setState({
          otherBooks: books
        })
      })
  }

  // 得到书籍源信息再获取章节列表
  getChapterList = (id) => {
    return new Promise((resolve, reject) => {
      fetch(`http://novel.juhe.im/book-sources?view=summary&book=${id}`)
        .then(res => res.json())
        .then(data => {
          resolve(data[0]._id)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  render() {
    return (
      <View style={styles.container} >
        <ScrollView
          scrollEnabled={this.enableScroll}
        >
          <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, paddingBottom: 56 }}>
            <View style={styles.head}>
              <Image style={{ width: '24%' }} source={{ uri: Static + this.state.bookInfo.cover }} />
              <View style={{ paddingLeft: '4%', width: '72%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#000', lineHeight: 36 }}>{this.state.bookInfo.title && this.state.bookInfo.title}</Text>
                <Text style={{ fontSize: 14, color: '#333', lineHeight: 24 }}>{this.state.bookInfo.author && this.state.bookInfo.author}</Text>
                <Text style={{ fontSize: 14, color: '#333', lineHeight: 24 }}>{this.state.bookInfo.wordCount && (this.state.bookInfo.wordCount / 10000).toFixed(2)}万字</Text>
                <Text style={{ fontSize: 14, color: '#FF9A6A' }}>
                  评分:{this.state.bookInfo.rating && this.state.bookInfo.rating.score}
                </Text>
              </View>
            </View>
            <View style={styles.discrible}>
              <Text numberOfLines={4}>{this.state.bookInfo.longIntro}</Text>
            </View>
            <TouchableNativeFeedback onPress={() => { Actions.bookChapter({ title: this.state.bookInfo.title }) }}>
              <View style={styles.chapter}>
                <Text style={{ color: '#000', fontSize: 18 }}>目录</Text>
                <Text style={{ color: '#FF9A6A', fontSize: 14 }}>共2111章</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.tags}>
              {this.state.bookInfo.tags && this.state.bookInfo.tags.map((item, index) => (
                <Text key={index} style={{ padding: 4, borderWidth: 1, borderColor: '#ccc', marginRight: 6, marginBottom: 6 }}>{item}</Text>
              ))}
            </View>
            <BookHot shortComments={this.state.shortComments} />
            <BookComment
              bookComments={this.state.bookComments}
            />
            <OtherBook otherBooks={this.state.otherBooks} />
          </View>
        </ScrollView>
        <View style={styles.Fixed}>
          <TouchableNativeFeedback onPress={() => { console.log(111) }}>
            <Text style={{ color: '#FF9A6A', flex: 1, textAlign: 'center', lineHeight: 56 }}>加书架</Text>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => { Actions.bookContent() }}>
            <Text
              style={{ flex: 1, textAlign: 'center', lineHeight: 56, backgroundColor: '#FF9A6A' }}
            >开始阅读</Text>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => { console.log('xiazai') }}>
            <Text style={{ color: '#FF9A6A', flex: 1, textAlign: 'center', lineHeight: 56 }}>下载</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  Fixed: {
    position: 'absolute',
    width: '100%',
    height: 56,
    backgroundColor: '#f1f1f1',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    width: '100%'
  },
  head: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
    paddingTop: 10
  },
  discrible: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  chapter: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  }
})

export default BookDetail