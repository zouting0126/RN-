import React from 'react'
import { TouchableHighlight, View, Text, Image, StyleSheet, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'

const GatherNews = (props) => {
  const Static = `http://statics.zhuishushenqi.com`
  // 渲染精品聚会
  renderGather = (item) => {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => { Actions.bookDetail({ id: item._id }) }}
      >
        <View style={styles.gatherCover} key={item._id}>
          <Image
            source={{ uri: Static + item.cover }}
            style={{ height: 90, width: 80, backgroundColor: '#FF9A6A', borderRadius: 5, overflow: 'hidden' }}
          />
          <Text numberOfLines={1} style={{ fontWeight: 'bold', lineHeight: 28, fontSize: 16 }}>{item.title}</Text>
          <Text numberOfLines={1} style={{ color: '#666', fontSize: 14 }}>{item.author}</Text>
        </View>
      </TouchableHighlight>
    )
  }
  return (
    <View style={styles.gather}>
      <Text style={styles.title}>精品聚会</Text>
      <FlatList
        style={{ flexDirection: 'row' }}
        data={props.gather}
        renderItem={({ item }) => renderGather(item)}
        horizontal={true}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  gather: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 36
  },
  gatherCover: {
    marginRight: 20,
    width: 80,
  },
})
export default GatherNews