import React, { Component, PropTypes } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Image, Animated } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MovieComment from './MovieComment'
import MoviePhotosList from './MoviePhotosList'
import MvDetailStars2 from './MvDetail/MvDetailStars2'
//import CommentStars from './CommentStars'
import MovieDetailSummary from './MvDetail/MovieDetailSummary'
import MvDetailStars from './MvDetail/MvDetailStars'
export default class MovieDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieInfo: {}, // 电影信息
            isloading: true,
            photos: []
        }
    }

    componentWillMount() {
        this.getMovieDetail();
    }

    getMovieDetail = () => {
        const url = `https://douban.uieee.com/v2/movie/subject/${this.props.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.warn(data.casts);
                // console.warn(data.rating.stars);
                //console.warn(data.writers[0].name);
                //console.warn(data.clips[0].medium);
                const photos = data.photos.image
                this.setState({
                    movieInfo: data,
                    isloading: false,
                    photos: data.photos.image
                })
                //console.log(movieInfo)
                console.log(movieInfo)
            })
    }
    render() {
        if (this.state.isloading) {
            return <ActivityIndicator size="large"></ActivityIndicator>
        }
        {/*View視圖無法滾動，ScrollView允許視圖超出範圍滾動*/ }
        return <ScrollView>
            <View style={{ padding: 4 }}>
                {/* <LinearGradient  colors={['#9c8bfd', '#ccc2fe', '#eeedfd',]} style={{height: 350}}> */}
                <View style={{ alignItems: 'center', backgroundColor: '#917efc', height: 325, paddingTop: 45, }}>
                    <Image source={{ uri: this.state.movieInfo.images.large }} style={{ width: 160, height: 260, borderRadius: 3, }}></Image>
                </View>
                {/* </LinearGradient> */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '60%' }}>
                        <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 10 }}>{this.state.movieInfo.title}</Text>
                        <Text style={{ marginLeft: 10, color: '#9a9b9d', marginTop: 2 }}>{this.state.movieInfo.year}/{this.state.movieInfo.genres[0]}/{this.state.movieInfo.genres[1]}/{this.state.movieInfo.genres[2]}</Text>
                        <Text style={{ marginLeft: 10, color: '#9a9b9d', marginTop: 2 }}>原名:{this.state.movieInfo.original_title}</Text>
                        <Text style={{ marginLeft: 10, color: '#9a9b9d', marginTop: 2 }}>导演:{this.state.movieInfo.writers.length > 0 ? this.state.movieInfo.writers[0].name : ""}</Text>
                    </View>
                    <View style={{ marginLeft: 20, width: '30%', height: 110, border: 1, backgroundColor: 'white', marginTop: 20, alignItems: 'center', padding: 10, borderRadius: 3, shadowColor: '#ccc', shadowOffset: 2 }}>
                        <Text style={{ color: '#9a9b9d' }}>综合评分</Text>
                        <Text style={{ fontSize: 16 }}>{this.state.movieInfo.rating.average}</Text>
                        <MvDetailStars rating={this.state.movieInfo.rating.average} ></MvDetailStars>
                        <Text style={{ color: '#9a9b9d' }}>{this.state.movieInfo.collect_count} 人</Text>
                    </View>
                </View>
                <Text style={{ marginLeft: 10, color: '#9a9b9d', width: '65%', marginTop: -22 }}>
                    主演:{this.state.movieInfo.casts.length > 0 ? this.state.movieInfo.casts[0].name : ""}
                    {this.state.movieInfo.casts.length > 1 ? this.state.movieInfo.casts[1].name : ""}
                    {this.state.movieInfo.casts.length > 2 ? this.state.movieInfo.casts[2].name : ""}
                    {this.state.movieInfo.casts.length > 3 ? this.state.movieInfo.casts[3].name : ""}
                </Text>

                <View style={{ width: '90%', height: 45, borderColor: 'yellow', borderWidth: 1, marginLeft: 18, flexDirection: 'row', backgroundColor: 'white', paddingTop: 14, paddingLeft: 80, marginTop: 20, borderRadius: 5 }}>
                    <Text style={{ fontSize: 16, color: 'yellow', marginTop: -2 }}>我来评分</Text>
                    <MvDetailStars2 style={{ marginLeft: 10 }}></MvDetailStars2>
                </View>
                <Text style={{ marginTop: 30, marginLeft: 10, color: '#9a9b9d', marginBottom: 10 }}>简介</Text>
                <MovieDetailSummary children={this.state.movieInfo.summary}></MovieDetailSummary>
                <Text style={{ marginLeft: 10, marginTop: 15, color: '#9a9b9d' }}>影人</Text>
                <View style={{ flexDirection: 'row', width: '100%', marginTop: 20, paddingLeft: 5, paddingRight: 5 }}>
                    <View style={{ width: '25%', alignItems: 'center' }}>

                        <Image source={{ uri: this.state.movieInfo.casts.length && this.state.movieInfo.casts[0].avatars.medium }} style={{ width: '98%', height: 135, borderRadius: 2 }} alt={{}}></Image>

                        {/* <Image source={{ uri: this.state.movieInfo.casts[0].avatars.medium }} style={{ width: '98%', height: 135, borderRadius: 2 }} alt={{}}></Image> */}
                        <Text>{this.state.movieInfo.casts.length && this.state.movieInfo.casts[0].name}</Text>
                    </View>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        <Image source={{ uri: this.state.movieInfo.casts.length && this.state.movieInfo.casts[1].avatars.medium }} style={{ width: '98%', height: 135, borderRadius: 2 }}></Image>
                        <Text>{this.state.movieInfo.casts[1].name}</Text>
                    </View>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        <Image source={{ uri: this.state.movieInfo.casts.length && this.state.movieInfo.casts[2].avatars.medium }} style={{ width: '98%', height: 135, borderRadius: 2 }}></Image>
                        <Text>{this.state.movieInfo.casts[2].name}</Text>
                    </View>
                    <View style={{ width: '25%', alignItems: 'center' }}>
                        <Image source={{ uri: this.state.movieInfo.casts.length && this.state.movieInfo.casts[3].avatars.medium }} style={{ width: '98%', height: 135, borderRadius: 2 }}></Image>
                        <Text>{this.state.movieInfo.casts[3].name}</Text>
                    </View>
                </View>
                <Text style={{ marginLeft: 10, marginTop: 15, color: '#9a9b9d' }}>剧照</Text>
                <MoviePhotosList photos={this.state.movieInfo.photos}></MoviePhotosList>

                <Text style={{ marginTop: 20, marginLeft: 10 }}>全部热评</Text>
                <View style={{ marginTop: 20, height: 40, width: '100%', backgroundColor: '#f7f7f9', alignItems: 'center' }}>
                    <Text style={{ lineHeight: 40, color: '#9a9b9d' }} onPress={() => { Actions.Login() }}> 1秒登录，说出你的看法</Text>
                </View>

                <MovieComment ></MovieComment>



            </View>
        </ScrollView>
    }

    showAll = () => {
        return (<View>
            <Text style={{ lineHeight: 30, marginTop: 20, marginLeft: 10 }}>{this.state.movieInfo.summary}</Text>
            <Text style={{ color: 'grey' }}>收起</Text>
        </View>)
    }

}

