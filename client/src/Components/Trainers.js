import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CheckBox from './CheckBox';

export default class Trainers extends Component {
    state = {
        trainers: [],
        isChecked: true,
        stylesOptions: [
            {value: "barre", isChecked: true},
            {value: "conditioning", isChecked: true},
            {value: "cross-fit", isChecked: true},
            {value: "HIIT", isChecked: true},
            {value: "pilates", isChecked: true},
            {value: "weight-training", isChecked: true},
            {value: "yoga", isChecked: true}
        ],
        // barre: true,
        // conditioning: true,
        // crossfit:true,
        // hiit: true,
        // weight: true,
        // yoga: true,
    }

    getData = () => {
        axios.get('/api/trainers')
            .then(res => {
                this.setState({
                    trainers: res.data
                })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
		this.getData();
	}

    handleAllChecked = event => {
        const stylesOptions = this.state.stylesOptions;
        stylesOptions.forEach(style => style.isChecked = event.target.checked);
        this.setState({
            stylesOptions: stylesOptions,
            isChecked: !this.state.isChecked
        })
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

    render() {
        let selectedStyles = [];
        this.state.stylesOptions.forEach(style => {
           if (style.isChecked) {
               selectedStyles.push(style.value);
            }
        })  
        console.log('selected styles :', selectedStyles)
        const filteredTrainers = this.state.trainers.filter(trainer => {
            console.log('filtering trainer: ', trainer);
            return  trainer.styles.some(style => selectedStyles.indexOf(style) >= 0);
            })

        console.log('filtered list :', filteredTrainers);
        const trainerList = filteredTrainers.map(trainer => {
            console.log('mapping trainer :', trainer);
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
        })
        return (
            <div className="Trainers">
                <div className="filter-box">
                    <h2>The perfect trainer awaits you.</h2>
                    {/* <select 
                        name="style" 
                        onChange={this.handleChange}
                        value={this.state.style}
                        id="style"
                    >
                        <option value="" selected disabled hidden>Select fitness category...</option>
                        <option value="barre">Barre</option>
                        <option value="conditioning">Conditioning</option>
                        <option value="cross-fit">Cross-fit</option>
                        <option value="HIIT">HIIT</option>
                        <option value="weight-training">Weight-training</option>
                        <option value="yoga">Yoga</option>
                    </select> */}
                    <p>Select fitness categories:</p>
                    <input type="checkbox" onChange={this.handleAllChecked}  defaultChecked={this.state.isChecked} value="checkedall" /> Check / Uncheck All
                        <ul>
                        {
                        this.state.stylesOptions.map((style) => {
                            return (<CheckBox handleCheckedElements={this.handleCheckedElements}  {...style} />)
                        })
                        }
                        </ul>
                </div>
                <div className="trainer-box">
                    {trainerList}
                </div>

            </div>
        )
    }
}