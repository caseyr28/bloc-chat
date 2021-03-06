import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            username: "",
            content: "",
            sentAt: "",
            roomId: "",
            newMessage: ''
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

    //assign the text in the message field as the message
    handleMessageChange(e) {
        e.preventDefault();
        this.setState({ newMessage: e.target.value });
    }
    
    //push the new message to the correct room
    createNewMessage(e) {
        e.preventDefault();

        if (this.state.newMessage !== '' && this.props.activeRoom !== '') { 
            this.messageRef.push({
                content: this.state.newMessage,
                roomId: this.props.activeRoom.key,
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                username: this.props.displayName
            })
        }


        this.setState({ newMessage: '' })
        console.log(this.props.activeRoom);
    }



    //the .filter method compares the property roomId to the active room id (key). if true, it filters out the rest of the array and only maps that array element. remember to pass down state as PROPs as in the activeroom part.

    render() {
        return (
            <section className="messagelist">
            <h2> {this.props.activeRoom.name} </h2>
                <ul>
                   {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map ( (message, index) => 
                        <li key={index}>

                            <h5>{message.username}</h5>
                            <p>{message.content}</p>
                            <h6>{message.sentAt}</h6>
                        </li>
                    )}
                </ul>
                <form onSubmit={ (e) => this.createNewMessage(e) } className="messageForm">
                    <input type="text" value={ this.state.newMessage } onChange={ (e) => this.handleMessageChange(e) } placeholder="Type your message..." className="inputField"/>
                    <input type="submit" value="Send" className="submit-btn"/>
                </form>       

            </section>
        );
    }
}

export default MessageList;