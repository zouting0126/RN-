import React from 'react'
import { StyleSheet, Image, View, Dimensions, Text, ScrollView, RefreshControl, FlatList, TouchableHighlight } from 'react-native';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import Carousel from 'react-native-banner-carousel'
import Booklists from './Booklists'

const BannerWidth = Dimensions.get('window').width

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      lists: [],
      redgirl: {},
      todayAdvice: [],
      isLoading: true
    }
  }
  componentDidMount() {
    this.getCatoonBanner()
  }
  // 首页请求
  getCatoonBanner = () => {
    fetch('http://localhost:8081/mock/home_comic.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          isRefreshing: false,
          images: data.data.banner,
          lists: data.data.blockList,
          redgirl: data.data.recommendEveryDay,
          todayAdvice: data.data.updateTodayList
        })
      })
  }

  handleScrollEnd = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;

    const isEndReached = scrollOffset + scrollViewHeight >= contentHeight; // 是否滑动到底部
    const isContentFillPage = contentHeight >= scrollViewHeight; // 内容高度是否大于列表高度

    if (isContentFillPage && isEndReached) {
    }
  }
  _onRefresh = () => {
    this.setState({
      isRefreshing: true,
    });
    //发送请求，当请求数据回来之后修改state
    //state修该完毕之后isRefreshing改为false

    //间隔5秒结束下拉刷新
    setTimeout(() => {
      //.concat拼接字符串，数组
      this.setState({
        isRefreshing: false
      });
    }, 1000);
  }
  goMovieList = (Item) => {
    Actions.cartoonDetails(Item);
  }
  // 渲染轮播图
  renderPage(image, index) {
    return (
      <TouchableHighlight underlayColor="#fff">
        <View key={index}>
          <Image style={{ width: BannerWidth, height: 250 }} source={{ uri: image }} />
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    return (
      <View style={{ backgroundColor: "#F5FFFA", flex: 1, width: BannerWidth }}>
        <ScrollView
          onScrollEndDrag={this.handleScrollEnd}
          refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="red"
              title="Loading..."
              titleColor="red"
            />}>
          < View style={styles.container}>
            <Carousel
              autoplay
              autoplayTimeout={3000}
              loop
              index={0}
              pageSize={BannerWidth}
            >
              {this.state.images.map((image, index) => this.renderPage(image, index))}
            </Carousel>
          </View>
          <View style={styles.nav}>
            <View style={styles.navleft}>
              <Text style={styles.welcome}>无良の推荐</Text>
              <Image
                source={require('../../images/home/漫画icone1.png')}
                style={{ width: 32, height: 32, marginTop: 3 }}
              />
            </View>
            <View style={styles.navright}>
              <Image
                source={require('../../images/home/微笑2.png')}
                style={{ width: 28, height: 28, marginTop: 3 }}
              />
              <Text style={{ lineHeight: 32, fontSize: 14, color: '#333' }}>更多</Text>
            </View>
          </View>
          <View style={styles.cartoons}>
            <Booklists comiclists={this.state.lists} />
          </View>
          <View style={styles.nav}>
            <View style={styles.navleft}>
              <Text style={styles.welcome}>每日一推</Text>
              <Image
                source={require('../../images/home/漫画icone3.png')}
                style={{ width: 32, height: 32, marginTop: 3 }}
              />
            </View>
            <View style={styles.navright}>
              <Image
                source={require('../../images/home/微笑2.png')}
                style={{ width: 28, height: 28, marginTop: 3 }}
              />
              <Text style={{ lineHeight: 32, fontSize: 14, color: '#333' }}>更多</Text>
            </View>
          </View>
          <TouchableHighlight underlayColor="#fff" onPress={() => { Actions.cartoonDetails(this.state.redgirl) }}>
            <View style={styles.box}>
              <Image source={{ uri: this.state.redgirl.cover }} style={{ width: '100%', height: 220 }}></Image>
              <Button transparent bordered light>
                <Text style={{ fontSize: 20, marginLeft: 8 }}>{this.state.redgirl.title}</Text>
                <Text style={{ marginRight: 5, color: "gray" }}>{this.state.redgirl.author}</Text>
              </Button>
            </View>
          </TouchableHighlight>
          <View style={styles.nav}>
            <View style={styles.navleft}>
              <Text style={styles.welcome}>今日推荐</Text>
              <Image
                source={require('../../images/home/今日.png')}
                style={{ width: 32, height: 32, marginTop: 3 }}
              />
            </View>
            <View style={styles.navright}>
              <Image
                source={require('../../images/home/微笑2.png')}
                style={{ width: 28, height: 28, marginTop: 3 }}
              />
              <Text style={{ lineHeight: 32, fontSize: 14, color: '#333' }}>更多</Text>
            </View>
          </View>
          <View style={styles.longList}>
            <View style={styles.longleft}>
              <Image source={require('../../images/home/1.png')} style={{ width: '100%' }}></Image>
              <Image source={require('../../images/home/1.png')} style={{ width: '100%' }}></Image>
              <Image source={require('../../images/home/1.png')} style={{ width: '100%' }}></Image>
            </View>
            <View style={styles.longRight}>
              <FlatList
                data={this.state.todayAdvice}
                renderItem={({ item, i }) => {
                  return (
                    <TouchableHighlight underlayColor="#fff" onPress={() => { Actions.cartoonDetails(item) }}>
                      <View key={i} style={{ flexDirection: 'row', padding: 10 }}>
                        <Image source={{ uri: item.cover }} style={{ width: 90, height: 120 }}></Image>
                        <View style={{ justifyContent: 'space-around', marginLeft: 10 }}>
                          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.title}</Text>
                          <Text style={{ color: "gray", marginTop: -25 }}>{item.author}</Text>
                          <Text style={{ color: "gray", marginTop: -30 }}>{item.newUpdate}</Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  )
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: BannerWidth,
    height: 250
  },
  nav: {
    height: 42,
    flexDirection: "row",
    width: BannerWidth,
    marginTop: 5,
    justifyContent: "space-between",
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  navleft: {
    flexDirection: 'row',
    height: 42
  },
  navright: {
    height: 32,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 15,
    backgroundColor: '#fff'
  },
  welcome: {
    fontSize: 18,
    lineHeight: 42,
    paddingRight: 6
  },
  cartoons: {
    width: '100%'
  },
  box: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingLeft: 10,
    paddingRight: 10
  },
  longList: {
    width: BannerWidth,
    backgroundColor: "#FFFFFF",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  },
  longleft: {
    width: '40%'
  },
  longRight: {
    width: '60%'
  }
})

export default Home