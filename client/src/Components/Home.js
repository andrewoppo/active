import React from 'react';
import { Link } from 'react-router-dom';
import signup from '../assets/signup.jpg';
import find from '../assets/search.jpg';
import book from '../assets/book.jpg';
import getFit from '../assets/getfit.jpg';

const Home = props => {
    return (
        <>
            <section className="home-body">
                <h1>Let Active help you find your personal fitness guru</h1>
                <div className="button"><Link to="/trainers"><button type="button" className="lets-get-fit">Let's get fit!</button></Link></div>
            </section>
            <section className="how-to">
                <h2>How it works</h2>
                <div className="steps">
                    <div className="step">
                        <img src={signup}/>
                        <h3>Sign up</h3>
                        <p className="step-text">Create an account to view trainer details and availabilty</p>

                    </div>
                    <div className="step">
                        <img src={find}/>
                        <h3>Find</h3>
                        <p className="step-text">Find the personal trainer who matches your fitness needs</p>
                    </div>
                    <div className="step">
                        <img src={book}/>
                        <h3>Reserve</h3>
                        <p className="step-text">Book your timeslot with the perfect trainer</p>
                    </div>
                    <div className="step">
                        <img src={getFit}/>
                        <h3>Get fit</h3>
                        <p className="step-text">It's time to get the body you always wanted</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;