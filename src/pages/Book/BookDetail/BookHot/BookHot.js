import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'

const BookHot = (props) => {
  const Static = `http://statics.zhuishushenqi.com`

  // 渲染短评
  renderHotComment = (list) => {
    return list.map((item,index) => (
      <View style={{ marginBottom: 10 }} key={index}>
        <View style={{ flexDirection: 'row', width: '100%', height: 36, marginTop: 6 }}>
          <Image style={{ height: 36, width: 36, borderRadius: 18 }} source={{ uri: Static + item.author.avatar }} />
          <Text style={{ lineHeight: 36, color: '#666', paddingLeft: 10 }}>{item.author && item.author.nickname}</Text>
        </View>
        <View style={{ lineHeight: 36 }}>
          <Text>5分</Text>
        </View>
        <View>
          <Text style={{ color: '#666' }}>
            {item.content}
          </Text>
        </View>
      </View>
    ))
  }
  return (
    <View style={styles.hotComments}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>热门短评</Text>
        <Text style={{ color: '#FF9A6A' }}>写短评</Text>
      </View>
      <ScrollView
        style={styles.carousel}
        onMomentumScrollBegin={() => props._onMomentumScrollBegin(false)}
        onMomentumScrollEnd={() => props._onMomentumScrollEnd(true)}
      >
        {renderHotComment(props.shortComments)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  hotComments: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  carousel: {
    width: '100%',
    height: 118
  }
})

export default BookHot