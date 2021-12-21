import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <h1 className='col-12'>Welcome</h1>
                    <p className='col-12'>This is the home page</p>
                    <Link type="button" class="btn btn-primary col-12" to="/login">Login</Link>
                    <Link type="button" class="btn btn-primary col-12" to="/signup">Signup</Link>
                </div>
            </div>
        </>
    )
}

export default Home
