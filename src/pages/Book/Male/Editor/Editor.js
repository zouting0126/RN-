import React from 'react'
import { TouchableHighlight, View, Text, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'

const Editor = (props) => {
  const Static = `http://statics.zhuishushenqi.com`
  // 渲染出版精品
  renderEditor = (editor) => {
    return editor.map((item, index) => {
      return (
        <TouchableHighlight
          underlayColor="#fff"
          onPress={() => { Actions.bookDetail({ id: item._id }) }}
        >
          <View style={{ flexDirection: 'row', marginBottom: 10 }} key={item._id}>
            <Image
              source={{ uri: Static + item.cover }}
              style={{ width: '21%', borderRadius: 5, overflow: 'hidden' }}
            />
            <View style={{ width: '76%', paddingLeft: '3%' }}>
              <Text style={{ width: '100%', fontSize: 18, fontWeight: 'bold' }}>{item.author}:{item.title}</Text>
              <Text numberOfLines={2} style={{ color: '#666' }}>{item.shortIntro}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', lineHeight: 24, marginTop: 10 }}>
                <Text style={{ color: '#333', lineHeight: 24 }}>{item.author}</Text>
                <Text style={{ borderWidth: 1, borderColor: '#eee', padding: 2 }}>{item.minorCate}</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      )
    })
  }
  return (
    <View style={styles.editor}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, height: 32, lineHeight: 32 }}>出版精品</Text>
      {renderEditor(props.editor)}
    </View>
  )
}

const styles = StyleSheet.create({
  editor: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
})

export default Editor