import React from 'react';
import { View,Text,Image } from 'react-native'
// 五星好评组件
 class MovieStars extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.stars)
        this.state={
             //接到页面传过来的值    
            //因为当前页面显示五颗星，而分数是十分所以要去平均值，
            num:this.props.stars/10,
            //根据页面当中的星星的数量来设置默认值
            arr:[1,2,3,4,5]
        }
    }
    render(){
        return(

            <View style={{flexDirection:'row'}}>
                {
                    this.state.arr.map((ele,index)=>{
                        return(
                            <View key={index}>
                                
                                {ele>=this.state.num? <Text style={{color:"#ffb518",fontSize:20}}>☆</Text>:<Text style={{color:"#ffb518",fontSize:20}}>★</Text> }
                            </View>
                        )
                    })
                    
                }
            </View>
    )
    }
}
export default MovieStars;
