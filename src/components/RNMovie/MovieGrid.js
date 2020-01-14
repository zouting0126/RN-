import React from 'react'
import { Image, Text, View, ScrollView, TouchableHighlight, StyleSheet,ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux'
import MvGridStars from './MvGrid/MvGridStars'
class MovieGrid extends React.Component {
    constructor() {
        super();
        this.state = {
            movieGrids: [],
            nowPage: 1, // 当前的页码
            pageSize: 15, // 每页显示的记录条数
            isloading: true,
        }
    }
    render() {
        if (this.state.isloading) {
            return <ActivityIndicator size="large"></ActivityIndicator>
        }
        // console.log(item)
        return (
            <ScrollView style={{flex:1}}
            >
                <View style={{ flexDirection: 'row', width: '100%', paddingLeft:8,paddingRight:8, flexWrap: 'wrap' }}>
                    {this.state.movieGrids.map((item, index) => this.renderGrid(item, index))}
                </View>
            </ScrollView>
        )

    }

    
    // ending=()=>{
    //     return{
    //         alert('加载完毕')
    //     }
    //   }
        
    // style={(index + 1) % 3 === 0 ? styles.movieList2 : styles.movieList1
    renderGrid = (item, index) => {
        return (
            <TouchableHighlight
                underlayColor="#fff"
                onPress={() => Actions.moviedetail({ id: item.id })}
                key={item.id}
                style={(index + 1) % 3 === 0 ? styles.movieList2 : styles.movieList1}
            >
                <View style={{width: '100%',alignItems:'center'}}>
                    <Image source={{ uri: item.images.large }} style={{ width: '100%', height: 135, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}></Image>
                    <Text style={{ color: 'white',fontSize:14,marginTop:3,height:36 }}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', height:'15%',marginTop:5}}>
                        <View style={{width:'50%'}}>
                        <MvGridStars  rating={item.rating.average}></MvGridStars>
                        </View>
                        <Text style={{ color: 'yellow', fontSize: 14, marginLeft: 5,marginTop:-5 }}>{item.rating.average}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    //获取电影图片及具体信息
    componentDidMount() {
        this.getMovies();
        //console.log(1)

    }
    getMovies() {
        const start = (this.state.nowPage - 1) * this.state.pageSize
        const url = `https://douban.uieee.com/v2/movie/coming_soon?start=${start}&count=${this.state.pageSize}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const movieGrids = data.subjects.filter((item, index) => {
                    //console.log(1)
                    if (index <= 16) {
                        return true
                    }
                    return false;
                   
                   
                })
                this.setState({
                    movieGrids: this.state.movieGrids.concat(movieGrids),
                    isloading: false,
                })
               
            })
    }
}

const styles = StyleSheet.create({
    movieList1: {
        width: '32%',
        height: 195,
        marginRight: '2%',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#917efc',
        marginTop: 10
    },
    movieList2: {
        width: '32%',
        height: 195,
        marginRight: 0,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#917efc',
        marginTop: 10
    }

})
export default MovieGrid;