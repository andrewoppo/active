import React, { Component } from 'react';
import andrew from '../assets/andrew.jpg'

export default class About extends Component {
    render() {
        return (
            <div className="About">
                <h2>Andrew Oppo</h2>
                <img src={andrew}/>
                <p>Active founder. An aspiring web developer, my favorite ways to stay fit are weight-lifting, bouldering, and dancing the night away in Berlin's clubs</p>
            </div>
        )
    }
}