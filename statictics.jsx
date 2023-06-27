import { Component } from "react";
import { Notification } from "./notification";
import PropTypes from 'prop-types';
import css from './statistics.module.css';

export class Statistics extends Component {

    static defaultProps = {
        good: 0,
        neutral: 0,
        bad: 0,
        total: 0,
        positive_percentage: 0,
    }
    static propTypes = {
        good: PropTypes.number,
        neutral: PropTypes.number,
        bad: PropTypes.number,
        total: PropTypes.number,
        positive_percentage: PropTypes.number,
    }
    render (){
        const {good, neutral, bad, total, positive_percentage} = this.props;
        console.log("this.props = ", this.props);
        return ( total === 0 ? <Notification  message="There is no feedback"/> : (
                            <div className={css.statistics_div}>
                                <p className={css.stat_p}>Good : {good}</p>
                                <p className={css.stat_p}>Neutral : {neutral}</p>
                                <p className={css.stat_p}>Bad : {bad}</p>
                                <div className={css.stat_total_div}>
                                    <p className={css.stat_total}>Total : {total}</p>
                                    <p className={css.stat_positive_per}>Positive percentage : {positive_percentage}<span>%</span></p>
                                </div>
                            </div>
                            )
                        
        )
    }
}