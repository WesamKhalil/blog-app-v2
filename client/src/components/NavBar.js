import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles/NavBar.css'

export class NavBar extends Component {
    render() {
        return (
            <nav>
                <input type="checkbox" className="toggler" />
                <div className="burger">
                    <div className="first-bar"></div>
                    <div className="second-bar"></div>
                    <div className="third-bar"></div>
                </div>
                <div className="menu">
                    <h1><Link to="/" className="nav-btn">Posts</Link></h1>
                    <h1><Link to="/create" className="nav-btn">Create Post</Link></h1>
                    <h1><Link to="/login" className="nav-btn">Login</Link></h1>
                </div>
            </nav>
        )
    }
}

export default NavBar
