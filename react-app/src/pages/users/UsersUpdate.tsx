import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from 'axios';
import {Navigate, useParams} from "react-router-dom";

const UsersUpdate = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role_id, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [validationError, setValidationError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    let { id } = useParams();
    useEffect(() => {
        (
            async () => {
               const {data} = await axios.get('roles');
               setRoles(data.data);

               const response = await axios.get(`users/${id}`);
               setFirstName(response.data.first_name);
               setLastName(response.data.last_name);
               setEmail(response.data.email);
               setRoleId(response.data.role.id);
            }
        )();
    }, []);
    const updateUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put(`users/${id}`, {
            first_name, last_name, email, role_id, password
        }).then(res => {
            setRedirect(true);
        }).catch(error => {
            setValidationError(true);
            setValidationErrors(error.response?.data.message);
        });

    }
    if (redirect) {
        return <Navigate to={'/users'}/>
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
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">First Name</label>
                    <input type="text" defaultValue={first_name} onChange={e => setFirstName(e.target.value)} className="form-control" id="inputEmail4" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Last Name</label>
                    <input type="text" defaultValue={last_name} onChange={e => setLastName(e.target.value)} className="form-control" id="inputPassword4" />
                </div>
                <div className="col-6">
                    <label className="form-label">Email</label>
                    <input type="email" defaultValue={email} className="form-control" onChange={event => setEmail(event.target.value)}/>
                </div>
                <div className="col-6">
                    <label className="form-label">Password</label>
                    <input type="password" defaultValue={''} className="form-control" onChange={event => setPassword(event.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">Role</label>
                    <select id="inputState" className="form-select" value={role_id} onChange={e => setRoleId(e.target.value)}>
                        {roles.map((r: Role) => {
                            return (
                                // <option selected>Select ...</option>
                            <option key={r.id} value={r.id}>{r.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Update User</button>
                </div>
            </form>
            </Wrapper>
        </>
    );
};

export default UsersUpdate;


interface Role {
    id: number;
    name: string;
}