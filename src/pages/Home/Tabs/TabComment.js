import React, { Component } from 'react'
import { View, Text, Image, ScrollView, Dimensions, Modal, StyleSheet, Button } from 'react-native'

const Bannerheight = Dimensions.get('window').height;
const BannerWidth = Dimensions.get('window').width;


class TabComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            modalVisible: false
        }
    }
    componentDidMount() {
        this.getcomicCatalog()
    }
    getcomicCatalog = () => {
        fetch(`http://localhost:8081/mock/home_comic_comment.json`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    comments: data.data.comicComments
                })
            })
    }
    // modal框弹出与关闭的方法
    _openModalWin = () => {
        this.setState({ modalVisible: true });
    }

    _closeModalWin = () => {
        this.setState({ modalVisible: false });
    }

    renderItem(comment) {
        return comment.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', marginLeft: 10, borderBottomWidth: 0.5, borderBottomColor: "gray", marginTop: 10 }}>

                <Image style={{ width: 45, height: 45, borderRadius: 25 }} source={{ uri: item.headImg }} />

                <View style={{ marginLeft: 10, marginBottom: 10 }}>
                    <Text style={{ color: "#FF7F50" }}>{item.names}</Text>
                    <Text style={{ color: "gray", marginTop: 1 }}>{item.commentDate}</Text>
                    <Text numberOfLines={1} style={{ fontSize: 18, marginTop: 7, width: '100%' }}>{item.says}</Text>
                </View>
            </View>
        ))
    }
    render() {
        return (
            <View style={{ height: "88%" }}>
                <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                    <View style={{ marginTop: "-2%" }}>
                        {this.renderItem(this.state.comments)}
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }} onpress={this._openModalWin}>
                        <Text style={{ marginTop: 10 }} onPress={this._openModalWin}>更多评论...</Text>
                    </View>
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
                                <Text style={styles.modalTitleStyle}>没有更多咯~</Text>
                                <View style={styles.modalButtonStyle}>
                                    <Button title='返回' onPress={this._closeModalWin} style={{ justifyContent: "center" }}>
                                        <Text style={{ color: 'white', fontSize: 20 }}>点击返回</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>

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
        alignItems: "center",
        padding: 32
    },
    modalContainer: {
        width: 300,
        height: 100,
        backgroundColor: 'rgba(230, 230, 250, 0.5)',
        justifyContent: 'center',
        alignItems: "center",
    },
    modalTitleStyle: {
        textAlign: 'center',
        fontSize: 26
    },
    modalButtonStyle: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 10,
        width: "80%"
    }
});

export default TabComment