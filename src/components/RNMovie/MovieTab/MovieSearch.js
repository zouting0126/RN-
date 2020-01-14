import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, Image,TextInput,value } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Item } from 'native-base'
import { Actions } from 'react-native-router-flux'

class MovieSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
            value:''
    }
  }
 text=(value)=>{
   this.setState({
    value:value
   })
 }
  render() {
    return (
      <Container style={{ borderColor: 'white', }}>
        <Header style={{backgroundColor:'#008b8a'}}>
          <Left>
            <Button transparent onPress={() => Actions.Movie()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          
          <Body>
              <TextInput
                 style={{ backgroundColor: 'white', width: 240, height: 35 ,borderRadius:17.5}}
                 // style={{ height:'100%', borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={this.text}
                  value={this.state.value}
                  placeholder='那些年我们'
              />
          </Body>

          <Right>
            <Button transparent>
              <Icon name='search' onPress={()=>Actions.MvSearchList({q:this.state.value})}/>
            </Button>
          </Right>
        </Header>
        <View style={styles.wrapper}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

            <TouchableHighlight style={styles.box} onPress={() => Actions.xijuMovie()}>
              <View style={styles.box}>
                <View style={[styles.case, styles.caseColor1]}>
                  <Image source={require('../images/笑脸.png')} style={{ width: 23, height: 23,}} />
                </View>
                <Text style={{ color: "#e98f36", }}>搞笑</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.box} onPress={()=>Actions.loveMovie()}>
            <View style={styles.box}>
              <View style={[styles.case, styles.caseColor2]}>
                <Icon type="FontAwesome" name="heart-o" style={{ fontSize: 25, color: 'deeppink' }} />
              </View>
              <Text style={{ color: "deeppink" }}>爱情</Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.box} onPress={() => Actions.actionMovie()}>
              <View style={styles.box}>
                <View style={[styles.case, styles.caseColor3]}>
                  <Image source={require('../images/动作.png')} style={{ width: 23, height: 23 }} />
                </View>
                <Text style={{ color: "#1c39e0" }}>动作</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.box} onPress={() => Actions.technologyMovie()}>
              <View style={styles.box}>
                <View style={[styles.case, styles.caseColor4]}>
                  <Image source={require('../images/科技.png')} style={{ width: 23, height: 23 }} />
                </View>
                <Text style={{ color: "#7dc5eb" }}>科技</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.box} onPress={()=>Actions.documentaryMovie()}>
            <View style={styles.box}>
              <View style={[styles.case, styles.caseColor5]}>
                <Image source={require('../images/记录.png')} style={{ width: 30, height: 32,marginTop:-5 }} />
              </View>
              <Text style={{ color: "#87c38f" }}>纪录</Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.box} onPress={() => Actions.cartoonMovie()}>
              <View style={styles.box}>
                <View style={[styles.case, styles.caseColor6]}>
                  <Image source={require('../images/动漫.png')} style={{ width: 23, height: 23 }} />
                </View>
                <Text style={{ color: "#1afa29" }}>动漫</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.box1} onPress={() => Actions.warMovie()}>
            <View style={styles.box1}>
              <View style={{
                width: 38, height: 38, borderRadius: 19, borderWidth: 2, alignItems: 'center', paddingTop: 6,
                marginLeft: 40, marginRight: 8
              }}>
                <Image source={require('../images/犯罪.png')} style={{ width: 23, height: 23 }} />
              </View>
              <Text style={{ color: "#2c2c2c" ,}}>犯罪</Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.box1}  onPress={() => Actions.crimeMovie()}>
              <View style={styles.box1}>
                <View style={{
                  width: 38, height: 38, borderRadius: 19, borderWidth: 2, borderColor: '#d81e06', alignItems: 'center', paddingTop: 6,
                  marginLeft: -5, marginRight: 8
                }}>
                  <Image source={require('../images/战争.png')} style={{ width: 23, height: 23 }} />
                </View>
                <Text style={{ color: "#d81e06" }}>战争</Text>
              </View>
            </TouchableHighlight>

          </View>
        </View>

      </Container>
    )
  }
 
}

const styles = StyleSheet.create({
  hit:{
    width: '33.33%',
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  wrapper: {
    width: '90%',
    alignItems: 'center',
    marginLeft: '16%',
    marginTop: '10%'
  },
  box: {
    width: '33.33%',
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box1: {
    width: '50%',
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  case: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    alignItems: 'center',
    paddingTop: 6,
    marginLeft: 10,
    marginRight: 8
  },
  caseColor1: {
    borderColor: '#e98f36',
    marginLeft:-6
    
  },
  caseColor2: {
    borderColor: 'deeppink',
    marginLeft:-6
  },
  caseColor3: {
    borderColor: '#1c39e0',
    marginLeft:-6
  },
  caseColor4: {
    borderColor: '#7dc5eb',
    marginLeft:-6
  },
  caseColor5: {
    borderColor: '#87c38f',
    marginLeft:-6
  },
  caseColor6: {
    borderColor: '#1afa29',
    marginLeft:-6
  },
})

export default MovieSearch