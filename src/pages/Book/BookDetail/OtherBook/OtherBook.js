import React from 'react'
import { View, Text, Image, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'

const OtherBook = (props) => {
  const Static = `http://statics.zhuishushenqi.com`
  // 渲染看了这本书还想看
  renderOther = (list) => {
    return list.map((item, index) => (
      <TouchableNativeFeedback onPress={() => Actions.bookDetail({ id: item._id })} key={item._id}>
        <View style={(index + 1) % 4 === 0 ? styles.content2 : styles.content1}>
          <Image style={{ width: '100%', height: 90 }} source={{ uri: Static + item.cover }} />
          <View style={{ justifyContent: 'space-between' }}>
            <Text numberOfLines={1}>{item.title}</Text>
            <Text numberOfLines={2}>{item.author}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    ))
  }
  return (
    <View style={styles.wrap}>
      <Text style={{ lineHeight: 36, fontWeight: 'bold' }}>看了这本书的人还在看</Text>
      <View style={styles.list}>
        {renderOther(props.otherBooks)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginTop: 10
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  content1: {
    width: '22%',
    marginRight: '4%',
    height: 130,
    marginBottom: 10
  },
  content2: {
    width: '22%',
    marginRight: 0,
    height: 130,
    marginBottom: 10
  }
})

export default OtherBook
