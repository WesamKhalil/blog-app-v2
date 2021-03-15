import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { loadUser } from './actions/authActions'
import store from './store.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Auth from './components/Auth'
import Posts from './components/Posts'
import NewPost from './components/NewPost'
import ViewPost from './components/ViewPost'
import './App.css'

export class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="app-container">
                        <NavBar />
                        <div className="main-content">
                            <Route exact path="/" component={Posts} />
                            <Route path="/new" component={NewPost} />
                            <Route path="/edit/:id" component={NewPost} />
                            <Route path="/auth/:type" component={Auth} />
                            <Route path="/view/:id" component={ViewPost} />
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App
