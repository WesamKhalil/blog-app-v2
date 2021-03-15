import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class EditDele extends Component {
    constructor(props) { super(props) }

    render() {

        const { id, deletePost } = this.props

        return (
            <React.Fragment>
                <button><Link to={'/edit/'+ id}>Edit</Link></button>
                <button onClick={() => deletePost()}>Delete</button>
            </React.Fragment>
        )
    }
}

export default EditDele
