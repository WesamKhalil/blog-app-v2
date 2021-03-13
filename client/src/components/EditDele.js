import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class EditDele extends Component {
    constructor(props) { super(props) }

    render() {
        return (
            <React.Fragment>
                <button><Link to={'/edit/'+ this.props.id}>Edit</Link></button>
                <button onClick={() => this.props.deletePost()}>Delete</button>
            </React.Fragment>
        )
    }
}

export default EditDele
