import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableNativeFeedback, Modal, StatusBar } from 'react-native'
import store from '../../../store/index'
import { changeLinkAction } from '../../../store/actionCreator'
import SlideChapter from './SlideChapter/SlideChapter'
const { width, height } = Dimensions.get('screen')

class BookContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chapter: store.getState().chapter,
      link: store.getState().link,
      info: store.getState().info,
      title: '',
      bookContents: '',
      controlContent: false,  //节流
      modalVisible: false,
      showMess: false,
      showModal: false,
      showMode: true, // 日间模式
      showFonts: false,
      backColor: ['#FFFFFF', '#FAF9DE', '#FFF2E2', '#FDE6E0', '#E3EDCD', '#DCE2F1', '#E9EBFE', '#EAEAEF'],
      toggleBack: '#FAF9DE',
      setfontsize: 16  // 设置字体大小
    }
    store.subscribe(this.storeChange) // 订阅Redux的状态
  }
  // 订阅Redux的状态
  storeChange = () => {
    this.setState(store.getState())
  }

  componentDidMount() {
    this.getBookContents(this.state.link)
  }

  // 获取小说内容的请求
  getBookContents = (link) => {
    console.log(link)
    fetch(`http://novel.juhe.im/chapters/${encodeURIComponent(link)}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          title: data.chapter.title,
          bookContents: data.chapter.cpContent,
          controlContent: true
        })
      })
  }

  // 得到下一章
  getNextContent = () => {
    this.setState({
      controlContent: false
    }, () => {
      let index = this.getContentIndex(this.state.chapter)
      if (index === this.state.chapter.length - 1) {
        this.setState({
          modalVisible: true
        })
        return
      }
      index = index + 1

      this.setState({
        link: this.state.chapter[index].link
      }, () => {
        this.getBookContents(this.state.link)
        const actionLink = changeLinkAction(this.state.link)
        store.dispatch(actionLink)
      })
    })
  }

  // 得到上一章
  getPreContent = () => {
    this.setState({
      controlContent: false
    }, () => {
      let index = this.getContentIndex(this.state.chapter)
      if (index === 0) {
        this.setState({
          modalVisible: true
        })
        return
      }
      index = index - 1

      this.setState({
        link: this.state.chapter[index].link
      }, () => {
        this.getBookContents(this.state.link)
        const actionLink = changeLinkAction(this.state.link)
        store.dispatch(actionLink)
      })
    })
  }

  // 得到当前章节的索引
  getContentIndex = chapters => chapters.findIndex(item => item.link === this.state.link)

  // 关闭弹窗
  _closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  // 显示提示
  showAlert = () => {
    this.setState({
      showMess: !(this.state.showMess)
    })
  }

  // 显示侧边栏目录
  showSlide = () => {
    this.setState({
      showModal: true
    })
  }

  // 关闭侧边栏
  closeSlideModal = () => {
    this.setState({
      showModal: false
    })
  }

  // 切换模式
  toggleMode = () => {
    this.setState({
      showMode: !this.state.showMode,
    }, () => {
      if (this.state.showMode) {
        this.setState({
          toggleBack: '#FAF9DE'
        })
      } else {
        this.setState({
          toggleBack: '#FDE6E0'
        })
      }
    })
  }

  // 设置字体大小
  setFont = () => {
    this.setState({
      showFonts: true
    })
  }

  // 设置背景色
  toggleBackGround = (item) => {
    this.setState({
      toggleBack: item
    })
  }

  // 改变字体大小
  changeFontBig = () => {
    if (this.state.setfontsize === 20) {
      return
    }
    this.setState({
      setfontsize: this.state.setfontsize + 2
    })
  }

  // 改变字体大小
  changeFontSmall = () => {
    if (this.state.setfontsize === 12) {
      return
    }
    this.setState({
      setfontsize: this.state.setfontsize - 2
    })
  }

  // 关闭设置的背景色
  closeSetBackGround = () => {
    this.setState({
      showFonts: false,
      showMess: false
    })
  }

  // 渲染背景色
  renderBackground = (backs) => {
    return backs.map((item, index) => (
      <TouchableNativeFeedback onPress={() => { this.toggleBackGround(item) }}>
        <View
          key={index}
          style={[{ width: width / 8, height: 36, borderRadius: 6, backgroundColor: item }, index === 0 ? { marginLeft: 0 } : { marginLeft: 20 }]}>
        </View>
      </TouchableNativeFeedback>
    ))
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.toggleBack }]}>
        <StatusBar backgroundColor="#fff"
          translucent={true}
          hidden={true}
          animated={true} />
        <View style={styles.content}>
          <View style={styles.head}>
            <Text style={styles.title}>{this.state.title}</Text>
          </View>
          {this.state.showMess ? (<View style={styles.showhead}>
            <View style={{ flexDirection: 'row', height: 48, alignItems: 'center', width: '100%' }}>
              <Text style={{ width: '15%', fontSize: 17, color: '#333' }}>返回</Text>
              <View style={{ width: '80%', height: '100%', justifyContent: 'space-between', paddingLeft: '2%' }}>
                <Text numberOfLines={1} style={{ fontSize: 16, color: '#333', paddingTop: 4 }}>{this.state.info.title}</Text>
                <Text numberOfLines={2} style={{ fontSize: 14, color: '#666', paddingBottom: 4 }}>{this.state.info.author}</Text>
              </View>
            </View>
          </View>) : (<View></View>)}
          <View style={styles.chapter}>
            <ScrollView>
              <Text
                style={{ lineHeight: 36, fontSize: this.state.setfontsize, paddingLeft: 12, paddingRight: 12 }}
                onPress={() => { this.showAlert() }}
              >{this.state.bookContents}</Text>
            </ScrollView>
            <View>
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => { this._closeModal() }}
              >
                <View style={styles.modalLayer}>
                  <View style={styles.modalWrap}>
                    <Text style={styles.modalTitle}>
                      {this.getContentIndex(this.state.chapter) === 0 ? '已经是第一章了' : '已经最后一章'}
                    </Text>
                    <View style={styles.modalBtn}>
                      <TouchableNativeFeedback onPress={() => { this._closeModal() }}>
                        <Text style={{ color: '#666' }}>确认</Text>
                      </TouchableNativeFeedback>
                      <TouchableNativeFeedback onPress={() => { this._closeModal() }}>
                        <Text style={{ color: '#666' }}>取消</Text>
                      </TouchableNativeFeedback>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          <View style={styles.foot}>
            <TouchableNativeFeedback onPress={() => {
              this.state.controlContent && this.getPreContent()
            }}>
              <Text style={{ color: '#FF9A6A', paddingLeft: 10, paddingRight: 10, lineHeight: 46, fontSize: 18 }}>上一章</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => {
              this.state.controlContent && this.getNextContent()
            }}>
              <Text style={{ color: '#FF9A6A', paddingLeft: 10, paddingRight: 10, lineHeight: 46, fontSize: 18 }}>下一章</Text>
            </TouchableNativeFeedback>
          </View>

          {this.state.showMess ? (<View style={styles.showfoot}>
            <Text style={{ lineHeight: 64 }} onPress={() => { this.showSlide() }}>目录</Text>
            <Text style={{ lineHeight: 64 }} onPress={() => { this.toggleMode() }}>
              {this.state.showMode ? '日间模式' : '夜间模式'}
            </Text>
            <Text style={{ lineHeight: 64 }} onPress={() => { this.setFont() }}>设置</Text>
          </View>) : (<View></View>)}

          {this.state.showFonts ? (<View style={styles.setfonts}>
            <View style={{ flexDirection: 'row', height: 56, justifyContent: 'space-between', marginBottom: 32 }}>
              <Text
                onPress={() => { this.changeFontSmall() }}
                style={{ color: '#333', lineHeight: 56, borderWidth: 1, borderColor: '#f1f1f1', paddingLeft: 48, paddingRight: 48, paddingBottom: 6, borderRadius: 8 }}>Aa-</Text>
              <Text style={{ lineHeight: 56, fontSize: this.state.setfontsize + 4, color: '#f1f1f1' }}>
                {this.state.setfontsize === 16 ? '三号' : this.state.setfontsize === 18 ? '二号' : this.state.setfontsize === 20 ? '一号' : this.state.setfontsize === 14 ? '四号' : this.state.setfontsize === 12 ? '五号' : ''}
              </Text>
              <Text
                onPress={() => { this.changeFontBig() }}
                style={{ color: '#333', lineHeight: 56, borderWidth: 1, borderColor: '#f1f1f1', paddingLeft: 48, paddingRight: 48, paddingBottom: 6, borderRadius: 8 }}>Aa+</Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {this.renderBackground(this.state.backColor)}
            </ScrollView>
            <View style={{ width: '100%', height: 42, alignItems: 'center' }}>
              <Text
                onPress={() => { this.closeSetBackGround() }}
                style={{ width: '80%', height: 42, textAlign: 'center', lineHeight: 42, backgroundColor: '#f1f1f1', color: '#FF9A6A' }}>关闭</Text>
            </View>
          </View>) : (
              <View></View>
            )}

          {this.state.showModal ? (
            <SlideChapter showModal={this.state.showModal} closeSlideModal={this.closeSlideModal} />) : (
              <View></View>
            )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#f1f1f1'
  },
  content: {
    width: width,
    height: height
  },
  head: {
    flexDirection: 'row',
    height: 36,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    fontSize: 14,
    color: '#FF9A6A',
    padding: 4
  },
  chapter: {
    width: width,
    height: height - 90
  },
  foot: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopColor: '#eee',
    borderTopWidth: 1
  },
  modalLayer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalWrap: {
    height: 210,
    width: '80%',
    backgroundColor: '#FFF',
    justifyContent: 'space-between'
  },
  modalTitle: {
    textAlign: 'center',
    paddingTop: 74,
    color: '#FF9A6A',
    fontSize: 26
  },
  modalBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 42,
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24
  },
  showhead: {
    width: '100%',
    height: 64,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF9A6A',
    paddingLeft: 20,
    paddingRight: 20
  },
  showfoot: {
    width: '100%',
    height: 64,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FF9A6A',
    paddingLeft: 20,
    paddingRight: 20
  },
  setfonts: {
    position: 'absolute',
    bottom: 0,
    height: 240,
    width: '100%',
    padding: 20,
    backgroundColor: '#FF9A6A'
  }
})

export default BookContent