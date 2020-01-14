import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableHighlight, TouchableNativeFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'

class TabDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ComicIntroduce: {},
            comiclists: []
        }
    }
    componentDidMount() {
        this.getComicIntroduce()
        this.getComiclists()
    }
    getComicIntroduce = () => {
        fetch(`http://localhost:8081/mock/comicDetail_tab1.json`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    ComicIntroduce: data.data
                })
            })
    }
    // 六宫格数据的请求
    getComiclists = () => {
        fetch(`http://localhost:8081/mock/home_comic_books.json`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    comiclists: data.data.blockList
                })
            })
    }
    renderItem(Item, index) {
        return (
            <TouchableNativeFeedback underlayColor="#fff" onPress={() => { Actions.cartoonDetails(Item) }} key={index}>
                <View style={[{ width: '30%', height: 200, marginBottom: 5 }, (index + 1) % 3 === 0 ? { marginRight: 0 } : { marginRight: '5%' }]}>
                    <Image style={{ width: '100%', height: 150 }} source={{ uri: Item.cover }} />
                    <Text style={{ textAlign: "center", fontSize: 16, }} numberOfLines={1}>{Item.title}</Text>
                    <Text style={{ fontSize: 13, textAlign: "center", color: "gray" }} numberOfLines={1}>{Item.description}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    goMovieList = (Item) => {
        console.log(1)
        Actions.cartoonDetails(Item);
    }

    render() {
        return (
            <View style={{ width: '100%' }}>
                <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                    <Text style={styles.txtStyle}>&emsp; {this.props.txt}</Text>
                    {/* 六宫格 */}
                    <View style={{ paddingLeft: 15, paddingRight: 15, width: '100%' }}>
                        <Text style={{ color: "gray", fontSize: 16, marginBottom: 10, marginTop: 15 }}>骚年们都在看</Text>
                        <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                            {this.state.comiclists.map((Item, index) => this.renderItem(Item, index))}
                        </View>
                    </View>
                </ScrollView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    txtStyle: {
        fontSize: 18,
        color: "#666666",
        paddingLeft: 15,
        paddingRight: 15
    },
})

export default TabDetail;
