import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import db from '../config.js';
import * as firebase from 'firebase';
export default class Login extends React.Component {
    
    handleTransaction=async()=>{
        var transactionMessage=null;
        db.collection("books").doc(this.state.scannedBookID).get();
    }
    getCameraPermissions=async()=>{
        const {status}=await permissions.askAsync(permissions.camera);
        this.setState({hasCameraPermissions:status==="granted"});
    }
    handleBarCodeScan=async({type,Data})=>{
        const {buttonState}=this.state
        if (buttonState==="bookID") {
            this.setState({
                scanned: true,
                scannedBookID: Data,
                buttonState: 'normal',
            })
        }
        if (buttonState==="studentID") {
            this.setState({
                scanned: true,
                scannedStudentID: Data,
                buttonState: 'normal',
            })
        }
    }
    constructor(){
        super();
        this.state={
            scanned: false,
            scannedData: '',
            hasCameraPermissions: null,
            buttonState: 'normal',
            scannedBookID:'',
            scannedStudentID:'',
        }
    }

    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState; 
        if (buttonState==="clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned={scanned?undefined:this.handleBarCodeScan}
                />
            )
        } else if(buttonState==="normal"){
            return(
                <View>
                    <View style={{flexDirection:"row"}}>
                    <TextInput style={{width:200,height:40,borderWidth:1.5,borderRightWidth:0}} placeholder="bookID" value={this.state.scannedBookID}></TextInput>
                    <TouchableOpacity style={{width:100,height:40,borderWidth:1.5,borderLeftWidth:0, backgroundColor:'#45cea2'}} onPress={()=>{this.getCameraPermissions("bookID")}}>
                    <Text style={{alignItems:'center',justifyContent:'center',flex:1}}>Scan ID</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row"}}>
                    <TextInput style={{width:200,height:40,borderWidth:1.5,borderRightWidth:0}} placeholder="studentID" value={this.state.scannedStudentID}></TextInput>
                    <TouchableOpacity style={{width:100,height:40,borderWidth:1.5,borderLeftWidth:0, backgroundColor:'#45cea2'}} onPress={()=>{this.getCameraPermissions("studentID")}}>
                    <Text style={{alignItems:'center',justifyContent:'center',flex:1}}>Scan ID</Text>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={stylez.Substy}>
                       <Text style={stylez.Testy} onPress={ async ()=>{this.handleTransaction}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}
const stylez = StyleSheet.create({
    Logsty:{
        justifyContent:'center',
        backgroundColor:'green',
        alignText:'center',
        Textsize:10,
        fontWeight:5,
        Textcolor:'Red',
        width:100,
        margin:50,
    },
    Substy:{
        alignItems:"center",
        borderColor:"black",
        height:50,
        width:100,
        borderWidth:5,
        backgroundColor:"red",
    },
    Testy:{
        textColor:"blue",
    }
})  