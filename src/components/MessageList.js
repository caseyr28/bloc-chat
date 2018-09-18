import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            content: "",
            sentAt: "",
            roomId: "-LMFcYQfAG3PhIZqSKy-"
        }

       // this.messageRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        //this.messageRef.on('child_added', snapshot => {
           // const message = snapshot.val();
           // message.key = snapshot.key;
           // this.setState({ messages: this.state.messages.concat( message ) })
     
       // });
    }

    render() {
        return (
            <section>
                {/* <ul>
                    {this.state.messages.map( (message, index) => 
                        <li key={index}>
                            <p>{message.username}</p>
                        </li>
                    )}
                </ul> */}
                <ul className="messageContainer">
                    <li>
                        <p>Message goes here...</p>
                        <h2>username</h2>
                        <h6>Timestamp goes here</h6>
                        <h6>RoomId goes here</h6>
                    </li>
                    <li>
                        <p>Message goes here... Message goes here... Message goes here... Message goes here... Message goes here...</p>
                        <h2>username</h2>
                        <h6>Timestamp goes here</h6>
                        <h6>RoomId goes here</h6>
                    </li>
                    <li>
                        <p>Message goes here...</p>
                        <h2>username</h2>
                        <h6>Timestamp goes here</h6>
                        <h6>RoomId goes here</h6>
                    </li>
                </ul>

            </section>
        );
    }
}

export default MessageList;