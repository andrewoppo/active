
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
        // clickedTimes: [],
        stylesOptions: [
            {value: "pilates", isChecked: false},
            {value: "HIIT", isChecked: false},
            {value: "yoga", isChecked: false},
            {value: "weight-training", isChecked: false},
            {value: "cross-fit", isChecked: false},
            {value: "barre", isChecked: false},
            {value: "conditioning", isChecked: false}
        ],
        timeSlots: [],
        timeSlotsOptions: [
            {value: "9:00", isChecked: false},
            {value: "11:00", isChecked: false},
            {value: "13:00", isChecked: false},
            {value: "15:00", isChecked: false},
            {value: "17:00", isChecked: false},
            {value: "19:00", isChecked: false}


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
                    timeSlots: res.data.timeSlots,
                    styles: res.data.styles,
                    about: res.data.about
                })
            })
            .catch(err => console.log(err)) 
    }

    deleteTrainer = () => {
		axios.delete(`/api/trainers/${this.state.trainer._id}`)
			.then(() => {
				this.props.history.push('/trainers');
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
    
    toggleEditForm = () => {
		this.setState(state => ({
			editForm: !state.editForm
		}))
	}

    onTimeClickHandler = time => {
        window.alert(`${time} with ${this.state.name} successfully booked!`);
        console.log('booking ', time);
        const index = this.state.timeSlots.indexOf(time);
        let newTimes = this.state.timeSlots
        newTimes.splice(index, 1)
        this.setState( {timeSlots: newTimes})
    }

    handleSubmit = event => {
		event.preventDefault();
        let styles = this.state.stylesOptions.filter(obj => obj.isChecked).map(obj => obj.value);
        let timeSlots = this.state.timeSlotsOptions.filter(obj => obj.isChecked).map(obj => obj.value);
		axios.put(`/api/trainers/${this.state.trainer._id}`, {
			name: this.state.name,
			imageUrl: this.state.imageUrl,
            age: this.state.age,
            timeSlots: timeSlots,
            styles: styles,
            about: this.state.about
		})
			.then(response => {
				this.setState({
					trainer: response.data,
					name: response.data.name,
					imageUrl: response.data.imageUrl,
                    styles: response.data.styles,
                    timeSlots: response.data.styles,
                    about: response.data.about,
					editForm: false
				});
                this.props.history.push('/trainers');
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
                        <p> {this.state.trainer.about}</p>
                        {/* <Link to={`/trainers/${trainer._id}`} className='trainer-link'>Book</Link>     */}
                    </div>
                </div>
                <br />
                {this.props.user && this.props.user.role === "trainer" ? (
                    <>
                        <button onClick={this.deleteTrainer} className="signup">Delete Profile </button>
                        <button onClick={this.toggleEditForm} className="signup">Edit Profile</button>
                    </>
                    ) : (
                        <div className="time-box">
                            <h4>Book a time:</h4>
                            <div className="time-slots">
                                {this.state.trainer.timeSlots.map(time => {
                                    return (
                                        <button onClick={() => this.onTimeClickHandler(time)} value={time} className="signup">{time}</button>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                {this.state.editForm && (
                    <EditTrainer
                        {...this.state}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        handleCheckedElements={this.handleCheckedElements}
                        handleCheckedTimes={this.handleCheckedTimes}
                        handleAllChecked={this.handleAllChecked}
                        handleAllTimesChecked={this.handleAllTimesChecked}
                    />
                )}
             </div>
        )
	}
}

