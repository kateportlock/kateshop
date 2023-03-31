import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { CurrentUserContext } from '../../../contexts/currentUser';
import Menu from '../../../components/admin/menu';
import axios from "axios";
import style from './../../../styles/modules/admin/Layout.module.scss';
import EditUser from '../../../components/admin/users/edit';


const AdminUserPage = (props) => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [orderHistory, setOrderHistory] = useState([]);


    useEffect(() => {

        if (id) {

            setLoading(true);

            axios.get(`/api/user/${id}`, {})
                .then(function (response) {

                    if (response.status === 200) {

                        const user = response.data;
                        setUser(user);
                        setName(user.name);
                        setLastName(user.lastName);
                        setEmail(user.email);
                        setRole(user.role);
                        setOrderHistory(user.orderHistory);
                        setLoading(false);

                    }
                })
                .catch(function (error) {
                    console.log('User not found')
                });

        } else {
            navigate(`/admin/users`);
        }

    }, [id]);

    const updateUser = async () => {

        axios.patch(`/api/user/edit/${id}`, {
            params: {
                name: name,
                lastName: lastName,
                email: email,
                role: role
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    navigate(`/admin/users`);

                }
            })
            .catch(function (error) {
                console.log('User not found')
            });

    }

    return (
        <div className='section p-6'>
            <div className='is-flex'>
                <Menu />
                <div className={`boxShadow ml-6 is-flex p-6 ${style.displayColumn}`}>
                    {
                        loading ? (
                            <p>Loading...</p>
                        ) : (
                            <EditUser
                                name={name}
                                setName={setName}
                                lastName={lastName}
                                setLastName={setLastName}
                                email={email}
                                setEmail={setEmail}
                                role={role}
                                setRole={setRole}
                                orderHistory={orderHistory}
                                currentUser={currentUser}
                                updateUser={updateUser}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminUserPage;