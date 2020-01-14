import React, { Component } from 'react'
 import LoveMovieStars from './Stars/LoveMovieStars'
import { View, Text, ActivityIndicator, FlatList, TouchableHighlight, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
// import constants from 'jest-haste-map/build/constants'

class loveMovie extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: [], // 电影列表
            nowPage: 1, // 当前的页码
            pageSize: 10, // 每页显示的记录条数
            isloading: true // 是否正在加载数据
        }
    }

    render() {
        if (this.state.isloading) {
            return <ActivityIndicator size="large"></ActivityIndicator>
        }
        {/*FlatList是一个高性能的列表组件,它是ListView组件的升级版,性能方面有了很大的提升 */ }
        return <FlatList
            data={this.state.movies}
            keyExtractor={(item, i) => i} // 解决 key 问题
            renderItem={({ item }) => this.renderItem(item)} // 调用方法，去渲染每一项
            ItemSeparatorComponent={this.renderSeparator} //渲染分割线的属性方法
            onEndReachedThreshold={0.5} // 距离底部还有多远的时候，触发加载更多的事件
            // onEndReached={this.loadNextPage} // 当距离不足 0.5 的时候，触发这个方法，加载下一页数据
        />
    }

    componentWillMount() {
        this.getMoviesByPage()
    }

    // 根据页码获取电影列表
    getMoviesByPage = () => {
     // console.log(this.state.nowPage)
     // console.log(this.state.pageSize)
        const start = (this.state.nowPage - 1) * this.state.pageSize
        console.log(start)
        // const url = `http://t.yushu.im/v2/movie/search?tag=喜剧&start=${start}&count=${this.state.pageSize}`
        const url = `http://t.yushu.im/v2/movie/search?tag=爱情&start=${start}&count=${this.state.pageSize}`
        //在RN中要发送网络请求，可以直接用fetch()
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState((state) => {
                    return {
                        isloading: false,
                        movies: state.movies.concat(data.subjects)
                    }
                })
                console.log(movies)
            })
    }

    renderItem = (item) => {
        return <TouchableHighlight underlayColor="#fff" onPress={()=>Actions.moviedetail({id:item.id})}>
            <View style={{ flexDirection: 'row', padding: 8 }}>
                <Image source={{ uri: item.images.large }} style={{ width: 100, height: 140, marginRight: 10,borderRadius:5 }}></Image>
                {/*justify-content:主軸的對齊 */}
                <View style={{ justifyContent: 'space-around', width: '70%',}}>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                    <Text style={{ color: 'grey', marginTop: 10 }}>{item.directors[0].name}</Text>
                    {/* <Text><Text style={styles.movieTitle}>电影类型：</Text>{item.genres.join(',')}</Text> */}
                    <Text style={{ color: 'grey' ,marginTop: 5}}><Text style={{ color: 'grey', marginTop: 5 }}>主演：</Text>{item.casts.length > 0 ? item.casts[0].name : ""},{item.casts.length > 1 ? item.casts[1].name : ""}</Text>
                    <Text style={{ color: 'grey',marginTop: 5 }}>{item.year}</Text>
                    {/* <Text><Text style={{color:'#ffb518',fontSize:20}}>★★★✰✰</Text></Text> */}
                   <View style={{flexDirection:'row'}}>
                    <LoveMovieStars rating={item.rating.average}></LoveMovieStars>
                    <Text style={{marginLeft:8,color:'#ffb518'}}>{item.rating.average}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    }

    // 渲染分割线
    renderSeparator = () => {
        return <View style={{ borderTopColor: 'white', borderTopWidth: 2, marginLeft: 10, marginRight: 10 }}></View>
    }

    // 加载下一页
    loadNextPage = () => {
        // 如果下一页的页码值，大于总页数了，直接return
        this.setState({
            nowPage: this.state.nowPage + 1
        }, function () {
            this.getMoviesByPage()
        })
    }
}

const styles = StyleSheet.create({
    movieTitle: {
      
        width:'100%'
    }
})

export default loveMovie;