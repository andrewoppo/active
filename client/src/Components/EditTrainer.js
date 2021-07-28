import React, { Component } from 'react';
import CheckBox from './CheckBox';

export default class EditTrainer extends Component {
	render() {
		return (
			<div>
				<h1>Edit trainer profile</h1>
				<form onSubmit={this.props.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={this.props.name}
                        onChange={this.props.handleChange}
                    />
                    <label htmlFor="imageUrl">Image URL: </label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={this.props.imageUrl}
                        onChange={this.props.handleChange}
                    />
                    <label htmlFor="age">Age: </label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={this.props.age}
                        onChange={this.props.handleChange}
                    />
                    <label htmlFor="about">Short bio: </label>
                    <input
                        type="text"
                        id="about"
                        name="about"
                        value={this.props.about}
                        onChange={this.props.handleChange}
                    />
                    <p>Select workout styles offered:</p>
                    <div className="style-form">
                    <input type="checkbox" onChange={this.props.handleAllChecked}  value="checkedall" /> Check / Uncheck All
                        <ul>
                        {
                        this.props.styles.map((style) => {
                            return (<CheckBox handleCheckedElements={this.props.handleCheckedElements}  {...style} />)
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


