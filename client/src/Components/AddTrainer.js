import React, { Component } from 'react'
import axios from 'axios';
import CheckBox from './CheckBox';
import TimeCheckBox from './TimeCheckBox';

export default class AddTrainer extends Component {
    state = {
        name: '',
        imageUrl: '',
        age: '',
        about: '',
        timeSlots: [],
        timeSlotsOptions: [
            {value: "9:00", isChecked: false},
            {value: "11:00", isChecked: false},
            {value: "13:00", isChecked: false},
            {value: "15:00", isChecked: false},
            {value: "17:00", isChecked: false},
            {value: "19:00", isChecked: false}


        ],
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
        let timeSlots = this.state.timeSlotsOptions.filter(obj => obj.isChecked).map(obj => obj.value);
        console.log('timeSlots :', timeSlots);
		event.preventDefault();
		axios.post('/api/trainers/add', {
			name: this.state.name,
			imageUrl: this.state.imageUrl,
            age: this.state.age,
            timeSlots: timeSlots,
            styles: styles,
            about: this.state.about
		})
			.then(() => {
				this.setState({
					name: '',
					imageUrl: '',
                    age: '',
                    styles: [],
                    timeSlots: [],
                    about: ''

				});
                this.props.history.push('/trainers');
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

    handleAllTimesChecked = event => {
        const timeSlotsOptions = this.state.timeSlotsOptions;
        timeSlotsOptions.forEach(time => time.isChecked = event.target.checked);
        this.setState({timeSlotsOptions: timeSlotsOptions})
    }

    handleCheckedTimes = event => {
        let timeSlotsOptions = this.state.timeSlotsOptions;
        timeSlotsOptions.forEach(time => {
            if (time.value === event.target.value) {
                time.isChecked = event.target.checked;
            }
        })
        this.setState({timeSlotsOptions: timeSlotsOptions})
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
                    <p>Select time slots:</p>
                    <div className="style-form">
                        <input type="checkbox" onChange={this.handleAllTimesChecked}  value="checkedall" /> Check / Uncheck All
                        <ul>
                        {
                        this.state.timeSlotsOptions.map((time) => {
                            return (<TimeCheckBox handleCheckedTimes={this.handleCheckedTimes}  {...time} />)
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