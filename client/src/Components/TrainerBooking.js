
import React, { Component } from 'react'
import axios from 'axios';

export default class TrainerBooking extends Component {
    state = {
        trainer: null,
        name: '',
        imageUrl: '',
        age: '',
        styles: [],
        about: '',
    }

    getData = () => {
        const id = this.props.match.params.id;
        axios.get(`/api/trainers/${id}`)
            .then(res => {
                this.setState({
                    trainer: res.data,
                    name: res.data.name,
                    imageUrl: res.data.imageUrl,
                    age: res.data.age,
                    styles: res.data.styles,
                    about: res.data.about
                })
            })
            .catch(err => console.log(err)) 
    }
    componentDidMount() {
		this.getData();
	}

    render() {
		if (!this.state.trainer) return <></>
		return (
			<div className="trainer">
                <img src={this.state.trainer.imageUrl}/>
                <div className="trainer-info">
                    <h4>{this.state.trainer.name}</h4>
                    <p>Age: {this.state.trainer.age}</p>
                    <div className="styles">
                        {this.state.trainer.styles.map(style => {
                            return (
                                <span>{style}</span>
                            )
                        })}
                    </div>
                    <p>About: {this.state.trainer.about}</p>
                    {/* <Link to={`/trainers/${trainer._id}`} className='trainer-link'>Book</Link>     */}
                </div>
            </div>
)
	}
}