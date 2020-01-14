import React from 'react';

import { Image, Text, View, StyleSheet, TouchableHighlight, Dimensions,ActivityIndicator } from 'react-native';

import Carousel from 'react-native-banner-carousel';
import { Actions } from 'react-native-router-flux'
//import MovieStars from './MovieStarts'
import MvSwiperStars from './MvSwiper/MvSwiperStars'
const BannerWidth = Dimensions.get('window').width;
//const BannerHeight = 220;
class MovieSwiper extends React.Component {
    constructor() {
        super();
        this.state = {
            tabs: [],
            movies: [],
            nowPage: 1, // 当前的页码
            pageSize: 15, // 每页显示的记录条数
            isloading: true,
        }
    }

    render() {
        if (this.state.isloading) {
            return <ActivityIndicator size="large"></ActivityIndicator>
        }
        return (
            <View style={styles.swipe} >

                <Carousel
                    autoplay

                    loop
                    index={1}
                    pageSize={BannerWidth}
                    pageIndicatorContainerStyle={{ position: "absolute", right: 20, }}
                    style={{ flex: 1 }}
                >
                    {this.state.movies.map((movie, index) => this.renderPage(movie, index))}

                </Carousel>
            </View>
        )
    }

    renderPage = (item) => {
        return (
            <TouchableHighlight underlayColor="#fff" onPress={() => Actions.moviedetail({ id: item.id })}>
                <View key={item.id} style={styles.imagebox}>
                    <View style={{ height: '100%', flex: 2, marginLeft: 150, backgroundColor: 'red' }}>
                        <Text style={styles.movieTitle}>{item.title}</Text>
                        <Image style={styles.imgs} source={{ uri: item.directors[0].avatars.small }} />
                        <Text style={{ color: 'white', marginLeft: 40, marginTop: -25, fontSize: 14 }}>{item.directors[0].name}</Text>
                        <Text style={{ marginTop: 10, color: 'white', fontSize: 14,width:'90%' }}>
                            主演:{item.casts.length>0?item.casts[0].name:""} {item.casts.length>1?item.casts[1].name:""} {item.casts.length>2?item.casts[2].name:""}{item.casts.length>3?item.casts[3].name:""} 
                        </Text>
                        <Text style={styles.wodrstyle}>{item.collect_count} 看过</Text>
                        <View style={{width:'50%',marginTop:10}}>
                        <MvSwiperStars style={{width:'60%'}} rating={item.rating.average}></MvSwiperStars>
                        </View>
                        <Text style={{ color: 'yellow',  marginLeft:110}}>{item.rating.average}</Text>
                    </View>
                    <Image style={styles.lunboimg} source={{ uri: item.images.small}} alt=''></Image>                 
                </View>
            </TouchableHighlight>
        );
    }

    //获取电影图片及具体信息
    componentDidMount() {
        this.getMoviesByPage();
        // console.log(1)

    }
    // 根据页码获取电影列表
    getMoviesByPage() {
        const start = (this.state.nowPage - 1) * this.state.pageSize
        const url = `https://douban.uieee.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start}&count=${this.state.pageSize}`
        //在RN中要发送网络请求，可以直接用fetch()
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const movies = data.subjects.filter((item, index) => {
                    if (index <= 4) {
                        return true
                    }
                    return false
                })
                this.setState({
                    movies: this.state.movies.concat(movies),
                    isloading: false,
                })

                //console.log(movies[0].collect_count)//点击量
                // console.log(movies[0].title)//电影名
                //console.log(movies[0].casts.name)
                //console.log(movies[0].starts)//电影名
                //console.log(movies[0].rating.stars)
                // console.log(movies.casts[0].name)
            })
    }
}




const styles = StyleSheet.create({
    imagebox: {
        width: '95%',
        marginLeft: 10,
        height: 200,
        backgroundColor: '#917efc',
        borderRadius: 6,
        marginTop: 10,


    },
    lunboimg: {
        height: 180,
        width: 120,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,

    },
    imgs: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginTop: 10,

    },
    movieTitle: {
        color: 'white',
        fontSize: 18,
        marginTop: 15,

    },
    wodrstyle: {
        color: 'white',

        marginTop: 10,
        fontSize: 14,
    }
});




export default MovieSwiper;
