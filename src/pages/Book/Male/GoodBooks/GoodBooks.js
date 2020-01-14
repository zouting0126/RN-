import React from 'react'
import { TouchableHighlight, View, Text, Image, StyleSheet, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'

const GoodBooks = (props) => {
  const Static = `http://statics.zhuishushenqi.com`
  // 渲染最好看的书
  renderSpecial = (special) => {
    return special.map((item, index) => {
      return (
        <TouchableHighlight
          underlayColor="#fff"
          onPress={() => { Actions.bookDetail({ id: item._id }) }}
          style={(index + 1) % 4 === 0 ? styles.cover2 : styles.cover1}
        >
          <View key={item._id}>
            <Image source={{ uri: Static + item.cover }} style={{
              width: '100%', height: 100, borderRadius: 5,
              overflow: 'hidden'
            }} />
            <Text numberOfLines={1} style={{ textAlign: 'center' }}>{item.title}</Text>
            <Text numberOfLines={2} style={{ textAlign: 'center' }}>{item.author}</Text>
          </View>
        </TouchableHighlight>
      )
    })
  }
  return (
    <View style={styles.special}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, height: 32, lineHeight: 32 }}>最好看的书</Text>
      <View style={styles.List}>
        {renderSpecial(props.special)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  special: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  List: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cover1: {
    width: '22%',
    marginRight: '4%',
    marginBottom: 10
  },
  cover2: {
    width: '22%',
    marginRight: 0,
    marginBottom: 20
  }
})

export default GoodBooks