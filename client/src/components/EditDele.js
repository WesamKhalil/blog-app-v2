import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles/EditDele.css'

export class EditDele extends Component {
    constructor(props) { super(props) }

    render() {

        const { id, deletePost } = this.props
        console.log(id)
        return (
            <React.Fragment>
                <Link to={'/edit/'+ id}><button className="edit">Edit</button></Link>
                <button onClick={() => deletePost()} className="delete">Delete</button>
            </React.Fragment>
        )
    }
}

export default EditDele
