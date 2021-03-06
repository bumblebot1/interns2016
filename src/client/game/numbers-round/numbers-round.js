import React, { Component } from 'react';
import { connect } from 'react-redux';

import cloakService from '../../services/cloak-service';
import storageService from '../../services/storage-service';

import NumbersInput from './numbers-input';
import RoundResults from '../round-results';

import { answerTimerTick, resetAnswerTimer } from '../letters-round/letter-round-actions';

import style from '../game.scss';

const numberOfNumbers = 6;

export class NumbersRound extends Component {
    componentWillUnmount() {
        clearInterval(this.answerInputInterval);
    }

    componentWillReceiveProps(nextProps) {
        for(var i=0; i<numberOfNumbers; i++){
            if(nextProps.numberList[i] !== undefined){
                this.refs[`numberBox${i}`].className += this.refs[`numberBox${i}`].className.includes(style.flipped) ? '' : ` ${style.flipped}` ;
            }
        }

        if(nextProps.resetRound !== this.props.resetRound && nextProps.resetRound) {
            this.resetNumberBoxes();
        }

        if(this.props.answering === nextProps.answering) {
            return;
        }

        if(nextProps.answering) {
            this.startAnsweringTimer();
            return;
        }
    }

    resetNumberBoxes() {
        for(let i=0; i<numberOfNumbers; i++) {
            this.refs[`numberBox${i}`].className = style.card;
        }
    }


    answeringTimerTick() {
        if(this.props.answerTimerValue > 0){
            this.props.answerTimerTick();
        } else {
            clearInterval(this.answerInputInterval);
            this.props.resetAnswerTimer();
        }
    }

    startAnsweringTimer() {
        this.answerInputInterval = setInterval(() => this.answeringTimerTick(), 1000);
    }

    isLeader() {
        let userId = storageService.getUser().id;
        if(userId === this.props.leader.id) {
            return true;
        }
        return false;
    }

    render() {
        const numberButtons = (
            <div>
                <button className="btn" id="get-large" onClick={() => cloakService.messageGetLarge()}
                disabled={this.props.disableLarge}>Large</button>
                <button className="btn" id="get-small" onClick={() => cloakService.messageGetSmall()}
                disabled={this.props.disableSmall}>Small</button>
            </div>
        );

        const numberBox = (number, index) => (
            <div className={style.flip}>
                <div className={style.card} ref={`numberBox${index}`}>
                    <div className={`${style.face} ${style.front}`}>
                    </div>
                    <div ref={`numberCard${index}`} className={`${style.face} ${style.back}`}>
                        <span className={style.cardInner}>{number}</span>
                    </div>
                </div>
            </div>
        );

        let numberBoxes = [];
        for(let i=0; i<numberOfNumbers; i++) {
            numberBoxes.push(numberBox(this.props.numberList[i], i));
        }

        return (
            <div className="col-lg-8 text-center">
                <h3>COUNTDOWN</h3>
                <div>
                    <p>Leader: {this.props.leader.name}</p>
                    {this.isLeader() ? numberButtons: null}
                </div>
                <div className={style.randomNumber} id="random-number">
                    {this.props.randomNumber}
                </div>
                <div id="number-list">
                    {numberBoxes}
                </div>
                {this.props.roundResults ?
                    <RoundResults />
                :
                    <NumbersInput />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    leader: state.game.leader,
    numberList: state.game.numberList,
    randomNumber: state.game.randomNumber,
    disableLarge: state.game.disableLarge,
    disableSmall: state.game.disableSmall,
    answerTimerValue: state.game.answerTimerValue,
    answering: state.game.answering,
    resetRound: state.game.resetRound,
    roundResults: state.game.roundResults
});

const mapDispatchToProps = dispatch => ({
    answerTimerTick() {
        dispatch(answerTimerTick());
    },
    resetAnswerTimer() {
        dispatch(resetAnswerTimer());
    }
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumbersRound)
