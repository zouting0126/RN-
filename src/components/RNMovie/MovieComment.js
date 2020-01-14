import React from 'react'
import { Text, View, Image, FlatList,ActivityIndicator,StyleSheet,Input} from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import MvComment from './MvComment/MvComment'

import {  Icon,Item } from 'native-base'
class MovieComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [], // 评论列表
            nowPage: 1, // 当前的页码
            pageSize: 10, // 每页显示的记录条数
            isloading: false // 是否正在加载数据
        }
    }
    render() {

        if (this.state.isloading) {
            return <ActivityIndicator size="small"></ActivityIndicator>
        }
        {/*FlatList是一个高性能的列表组件,它是ListView组件的升级版,性能方面有了很大的提升 */ }
        return <FlatList
            data={this.state.comments}
            keyExtractor={(item, i) => i} // 解决 key 问题
            renderItem={({ item }) => this.renderCommentItem(item)} // 调用方法，去渲染每一项
            ItemSeparatorComponent={this.renderSeparator} //渲染分割线的属性方法
            onEndReachedThreshold={0.5} // 距离底部还有多远的时候，触发加载更多的事件
            onEndReached={this.loadNextPage} // 当距离不足 0.5 的时候，触发这个方法，加载下一页数据  
        />

    }

    componentWillMount() {      
        this.getCommentsByPage()
    }

    // 根据页码获取评论列表
    getCommentsByPage() {
        const start = (this.state.nowPage - 1) * this.state.pageSize
        const url = `https://douban.uieee.com/v2/movie/subject/27668250/comments?start=${start}&count=${this.state.pageSize}&apikey=0df993c66c0c636e29ecbb5344252a4a`
        //在RN中要发送网络请求，可以直接用fetch()
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //console.warn(data);
                const comments = data.comments
                this.setState((state) => {
                    return {
                        isloading: false,
                        comments: this.state.comments.concat(data.comments)
                    }
                })
                //console.log(comments[0].author.name)//名字
            })
    }

    renderCommentItem = (item) => {

        return (
           <View style={{padding:4}}>
            <View style={{ width: '100%', marginLeft: 10, flexDirection: 'row', marginTop: 20,padding:4}}>
                <Image source={{ uri: item.author.avatar }} style={{ width: 30, height: 30, borderRadius: 15, borderColor: '#9e8bfe', borderWidth: 1 }}></Image>          
                    <View style={{width:'50%',flexDirection: 'row'}}>
                        <Text style={{ fontSize: 14,marginLeft:5 ,}}>{item.author.name}</Text>
                        <Image source={require('./images/icon_selected.png')} style={{  marginLeft: 10,width:14,height:14 }}></Image>
                        <Image source={require('./images/icon_selected.png')} style={{  width:14,height:14 }}></Image>
                        <Image source={require('./images/icon_selected.png')} style={{  width:14,height:14 }}></Image>
                        <Image source={require('./images/icon_unselect.png')} style={{ width:14,height:14 }}></Image>
                        <Image source={require('./images/icon_unselect.png')} style={{ width:14,height:14 }}></Image>
                        </View>
                        <View style={{ flexDirection: 'row',width:'50%',marginLeft:60 }}>
                        <Image source={require('./images/点赞.png')} style={{ width:12,height:12}}></Image>  
                        <Text style={{ fontSize: 12, marginLeft: 10, color:'#9a9b9d'}}>{item.useful_count}</Text>
                        </View>
                        </View>   
              
                    <View style={{marginLeft:40,padding:4,width:'100%'}}>
                        <MvComment children={item.content} style={{color:'#5d5d5d',fontSize:12,width:'85%',lineHeight:20}}></MvComment>
                     {/* <Text >{item.content}</Text> */}
                    </View>
                    <Text style={{ fontSize: 12, marginTop: 5, color: '#9a9b9d' ,marginLeft:215}}>{item.created_at}</Text> 
                </View>       
           
        )
    }

    渲染分割线
    renderSeparator = () => {
        return <View style={{ borderTopColor: '#ccc', borderTopWidth: 1, marginLeft: 10, marginRight: 10 }}></View>
    }

    // 加载下一页
    loadNextPage = () => {
        // 如果下一页的页码值，大于总页数了，直接return
        if ((this.state.nowPage + 1) > this.state.totalPage) {
            return
        }

        this.setState({
            nowPage: this.state.nowPage + 1
        }, function () {
            this.getCommentsByPage()
        })
    }

}

const styles = StyleSheet.create({
   
    icon: {
      fontSize: 25,
      color: 'gray'
    },
    renderIcon: {
      fontSize: 25,
      color: '#FF9A6A'
    }
  })
  
export default MovieComment;