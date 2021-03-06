import React, { Component } from 'react'
import MovieStars from './MovieStars.js'
import { View, Text, ActivityIndicator, FlatList, TouchableHighlight, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
// import constants from 'jest-haste-map/build/constants'

class MovieListBeimei extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [], // 电影列表
            nowPage: 1, // 当前的页码
            pageSize: 15, // 每页显示的记录条数
            isloading: true, // 是否正在加载数据
            // num:stars/10,
            // arr:[1,2,3,4,5]
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
        const start = (this.state.nowPage - 1) * this.state.pageSize
        console.log(start)
        const url = `http://api.douban.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start}&count=${this.state.pageSize}`
        // const url = `http://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a&start=&count=${this.state.pageSize}`
        //在RN中要发送网络请求，可以直接用fetch()
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState((state) => { 
                    return {
                        isloading: false,
                        movies: state.movies.concat(data.subjects),
                    }
                })
            })
    }

    renderItem = (item) => {
        return <TouchableHighlight underlayColor="#fff" onPress={()=>Actions.moviedetail({id:item.subject.id})}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Image source={{ uri: item.subject.images.small }} style={{ width: 100, height: 140, marginRight: 10 }}></Image>
                {/*justify-content:主軸的對齊 */}
                <View style={{ justifyContent: 'space-around' }}>
                    <Text><Text style={styles.movieTitle}>电影名称：</Text>{item.subject.title}</Text>
                    <Text><Text style={styles.movieTitle}>电影类型：</Text>{item.subject.genres.join(',')}</Text>
                    <Text><Text style={styles.movieTitle}>主演：</Text>{item.subject.casts.length>0?item.subject.casts[0].name:""},{item.subject.casts.length>1?item.subject.casts[1].name:""}</Text>
                    <Text><Text style={styles.movieTitle}>制作年份：</Text>{item.subject.year}年</Text>
                    {/* <Text><Text style={{color:'#ffb518',fontSize:20}}>{item.subject.rating.stars}</Text></Text> */}
                    <MovieStars rating={item.subject.rating.average}></MovieStars>
                    {/* <Text>{ele>=this.state.num?<span style={{color:"#FFAC2D",fontSize:"20px"}}>☆</span>:<span style={{color:"#FFAC2D",fontSize:"20px"}}>★</span>}</Text> */}
                </View>
            </View>
        </TouchableHighlight>
    }

//  renderStars=()=>{
//     <Text>
//     {
//         this.state.arr.map((ele,index)=>{
//             return(
//                 <span key={index}>
//                     {ele>=this.state.num?<span style={{color:"#FFAC2D",fontSize:"20px"}}>☆</span>:<span style={{color:"#FFAC2D",fontSize:"20px"}}>★</span>}
//                 </span>
//             )
//         })
//     }
// </Text>
//  }

    // 渲染分割线
    renderSeparator = () => {
        return <View style={{ borderTopColor: '#ccc', borderTopWidth: 1, marginLeft: 10, marginRight: 10 }}></View>
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
        fontWeight: 'bold'
    }
})

export default MovieListBeimei;