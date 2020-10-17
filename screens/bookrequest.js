import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Myheader from '../components/header';

export default class BookRequest extends Component{
    constructor(){
        super();
        this.state={
            emailid:firebase.auth().currentUser.email,
            bookname:'',
            reason:''
        }
    }

    createuniqueid(){
return Math.random().toString(36).substring(7)

    }

    addrequest=(bookname,reason)=>{
        var emailid=this.state.emailid
        var requestid=this.createuniqueid()
        db.collection("RequestBook").add({
            'emailid':emailid,
            'bookname':bookname,
            'reason':reason,
            'requestid':requestid
        })
        this.setState({
            bookname:'',
            reason:''

        })
        
    return Alert.alert("Book Requested Successfully")
    }
    render(){
        return(
  <View style={{flex:1}}>
      <Myheader 
      title="requestbook"navigation ={this.props.navigation}/>
      <KeyboardAvoidingView>
<TextInput 
placeholder={"bookname"}
onChangeText={(text)=>{
    this.setState({
        bookname:text
    })
}}
value={this.state.bookname}
/>

<TextInput 
placeholder={"reasonforbook"}
multiline
numberOfLines={8}
onChangeText={(text)=>{
    this.setState({
        reason:text
    })
}}
value={this.state.reason}
/>
<TouchableOpacity onPress={()=>{this.addrequest(this.state.bookname,this.state.reason)

}}>
<Text>Submit</Text>

</TouchableOpacity>
      </KeyboardAvoidingView>
  </View>
        )
    }
    
    
    
    }
    
    