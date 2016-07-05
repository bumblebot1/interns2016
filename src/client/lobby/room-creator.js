import React, { Component } from 'react';

import config from '../config/config';

export default class RoomCreator extends Component {

    onUsernameClick(){
        var username = document.getElementById('user-name').value;
        this.props.setUsername(username);
    }

    onRoomnameClick(){
        var roomname = document.getElementById('room-name').value;
        this.props.setRoomname(username);
    }

    render() {
        return (
            <div className="col-lg-4 text-center">
                <h2>Create Room & Set Username</h2>
                <div className="row">
                    <input id="user-name" type="text" placeholder="Please type your new username"></input>
                    <button id="user-name-button" className="btn btn-success" onClick={this.onUsernameClick.bind(this)}>Set Username</button>
                </div>
                <br></br>
                <div className="row">
                    <input id="room-name" type="text" placeholder="Please type new room name"></input>
                    <button id="room-name-button" className="btn btn-success">Create Room</button>
                </div>
            </div>
        );
    }
};