import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'

const ResultList = ({ resultList, keywords }) => {
  const Static = `http://statics.zhuishushenqi.com`


  renderResult = (lists) => {
    return lists.map(item => (
      <TouchableNativeFeedback onPress={() => { Actions.bookDetail({ id: item._id }) }} key={item._id}>
        <View style={styles.lists}>
          <Image source={{ uri: Static + item.cover }} style={{ width: '24%', height: 150, borderRadius: 6 }} />
          <View style={styles.titles}>
            <Text style={styles.head}>{item.title}</Text>
            <Text numberOfLines={2} style={{ fontSize: 14, color: '#666' }}>{item.shortIntro}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'iconfont', fontSize: 16, color: '#666' }}>&#xe501;</Text>
                <Text style={{ paddingLeft: 10, color: '#444' }}>{item.author}</Text>
              </View>
              <View>
                <Text style={{ padding: 4, backgroundColor: '#efefef', borderRadius: 6, color: '#666', fontSize: 13 }}>{item.cat}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    ))
  }

  return (
    <View style={styles.wrap}>
      {renderResult(resultList)}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginTop: 10
  },
  lists: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
    marginBottom: 15
  },
  titles: {
    width: '72%',
    paddingLeft: '4%',
    height: 150,
    justifyContent: 'space-between'
  },
  head: {
    fontWeight: 'bold',
    lineHeight: 36
  }
})

export default ResultList