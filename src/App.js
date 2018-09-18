import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList'

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
      activeRoom: ''
    }
    
  }

  //update the active room when selected
  onRoomSelect(room) {
    this.setState({
        activeRoom: room
      }, () => console.log(this.state.activeRoom));

      console.log(this.state.activeRoom);
  }


  render() {
    return (
      <div>
        <RoomList firebase={firebase}  onRoomSelect = {(room) => this.onRoomSelect(room) } activeRoom={this.state.activeRoom}/>
        <MessageList />
      </div>
    );
  }
}

export default App;
