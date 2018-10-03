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
      displayName: '',
      username: ''
  
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

    this.setState({
      displayName: user ? user.displayName : 'Guest'
    })
  }

  
  render() {

    return (
      <section className="container">

        <User firebase={firebase} setUser = {this.setUser.bind(this)} displayName = {this.state.displayName} />
        <RoomList firebase={firebase}  setRoom = {this.setRoom.bind(this)} activeRoom={this.state.activeRoom} messageList={this.state.messageList}  />
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} displayName = {this.state.displayName} />

      </section>
    );
  }
}

export default App;
