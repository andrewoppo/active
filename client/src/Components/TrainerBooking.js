
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
        stylesOptions: [
            {value: "pilates", isChecked: false},
            {value: "HIIT", isChecked: false},
            {value: "yoga", isChecked: false},
            {value: "weight-training", isChecked: false},
            {value: "cross-fit", isChecked: false},
            {value: "barre", isChecked: false},
            {value: "conditioning", isChecked: false}
        ],
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

    handleAllChecked = event => {
        const stylesOptions = this.state.stylesOptions;
        stylesOptions.forEach(style => style.isChecked = event.target.checked);
        this.setState({stylesOptions: stylesOptions})
    }
    handleCheckedElements = event => {
        let stylesOptions = this.state.stylesOptions;
        stylesOptions.forEach(style => {
            if (style.value === event.target.value) {
                style.isChecked = event.target.checked;
            }
        })
        this.setState({stylesOptions: stylesOptions})
    }
    toggleEditForm = () => {
		this.setState(state => ({
			editForm: !state.editForm
		}))
	}

    handleSubmit = event => {
		event.preventDefault();
        let styles = this.state.stylesOptions.filter(obj => obj.isChecked).map(obj => obj.value);
		axios.put(`/api/trainers/${this.state.trainer._id}`, {
			name: this.state.name,
			imageUrl: this.state.imageUrl,
            age: this.state.age,
            styles: styles,
            about: this.state.about
		})
			.then(response => {
				this.setState({
					trainer: response.data,
					name: response.data.name,
					imageUrl: response.data.imageUrl,
                    styles: response.data.styles,
                    about: response.data.about,
					editForm: false
				})
			})
			.catch(err => console.log(err))
	}

    render() {
		if (!this.state.trainer) return <></>
		return (
            <div className="TrainerBooking">
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
                <br />
                {this.props.user && this.props.user.role === "trainer" ? (
                    <button onClick={this.toggleEditForm} className="signup">Edit Profile</button>
                    ) : (
                        <></>
                    )}
                {this.state.editForm && (
                    <EditTrainer
                        {...this.state}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        handleCheckedElements={this.handleCheckedElements}
                    />
                )}
             </div>
        )
	}
}

