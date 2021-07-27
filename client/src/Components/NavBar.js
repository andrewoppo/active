import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

export default function NavBar(props) {
    const handleLogout = () => {
		logout().then(() => {
			props.setUser(null);
		})
	}
	return (
		<nav className="NavBar">
            <div className="left-side">
                <Link to="/"  className="links"><span>Home</span></Link>
                <Link to="/trainers" className="links"><span>Trainers</span></Link>
                <Link to="/about" className="links"><span>About</span></Link>
            </div>
            <div className="right-side">
                {/* add a line that checks to see if trainer and adds Add Trainer Profile link */}
                {props.user ? (
                    <Link to='/' onClick={() => handleLogout()}><button type="button" className="signup">Log out</button></Link>
                ) : (
                    <>
                        <Link to="/signup"><button type="button" className="signup">Sign up</button></Link>
                        <Link to="/login"><button type="button" className="login">Log in</button></Link>
                    </>
                )}
            </div>
		</nav>
	)
}