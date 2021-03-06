import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, register } from '../actions/authActions'
import PropTypes from 'prop-types'
import './styles/Auth.css'

//The component for rendering the login and register form.
export class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {

            errorMessage: {
                name: null,
                email: null,
                password: null,
                general: null
            }
        }
    }


    static propTypes = {
        login: PropTypes.func,
        register: PropTypes.func
    }

    //Handles sending data whether that is logging in or registering a user.
    handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        try {
            if(this.props.location.pathname === '/register') {
                const name = e.target.name.value
                await this.props.register(name, email, password)
            } else {
                await this.props.login(email, password)
            }

            this.props.history.push('/')
        } catch(error) {
            this.setState(error.errorMessage)
        }
    }

    render() {

        const pathName = this.props.location.pathname.slice(1)
        const isRegister = pathName === "register"
        const { name, email, password, general } = this.state

        //Conditionally render a name input if we're on '/register' route.
        //Also conditionally render error messages if they exist.
        return (
            <div className="logreg-container">
                <h1 className="form-title">{pathName}</h1>
                <form onSubmit={this.handleSubmit}>
                    { isRegister ? <input type="text" name="name" placeholder="Username" autoComplete="off" /> : null }

                    <input type="email" name="email" placeholder="Email" autoComplete="off" />

                    <input type="password" name="password" placeholder="Password" autoComplete="off"/>
                    
                    <button>{pathName}</button>
                    { name == null ? null : (<div className="error-message">{name}</div>) }
                    { email == null ? null : (<div className="error-message">{email}</div>) }
                    { password == null ? null : (<div className="error-message">{password}</div>) }
                    { general == null ? null : (<div className="error-message">{general}</div>) }
                </form>
            </div>
        )
    }
}



export default connect(null, { login, register })(Auth)
