import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../../contexts/currentUser';
import DataTable from 'react-data-table-component';
import SearchAdmin from '../../../components/forms/SearchAdmin';
import Menu from '../../../components/admin/menu';
import axios from "axios";

const AdminUsersPage = (props) => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [searchVal, setSearchVal] = useState('');

    const usersColumns = [
        {
            name: 'Name',
            selector: row => row.name,
            width: '200px'
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            width: '200px'
        },
        {
            name: 'Email',
            selector: row => row.email,
            width: '250px'
        },
        {
            name: 'Role',
            selector: row => row.role,
            width: '200px'
        },
        {
            name: 'Action',
            width: 'fit-content',
            selector: row => row._id,
            format: row => {
                return (
                    <div className='is-flex is-align-items-center'>
                        <button className="button is-small" onClick={() => row.role === 'admin' && currentUser.role === 'staff' ? navigate(`/admin/user/view/${row._id}`) : viewUser(row._id)}>
                            {
                                row.role === 'admin' && currentUser.role === 'staff' ? 'View' : 'View/Edit'
                            }
                        </button>
                        {
                            !(row.role === 'admin' && currentUser.role === 'staff') && (
                                <button className="button is-small" onClick={() => deleteUser(row._id)}>Delete</button>
                            )
                        }
                    </div>
                )
            }
        },
    ];

    const deleteUser = async (id) => {
        await axios.delete(`/api/users/delete`, {
            params: {
                id: id
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    setUsers(response.data)

                }
            })
            .catch(function (error) {
                console.log("This user couldn't be deleted")
            });
    }

    const viewUser = async (id) => {

        navigate(`/admin/user/${id}`);

    }

    useEffect(() => {

        axios.get(`/api/users`, {
        })
            .then(function (response) {

                if (response.status === 200) {

                    const users = response.data;
                    setUsers(users);

                }
            })
            .catch(function (error) {
                console.log('User list is not found!')
            });

    }, []);

    useEffect(() => {

        if (searchVal) {
            const newArr = users.filter(item => (item.email.toLocaleLowerCase()).indexOf(searchVal.toLocaleLowerCase()) !== -1);
            setCurrentUsers(newArr);
        } else {
            setCurrentUsers(users);
        }

    }, [searchVal, users]);

    return (
        <div className='section p-6'>
            <div className='is-flex'>
                <Menu />
                <div className='ml-6 width100'>
                    <SearchAdmin searchVal={searchVal} setSearchVal={setSearchVal} />
                    <DataTable
                        columns={usersColumns}
                        data={currentUsers}
                        pagination={true}
                        paginationPerPage={10}
                        responsive={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;