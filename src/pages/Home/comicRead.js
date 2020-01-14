import React, { Component } from 'react'
import { Image, View, ScrollView } from 'react-native';

class comicRead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comicPictures: []
    }
  }
  componentDidMount() {
    this.getcomicPictures()
  }
  getcomicPictures = () => {
    fetch(`http://localhost:8081/mock/home_comic_image_list.json`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          comicPictures: data.data.comicPictureList
        })
      })
  }
  renderItem(Item, index) {
    return (
      <View key={index} style={{ width: '100%' }}>
        <Image source={{ uri: Item }} style={{ width: '100%', height: 740 }}></Image>
      </View>
    )
  }
  render() {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <ScrollView>
          {this.state.comicPictures.map((Item, index) => this.renderItem(Item, index))}
        </ScrollView>
      </View>
    )
  }
}
export default comicRead;
