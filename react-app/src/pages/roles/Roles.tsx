import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from 'axios';
import {Link} from "react-router-dom";
import Paginator from "../../components/Paginator";

const Roles = () => {
    const [roles, setRoles] = useState([]);
    let [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(0);

    useEffect(() => {
        (async () => {
            await getRoles();
        })();
    }, [page]);

    const getRoles = async () => {
        await axios.get('roles?page=' + page).then(response => {
            // console.log('Data', response.data);
            setRoles(response.data.data);
            setNextPage(response.data.meta.last_page);
        }).catch(error => {
            console.log('Error', error);
        });
    }
    const delet = (id: number) => {
        if (window.confirm('Are you sure to delete?')){
            axios.delete(`roles/${id}`)
                .then(res => {
                    getRoles();
                });
        }
    }
    return (
        <Wrapper>
            <div className="btn-group  m-2">
                <Link to={'/roles/create'} className="btn btn-sm btn-outline-primary">Create</Link>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {roles.map((role: Role) => {
                        return (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/role/${role.id}/update`} className="btn btn-sm btn-outline-secondary">Update</Link>
                                    </div>
                                    <div className="btn-group mr-2">
                                        <a className="btn btn-sm btn-outline-secondary" onClick={() => delet(role.id)} href="#">Delete</a>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                    }

                    </tbody>
                </table>
            </div>

            <Paginator lastPage={nextPage} page={page} pageChanged={setPage}/>
        </Wrapper>
    );
}

export default Roles;

interface Role {
    id: number;
    name: string;
}