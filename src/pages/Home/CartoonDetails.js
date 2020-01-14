import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, ActivityIndicator, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Button, Badge } from 'native-base'
import { Container, Tab, Tabs, Root, ActionSheet } from 'native-base'
import TabDetail from './Tabs/TabDetail'
import TabChapter from './Tabs/TabChapter'
import TabComment from './Tabs/TabComment'
import { Actions } from 'react-native-router-flux'

// 获取到屏幕高度
const Bannerheight = Dimensions.get('window').height;
const BannerWidth = Dimensions.get('window').width;

// 底部栏分享弹框设置样式
var BUTTONS = [
  { text: "朋友圈", icon: "aperture", iconColor: "#2c8ef4" },
  { text: "QQ", icon: "Logo-QQ", iconColor: "#f42ced" },
  { text: "微博", icon: "aperture", iconColor: "#ea943b" },
  { text: "取消", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

class CartoonDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pinceLove: {},
      ModalIntroToggle: false,   // 模态框  默认false不显示
      collectBtn: true,   // 收藏按钮
    }
  }
  componentDidMount() {
    this.getCartoon()
  }
  getCartoon = () => {
    fetch(`http://localhost:8081/mock/home_comic_overview.json`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          pinceLove: data.data
        })
      })
      .catch(e => {
        console.log(e)
      })
  }
  // 点赞取消赞的方法
  collectBtn() {
    this.setState({
      collectBtn: !this.state.collectBtn,
    })
  }

  render() {
    if (this.state.isloading) {
      return <ActivityIndicator size="large"></ActivityIndicator>
    }
    return <Root><View style={{ width: BannerWidth, height: Bannerheight }}>
      {/* 顶部样式 */}
      <View style={styles.topBanner}>
        <ImageBackground
          source={{ uri: this.props.backgroundImg }}
          style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: "center", alignItems: 'flex-end' }}>
          {/* comic封面图 */}
          <View style={{ width: "30%", height: "86%", paddingBottom: 18 }}>
            <Image source={{ uri: this.props.cover }} style={{ width: '100%', height: '100%' }}></Image>
          </View>
          {/* comic 文字信息 */}
          <View style={{ paddingLeft: '5%', marginBottom: "5%" }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>{this.props.title}</Text>
              <Badge style={{ backgroundColor: "#FF7F50" }}>
                <Text style={{ color: "white", fontSize: 15 }}>{this.props.score}</Text>
              </Badge>
            </View>
            <Text style={styles.comicText}>{this.props.tag}</Text>
            <Text style={styles.comicText}>{this.props.author}</Text>
            <Text style={styles.comicText}>{this.props.popularity}</Text>
            <Text style={styles.comicText}>{this.props.monthTicket}</Text>
          </View>
        </ImageBackground>
      </View>
      <Container>
        {/* <Header hasTabs /> */}
        <Tabs>
          <Tab heading="详情" textStyle={{ color: "orange" }} activeTabStyle={{ backgroundColor: "white" }}
            TabStyle={{ backgroundColor: "white" }} tabStyle={{ backgroundColor: "white" }}
            activeTextStyle={{ color: "orange" }}>
            <TabDetail txt={this.props.txt} />
          </Tab>
          <Tab heading="目录" textStyle={{ color: "orange" }} activeTabStyle={{ backgroundColor: "white" }}
            TabStyle={{ backgroundColor: "white" }} tabStyle={{ backgroundColor: "white" }}
            activeTextStyle={{ color: "orange" }}>
            <TabChapter />
          </Tab>
          <Tab heading="评论" textStyle={{ color: "orange" }} activeTabStyle={{ backgroundColor: "white" }}
            TabStyle={{ backgroundColor: "white" }} tabStyle={{ backgroundColor: "white" }}
            activeTextStyle={{ color: "orange" }}>
            <TabComment />
          </Tab>
        </Tabs>
      </Container>

      {/* 底部栏 */}
      <View style={styles.bottomNav}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "50%", marginLeft: 10 }}>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => { this.collectBtn() }} >
            <Image source={this.state.collectBtn == true ? require('../../images/home/心.png') : require('../../images/home/心心.png')} style={{ width: 35, height: 35 }}></Image>
          </TouchableOpacity>
          <Button transparent small style={styles.buttonStyle} onPress={() =>
            ActionSheet.show({
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              destructiveButtonIndex: DESTRUCTIVE_INDEX,
              title: "分享至"
            },
              buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
              }
            )}>
            <Image source={require('../../images/home/分享.png')} style={{ width: 30, height: 30 }}></Image>
          </Button>
          <Button transparent small style={styles.buttonStyle} >
            <Image source={require('../../images/home/下载.png')} style={{ width: 30, height: 30 }}></Image>
          </Button>
        </View>
        <Button style={styles.readBut} onPress={() => { Actions.comicRead() }}>
          <Text style={{ fontSize: 20, color: "white", marginLeft: 40 }}>开始阅读</Text>
        </Button>
      </View>
    </View>
    </Root>
  }
}

const styles = StyleSheet.create({
  topBanner: {
    width: BannerWidth,
    height: "26%",
  },
  comicText: {
    color: "white",
    fontSize: 16,
    marginTop: "1%"
  },
  bottomNav: {
    width: BannerWidth,
    height: 60,
    position: "absolute",
    bottom: 56,
    left: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopColor: "gray",
    borderTopWidth: 0.5,
    backgroundColor: "white"
  },
  buttonStyle: {
    width: 30,
    height: 30,
    marginLeft: 35,
    marginTop: 15
  },
  readBut: {
    backgroundColor: "orange",
    width: "35%",
    height: 40,
    marginTop: 10,
    marginLeft: 10
  }
})

export default CartoonDetails;