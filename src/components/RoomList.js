import React, { Component } from 'react';


class RoomList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomName: ""
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleTextChange = this.handleTextChange.bind(this); //I dont follow this
        this.createRoom = this.createRoom.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
     
        });
    }

    //assign whatever is typed into the field as the new Room Name
    ///why does this work when I bind it above
    handleTextChange(e) {
        this.setState({newRoomName: e.target.value});
      }

    //push the new room name to database
    createRoom() {
        this.roomsRef.push({name: this.state.newRoomName })
    }

    render() {
        return (
            <section>
                <ul>
                    {this.state.rooms.map( (room, index) => 
                        <li key={index}>
                            <p>{room.name}</p>
                        </li>
                    )}
                </ul>
                <form>
                    <label>New Room Name:
                        <input type="text" name="name" value={this.state.newRoomName} onChange={this.handleTextChange} />
                    </label>

                    <input type="submit" value="Add Room" onClick={this.createRoom} />
                </form>
            </section>
        );
    }

}             

export default RoomList;
