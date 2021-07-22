import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Trainers extends Component {
    state = {
        trainers: []
    }

    componentDidMount () {
        axios.get('/api/trainers')
            .then(res => {
                this.setState({
                    trainers: res.data
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="Trainers">
                {this.state.trainers.length > 0 && <h2>Trainers: </h2>}
                {this.state.trainers.map(trainer => {
                    return (
                        <Link to={`/trainers/${trainer._id}`}>
                        <div key={trainer._id} className="trainer">
                            <img src={trainer.imageUrl}/>
                            <h4>{trainer.name}</h4>
                        </div>
                        </Link>
                    )
                })}

            </div>
        )
    }
}