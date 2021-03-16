import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, register } from '../actions/authActions'
import PropTypes from 'prop-types'
import './styles/Auth.css'

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

    componentDidMount() {
        console.log("componentDidMount")
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        try {
            if(this.props.match.params.type === 'register') {
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

        return (
            <div className="logreg-container">
                <h1 className="form-title">{pathName}</h1>
                <form onSubmit={this.handleSubmit}>
                    { isRegister ? <input type="text" name="name" placeholder="Username" autoComplete="off" /> : null }
                    { name == null ? null : (<div className="error-message">{name}</div>) }
                    <input type="email" name="email" placeholder="Email" autoComplete="off" />
                    { email == null ? null : (<div className="error-message">{email}</div>) }
                    <input type="password" name="password" placeholder="Password" autoComplete="off"/>
                    { password == null ? null : (<div className="error-message">{password}</div>) }
                    <button>Submit</button>
                    { general == null ? null : (<div className="error-message">{general}</div>) }
                </form>
            </div>
        )
    }
}



export default connect(null, { login, register })(Auth)
