import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './styles/NavBar.css'

export class NavBar extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool,
        user: PropTypes.object
    }

    authButtons = () => {
        if(this.props.loggedIn) {
            return (
                <React.Fragment>
                    <h1 className="menu-name">Welcome, {this.props.user.name}</h1>
                    <h1><a onClick={() => this.props.logout()}className="nav-btn">Logout</a></h1>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <h1><Link to='/login' className="nav-btn">Login</Link></h1>
                <h1><Link to='/register' className="nav-btn">Register</Link></h1>
            </React.Fragment>
        )
    }

    render() {
        return (
            <nav>
                { this.props.loggedIn ? <h1 className="nav-name">Welcome, {this.props.user.name}</h1> : null }
                <input type="checkbox" className="toggler" />
                <div className="burger">
                    <div className="first-bar"></div>
                    <div className="second-bar"></div>
                    <div className="third-bar"></div>
                </div>
                <div className="menu">
                    <div className="menu-button-left">
                        <h1><Link to="/new" className="nav-btn">Create Post</Link></h1>
                        <h1><Link to="/" className="nav-btn">Posts</Link></h1>
                    </div>
                    <div className="menu-button-right">
                        { this.authButtons() }
                    </div>
                </div>
            </nav>
        )
    }
}



const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
})

export default connect(mapStateToProps, { logout })(NavBar)
