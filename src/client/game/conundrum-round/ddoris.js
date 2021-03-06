import React, { Component } from 'react';

import style from './conundrum-round.scss';

import ddoris from './ddoris.jpg';

let dDorisTimer;
export default class DDoris extends Component {
    componentWillMount() {
        dDorisTimer = setTimeout(() => this.fadeDDoris(), 1000);
    }

    fadeDDoris() {
        this.refs['DDORIS'].className += ' ' + style.fade;
    }

    componentWillUnmount() {
        clearTimeout(dDorisTimer);
    }

    render() {
        return(
            <div>
                <div className={style.nobody}>
                    Nobody? Let's see if anyone in the audience has got any suggestions...
                </div>
                <div className={style.ddorisDiv} ref={'DDORIS'}>
                    <div>
                        <img className={style.ddoris} id="doris" src={ddoris}/>
                    </div>
                    <div className={style.bubble}>
                        <div className={style.conundrumSolution}>
                             <span className={style.conundrumSolutionSolution}>{
                                this.props.solution !== undefined ?
                                    this.props.solution.toUpperCase()
                                :
                                    null
                                }</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
