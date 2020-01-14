import React from 'react'
import { TouchableHighlight, View, Text, Image, StyleSheet } from 'react-native'
import Carousel from 'react-native-banner-carousel'
import { Actions } from 'react-native-router-flux'

const Banner = (props) => {
  const Static = `http://statics.zhuishushenqi.com`
  // 渲染轮播图
  renderBanner = (images) => {
    return images.map(item => (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => { Actions.bookDetail({ id: item._id }) }}
      >
        <View key={item._id} style={styles.wrap}>
          <View
            style={{ height: 180, paddingTop: 15, paddingBottom: 15, flexDirection: 'row', width: '100%' }}>
            <Image
              source={{ uri: Static + item.cover }}
              style={{ width: '28%', height: 150, borderRadius: 5, overflow: 'hidden' }}
            />
            <View style={{ width: '69%', paddingLeft: '3%', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ width: '100%', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{item.author}:{item.title}</Text>
                <Text numberOfLines={2} style={{ color: '#666' }}>{item.shortIntro}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', lineHeight: 24, marginTop: 10, marginBottom: 6 }}>
                <Text style={{ color: '#333', lineHeight: 24 }}>{item.author}</Text>
                <Text style={{ borderWidth: 1, borderColor: '#eee', padding: 2 }}>{item.minorCate}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    ))
  }
  return (
    <Carousel
      autoplay
      autoplayTimeout={3000}
      loop
      index={0}
      pageIndicatorStyle={{ backgroundColor: '#F1F1F1' }}
      activePageIndicatorStyle={{ backgroundColor: '#FF9A6A' }}
    >
      {renderBanner(props.bookBanner)}
    </Carousel>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    height: 180,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1'
  },
})

export default Banner