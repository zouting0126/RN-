import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableNativeFeedback } from 'react-native'
import SearchHotWord from './SearchHotWord/SearchHotWord'
import SearchRecommend from './SearchRecommend/SearchRecommend'
import SearchHistory from './SearchHistory/SearchHistory'
import ResultList from './ResultList/ResultList'
import Complete from './Complete/Complete'

const BookSearch = () => {
  const placeholder = '搜点什么吧'
  const [keywords, useKeywords] = useState('')
  const [hotwords, useHotwords] = useState([])
  const [recommendwords, useRecommendwords] = useState([])
  const [history, useHistory] = useState([])
  const [showResult, useShowResult] = useState(false) // 显示结果的控制
  const [resultList, useResultList] = useState([])
  const [complete, useComplete] = useState([])
  const [showComplete, useShowComplete] = useState(false) // 控制提示词

  // 热搜词
  useEffect(() => {
    fetch(`http://novel.juhe.im/search-hotwords`)
      .then(res => res.json())
      .then(data => {
        let { searchHotWords } = data
        searchHotWords = searchHotWords.filter((item, index) => {
          if (index < 12) {
            return true
          }
          return false
        })
        useHotwords(searchHotWords)
      })
  }, [])

  // 推荐词
  useEffect(() => {
    fetch(`http://novel.juhe.im/hot-books`)
      .then(res => res.json())
      .then(data => {
        let { newHotWords } = data
        newHotWords = newHotWords.filter((item, index) => {
          if (index < 8) {
            return true
          }
          return false
        })
        useRecommendwords(newHotWords)
      })
  }, [])

  // 请求得到提示词
  useEffect(() => {
    fetch(`https://novel.juhe.im/auto-complete?query=${keywords}`)
      .then(res => res.json())
      .then(data => {
        useComplete(data.keywords)
      })
  }, [keywords])

  // 请求关键字
  const getKeyWords = (keywords) => {
    useKeywords(keywords)
    fetch(`http://novel.juhe.im/search?keyword=${keywords}`)
      .then(res => res.json())
      .then(data => {
        useShowResult(true)
        useResultList(data.books)
      })
  }

  goback = () => {
    if (showComplete) {
      useShowComplete(false)
    }
  }

  handleChange = (value) => {
    useKeywords(value)
    useShowComplete(true)
  }

  handleSearch = (keywords) => {
    getKeyWords(keywords)
  }

  getResult = (item) => {
    useKeywords(item)
    getKeyWords(item)
  }
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text
          onPress={() => { goback() }}
          style={{ width: '14%', textAlign: 'center' }}
        >返回</Text>
        <View style={{ width: '71%', height: 42, borderWidth: 1, borderColor: '#f1f1f1', borderRadius: 6 }}>
          <TextInput
            value={keywords}
            placeholder={placeholder}
            onChangeText={handleChange}
            autoFocus={true}
            style={{ width: '100%', height: '100%', color: '#333', paddingTop: 10 }}
          />
        </View>
        <TouchableNativeFeedback onPress={() => handleSearch(keywords)}>
          <Text style={{ width: '15%', textAlign: 'center' }}>搜索</Text>
        </TouchableNativeFeedback>
      </View>
      <ScrollView style={{ paddingLeft: 15, paddingRight: 15 }}>
        {showResult ? (<ResultList resultList={resultList} keywords={keywords} />) : showComplete ? (<Complete complete={complete} getResult={getResult} />) : (
          <View>
            <SearchHotWord hotwords={hotwords} getKeyWords={getKeyWords} />
            <SearchRecommend recommendwords={recommendwords} />
            <SearchHistory keywords={keywords} />
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF'
  },
  head: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: '#FF9A6A',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default BookSearch