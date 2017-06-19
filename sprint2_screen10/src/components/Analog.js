import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock.js';
import moment from 'moment';
class Analog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ctx:0,
            radius:0,
            hour:0,
            min:0,
            sec:0
        };
        /*global var2:false */
        var var2 = 2;
        var2 = 3;
        console.log(var2);
    }


    static getType() {
        return "Clock";
    }



    drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        // width of clockwise
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }
    
    drawFace(ctx, radius) {
        var grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
        // color of clockwise
        grad.addColorStop(0, '#333');
        // border of clock
        grad.addColorStop(0.5, 'white');
        // color of border
        grad.addColorStop(1, '#333');
        ctx.strokeStyle = grad;
        // border btween border and background
        ctx.lineWidth = radius * 0.1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = 'green';

        ctx.fill();
    }
    drawNumbers(ctx, radius) {
        var ang;
        var num;
        ctx.font = radius * 0.15 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-ang);
        }
    }
  
    drawTime(ctx, radius, hour, minute, second) {
        console.log(hour+" "+minute+" "+second);
        //hour
        hour = hour % 12;
        hour = (hour * Math.PI / 6) +
            (minute * Math.PI / (6 * 60)) +
            (second * Math.PI / (360 * 60));
        this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
        //minute
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
        // second
        second = (second * Math.PI / 30);
        this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
    }
    
    /*global drawClock  */
    drawClock = () => {
       
        this.setState(prevState => ({
            sec :  moment().utcOffset(this.props.diff*60).format("ss")
        }));
        this.drawFace(this.state.ctx, this.state.radius);
        this.drawNumbers(this.state.ctx, this.state.radius);
        this.drawTime(this.state.ctx, this.state.radius, this.state.hour, this.state.min, this.state.sec);
    }

    componentDidMount() {

        var tmpradius ;
        var canvas = ReactDOM.findDOMNode(this.refs.mycanvas);
        var diff = this.props.diff;
        this.setState(
            {
                ctx: canvas.getContext("2d"),
                radius: canvas.height / 2 *0.9,
                hour : moment().utcOffset(diff*60).format("hh"),
                min :  moment().utcOffset(diff*60).format("mm"),
                sec :  moment().utcOffset(diff*60).format("ss")
            }, 
            () => {
                tmpradius = this.state.radius/0.9; 
                this.state.ctx.translate(tmpradius, tmpradius);
                var intervalId = setInterval(this.drawClock, 1000);
            }
        );
    }

    componentWillReceiveProps(nextProps) {
        var diff = nextProps.diff;
        this.setState({
             hour: moment().utcOffset(diff*60).format("hh"),
             min :  moment().utcOffset(diff*60).format("mm"),
             sec :  moment().utcOffset(diff*60).format("ss"),
        })
    }
    
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    static getType() {
        return "Clock";
    }

    render() {
        return (
            <div className='analog'>
                <canvas ref="mycanvas" 
                    width={400} height={400} >
                </canvas>
                <Clock diff = {this.props.diff} city = {this.props.city}/>
            </div>
        );
    }
}
export default Analog;