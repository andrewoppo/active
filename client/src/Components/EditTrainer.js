import React, { Component } from 'react';
import CheckBox from './CheckBox';
import TimeCheckBox from './TimeCheckBox';

export default class EditTrainer extends Component {
	render() {
		return (
			<div className="trainer-form">
                <form onSubmit={this.props.handleSubmit}>
                    <label htmlFor="name">Name: </label> 
                    <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={this.props.name}
                        onChange={this.props.handleChange}
                    /><br />
                    <label htmlFor="imageUrl">Profile pic: </label>
                    <br />
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={this.props.imageUrl}
                        onChange={this.props.handleChange}
                    /><br />
                    <label htmlFor="age">Age: </label>
                    <br />
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={this.props.age}
                        onChange={this.props.handleChange}
                    /><br />
                    <label htmlFor="about">Short bio: </label>
                    <br />
                    <input
                        type="text"
                        id="about"
                        name="about"
                        value={this.props.about}
                        onChange={this.props.handleChange}
                    /><br />
                    <p>Workout styles offered:</p>
                    <div className="style-form">
                    <input type="checkbox" onChange={this.props.handleAllChecked}  value="checkedall" /> Check / Uncheck All
                        <ul>
                        {
                        this.props.stylesOptions.map((style) => {
                            return (<CheckBox handleCheckedElements={this.props.handleCheckedElements}  {...style} />)
                        })
                        }
                        </ul>
                    </div>
                    <p>Select time slots:</p>
                    <div className="style-form">
                        <input type="checkbox" onChange={this.props.handleAllTimesChecked}  value="checkedall" /> Check / Uncheck All
                        <ul>
                            {
                            this.props.timeSlotsOptions.map((time) => {
                                return (<TimeCheckBox handleCheckedTimes={this.props.handleCheckedTimes}  {...time} />)
                            })
                            }
                        </ul>
                    </div>
                    <button type="submit">Update trainer profile</button>
                </form>
            </div>
		)
	}
}


