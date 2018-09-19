import React, { Component } from 'react';


class RoomList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomName: "",


        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleTextChange = this.handleTextChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
     
        });
    }

    //assign whatever is typed into the field as the new Room Name
    handleTextChange(e) {
        e.preventDefault();
        this.setState({newRoomName: e.target.value});
      }

    //push the new room name to database
    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.newRoomName) { return } 
        const newRoom = { description: this.state.newRoomName, isCompleted: false };
        this.setState({ rooms: [...this.state.rooms, newRoom], newRoomName: '' });

        this.roomsRef.push({name: this.state.newRoomName })
    }


    render() {
        return (
            <section>
                <ul>
                    {this.state.rooms.map( (room, index) => 
                        <li key={index}>
                            <button onClick = {() => this.props.setRoom(room)} ><p>{room.name}</p></button>
                        </li>
                    )}
                </ul>
                <form onSubmit={ (e) => this.handleSubmit(e) }>
                <label>Create a new room:
                <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleTextChange(e) } />
                </label>
                <input type="submit" value="Add Room"/>
                </form>
                        
            </section>
        );
    }

}             

export default RoomList;
