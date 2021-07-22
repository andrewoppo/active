import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<nav className="NavBar">
            <div className="left-side">
                <Link to="/"  className="links"><span>Home</span></Link>
                <Link to="/trainers" className="links"><span>Trainers</span></Link>
                <Link to="/about" className="links"><span>About</span></Link>
            </div>
            <div className="right-side">
                <Link to="/signup"><button type="button" className="signup">Sign up</button></Link>
                <Link to="/login"><button type="button" className="login">Log in</button></Link>
            </div>
		</nav>
	)
}