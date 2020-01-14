import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, ImageBackground } from 'react-native'
import Carousel from 'react-native-banner-carousel'
import { Actions } from 'react-native-router-flux'

const { width, height } = Dimensions.get('window')

console.log(width, height)

class StartScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [
        { png: require('../images/screen/guide1.png') },
        { png: require('../images/screen/guide2.png') },
        { png: require('../images/screen/guide3.png') },
        { png: require('../images/screen/guide4.png') }
      ]
    }
  }

  showStart = (index) => {
    if (index === this.state.images.length - 1) {

    }
  }
  // 渲染轮播图
  renderStartScreen = (images) => {
    return images.map((item, index) => (
      <ImageBackground source={item.png} style={{ width: width, height: height }} key={index}>
        <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, color: '#FFF' }}>
            {index === 0 ? '动漫陪你每一个夜晚' : index === 1 ? '同你去往每一个地方' : index === 2 ? '懂你，更懂你所爱' : index === 3 ? '因为在意，所以用心' : ''}
          </Text>
        </View>
        {index === 3 ? (<View style={styles.start}>
          <Text style={styles.word} onPress={() => { Actions.app() }}>立即启程</Text>
        </View>) : null}
      </ImageBackground>
    ))
  }
  render() {
    return (
      <View style={styles.wrap}>
        <StatusBar
          backgroundColor='#ff0000'
          translucent={true}
          hidden={true}
          animated={true}
        />
        <Carousel
          index={0}
          loop={false}
          autoplay={false}
          pageSize={width}
          showsPageIndicator={false}
          onPageChanged={this.showStart}
        >
          {this.renderStartScreen(this.state.images)}
        </Carousel>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: width
  },
  start: {
    position: 'absolute',
    bottom: '12%',
    width: width,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  word: {
    width: '42%',
    height: 48,
    textAlign: 'center',
    lineHeight: 48,
    color: '#f1f1f1',
    borderWidth: 1,
    borderColor: '#f1f1f1'
  }
})

export default StartScreen
