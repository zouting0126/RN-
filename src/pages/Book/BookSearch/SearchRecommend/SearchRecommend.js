import React from 'react'

import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'

const SearchRecommend = ({ recommendwords }) => {

  renderRecommend = (recommends) => {
    return recommends.map((item, index) => (
      <TouchableNativeFeedback key={index} onPress={() => {
        Actions.bookDetail({ id: item.book })
      }}>
        <View style={styles.list}>
          <Text style={{ fontFamily: 'iconfont', fontSize: 18, color: '#333', lineHeight: 36 }}>&#xe647;</Text>
          <Text numberOfLines={1} style={styles.word}>{item.word}</Text>
        </View>
      </TouchableNativeFeedback>
    ))
  }

  return (
    <View style={styles.recommends}>
      <View style={{ flexDirection: 'row', lineHeight: 36, justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>热门推荐</Text>
        <TouchableNativeFeedback>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 14, color: '#666', paddingRight: 4 }}>换一批</Text>
            <Text style={{ fontFamily: 'iconfont', fontSize: 18, color: '#333' }}>&#xe8b9;</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.wrap}>
        {renderRecommend(recommendwords)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  recommends: {
    width: '100%',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingBottom: 8
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  list: {
    flexDirection: 'row',
    width: '50%',
    height: 36
  },
  word: {
    fontSize: 14,
    color: '#333',
    lineHeight: 36,
    paddingLeft: 8,
    width: '81%'
  }
})

export default SearchRecommend