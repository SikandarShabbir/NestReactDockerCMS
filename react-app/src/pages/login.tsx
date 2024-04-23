import React, {SyntheticEvent, useState} from "react";
import axios from 'axios';
import {Navigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = (e: SyntheticEvent) =>{
        e.preventDefault();
        axios.post('login', {email, password}).then(res => {
            console.log('Res', res);
            setRedirect(true);
        }).catch(err => {
            console.log('Error', err);
        });
    }
    if (redirect){
        return <Navigate to={'/'} />
    }
    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
                     alt="" width="72"
                     height="57"/>
                <h1 className="h3 mb-3 fw-normal">Please Login</h1>

                <div className="form-floating">
                    <input type="email" className="form-control"
                           placeholder="Email" onChange={event => setEmail(event.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control"
                           placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
            </form>
        </main>
    );
};

export default Login;