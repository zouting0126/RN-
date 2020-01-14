import React from 'react'

import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'

const SearchHotWord = (props) => {
  renderHotWords = (hotwords) => {
    return hotwords.map((item, index) => (
      <TouchableNativeFeedback onPress={() => { props.getKeyWords(item.word) }} key={index}>
        <Text style={styles.words}>{item.word}</Text>
      </TouchableNativeFeedback>
    ))
  }

  return (
    <View style={styles.hot}>
      <Text style={{ lineHeight: 36, marginTop: 10, fontWeight: 'bold' }}>搜索热词</Text>
      <View style={styles.hotlist}>
        {renderHotWords(props.hotwords)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hot: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingBottom: 8
  },
  hotlist: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  words: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 9,
    paddingRight: 9,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 6,
    fontSize: 14,
    color: '#333'
  }
})

export default SearchHotWord