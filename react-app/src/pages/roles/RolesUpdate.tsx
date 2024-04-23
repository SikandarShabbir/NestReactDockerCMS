import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from 'axios';
import {Navigate, useParams} from "react-router-dom";

const RolesCreate = () => {
    const [permissions, setPermissions] = useState([]);
    const [name, setName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([] as number[]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [validationError, setValidationError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('permissions');
                setPermissions(data);
                await axios.get('roles/' + id)
                    .then(res => {
                        setName(res.data.name);
                        setSelectedPermissions(res.data.permissions.map((p: any) => p.id));
                    });
            }
        )();
    }, []);
    const updateRole = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put('roles/'+ id, {
            name, permissions: selectedPermissions
        }).then(res => {
            setRedirect(true);
        }).catch(error => {
            setValidationError(true);
            setValidationErrors(error.response?.data.message);
        });

    }
    const checked = (id: number) => {
        if(selectedPermissions.find(s => s == id)){
            setSelectedPermissions(selectedPermissions.filter(x => x !== id));
            return
        }
        setSelectedPermissions([...selectedPermissions, id]);
        console.log(selectedPermissions);
    }
    if (redirect) {
        return <Navigate to={'/roles'}/>
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
                <form className="g-3 mt-4" onSubmit={updateRole}>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Name</label>
                            <input type="text" defaultValue={name} onChange={e => setName(e.target.value)} className="form-control"
                                   id="inputEmail4"/>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <label htmlFor="inputPassword4" className="form-label col-2">Permissions </label>
                        <div className="col-md-10">
                            {permissions.map((p: Permission) => {
                                return (
                                    <div key={p.id}>
                                        <input type="checkbox" className="form-check-input"
                                               checked={selectedPermissions.some(x => x === p.id)}
                                               onChange={() => checked(p.id)} id="inputPassword4"/>
                                        <label htmlFor="inputPassword4" className="form-check-label">{p.name}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-primary">Update Role</button>
                    </div>
                </form>
            </Wrapper>
        </>
    );
};

export default RolesCreate;


interface Permission {
    id: number;
    name: string;
}