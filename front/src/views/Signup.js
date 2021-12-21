import React, {useContext} from 'react'
import { Context } from '../store/appContext'

/* form for signup */
const Signup = () => {
    const { store, actions } = useContext(Context)
    const submit = (e) => {
        e.preventDefault();
        if (e.target.password.value === e.target.password2.value) {
            actions.signup(e.target.email.value, e.target.password.value);
        } else {
            alert('Passwords do not match');
        }
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
                <h1 className='col-12'>Signup</h1>
                <p className='col-12'>This is the signup page</p>
                {/* form for signup */}
                <form className='col-12' onSubmit={(e) => submit(e)}>
                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input type="text" className='form-control' id='username' placeholder='Enter username' />
                        <label htmlFor='email'>Email</label>
                        <input type="email" className='form-control' id='email' placeholder='Enter email' />
                        <label htmlFor='password'>Password</label>
                        <input type="password" className='form-control' id='password' placeholder='Enter password' />
                        <label htmlFor='password'>Confirm Password</label>
                        <input type="password" className='form-control' id='password2' placeholder='Confirm password' />
                        <button type="submit" className="btn btn-primary" onClick={alreadyExist ? null : submit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
