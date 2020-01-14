import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, FlatList, RefreshControl, ActivityIndicator, TouchableHighlight, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Banner from '../Male/Banner/Banner'
import GoodBooks from '../Male/GoodBooks/GoodBooks'
import Editor from '../Male/Editor/Editor'
import GatherNews from '../Male/GatherNews/GatherNews'

const Female = () => {
  const Static = `http://statics.zhuishushenqi.com`
  const limit = 20
  const [isLoading, useIsLoading] = useState(true)
  const [bookBanner, useBookBanner] = useState([])
  const [special, useSpecial] = useState([])
  const [editor, useEditor] = useState([])
  const [gather, useGather] = useState([])
  const [newsBooks, useNewsBooks] = useState([])
  const [oldBooks, useOldBooks] = useState([])
  const [moreBooks, useMoreBooks] = useState([])
  const [newPage, useNewPage] = useState(1)
  const [showFoot, useShowFoot] = useState(0) // 0隐藏 1数据已经加载完毕 2显示加载中
  const [isRefreshing, useIsRefreshing] = useState(false) // 下拉控制

  // 请求轮播图部分
  useEffect(() => {
    fetch(`http://novel.juhe.im/category-info?gender=female&type=hot&major=现代言情&minor=&start=0&limit=5`)
      .then(res => res.json())
      .then(data => {
        useBookBanner(data.books)
      })
  }, [])
  // 请求最好看的书
  useEffect(() => {
    fetch(`http://novel.juhe.im/category-info?gender=female&type=hot&major=青春校园&minor=&start=0&limit=12`)
      .then(res => res.json())
      .then(data => {
        useIsLoading(false)
        useSpecial(data.books)
      })
  }, [])
  // 出版精品
  useEffect(() => {
    fetch(`http://novel.juhe.im/category-info?gender=female&type=hot&major=现代言情&minor=&start=10&limit=8`)
      .then(res => res.json())
      .then(data => {
        useEditor(data.books)
      })
  }, [])
  // 精品聚会
  useEffect(() => {
    fetch(`http://novel.juhe.im/category-info?gender=female&type=hot&major=古代言情&minor=&start=0&limit=8`)
      .then(res => res.json())
      .then(data => {
        useGather(data.books)
      })
  }, [])
  // 新品书籍
  useEffect(() => {
    fetch(`http://novel.juhe.im/category-info?gender=female&type=hot&major=古代言情&minor=&start=10&limit=8`)
      .then(res => res.json())
      .then(data => {
        useNewsBooks(data.books)
      })
  }, [])
  // 原创作品
  useEffect(() => {
    fetch(`http://novel.juhe.im/category-info?gender=female&type=hot&major=古代言情&minor=&start=20&limit=8`)
      .then(res => res.json())
      .then(data => {
        useOldBooks(data.books)
      })
  }, [])
  // 请求获取更多的书籍
  useEffect(() => {
    const getMoreBooks = (limit) => {
      let start = (newPage - 1) * limit
      fetch(`http://novel.juhe.im/category-info?gender=female&type=hot&major=现代言情&minor=&start=${start}&limit=${limit}`)
        .then(res => res.json())
        .then(data => {
          useMoreBooks(moreBooks.concat(data.books))
          if (data.books < limit) {
            useShowFoot(1)
          }
        })
    }
    getMoreBooks(limit)
  }, [newPage])

  getBanner = () => {
    return new Promise((resolve, reject) => {
      fetch(`http://novel.juhe.im/category-info?gender=female&type=hot&major=现代言情&minor=&start=0&limit=5`)
        .then(res => res.json())
        .then(data => {
          resolve(data.books)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  getGoodBook = () => {
    return new Promise((resolve, reject) => {
      fetch(`http://novel.juhe.im/category-info?gender=female&type=hot&major=青春校园&minor=&start=0&limit=12`)
        .then(res => res.json())
        .then(data => {
          console.log(333)
          resolve(data.books)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
  // 渲染拿到更多的书
  renderMoreBooks = (item) => {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => { Actions.bookDetail({ id: item._id }) }}
      >
        <View style={styles.contentCover}>
          <Image source={{ uri: Static + item.cover }} style={{ width: '24%', height: 90, borderRadius: 4, overflow: 'hidden' }} />
          <View style={{ paddingLeft: '4%', width: '70%', height: 100 }}>
            <Text style={{ color: '#000', fontWeight: 'bold', height: 24 }}>{item.title}</Text>
            <Text numberOfLines={2}>{item.shortIntro}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 14, color: '#666', fontSize: 14, lineHeight: 24 }}>{item.author}</Text>
              <Text style={{ borderWidth: 1, borderColor: '#eee', padding: 3, fontSize: 13 }}>{item.minorCate}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  // 加载动画
  renderFooter = () => {
    if (showFoot === 1) {
      return (
        <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
          <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
            没有更多数据了
          </Text>
        </View>
      )
    } else if (showFoot === 2) {
      return (
        <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start' }}>
          <ActivityIndicator color="#FF9A6A" />
          <Text>正在加载更多数据...</Text>
        </View>
      )
    } else if (showFoot === 0) {
      return (
        <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start' }}>
          <Text></Text>
        </View>
      )
    }
  }
  _keyExtractor = (item) => {
    return item._id + Math.random()
  }
  // 加载下一页
  loadMore = () => {
    useNewPage(newPage + 1)
  }
  // 下拉刷新
  _onRefresh = () => {
    useIsRefreshing(true)
    Promise.all([getBanner(), getGoodBook()])
      .then(result => {
        console.log(result.length)
        useIsRefreshing(false)
        result.forEach((item, index) => {
          if (index === 0) {
            useBookBanner(item)
          } else {
            useSpecial(item)
          }
        })
      })
  }

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#FF9A6A" />
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={moreBooks}
          renderItem={({ item }) => renderMoreBooks(item)}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={_onRefresh}
            />
          }
          keyExtractor={_keyExtractor}
          ListHeaderComponent={() => (
            <View>
              <Banner bookBanner={bookBanner} />
              <GoodBooks special={special} />
              <Editor editor={editor} />
              <GatherNews gather={gather} />
              <GatherNews gather={newsBooks} />
              <GatherNews gather={oldBooks} />
              <Text style={{ fontWeight: 'bold', fontSize: 18, lineHeight: 42, marginTop: 10, paddingLeft: 20 }}>上万本好书等着你</Text>
            </View>
          )}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  content: {
    marginTop: 12
  },
  contentCover: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20
  }
})
export default Female