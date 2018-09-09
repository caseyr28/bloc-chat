import React, { Component } from 'react';


class RoomList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomName: "testRoom"
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');



    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
     
        });
    }

    createRoom() {
        const newRoomName = this.state.rooms
        return (
            this.roomsRef.push({name: newRoomName})
        );
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
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Add Room"/>
                </form>
            </section>
        );
    }

}

export default RoomList;
