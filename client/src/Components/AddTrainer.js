import React, { Component } from 'react'
import axios from 'axios';
import CheckBox from './CheckBox';

export default class AddTrainer extends Component {
    state = {
        name: '',
        imageUrl: '',
        age: '',
        about: '',
        styles: [],
        stylesOptions: [
            {value: "barre", isChecked: false},
            {value: "conditioning", isChecked: false},
            {value: "cross-fit", isChecked: false},
            {value: "HIIT", isChecked: false},
            {value: "pilates", isChecked: false},
            {value: "weight-training", isChecked: false},
            {value: "yoga", isChecked: false}
        ]
    }
    handleSubmit = event => {
        console.log('Adding :', this.state.name)
        let styles = this.state.stylesOptions.filter(obj => obj.isChecked).map(obj => obj.value);
        console.log('styles :', styles);
		event.preventDefault();
		axios.post('/api/trainers/add', {
			name: this.state.name,
			imageUrl: this.state.imageUrl,
            age: this.state.age,
            styles: styles,
            about: this.state.about
		})
			.then(() => {
				this.setState({
					name: '',
					imageUrl: '',
                    age: '',
                    styles: [],
                    about: ''

				})
			})
			.catch(err => console.log('There is an error: ', err))
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
    
	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		})
	}
    render() {
		return (
            <div className="trainer-form">
                <h2> Create your trainer profile</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name: </label> 
                    <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="John Doe"
                        required
                    /><br />
                    <label htmlFor="imageUrl">Profile pic: </label>
                    <br />
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.handleChange}
                        placeholder="Upload image..."
                        required
                    /><br />
                    <label htmlFor="age">Age: </label>
                    <br />
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={this.state.age}
                        onChange={this.handleChange}
                        placeholder="26"
                        required
                    /><br />
                    <label htmlFor="about">Short bio: </label>
                    <br />
                    <input
                        type="text"
                        id="about"
                        name="about"
                        value={this.state.about}
                        onChange={this.handleChange}
                        placeholder="Tell us a little about yourself..."
                        required
                    /><br />
                    <p>Select workout styles offered:</p>
                    <div className="style-form">
                    <input type="checkbox" onChange={this.handleAllChecked}  value="checkedall" /> Check / Uncheck All
                        <ul>
                        {
                        this.state.stylesOptions.map((style) => {
                            return (<CheckBox handleCheckedElements={this.handleCheckedElements}  {...style} />)
                        })
                        }
                        </ul>
                    </div>
                    <button type="submit">Add trainer profile</button>
                </form>
            </div>
		)
	}
}