import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Complete = ({ complete, getResult }) => {
  // 渲染结果
  renderComplete = (lists) => {
    if (lists.length === 0) {
      return (
        <View style={{ width: '100%', height: 64, paddingTop: 32 }}>
          <Text style={{ width: '100%', textAlign: 'center', height: 64, fontSize: 18, color: '#FF9A6A' }}>暂时还没有呢</Text>
        </View>
      )
    }
    return lists.map((item, index) => (
      <Text
        key={index}
        style={styles.list}
        onPress={() => { getResult(item) }}
      >{item}</Text>
    ))
  }
  return (
    <View>
      {renderComplete(complete)}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    lineHeight: 46,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1'
  }
})

export default Complete