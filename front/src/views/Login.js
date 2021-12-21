import React, {useContext} from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { store, actions: {login} } = useContext(Context);
    const submit = (e) => {
        e.preventDefault();
        login(e.target.email.value, e.target.password.value);
    }
    const alreadyExist = () => {
        if (store.user.error) {
            return (
                <div className='alert alert-danger' role='alert'>
                    {store.user.error}
                </div>
            )
        }else{
            return null
        }
    }
    return (
        <div className='container'>
            <div className='row'>
                <h1 className='col-12'>Login</h1>
                <p className='col-12'>This is the login page</p>
                {/* form for login */}
                <form className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input type="text" className='form-control' id='username' placeholder='Enter username' />
                        <label htmlFor='password'>Password</label>
                        <input type="password" className='form-control' id='password' placeholder='Enter password' />
                        <Link to="/private" type="submit" className="btn btn-primary" onClick={alreadyExist ? null : login}>Submit</Link>
                    </div>
                </form>
            </div>       
        </div>
    )
}

export default Login
