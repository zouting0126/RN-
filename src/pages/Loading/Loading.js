import React, { Component } from 'react'

import { View, Text } from 'react-native'

const loadingImage = [
  { loading: require('../../images/loading/loading_1.png') },
  { loading: require('../../images/loading/loading_2.png') },
  { loading: require('../../images/loading/loading_3.png') },
  { loading: require('../../images/loading/loading_4.png') }
]

class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  renderLoading = (loading) => {
    loading.map((item, index) => (
      <Image source={item} style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }} key={index} />
    ))
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {renderLoading(loadingImage)}
      </View>
    )
  }
}

export default Loading