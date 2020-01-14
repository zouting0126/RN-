import React, {  
    Component,  
    PropTypes,  
  } from 'react';  
  
  import {View, Image,  Animated, Text,StyleSheet} from 'react-native';  
  export default class MvComment extends Component { 
    constructor(props){  
      super(props);  
      this.state = {  
        /** 文本是否展开 */  
        expanded:true,  
        numberOfLines:null,  
        /** 展开收起文字是否处于显示状态 */  
        showExpandText:false,  
        expandText:'展开',  
        /** 是否处于测量阶段 */  
        measureFlag:true  
      }  
      this.numberOfLines =2;  
      /** 文本是否需要展开收起功能：（实际文字内容是否超出numberOfLines限制） */  
      this.needExpand = true;  
      this.measureFlag = true;  
    }  
  
  
    _onTextLayout(event){  
      if(this.measureFlag){  
        if(this.state.expanded){  
          this.maxHeight = event.nativeEvent.layout.height;  
          this.setState({expanded:false,numberOfLines:this.numberOfLines});  
        }else{  
          this.mixHeight = event.nativeEvent.layout.height;  
          if(this.mixHeight == this.maxHeight){  
            this.needExpand = false;  
          }else{  
            this.needExpand = true;  
            this.setState({showExpandText:true})  
          }  
          this.measureFlag = false;  
        }  
      }  
  
    }  
  
    _onPressExpand(){  
      if(!this.state.expanded){  
        this.setState({numberOfLines:null,expandText:'收起',expanded:true})  
      }else{  
        this.setState({numberOfLines:this.numberOfLines,expandText:'展开',expanded:false})  
      }  
    }  
  
    render() {  
      const { numberOfLines, onLayout, expandTextStyle, ...rest } = this.props;  
      let expandText = this.state.showExpandText?(  
          <Text  
            style={[this.props.style,styles.expandText,expandTextStyle]}  
            onPress={this._onPressExpand.bind(this)}>  
            {this.state.expandText}</Text>  
        ) : null;  
      return (  
        <View>  
          <Text  
            numberOfLines={this.state.numberOfLines}  
            onLayout={this._onTextLayout.bind(this)}  
            {...rest}  
            >  
            {this.props.children}  
          </Text>  
          {expandText}  
        </View>  
      );  
    }  
  }  
  
  const styles = StyleSheet.create({  
    expandText: {  
      color:'#917efc',  
      marginTop:0  
    }
  });