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
                {this.state.trainers.length > 0 && <h2>The perfect trainer awaits you </h2>}
                {this.state.trainers.map(trainer => {
                    return (
                        <div key={trainer._id} className="trainer">
                            <img src={trainer.imageUrl}/>
                            <div className="trainer-info">
                                <h4>{trainer.name}</h4>
                                <p>Age: {trainer.age}</p>
                                <div className="styles">
                                    {trainer.styles.map(style => {
                                        return (
                                            <span>{style}</span>
                                        )
                                    })}
                                </div>
                                <Link to={`/trainers/${trainer._id}`} className='trainer-link'>More Info / Book</Link>    
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }
}