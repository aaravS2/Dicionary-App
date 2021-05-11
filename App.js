  
import React, { Component } from 'react';
import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements'
export default class App extends Component() {
  constructor(){
    super()
    this.state={
      text:"",
          searchpressed:false,
          word:"Loading...",
          examples:[],
          defination:"",
          lexicalcatagory:"",
    }
  }
  getvalue=(word)=>{
var searchKeyword=word.toLowerCase()
var url='https://rupinwhitehatjr.github.io/dictionary/%22'+searchKeyword+'%22.json'
console.log(url)
return fetch(url)
.then((data)=>{
  if (data.status===200) {
    return data.json()
  }
  else{
    return null
  }
})
.then((response)=>{
var responseOb=response
if (responseOb) {
  var wordData=responseOb.definations[0]
  var Defination=wordData.description
  var lexicalCat=wordData.wordtype
  this.setState({
    word:this.state.text,
    defination:Defination,
    lexicalcatagory:lexicalCat
  })
}else{
  this.setState({
    word:this.state.text,
    defination:"Result(s) not found",
    lexicalcatagory:"Definations not found hence category not found"
  })
}
})
  }
  render(){
  return (
    <View>
      <Header backgroundColor={'neon'}
      centerComponent={{text:'Dictionary',style:{
      color:'blue',
      fontSize:20}}}/>
      <TextInput
      style={Styles.Inputbox}
      onChangeText={text=>{
        this.setState({
          text:text,
          searchpressed:false,
          word:"Loading...",
          examples:[],
          defination:"",
          lexicalcatagory:""
        })
      }}
      value={this.state.text}
      />
        <TouchableOpacity style={Styles.Button} onPress={()=>{
          this.setState({
            searchpressed:true
          })
          this.getvalue(this.state.text)
        }}>
        <Text>Search</Text>
        </TouchableOpacity>
        <Text style={Styles.text}>{this.state.lexicalcatagory}</Text>
        <Text style={Styles.text}>{this.state.text}</Text>
        <Text style={Styles.text}>{this.state.defination}</Text>
        <Text style={Styles.text}>{this.state.examples}</Text>
    </View>
  );
  }
}
const Styles=StyleSheet.create({
  Inputbox:{
    marginTop:200,
    width:'80%',
    alignSelf:"center",
    height:50,
    textAlign:'center',
    borderWidth:'30',
    borderRadius:26,
    backgroundColor:"black",
    textAlign:"center",
    color:"green",
    fontFamily:"fantasy"
  },
  Button:{
  width: '50%',
  alignSelf: 'center',
  height: 50,
 textAlign: 'center',
 borderRadius: 20,
 justifyContent: 'center',
 backgroundColor:'rgb(249, 82, 107)',
 marginTop:100,
  },
  text:{
    marginTop:10,
    color:'rgb(255, 187, 0)',
    textAlign:"center",
    justifyContent:'center'
  }
})
