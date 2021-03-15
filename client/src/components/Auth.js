import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, register } from '../actions/authActions'
import PropTypes from 'prop-types'
import './styles/LogReg.css'

export class Auth extends Component {

    static propTypes = {
        login: PropTypes.func,
        register: PropTypes.func
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        if(this.props.match.params.type === 'register') {
            const name = e.target.name.value
            await this.props.register(name, email, password)
        } else {
            await this.props.login(email, password)
        }

        this.props.history.push('/')
    }

    render() {

        const action = this.props.match.params.type || 'login'

        return (
            <div className="logreg-container">
                <h1 className="form-title">{action}</h1>
                <form onSubmit={this.handleSubmit}>
                    { action === "register" ? <input type="text" name="name" placeholder="Username" autoComplete="off" /> : null }
                    <input type="email" name="email" placeholder="Email" autoComplete="off" />
                    <input type="password" name="password" placeholder="Password" autoComplete="off"/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}



export default connect(null, { login, register })(Auth)
