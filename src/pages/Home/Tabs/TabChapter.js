import React, { Component } from 'react'
import { View, Modal, Text, TouchableHighlight, Dimensions, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'

// 获取到屏幕高度
const Bannerheight = Dimensions.get('window').height;
const BannerWidth = Dimensions.get('window').width;
let screenWidth = Dimensions.get('window').width;
let dialogWidth = screenWidth - 80;

class TabChapter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comicCatalog: {},
            modalVisible: false,
            comiclists: []
        }
    }
    collectBtn() {
        alert("111")
    }
    componentDidMount() {
        this.getcomicCatalog()
        this.getComiclists()
    }
    // modal框弹出与关闭的方法
    _openModalWin = () => {
        this.setState({ modalVisible: true });
    }

    _closeModalWin = () => {
        this.setState({ modalVisible: false });
    }

    renderItem(chapters) {
        return chapters.map((item, index) => (
            <View key={index} style={[{ width: "22%", marginBottom: "2%" }, (index + 1) % 4 === 0 ? { marginRight: 0 } : { marginRight: '4%' }]}>
                {/* 目录 */}
                <TouchableOpacity onPress={this._openModalWin} >
                    <Button transparent bordered style={{ width: "100%", justifyContent: "center", borderColor: "#DCDCDC" }}
                        onPress={this._openModalWin}>
                        <Text style={{ fontSize: 18, color: '#666666' }}>{item.nums}</Text>
                    </Button>
                </TouchableOpacity>
            </View>
        ))
    }

    getcomicCatalog = () => {
        fetch(`http://localhost:8081/mock/home_comic_catalog.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    comicCatalog: data.data
                })
            })
    }

    getComiclists = () => {
        fetch(`http://localhost:8081/mock/home_comic_books.json`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    comiclists: data.data.blockList
                })
            })
    }
    renderlists(Item, index) {
        return (
            <View key={index} style={[{ width: '30%', height: 200, marginBottom: 5 }, (index + 1) % 3 === 0 ? { marginRight: 0 } : { marginRight: '5%' }]}>
                <Image style={{ width: '100%', height: 150 }} source={{ uri: Item.cover }} />
                <Text style={{ textAlign: "center", fontSize: 16, }} numberOfLines={1}>{Item.title}</Text>
                <Text style={{ fontSize: 13, textAlign: "center", color: "gray" }} numberOfLines={1}>{Item.description}</Text>
            </View>
        )
    }
    goMovieList = (Item) => {
        Actions.cartoonDetails(Item)
    }
    render() {
        return (
            <View style={{ width: '100%'}}>
                <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                    <View style={{ flexDirection: 'row', marginTop: 12, height: 36, paddingLeft: 15, paddingRight: 15 }}>
                        <Text style={{ fontSize: 16, color: "gray" }}>{this.state.comicCatalog.comicdate}</Text>
                        <Text style={{ fontSize: 16, color: "gray", marginLeft: 6 }}>{this.state.comicCatalog.update}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: BannerWidth, marginTop: "3%", paddingLeft: 15, paddingRight: 15 }}>
                        {this.renderItem(this.state.comicCatalog.catalogs || [])}
                    </View>

                    <View style={{ width: BannerWidth, justifyContent: "center", marginTop: "2%", alignItems: "center", paddingLeft: 15, paddingRight: 15 }}>
                        <Button bordered transparent style={{ width: "100%", borderColor: "#DCDCDC" }}
                            onPress={this._openModalWin}>
                            <Text style={{ color: 'gray', fontSize: 20, textAlign: 'center', width: '100%' }}>大人，查看更多目录</Text>
                        </Button>
                        {/* 弹框 */}
                        <Modal
                            animationType='fade' // 指定了 modal 的动画类型。类型：slide 从底部滑入滑出|fade 淡入淡出|none 没有动画
                            transparent={true} // 背景是否透明，默认为白色，当为true时表示背景为透明。
                            visible={this.state.modalVisible} // 是否显示 modal 窗口
                            onRequestClose={() => { this._closeModalWin(); }} // 回调会在用户按下 Android 设备上的后退按键或是 Apple TV 上的菜单键时触发。请务必注意本属性在 Android 平台上为必填，且会在 modal 处于开启状态时阻止BackHandler事件
                            onShow={() => { console.log('modal窗口显示了'); }}
                        >
                            <View style={styles.modalLayer}>
                                <View style={styles.modalContainer}>
                                    <Text style={styles.modalTitleStyle}>充钱才能看！</Text>
                                    <View style={styles.modalButtonStyle}>
                                        <Button title='取消' onPress={this._closeModalWin} style={{ justifyContent: "center" }}>
                                            <Text style={{ color: 'white', fontSize: 18 }}>去充值</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>

                    {/* 六宫格 */}
                    <View style={{ paddingLeft: 15, paddingRight: 15, width: '100%' }}>
                        <Text style={{ color: "gray", fontSize: 16, marginBottom: 10, marginTop: 15 }}>骚年们都在看</Text>
                        <TouchableHighlight onPress={() => { Actions.cartoonDetails() }}>
                            <View style={{ flexDirection: 'row', flexWrap: "wrap", width: '100%' }}>
                                {this.state.comiclists.map((Item, index) => this.renderlists(Item, index))}
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentStyle: {
        padding: 30
    },
    contentTextStyle: {
        textAlign: 'center',
        fontSize: 26
    },
    modalLayer: {
        flex: 1,
        justifyContent: 'center',
        padding: 32
    },
    modalContainer: {
        height: 300,
        backgroundColor: 'rgba(230, 230, 250, 0.5)',
        justifyContent: 'center'
    },
    modalTitleStyle: {
        textAlign: 'center',
        fontSize: 26
    },
    modalButtonStyle: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 10
    }
});

export default TabChapter;