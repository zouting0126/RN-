import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'

const BookComment = (props) => {
  const Static = `http://statics.zhuishushenqi.com`
  // 渲染评论
  renderComments = (comments) => {
    return comments.map(item => (
      <View key={item._id} style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
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
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', height: 32 }}>
          <Text style={{ paddingRight: 10, lineHeight: 32 }}>点赞</Text>
          <Text style={{ lineHeight: 32 }}>评论</Text>
        </View>
      </View>
    ))
  }
  return <View>
    <View style={styles.comments}>
      <Text style={{ fontWeight: 'bold' }}>书友评论</Text>
      <Text style={{ color: '#FF9A6A' }}>写评论</Text>
    </View>
    <View style={styles.commmentsList}>
      {renderComments(props.bookComments)}
    </View>
  </View>
}

const styles = StyleSheet.create({
  comments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  commmentsList: {
    width: '100%'
  },
})

export default BookComment