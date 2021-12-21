import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext'

const Private = () => {
    const { store, actions } = useContext(Context)
    const logout = () => {
        actions.logout()
    }
    return (
        <div className='container'>
            <div className='row'>
                <h1 className='col-12'>This is the private view</h1>
                <Link to="/" onClick={logout}>Logout</Link>
            </div>
        </div>
    )
}

export default Private
