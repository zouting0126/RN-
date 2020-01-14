import React, { useState } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import Home from './src/pages/Home/Home'
import Movie from './src/pages/Movie/Movie'
import Book from './src/pages/Book/Book'
import Me from './src/pages/Me/Me'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

const App = () => {
  const [selectedTab, onChangeSelectedTab] = useState('home')
  return (
    <View style={styles.container}>
      <TabNavigator 
      tabBarStyle={{backgroundColor: '#fff'}}
      hidesTabTouch={false}
      >
        <TabNavigator.Item
          selected={selectedTab === 'home'}
          title="主页"
          titleStyle={{color: '#888'}}
          selectedTitleStyle={{color: '#FF9A6A'}}
          onPress={() => onChangeSelectedTab('home')}
          renderIcon={() => <Text style={{ fontFamily: 'iconfont', fontSize: 25, color: '#888' }}>&#xe508;</Text>}
          renderSelectedIcon={() => <Text style={{ fontFamily: 'iconfont', color: '#FF9A6A', fontSize: 25 }}>&#xe508;</Text>}
        >
          <Home />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={selectedTab === 'movie'}
          title="电影"
          titleStyle={{color: '#888'}}
          selectedTitleStyle={{color: '#FF9A6A'}}
          onPress={() => onChangeSelectedTab('movie')}
          renderIcon={() => <Text style={{ fontFamily: 'iconfont', fontSize: 25, color: '#888' }}>&#xe6bb;</Text>}
          renderSelectedIcon={() => <Text style={{ fontFamily: 'iconfont', color: '#FF9A6A', fontSize: 25 }}>&#xe6bb;</Text>}
        >
          <Movie />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={selectedTab === 'shopcar'}
          title="书架"
          titleStyle={{color: '#888'}}
          selectedTitleStyle={{color: '#FF9A6A'}}
          onPress={() => onChangeSelectedTab('shopcar')}
          renderIcon={() => <Text style={{ fontFamily: 'iconfont', fontSize: 25, color: '#888' }}>&#xe647;</Text>}
          renderSelectedIcon={() => <Text style={{ fontFamily: 'iconfont', color: '#FF9A6A', fontSize: 25 }}>&#xe647;</Text>}
        >
          <Book />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={selectedTab === 'me'}
          title="我的"
          titleStyle={{color: '#888'}}
          selectedTitleStyle={{color: '#FF9A6A'}}
          onPress={() => onChangeSelectedTab('me')}
          renderIcon={() => <Text style={{ fontFamily: 'iconfont', fontSize: 25, color: '#888' }}>&#xe501;</Text>}
          renderSelectedIcon={() => <Text style={{ fontFamily: 'iconfont', color: '#FF9A6A', fontSize: 25 }}>&#xe501;</Text>}
        >
          <Me />
        </TabNavigator.Item>
      </TabNavigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})

export default App;
