import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Posts from './components/Posts'
import Form from './components/Form'
import './App.css'

export class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <NavBar />
                    <div className="main-content">
                        <Route exact path="/" component={Posts} />
                        <Route path="/create" component={Form} />
                        <Route path="/edit/:id" component={Form} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default App
