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
    ScrollView,FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {ListItem,Icon} from 'react-native-elements';
import Myheader from '../components/header';

export default class MYDonation extends Component{
    static navigationOptions={header:null}
    constructor(){
        super();
        this.state={
            emailid:firebase.auth().currentUser.email,alldonations:[]
        }
        this.requestref=null
    }

    getalldonations=()=>{
        this.requestref=db.collection("alldonations").where("donarid","==",this.state.emailid).onSnapshot((snapshot)=>{
            var alldonations=snapshot.docs.map(document=>document.data())
            this.setState({alldonations:alldonations})
        })

    }
    componentDidMount(){
this.getalldonations();        
    }
    keyExtractor = (item, index) => index.toString()
    renderItem = ( {item, i} ) =>(
         <ListItem
          key={i} title={item.bookname}
           subtitle={"Requested By : " + item.requestedby +"\nStatus : " + item.requeststatus}
            leftElement={
            <Icon name="book" type="font-awesome" color ='#696969'/>}
             titleStyle={{ color: 'black', fontWeight: 'bold' }}
              rightElement={ 
              <TouchableOpacity style={styles.button}> 
              <Text style={{color:'#ffff'}}>
                  Send Book
                  </Text>
                   </TouchableOpacity> }
            bottomDivider /> )


    componentWillUnmount(){
        this.requestref();
    }
    render(){
        return(
            <View style={{flex:1}}>
<Myheader 
navigation={this.props.navigation}
title="mydonations"
/>
<View style={{flex:1}}>
     { this.state.alldonations.length === 0
      ?( <View style={styles.subtitle}>
           <Text style={{ fontSize: 20}}>
               List of all book Donations</Text>
                </View> )
                 :( <FlatList 
                 keyExtractor={this.keyExtractor}
                  data={this.state.alldonations}
                   renderItem={this.renderItem} /> ) }
                    </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
     button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 },
 subtitle :{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' } })