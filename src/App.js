import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList'
import User from './components/User.js'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCIVXmizP2hg5WlqNaPSLU5Sxi2oz3Lmu8",
    authDomain: "bloc-chat-7821a.firebaseapp.com",
    databaseURL: "https://bloc-chat-7821a.firebaseio.com",
    projectId: "bloc-chat-7821a",
    storageBucket: "bloc-chat-7821a.appspot.com",
    messagingSenderId: "814779148264"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      roomMessages: '',
      displayName: ''
  
    }
    
  }

  //update the active room when selected
  setRoom(room) {
    this.setState({
        activeRoom: room
      })
  }

  //set the current logged in user
  setUser(user) {
    console.log(user)
    this.setState({
      displayName: user ? user.displayName : 'Guest'
    })
  }
  
  render() {

    return (
      <div>
        <RoomList firebase={firebase}  setRoom = {this.setRoom.bind(this)} activeRoom={this.state.activeRoom}/>
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        <User firebase={firebase} setUser = {this.setUser.bind(this)} displayName = {this.state.displayName} />
      </div>
    );
  }
}

export default App;
