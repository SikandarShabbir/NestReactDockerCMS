import React, {Dispatch, useEffect, useState} from 'react';
import axios from 'axios';
import {Link, Navigate, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/setUserAction";

const Header = (props: any) => {

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('user');
                props.setUser(new User(
                    data.id,
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.created_at
                ));
            } catch (e) {
                setRedirect(true);
            }
        })();
    }, []);

    const logout = async () => {
        await axios.post('logout', {});
    }

    if (redirect) {
        return <Navigate to={'/login'}/>
    }
    return (
        <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
            <Link to={'/'} className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white">Company name</Link>

            <ul className="text-right">
                <NavLink to={'/profile'}
                         className="text-decoration-none">{`${props.user.first_name} ${props.user.last_name}`}</NavLink>
                <NavLink to={'/login'} onClick={logout} className="text-decoration-none p-5">Logout</NavLink>
            </ul>

            <div id="navbarSearch" className="navbar-search w-100 collapse">
                <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search"
                       aria-label="Search"/>
            </div>
        </header>
    );
}
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
export default connect(mapStateToProps, mapDispatchToProps)(Header);

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