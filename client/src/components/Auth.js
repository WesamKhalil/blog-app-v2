import React, { Component } from 'react'
import './styles/LogReg.css'

export class Auth extends Component {
    render() {

        const action = this.props.match.params.type

        return (
            <div className="logreg-container">
                <h1 className="form-title">{action}</h1>
                <form>
                    <input type="text" name="name" placeholder="Username" autoComplete="off" />
                    <input type="email" name="email" placeholder="Email" autoComplete="off" />
                    <input type="password" name="password" placeholder="Password" autoComplete="off"/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Auth
