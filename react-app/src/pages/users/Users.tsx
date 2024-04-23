import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from 'axios';
import {Link} from "react-router-dom";
import Paginator from "../../components/Paginator";

const User = () => {
    const [users, setUsers] = useState([]);
    let [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(0);

    useEffect(() => {
        (async () => {
            await getUsers();
        })();
    }, [page]);

    const getUsers = async () => {
        await axios.get('users?page=' + page).then(response => {
            // console.log('Data', response.data);
            setUsers(response.data.data);
            setNextPage(response.data.meta.last_page);
        }).catch(error => {
            console.log('Error', error);
        });
    }

    const delet = (id: number) => {
        if (window.confirm('Are you sure to delete?')){
            axios.delete(`users/${id}`)
                .then(res => {
                    getUsers();
                });
        }
    }
    return (
        <Wrapper>
            <div className="btn-group  m-2">
                <Link to={'/users/create'} className="btn btn-sm btn-outline-primary">Create</Link>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {users.map((user: UserModel) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role ? user.role.name : 'N/A'}</td>
                                <td>{user.created_at}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/user/${user.id}/update`} className="btn btn-sm btn-outline-secondary">Update</Link>
                                    </div>
                                    <div className="btn-group mr-2">
                                        <a className="btn btn-sm btn-outline-secondary" onClick={() => delet(user.id)} href="#">Delete</a>
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

export default User;

interface Role {
    id: number;
    name: string;
}

class UserModel {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public email: string,
        public created_at: string,
        public role: Role
    ) {
    }
}