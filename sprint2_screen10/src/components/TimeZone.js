import React from 'react';
import Hello from './Hello.js'
import Analog from './Analog.js'
import moment from 'moment'
import tz from 'moment-timezone'

class TimeZone extends React.Component {
    constructor (props) {
        super(props)
        this.state= {
            screen_play:this.getScreens(),
        }
    }

    getScreens () {
        let typesContain = [<Hello/>, <Analog/>];
        let types = [];
        let url = this.props.url['screen-apps'];
        for (let i = 0; i < url.length; i++) {
            if (url[i]['type'] === "Clock") {
                types.push(<Analog diff={url[i]['params']['utc-diff']}
                                   city={url[i]['params']['city']}/>)
            } else {
                let str = url[i]['type'];
                for (let j = 0; j < typesContain.length; j++) {
                if (str === typesContain[j].type.getType()) {
                    types.push(typesContain[j]);
                    break;
                }
             }
            }
        }
        return types;
    }

    changeComponent() {
        this.intervalId = this.setState(
            {
                screen_play:[...this.state.screen_play.slice(1),this.state.screen_play[0]]
            });
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
  }

    componentDidMount() {
        setInterval(() => this.changeComponent(),this.props.url['display-time']*1000)
    }
    render() {
        var Child = this.state.screen_play[0];
        return Child;
            
    }
}
export default TimeZone;