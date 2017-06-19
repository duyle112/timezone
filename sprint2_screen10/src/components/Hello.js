import React, { Component } from 'react';
export default class Hello extends Component {
    constructor(props) {
        super(props);
        console.log(props.words);
    }
    render() {
        return (
            <h1>Hello MGM</h1>
            
        );
    }

    static getType() {
        return "Hello";
    }
}