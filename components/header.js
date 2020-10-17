import React,{Component}from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    } from 'react-native';
import db from '../config';
import {Header,Icon} from 'react-native-elements'
import firebase from 'firebase';
 
const Myheader=props=>{
    return(
<Header 
leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => props.navigation.toggleDrawer()}/>}
centerComponent={{text:props.title,style:{color:'purple',fontSize:20,fontWeight:'bold'}}}
backgroundColor="red"
/>

    )
}
export default Myheader;