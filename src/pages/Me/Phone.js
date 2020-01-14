import React from 'react'
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
class Phone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ar: null
        }
    }
    handlogin = () => {
        const arr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/

        console.log(this.state.ar)
        if (arr.test(this.state.ar)) {
            Actions.Password();
        } else {
            Alert.alert("请输入正确的手机号")
        }
    }
    handlePhone = (e) => {
        console.log(e);

        this.setState({
            ar: e
        })

    }
    render() {
        return (
            <View>
                <TextInput value={this.state.ar} style={styles.ipt} placeholder='请输入手机号:' onChangeText={(e) => {
                    this.handlePhone(e)
                }} />
                <Text style={styles.txt} onPress={() => {
                    this.handlogin();
                }}>下一步</Text>
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
export default Phone;