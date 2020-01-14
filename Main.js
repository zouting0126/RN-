/**
 * react-native相关的路由都在这里
 */
import React from 'react'

import { Router, Stack, Scene } from 'react-native-router-flux'
import App from './App'
import StartScreen from './src/pages/StartScreen'
// home
import CartoonDetails from './src/pages/Home/CartoonDetails'
import ComicRead from './src/pages/Home/comicRead'
//电影
import Movie from './src/pages/Movie/Movie'
import MovieDetail from './src/components/RNMovie/MovieDetail.js'
import MovieList from './src/components/RNMovie/MovieList.js'
import MovieListTop from './src/components/RNMovie/MovieTab/MovieListTop'
import MovieListkoubei from './src/components/RNMovie/MovieTab/MovieListkoubei'
import MovieListBeimei from './src/components/RNMovie/MovieTab/MovieListBeimei'
import MovieListNew from './src/components/RNMovie/MovieTab/MovieListNew'
import MovieSearch from './src/components/RNMovie/MovieTab/MovieSearch'
import MvSearchList from './src/components/RNMovie/MovieTab/MvSearchList'
import xijuMovie from './src/components/RNMovie/MovieSearch/xijuMovie'
import actionMovie from './src/components/RNMovie/MovieSearch/actionMovie'
import cartoonMovie from './src/components/RNMovie/MovieSearch/cartoonMovie'
import crimeMovie from './src/components/RNMovie/MovieSearch/crimeMovie'
import loveMovie from './src/components/RNMovie/MovieSearch/loveMovie'
import warMovie from './src/components/RNMovie/MovieSearch/warMovie'
import documentaryMovie from './src/components/RNMovie/MovieSearch/documentaryMovie'
import technologyMovie from './src/components/RNMovie/MovieSearch/technologyMovie'
// book
import BookDetail from './src/pages/Book/BookDetail/BookDetail'
import BookContent from './src/pages/Book/BookContent/BookContent'
import BookChapter from './src/pages/Book/BookChapter/BookChapter'
import BookSearch from './src/pages/Book/BookSearch/BookSearch'
// me
import Login from './src/pages/Me/Login'
import Account from './src/pages/Me/Account'
import Phone from './src/pages/Me/Phone'
import Password from './src/pages/Me/Password'

const Main = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="screen" component={StartScreen} hideNavBar={true} />
        <Scene key="app" component={App} hideNavBar={true} />
        <Scene key="cartoonDetails" component={CartoonDetails} title="漫画详情" />
        <Scene key="comicRead" component={ComicRead} title="read" />
        <Scene key="Movie" navigationBarStyle={{ backgroundColor: "red" }} title="Mung" component={Movie} hideNavBar={true} />
        <Scene key="MovieSearch" navigationBarStyle={{ backgroundColor: "#008b8a" }} title="Mung" component={MovieSearch} hideNavBar={true} />
        <Scene key="MvSearchList" navigationBarStyle={{ backgroundColor: "#008b8a" }} title="搜索结果" component={MvSearchList}  />
        <Scene key="movielist" navigationBarStyle={{ backgroundColor: "#9966FF" }} component={MovieList} title="热映电影列表" />
        <Scene key="moviedetail" navigationBarStyle={{ backgroundColor: "#917efc" }} component={MovieDetail} title="电影详情" />
        <Scene key="MovieListTop" navigationBarStyle={{ backgroundColor: "#fe5b90" }} component={MovieListTop} title="top250" />
        <Scene key="MovieListkoubei" navigationBarStyle={{ backgroundColor: "#ffb518" }} component={MovieListkoubei} title="口碑榜" />
        <Scene key="MovieListBeimei" navigationBarStyle={{ backgroundColor: "#b37cfe" }} component={MovieListBeimei} title="口碑榜" />
        <Scene key="MovieListNew" navigationBarStyle={{ backgroundColor: "#00c5fd" }} component={MovieListNew} title="新片榜" />
        <Scene key="xijuMovie" navBarButtonColor={'white'} titleStyle={{ color: 'white' }} navigationBarStyle={{ backgroundColor: "#008b8a" }} component={xijuMovie} title="喜剧" />
        <Scene key="actionMovie" navBarButtonColor={'white'} titleStyle={{ color: 'white' }} navigationBarStyle={{ backgroundColor: "#008b8a" }} component={actionMovie} title="动作片" />
        <Scene key="cartoonMovie" navBarButtonColor={'white'} titleStyle={{ color: 'white' }} navigationBarStyle={{ backgroundColor: "#008b8a" }} component={cartoonMovie} title="动漫" />
        <Scene key="crimeMovie" navBarButtonColor={'white'} titleStyle={{ color: 'white' }} navigationBarStyle={{ backgroundColor: "#008b8a" }} component={crimeMovie} title="犯罪" />
        <Scene key="loveMovie" navBarButtonColor={'white'} titleStyle={{ color: 'white' }} navigationBarStyle={{ backgroundColor: "#008b8a" }} component={loveMovie} title="爱情" />
        <Scene key="warMovie" navBarButtonColor={'white'} titleStyle={{ color: 'white' }} navigationBarStyle={{ backgroundColor: "#008b8a" }} component={warMovie} title="战争" />
        <Scene key="documentaryMovie" navBarButtonColor={'white'} titleStyle={{ color: 'white' }} navigationBarStyle={{ backgroundColor: "#008b8a" }} component={documentaryMovie} title="纪录片" />
        <Scene key="technologyMovie" navBarButtonColor={'white'} titleStyle={{ color: 'white' }} navigationBarStyle={{ backgroundColor: "#008b8a" }} component={technologyMovie} title="科技" />
        <Scene key="bookDetail" component={BookDetail} hideNavBar={true} />
        <Scene key="bookChapter" component={BookChapter} hideNavBar={true} />
        <Scene key="bookContent" component={BookContent} hideNavBar={true} />
        <Scene key="bookSearch" component={BookSearch} hideNavBar={true} />
        <Scene key="Login" component={Login} />
        <Scene key="Account" component={Account} />
        <Scene key="Phone" component={Phone} />
        <Scene key="Password" component={Password} />
      </Stack>
    </Router>
  )
}

export default Main