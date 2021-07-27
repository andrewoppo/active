
import React, { Component } from 'react'
import axios from 'axios';
import EditTrainer from './EditTrainer';

export default class TrainerBooking extends Component {
    state = {
        trainer: null,
        name: '',
        imageUrl: '',
        age: '',
        styles: [],
        about: '',
        editForm: false
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

    handleChange = event => {
        const {name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    //WILL HAVE TO ADD handlers for styles

    toggleEditForm = () => {
		this.setState(state => ({
			editForm: !state.editForm
		}))
	}

    handleSubmit = event => {
		event.preventDefault();
        //add styles back
		const { name, imageUrl, age, about } = this.state;
		axios.put(`/api/trainers/${this.state.trainer._id}`, {
			name, 
            imageUrl, 
            age, 
            // styles, 
            about
		})
			.then(response => {
				this.setState({
					trainer: response.data,
					name: response.data.name,
					imageUrl: response.data.imageUrl,
                    // styles: response.data.syles,
                    about: response.data.about,
					editForm: false
				})
			})
			.catch(err => console.log(err))
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
                <button onClick={this.toggleEditForm}>Edit Profile</button>
				{this.state.editForm && (
					<EditTrainer
						{...this.state}
						handleSubmit={this.handleSubmit}
						handleChange={this.handleChange}
					/>
				)}
            </div>
)
	}
}