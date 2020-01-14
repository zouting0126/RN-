import React from 'react'
import { View, Text,ScrollView,StyleSheet,TouchableHighlight,ActivityIndicator} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base'
//import MovieList from '../../components/RNMovie/MovieList.js'
 import MovieSwiper from '../../components/RNMovie/MovieSwiper.js'
 import MovieGrid from '../../components/RNMovie/MovieGrid'
class Movie extends React.Component {
 constructor(){
   super();
   this.state={
   isLoading:true
   }
 }
 componentDidMount(){
   if(MovieSwiper&&MovieGrid){
     this.setState({
    isLoading:false
     })
   }
 }
render(){
  if(this.state.isLoading){
return  <ActivityIndicator size="large"></ActivityIndicator>
  }
  return (
    <Container style={{width:'100%',height:'100%',flex:1}} >
  
     <Header style={{backgroundColor:'#917efc'}}>
       <Left>
         <Button transparent>
           <Icon name='film' />
         </Button>
       </Left>
       <Body style={{paddingLeft:100}} >
         <Title>Mung</Title>
       </Body>
       <Right>
         <Button transparent onPress={()=>Actions.MovieSearch()}>
           <Icon name='search'/>
         </Button>
       </Right>
     </Header>
 <ScrollView stickyHeaderIndices={[1]}>
     <MovieSwiper></MovieSwiper>
<View style={styles.containers}>
 <View style={styles.bangdan}>
   
 <TouchableHighlight style={styles.box} onPress={()=>Actions.MovieListTop()}>
     <View style={{width: '100%', height: '100%'}} >
       <View style={{width:46,height:46,borderWidth:1,borderColor:'#fe5b90',borderRadius:23,backgroundColor:'#fe5b90',
       alignItems:'center',marginLeft:'25%',paddingTop: 5,marginTop: 2,alignItems: 'center',}}>
         <Icon type="FontAwesome" name="line-chart" style={{fontSize: 25, color: 'white'}}/>
       </View>
         <Text style={{textAlign:'center',color:'white',marginBottom: 5,width:'100%',height:20}}>Top250</Text>
     </View>
 </TouchableHighlight>

 <TouchableHighlight style={styles.box} onPress={()=>Actions.MovieListkoubei()}>
     <View style={{width: '100%', height: '100%'}} >
       <View style={{width:46,height:46,borderWidth:1,borderColor:'#ffb518',borderRadius:23,backgroundColor:'#ffb518',
       alignItems:'center',marginLeft:'25%',paddingTop: 5,marginTop: 2,alignItems: 'center'}}>
         <Icon type="FontAwesome" name="thumbs-up" style={{fontSize: 25, color: 'white'}}/>
       </View>
         <Text style={{textAlign:'center',color:'white',marginBottom: 5,width:'100%',height:20}}>口碑榜</Text>
     </View>
</TouchableHighlight>

 <TouchableHighlight style={styles.box} onPress={()=>Actions.MovieListBeimei()}> 
     <View style={{width: '100%', height: '100%'}} >
       <View style={{width:46,height:46,borderWidth:1,borderColor:'#b37cfe',borderRadius:23,backgroundColor:'#b37cfe',
       alignItems:'center',marginLeft:'25%',paddingTop: 5,marginTop: 2,alignItems: 'center',}}>
         <Icon type="FontAwesome" name="globe" style={{fontSize: 28, color: 'white'}}/>
       </View>
         <Text style={{textAlign:'center',color:'white',marginBottom: 5,width:'100%',height:20}}>北美票房榜</Text>
     </View>
 </TouchableHighlight>

 <TouchableHighlight style={styles.box} onPress={()=>Actions.MovieListNew()}> 
     <View style={{width: '100%', height: '100%'}}>
       <View style={{width:46,height:46,borderWidth:1,borderColor:'#00c5fd',borderRadius:23,backgroundColor:'#00c5fd',
       alignItems:'center',marginLeft:'25%',paddingTop: 5,marginTop: 2,alignItems: 'center',}}>
         <Icon type="FontAwesome" name="video-camera" style={{fontSize: 25, color: 'white'}}/>
       </View>
         <Text style={{textAlign:'center',color:'white',marginBottom: 5,width:'100%',height:20}}>新片榜</Text>
     </View>
 </TouchableHighlight>
 </View>
 </View>

 <View style={{flex:1,marginTop:5,paddingBottom:10}}>
  <MovieGrid></MovieGrid>

  </View>
  </ScrollView>
 </Container>
 

 
 
)
}
  
}

const styles = StyleSheet.create({
  box:{
    width:'100%',
    height:'100%',
    //backgroundColor:'red'
  },
  containers: {
    //backgroundColor: '#917efc',
    width:'96%',
    height:90,
    marginLeft:'2%',
    flexDirection: 'row',
   backgroundColor:'white',
    // borderRadius:5,
    // marginTop:10
  },
  contents: {
    flex: 1,
    flexDirection: 'row' ,
    // justifyContent: 'center',
    backgroundColor:'yellow',
    width:'25%',
  },
  bangdan:{
      flex: 1, 
      flexDirection: 'row' ,
      justifyContent: 'center',
      width:'100%',
      height: 70,
      backgroundColor: '#917efc',
      marginTop: 2,
      borderRadius: 10,
     height:90
  },
  box: {
    width: '25%',
    height: '100%',
},
  icon: {
    fontSize: 25,
    color: 'gray'
  },
  renderIcon: {
    fontSize: 25,
    color: '#FF9A6A'
  },
})
export default Movie