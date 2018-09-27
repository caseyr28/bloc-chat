import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            username: "",
            content: "",
            sentAt: "",
            roomId: ""
        }

       this.messageRef = this.props.firebase.database().ref('messageList');
    }

    componentDidMount() {
        this.messageRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });

        });
    }
    //the .filter method compares the property roomId to the active room id (key). if true, it filters out the rest of the array and only maps that array element. remember to pass down state as PROPs as in the activeroom part.

    render() {
        return (
            <section>
                <ul>
                   {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map ( (message, index) => 
                        <li key={index}>
                            <p>{message.content}</p>
                            <h5>{message.username}</h5>
                            <h6>{message.sentAt}</h6>
                            <h6>{message.roomId}</h6>
                        </li>
                    )}
                </ul>
            </section>
        );
    }
}

export default MessageList;