import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
class Account extends React.Component {
    render() {
        return (
            <>
                <View>
                    <TextInput placeholder="请输入账号" style={styles.ipt_account} />
                </View>

                <View>
                    <TextInput placeholder="请输入密码" style={styles.ipt_password} />
                </View>
                <View>
                    <Text style={styles.login}>登录</Text>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    ipt_account: {
        width: "70%",
        borderBottomWidth: 1,
        borderBottomColor: "rgb(141, 105, 88)",
        marginTop: 15,
        marginLeft: "10%",

    },
    ipt_password: {
        width: "70%",
        borderBottomWidth: 1,
        borderBottomColor: "rgb(141, 105, 88)",
        marginTop: 15,
        marginLeft: "10%",
    },
    login: {
        width: "60%",
        height: 45,
        borderWidth: 1,
        marginTop: 15,
        backgroundColor: "rgb(119, 75, 82)",
        marginLeft: '15%',
        textAlign: "center",
        lineHeight: 45,
        fontSize: 18,
        borderRadius: 10
    }
})
export default Account;