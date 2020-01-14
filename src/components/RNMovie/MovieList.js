import React from 'react'


import { View, Text, ActivityIndicator, FlatList,TouchableHighlight,Image,StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
class MovieList extends React.Component{
    constructor(props){
        super(props);
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
            onEndReached={this.loadNextPage} // 当距离不足 0.5 的时候，触发这个方法，加载下一页数据
        />
    }
    componentWillMount() {
        this.getMoviesByPage()
    }

    // 根据页码获取电影列表
    getMoviesByPage = () => {
        const start = (this.state.nowPage - 1) * this.state.pageSize
        
        const url = `https://douban.uieee.com/v2/movie/in_theaters&start=${start}&count=${this.state.pageSize}`
        //在RN中要发送网络请求，可以直接用fetch()
        fetch(url)
        .then(res => {
            if (res.ok) {
              return res.json()
            } else {
              console.error('服务器忙，请稍后重试' + res.status)
            }
          })
          .then(data => {
            this.setState((state) => {
                        return {
                            isloading: false,
                            movies: state.movies.concat(data.subjects)
                        }
                    })
          })
          .catch(err => {
            console.error(err)
          })
 
            // .then(res => res.json())
            // .then(data => {           
            //     this.setState((state) => {
            //         return {
            //             isloading: false,
            //             movies: state.movies.concat(data.subjects)
            //         }
            //     })
            // })
    }

    renderItem = (item) => {
        return <TouchableHighlight underlayColor="#fff" onPress={()=>Actions.moviedetail({id:item.id})}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Image source={{ uri: item.images.small }} style={{ width: 100, height: 140, marginRight: 10 }}></Image>
                {/*justify-content:主軸的對齊 */}
                <View style={{ justifyContent: 'space-around' }}>
                    
                    <Text><Text style={styles.movieTitle}>电影名称：</Text>{item.title}</Text>
                    <Text><Text style={styles.movieTitle}>电影类型：</Text>{item.genres.join('，')}</Text>
                    <Text><Text style={styles.movieTitle}>制作年份：</Text>{item.year}年</Text>
                    <Text><Text style={styles.movieTitle}>豆瓣评分：</Text>{item.rating.average}分</Text>
                </View>
            </View>
        </TouchableHighlight>
    }

    // 渲染分割线
    renderSeparator = () => {
        return <View style={{ borderTopColor: '#ccc', borderTopWidth: 1, marginLeft: 10, marginRight: 10 }}></View>
    }

    // 加载下一页
    loadNextPage = () => {
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

export default MovieList;