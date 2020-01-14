import React from 'react'

import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'

const SearchHistory = ({ keywords }) => {
  let historys = []
  historys.push(keywords)
  
  renderHistory = (historys) => {
    return historys.map((item, index) => (
      <TouchableNativeFeedback onPress={() => { }} key={index}>
        <View style={{ width: '100%', height: 36, flexDirection: 'row' }}>
          <Text style={{ fontFamily: 'iconfont', fontSize: 17, color: '#333', lineHeight: 36 }}>&#xe8ad;</Text>
          <Text style={{ lineHeight: 36, paddingLeft: 6, fontSize: 14, color: '#333' }}>{item}</Text>
        </View>
      </TouchableNativeFeedback>
    ))
  }

  return (
    <View style={styles.history}>
      <View style={{ flexDirection: 'row', lineHeight: 36, justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>搜索历史</Text>
        <TouchableNativeFeedback onPress={() => { console.log('删除') }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 14, color: '#666', paddingRight: 4 }}>删除历史</Text>
            <Text style={{ fontFamily: 'iconfont', fontSize: 18, color: '#333' }}>&#xe8b6;</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View>
        {renderHistory(historys)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  history: {
    width: '100%',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingBottom: 8
  }
})

export default SearchHistory