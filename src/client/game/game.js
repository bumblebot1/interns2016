import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnswerInput from './answer-input';

import { setLeader } from './game-actions';

import { setLeaderDispatch } from '../services/cloak-service';

export class Game extends Component {
    componentWillMount() {
        setLeaderDispatch(this.props.setLeader);
    }

    render() {
        return (
            <div className="col-lg-8 text-center">
                <h3>THIS IS GAME</h3>
                <p>{this.props.leader}</p>
                <AnswerInput />
            </div>
        );
    }
};

const mapStateToProps = state => ({
    leader: state.game.leader
});

const mapDispatchToProps = dispatch => ({
    setLeader(user) {
        dispatch(setLeader(user));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)