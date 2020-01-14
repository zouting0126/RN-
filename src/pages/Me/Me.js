import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
    Alert,
    Image,
    TouchableHighlight
} from 'react-native'
import { Actions } from 'react-native-router-flux'
class Me extends React.Component{
    render(){
        return(
            <>
                <ScrollView style={styles.body}>
                    <View style={styles.personal_top}>
                        <View style={styles.head_portrait}>
                        <Image source={require('../../images/home/1.png')} style={styles.head_img} ></Image>
                        </View>
                        <TouchableHighlight style={styles.login} 
                        onPress={()=>{
                            Actions.Login()
                        }}
                        >
                        <View  ><Text style={styles.login_text}>登录</Text></View>
                        </TouchableHighlight>
                        <View style={styles.balance} >
                            <Text style={styles._texts}>0.0</Text>
                            <Text style={styles._texts}>书豆余额</Text>
                        </View>
                        <View style={styles.book} >
                            <Text style={styles._texts}>0</Text>
                            <Text style={styles._texts}>书券(张)</Text>
                        </View>
                        <View style={styles.month} >
                            <Text style={styles._texts}>0</Text>
                            <Text style={styles._texts}>月票</Text>
                        </View>
                    </View>
                    <View style={styles.personal_body}>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }} onPress={() => {
                                Alert.alert("请先登录");
                            }}>钱包</Text>
                        </View>
                        <View style={{
                            position: 'absolute', top: 13,
                            left: 15, width: 30, height: 30
                        }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe93e;</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>消费充值记录</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 58, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe94e;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 103, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe91f;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 148, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe9eb;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 193, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe94c;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 238, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe9d7;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 283, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe9da;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 328, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe9b2;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 373, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe983;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 418, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe94a;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 463, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xea0c;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 508, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xeac0;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 553, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe979;</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 598, left: 15, width: 30, height: 30 }}>
                            <Text style={{ fontFamily: 'icomoon', fontSize: 24, color: "#999" }}>&#xe945;</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>购买的书</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>我的会员</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>Bloc示例</Text>
                        </View>
                        <View style={styles.personal_msg}>

                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>Stream Api</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>EventChannel示例</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>自定义widget</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>加载更多示例</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>地图</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>关于</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>电量</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>设置</Text>
                        </View>
                        <View style={styles.personal_msg}>
                            <Text style={{ fontSize: 16, color: "#999", lineHeight: 45 }}>Github网页</Text>
                        </View>
                    </View>
                </ScrollView>
            </>
        )
    }
    // goLogin = () => {
    //     //console.warn("ok")
    //     // 在这里要跳转到电影列表，需要使用编程式导航   this.props.history.push
    //     Actions.login();
    //     //Actions.movielist({id:10});  路由传参
    // }
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ccc'
    },
    personal_top: {
        // backgroundColor: 'red',

        width: '100%',
        height: 130,
        width: '100%',
        position: 'relative'
    },
    //头像框
    head_portrait: {
        height: "100%",
        width: '25%',

        // backgroundColor:'yellow',
    },
    head_img: {
        width: 60,
        height: 60,
        marginTop: '40%',
        marginLeft: 10,
    }
    //登录
    , login: {
        position: 'absolute',
        top: '15%',
        left: '25%',
        // zIndex:999
    },
    login_text: {
        fontSize: 18,
        color: 'blue'
    },
    //书豆余额
    balance: {
        height: '100%',
        width: '25%',
        //  backgroundColor:'red',
        position: 'absolute',
        top: 0,
        left: '25%',
        paddingTop: "60%"
    },
    //书券
    book: {
        height: '100%',
        width: '25%',
        // backgroundColor: 'blue',
        position: 'absolute',
        top: 0,
        left: '50%',
        paddingTop: '60%'
    },
    //月票
    month: {
        height: '100%',
        width: '25%',
        // backgroundColor: 'blue',
        position: 'absolute',
        top: 0,
        left: '75%',
        paddingTop: '60%'
    },
    //字体
    _texts: {
        textAlign: 'left',
        paddingBottom: 15,
        fontSize: 16
    },

    //个人中心页面
    personal_body: {
        width: '100%',
        position: 'relative'
    },
    personal_msg: {
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: "#999",
        marginLeft: '15%'
    },

});
export default Me