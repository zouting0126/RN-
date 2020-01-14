import React from 'react';

import { Image, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet, Text, View } from 'react-native';

import StringDistinction from './KeyValueChange';

export default class KeyValue extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            color: false,

            ReData: [

                {

                    type: 1,

                    content: '4.1.1（1）蓄电池外观应无裂纹、无损伤；密封应良好，应无渗漏，安全排气阀应处于关闭状态。应无渗漏，安全排气阀应处于关闭状态。',

                    title: '《电气装置安装工程蓄电池施工及验收规范》',

                    id: 'GB 50172-2012'

                },

                {

                    type: 2,

                    content: '（三）工艺标准库 0201010504 （4）保护帽混凝土抗压强度满足设计要求。（6）保护帽顶面应留有排水坡度，顶面不得积水。',

                    title: '《国家电网公司输变电工程标准工艺》',

                    id: 'GB 34565-2010'

                },

                {

                    type: 1,

                    content: '4.1.1（1）蓄电池外观应无裂纹、无损伤；密封应良好，应无渗漏，安）蓄电电池外观无损伤；密封应良好，应无渗漏，安全排气阀应处于关闭状态。',

                    title: '《电气装置安装工程 高压电器施工及验收规范》',

                    id: 'GB 50147-2010'

                },

                {

                    type: 1,

                    content: '4.1.1（1）蓄电池外观应无裂纹、无损伤；伤；密封应良好，应无渗漏，安全排裂纹、无损伤；密封应良好，应无渗漏，安全排气阀应处于关闭状态。',

                    title: '《电气装置安装工程电力变压器、油浸电抗器、互感器施工及验收规范》',

                    id: 'GB 50148-2010'

                },

            ],

            dataLis: [

                {

                    type: 1,

                    content: '4.1.1（1.1（1）蓄电池外观应裂纹、无损伤；密封应良好1）蓄电池外观应无裂纹、无损伤；密封应良好，应无渗漏，安全排气阀应处于关闭状态。',

                    title: '《电气装置安装工程蓄电池施工及验收规范》',

                    id: 'GB 50172-2012'

                },

                {

                    type: 2,

                    content: '（三）工艺标准库 0201010504 （4）保护帽混凝土抗压强度满足设计要求。（6）保护帽顶面应留有排水坡度，顶面不得积水。',

                    title: '《国家电网公司输变电工程标准工艺》',

                    id: 'GB 50172-2012'

                },

                {

                    type: 1,

                    content: '4.1.1（1）蓄电池外观应无裂纹、无损伤；密封应良好、无损伤；（1）蓄电池外观应无阀无裂纹、无损伤；密封应良好，应无渗漏，安全排气阀应处于关闭状态。',

                    title: '《电气装置安装工程 高压电器施工及验收规范》',

                    id: 'GB 50147-2010'

                },

                {

                    type: 1,

                    content: '状态。4.1.1（1）蓄电池外观应无裂纹、无损伤；蓄电池外观应无裂纹、无损伤；密封应良好，应无渗漏，安全排气阀应处于关闭状态。',

                    title: '《电气装置安装工程电力变压器、油浸电抗器、互感器施工及验收规范》',

                    id: 'GB 50148-2010'

                },

            ],
            movies: [], // 电影列表
            nowPage: 1, // 当前的页码
            pageSize: 10, // 每页显示的记录条数

            replaceText: '',
            KeyValues:[]
        }

    }

getMovieKeyValue=()=>{
    const start = (this.state.nowPage - 1) * this.state.pageSize
    const url = `http://t.yushu.im/v2/movie/search?q=${this.state.KeyValues}&start=${start}&count=${this.state.pageSize}`
    //在RN中要发送网络请求，可以直接用fetch()
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const KeyValues=data.subjects.title
            this.setState((state) => {
                console.log(data)
                return {
                    isloading: false,
                    movies: state.movies.concat(data.subjects),
                    KeyValues: state.KeyValues.concat(data.subjects.title)
                }
            })
            // console.log(11111)
            console.log(movies, 11111111111111111111111111111111111111)
            // console.log(data.rating.stars)
        })
}



    onChanegeTextKeyword(text) {

        var reg = new RegExp(text, "i");

        if (!text) {

            this.setState({

                color: false,

                dataLis: this.state.KeyValues,

                replaceText: ''

            });

            return;

        }

        else if (text) {

            let newData = [];

            for (var i = 0; i < this.state.KeyValues.length; i++) {

                let ds = this.state.KeyValues[i];

                if (ds.title && ds.title.indexOf(text) != -1) {

                    newData.push(ds);

                }

            }

            this.setState({

                color: true,

                dataLis: newData,

                replaceText: text

            });

            return;

        }

    }




    render() {

        return (<View style={{ width: '100%', height: '100%' }}>

            <View style={{ width: '100%', justifyContent: "center", alignItems: 'center', backgroundColor: 'white', height: 60 }}>

                <View style={{ backgroundColor: '#eee', width: '97%', flexDirection: 'row', borderRadius: 20, alignItems: 'center', height: 40 }}>

                    <Image source={require('../images/笑脸.png')} style={{ width: 20, height: 20, marginLeft: 8 }} />

                    <TextInput underlineColorAndroid={'transparent'}

                        multiline={true} autoFocus={false} onChangeText={(e) => this.onChanegeTextKeyword(e)}

                        style={{ marginLeft: 5, fontSize: 13, color: '#363434', overflow: 'hidden', width: '98%', height: '100%', padding: 0 }}

                        placeholder="请输入" />

                </View>

            </View>

            <FlatList keyExtractor={(item, index) => index.toString()} style={{ height: '100%' }} data={this.state.dataLis}

                renderItem={({ item, index }) => {

                    return (<View style={{ flexDirection: 'row', marginTop: 8, backgroundColor: 'white', width: "100%" }}>

                        <View style={{
                            marginTop: 5, marginLeft: 5, width: 40, height: 40, borderRadius: 20,

                            justifyContent: 'center', alignItems: 'center', backgroundColor: item.type == 1 ? "#11A6FF" : '#333'
                        }}>

                            <Text style={{ color: 'white', fontSize: 18 }}>{item.type == 1 ? '国' : '企'}</Text>

                        </View>

                        <View style={{ padding: 10, width: "90%" }}>

                            <View>

                                <StringDistinction

                                    value={item.title + " " + item.id}

                                    delimiter={this.state.replaceText}

                                    frontStyle={{ fontSize: 12, color: '#000' }}

                                    style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}

                                    delimiterStyle={{ fontSize: 18, color: 'red' }}

                                    behindStyle={{ fontSize: 12, color: '#000' }}

                                />

                            </View>

                            <Text style={{ fontSize: 13, color: '#333' }}>{item.content}</Text>

                        </View>

                    </View>)

                }}

            />

        </View>)

    }

}


