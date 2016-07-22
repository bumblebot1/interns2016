import React, { Component } from 'react';
import { connect } from 'react-redux';

import router from '../services/routing-service';
import { messageLeaveRoom, messageJoinRoom, getRoomData, messageStartGame, setStartGame, isConnected } from '../services/cloak-service';

import UserList from '../user/user-list';
import Game from '../game/game';

import { getRoomDetails } from './room-actions';
import { startGame, leaveGame } from '../game/game-actions';
import storageService from '../services/storage-service';

export class RoomPage extends Component {
    componentWillMount() {
        if(isConnected()) {
            messageJoinRoom(this.props.params.data);
            getRoomData(this.props.params.data, this.props.getRoomDetails);
            setStartGame(this.props.startGame);
        } else {
            router.navigateToLobby();
        }
    }

    componentWillUnmount() {
        if(isConnected()) {
            this.props.leaveGame();
            messageLeaveRoom();
        }
    }

    disable() {
        if(this.enoughPlayers()){
            return !this.isCreator();
        }
        return true;
    }

    enoughPlayers() {
        return this.props.roomUsers.length >= 2 ? true : false;
    }

    isCreator() {
        var room = storageService.getRoom();
        var creatorId = room.data.creator.id;
        var userId = storageService.getUser().id;
        return JSON.stringify(creatorId) === JSON.stringify(userId);
    }

    render() {
        return (
            <div className="text-center">
                <h1>{`Room: ${this.props.roomData.name}`}</h1>
                <UserList users={this.props.roomUsers} />
                <div className="col-lg-8" >
                    <button className={`btn btn-success`} id="start-game" disabled={this.disable()}
                            onClick={() => {messageStartGame()}}>Start Game</button>
                    <button className={`btn btn-danger`} id="leave-room"
                            onClick={leaveRoom}>Leave Room</button>
                </div>
                {this.props.started ? <Game /> : null}
            </div>
        );
    }
};

function leaveRoom() {
    router.navigateToLobby();
}

const mapStateToProps = (state, ownProps) => ({
    roomUsers: state.room.users,
    roomData: state.room.data,
    started: state.game.started
});

const mapDispatchToProps = dispatch => ({
    getRoomDetails(roomId) {
        dispatch(getRoomDetails(roomId));
    },
    startGame() {
        dispatch(startGame());
    },
    leaveGame() {
        dispatch(leaveGame());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomPage);
