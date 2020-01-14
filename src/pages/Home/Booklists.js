import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Image, View, Text, StyleSheet, TouchableNativeFeedback, } from 'react-native';

class Booklists extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  goMovieList = (item) => {
    Actions.cartoonDetails(item)
  }
  renderItem(item, index) {
    return (
      <TouchableNativeFeedback onPress={() => this.goMovieList(item)}>
        <View key={index} style={[styles.cartoonList, (index + 1) % 3 === 0 ? { marginRight: 0 } : { marginRight: '5%' }]}>
          <Image style={{ width: '100%', height: 150 }} source={{ uri: item.cover }} />
          <Text style={{ textAlign: "center", fontSize: 16, }} numberOfLines={1}>{item.title}</Text>
          <Text style={{ fontSize: 13, textAlign: "center", color: "gray" }} numberOfLines={1}>{item.description}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
  render() {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 10, paddingRight: 10 }}>
        {this.props.comiclists.map((item, index) => this.renderItem(item, index))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cartoonList: {
    width: '30%',
    height: 200
  }
})

export default Booklists