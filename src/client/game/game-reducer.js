import * as actionTypes from './game-actions';

import updateState from '../utils/util';

const initialState = {
	started: false,
    leader: {
        id: null,
        name: null
    },
    letterList: [],
    disableConsonant: false,
    disableVowel: false,
    answerTimerValue: null,
    submissionTimerValue: null,
    disableStart: true,
    answering: false,
    submission: false,
    roundResults: false,
    finalAnswers: [],
    resetRound: false,
	gameParams: {}
};

const game = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_GAME:
        	return updateState(state, {
        		started: true,
                disableStart: true
        	});
        case actionTypes.LEAVE_GAME:
            return updateState(state, {
                started: false,
                letterList: [],
                disableConsonant: false,
                disableVowel: false,
                answering: false
            });
        case actionTypes.SET_LEADER:
            return updateState(state, {
                leader: {
                    id: action.payload.id,
                    name: action.payload.name
                },
                disableConsonant: action.payload.disableConsonant,
                disableVowel: action.payload.disableVowel
            });
        case actionTypes.GET_CONSONANT:
            return updateState(state, {
                letterList: [...state.letterList, action.payload]
            });
        case actionTypes.GET_VOWEL:
            return updateState(state, {
                letterList: [...state.letterList, action.payload]
            });
        case actionTypes.RESET_LETTERS:
            return updateState(state, {
                letterList: action.payload
            });
        case actionTypes.DISABLE_CONSONANT:
            return updateState(state, {
                disableConsonant: action.payload
            });
        case actionTypes.DISABLE_VOWEL:
            return updateState(state, {
                disableVowel: action.payload
            });
        case actionTypes.START_ANSWERING:
            return updateState(state, {
                answering: true,
                answerTimerValue: action.payload
            });
        case actionTypes.STOP_ANSWERING:
            return updateState(state, {
                answering: false
            });
        case actionTypes.ANSWER_TIMER_TICK:
            return updateState(state, {
                answerTimerValue: state.answerTimerValue-1
            });
        case actionTypes.SUBMISSION_TIMER_TICK:
            return updateState(state, {
                submissionTimerValue: state.submissionTimerValue-1
            });
        case actionTypes.RESET_ANSWER_TIMER:
            return updateState(state, {
                answerTimerValue: null
            });
        case actionTypes.RESET_SUBMISSION_TIMER:
            return updateState(state, {
                submissionTimerValue: null
            });
        case actionTypes.DISABLE_START:
            return updateState(state, {
                disableStart: action.payload
            });
        case actionTypes.START_SUBMISSION:
            return updateState(state, {
                submission: true,
                submissionTimerValue: action.payload
            });
        case actionTypes.STOP_SUBMISSION:
            return updateState(state, {
                submission: false
            });
        case actionTypes.SUBMITTED_ANSWERS:
            return updateState(state, {
                finalAnswers: action.payload
            });
        case actionTypes.ROUND_STARTED:
            return updateState(state, {
                roundResults: false
            })
        case actionTypes.ROUND_ENDED:
            return updateState(state, {
                roundResults: true
            })
        case actionTypes.RESET_ROUND:
            return updateState(state, {
                letterList: [],
                answerTimerValue: null,
                submissionTimerValue: null,
                disableStart: true,
                answering: false,
                submission: false,
                roundResults: false,
                finalAnswers: [],
                resetRound: true
            })
        case actionTypes.RESET_FINISHED: {
            return updateState(state, {
                resetRound: false,
                disableConsonant: false,
                disableVowel: false
            })
        }
		case actionTypes.GAME_PARAMETERS:{
			console.log(action.payload);
			return updateState(state,{
				gameParams: action.payload
			})
		}
        default:
            return state;
    }
};

export default game;
