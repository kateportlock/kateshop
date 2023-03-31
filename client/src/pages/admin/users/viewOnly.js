import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Menu from '../../../components/admin/menu';
import axios from "axios";
import style from './../../../styles/modules/admin/Layout.module.scss';
import ViewUser from '../../../components/admin/users/view';

const AdminUserViewOnlyPage = (props) => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');


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

    return (
        <div className='section p-6'>
            <div className='is-flex'>
                <Menu />
                <div className={`${style.displayColumn} boxShadow ml-6 is-flex p-6`}>
                    {
                        loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ViewUser 
                                name={name}
                                lastName={lastName}
                                email={email}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminUserViewOnlyPage;