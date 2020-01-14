import React from 'react'
import { View, Text ,TextInput,StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'
class Password extends React.Component {
    render() {
        return (
            <View>
                <TextInput  style={styles.ipt} placeholder='请输入密码:' />
                <Text style={styles.txt} onPress={() => {
                    Actions.Me();
                }}>登录</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    ipt: {
        width: '80%',
        borderBottomWidth: 1,
        marginTop: 100,
        marginLeft: '10%',

    },
    txt: {
        borderWidth: 1,
        width: '60%',
        height: 45,
        lineHeight: 45,
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: "rgb(81, 92, 102)",
        marginTop: 15,
        marginLeft: '20%',
        borderRadius: 15
    }
})
export default Password;