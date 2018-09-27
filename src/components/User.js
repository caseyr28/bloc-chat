import React, { Component } from 'react'

class User extends Component {

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
               
        });
    }


    handleSignIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    handleSignOut() {
        this.props.firebase.auth().signOut();
    }


    render() {
        return(
            <header>
                <button onClick = {(e) => this.handleSignIn(e) }><p>Sign In</p></button>
                <button onClick = {(e) => this.handleSignOut(e)}><p>Sign Out</p></button>
                <p>{this.props.displayName }</p>
                
            </header>

        );
    }

}

export default User;