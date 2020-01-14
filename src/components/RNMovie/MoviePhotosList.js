import React from 'react';
//剧照组件
import { Image, Dimensions, View, ScrollView, StyleSheet, Text,FlatList } from 'react-native';
class MoviePhotosList extends React.Component {
    constructor(photos) {
        super(photos);
        //console.log(this.props.photos[0])
        this.state = {
            photos: this.props.photos,
            onPress:false
        }
    }

    // scrollView子视图
    renderItem() {
        var itemAry = [];
        // 获取json中图片
        var imgAry = this.state.photos;
        // 根据json数据实例化视图
        for (var i = 0; i < imgAry.length; i++) {
            // 取出单个对象
            var item = imgAry[i];
            // 将子视图放进 itemAry
            itemAry.push(
                // 实例化子视图
                <Image key={i} style={styles.itemStyle} source={{ uri: item.image }}  />
            )
        }

        // 返回数组
        return itemAry;
    }
    render() {       
        return (
        <View style={styles.container}>
                <FlatList
                                data={this.state.photos}
                                keyExtractor={(item, index) => index}
                                renderItem={({item,index})=>(this.renderItem())}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />   
            </View>
        );
    }

}
// 样式
var styles = StyleSheet.create({
    container: {
       // backgroundColor: 'white',
        flexDirection:'row',
        height:150
    },
    container1: {
        backgroundColor: 'pink',
        width:'100%',
        height:'100%'
    },

    scrollViewStyle: {
        // 背景色
        //backgroundColor:'yellow',
        // 上边距
        marginTop: 20
    },

    itemStyle: {
        // 尺寸
        width: 200,
        height: 150,
        // 图片等比例拉伸
        //resizeMode:'contain'
        marginLeft: 2
    },
    scrollViewStyle2: {
        backgroundColor: 'white',

    }
   
});
export default MoviePhotosList;
