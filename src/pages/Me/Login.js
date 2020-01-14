import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'
class Login extends React.Component {
    render() {
        return (
            <>
                <View style={styles.login_phone}>
                    <Text style={styles.login_text} onPress={() => {
                        Actions.Phone();
                    }}>手机号登录</Text>
                </View>
                <View style={styles.login_phone}>
                    <Text style={styles.login_text} onPress={() => {
                        Actions.Account();
                    }}>账号登录</Text>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    login_phone: {
        height: 45,
        width: '80%',
        borderWidth: 1,
        marginLeft: "10%",
        marginTop: 100,
        borderRadius: 10,
        backgroundColor: '#ccc'
    },
    login_text: {
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 45,

    }
})


export default Login;