import React from 'react';
import moment from 'moment';

class Clock extends React.Component{

    constructor(props){
        super(props);
        this.state =({
            time : moment().utcOffset(this.props.diff*60).format("hh:mm:ss A"),
            dayOfweek : this.getDayofWeek(moment().utcOffset(this.props.diff*60).format('d')),
            date : moment().utcOffset(this.props.diff*60).format("MMM DD YYYY"),
            city : this.props.city
        });
    }

    getDayofWeek(index) {
        var dayOfweek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        return dayOfweek[index-1];
    }

     componentWillReceiveProps(nextProps) {
        console.log("rece in clock"+ nextProps.diff);
        this.setState({
            time : moment().utcOffset(nextProps.diff*60).format("hh:mm:ss A"),
            dayOfweek : this.getDayofWeek(moment().utcOffset(this.props.diff*60).format('d')),
            date :  moment().utcOffset(nextProps.diff*60).format("MMM DD YYYY"),
            city : nextProps.city
        })
    }

    incrementCounter(){
        var options ={ hour12: true};
        this.setState({
            time : moment().utcOffset(this.props.diff*60).format("hh:mm:ss A"),
        });
    }

    componentDidMount(){
        this.timerID = setInterval(() => this.incrementCounter(),1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID); 
    }
    render(){
        return(
            <div className="clock">
                <h3 className="time"> {this.state.time} </h3>
                <h2 className="date"> {this.state.dayOfweek} {this.state.date}</h2>
                <h1 className="city" > {this.state.city} </h1>
            </div>   
        );
    }
}

export default Clock;

