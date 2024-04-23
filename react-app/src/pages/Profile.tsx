import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {Navigate} from "react-router-dom";
import Wrapper from "../components/Wrapper";
import {setUser} from "../redux/actions/setUserAction";
import {connect} from "react-redux";

const Profile = (props: { user: User, setUser: (user: User) => void }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [validationError, setValidationError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                setFirstName(props.user.first_name);
                setLastName(props.user.last_name);
                setEmail(props.user.email);
            }
        )();
    }, [props.user]);

    const updateUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put('users/info', {
            first_name, last_name, email
        }).then(res => {
            props.setUser(new User(
                res.data.id,
                res.data.first_name,
                res.data.last_name,
                res.data.email,
                res.data.created_at,
            ))
            setRedirect(true);
        }).catch(error => {
            setValidationError(true);
            setValidationErrors(error.response?.data.message);
        });
    }

    const changePassword = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put('users/password', {
            password, password_confirm
        }).then(res => {
            setRedirect(true);
        }).catch(error => {
            setValidationError(true);
            setValidationErrors(error.response?.data.message);
        });

    }
    if (redirect) {
        // return <Navigate to={'/users'}/>
    }
    return (
        <>
            <Wrapper>
                {validationError ?
                    <ul>
                        {validationErrors.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                    </ul> : ''
                }
                <form className="row g-3 mt-4" onSubmit={updateUser}>
                    <h2>Account Information</h2>
                    <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label">First Name</label>
                        <input type="text"
                               defaultValue={first_name}
                               onChange={e => setFirstName(e.target.value)} className="form-control" id="inputEmail4" />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputPassword4" className="form-label">Last Name</label>
                        <input type="text"
                               defaultValue={last_name}
                               onChange={e => setLastName(e.target.value)} className="form-control" id="inputPassword4" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputAddress"
                               defaultValue={email}
                               onChange={event => setEmail(event.target.value)}/>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>

                <form className="row g-3 mt-4" onSubmit={changePassword}>
                    <h2>Change Password</h2>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Password</label>
                        <input type="password" className="form-control"
                               onChange={event => setPassword(event.target.value)}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Password Confirm</label>
                        <input type="password" className="form-control"
                               onChange={event => setPasswordConfirm(event.target.value)}/>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </Wrapper>
        </>
    );
};

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);


interface Role {
    id: number;
    name: string;
}

class User {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public email: string,
        public created_at: string
    ) {
    }
}