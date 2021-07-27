import React, { Component } from 'react'
import axios from 'axios';
import CheckBox from './CheckBox';

export default class AddTrainer extends Component {
    state = {
        name: '',
        imageUrl: '',
        age: '',
        about: '',
        styles: [
            {value: "pilates", isChecked: false},
            {value: "HIIT", isChecked: false},
            {value: "yoga", isChecked: false},
            {value: "weight-training", isChecked: false},
            {value: "cross-fit", isChecked: false},
            {value: "barre", isChecked: false},
            {value: "conditioning", isChecked: false}
        ]
    }
    handleSubmit = event => {
        console.log('Adding :', this.state.name)
		event.preventDefault();
		axios.post('/api/trainers/add', {
			name: this.state.name,
			imageUrl: this.state.imageUrl,
            age: this.state.age,
            styles: this.state.styles,
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
				this.props.getData();
			})
			.catch(err => console.log('There is an error: ', err))
	}
    handleAllChecked = event => {
        const styles = this.state.styles;
        styles.forEach(style => style.isChecked = event.target.checked);
        this.setState({styles: styles})
    }
    handleCheckedElements = event => {
        let styles = this.state.styles;
        styles.forEach(style => {
            if (style.value === event.target.value) {
                style.isChecked = event.target.checked
            }
        })
        this.setState({styles: styles})
    }
	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		})
	}
    render() {
		return (
            <div>
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="name">Name: </label>
				<input
					type="text"
					id="name"
					name="name"
					value={this.state.name}
					onChange={this.handleChange}
				/>
				<label htmlFor="imageUrl">Image URL: </label>
				<input
					type="text"
					id="imageUrl"
					name="imageUrl"
					value={this.state.imageUrl}
					onChange={this.handleChange}
				/>
                <label htmlFor="age">Age: </label>
                <input
                    type="text"
                    id="age"
                    name="age"
                    value={this.state.age}
                    onChange={this.handleChange}
                />
                <label htmlFor="about">Short bio: </label>
                <input
                    type="text"
                    id="about"
                    name="about"
                    value={this.state.about}
                    onChange={this.handleChange}
                />
                <p>Select workout styles offered:</p>
                <div className="style-form">
                <input type="checkbox" onChange={this.handleAllChecked}  value="checkedall" /> Check / Uncheck All
                    <ul>
                    {
                    this.state.styles.map((style) => {
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