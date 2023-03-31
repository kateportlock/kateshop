import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/currentUser";
import { useLocation } from 'react-router-dom';
import Message from "../../components/global/Message";
import AccountMenu from "../../components/account/AccountMenu";
import axios from "axios";
import style from './../../styles/modules/elements/ProfilePicture.module.scss';

const Details = (props) => {

    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [name, setName] = useState(Object.keys(currentUser).length !== 0 ? currentUser.name : '');
    const [lastName, setLastName] = useState(Object.keys(currentUser).length !== 0 ? currentUser.lastName : '');
    const [email, setEmail] = useState(Object.keys(currentUser).length !== 0 ? currentUser.email : '');
    const [message, setMessage] = useState('');

    const location = useLocation();

    const updateDetails = () => {

        if (!name || !lastName) {
            setMessage('Please complete all mandatory fields!');
        } else {

            axios.patch(`/api/users/${currentUser._id}`, {
                name: name,
                lastName: lastName
            })
                .then(function (response) {
                    if (response.status === 200) {
                        setCurrentUser({ ...currentUser, name: name, lastName: lastName });
                        localStorage.setItem('loggedUser', JSON.stringify({ ...currentUser, name: name, lastName: lastName }));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }

    }

    return (
        <div>
            <AccountMenu activeTab={location.pathname} />
            <div className='subSection'>
                <div className='pb-4 pt-4 has-text-left m-auto width30'>
                    <div className="field">
                        <label className="label">Profile image:</label>
                        <div className={`${style.profileCircle}`}>{name.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()}</div>
                    </div>
                    <div className="field">
                        <label className="label">First Name <span className='has-text-danger'>*</span></label>
                        <div className="control">
                            <input value={name} className={`input`} type="text" placeholder="First Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Last Name <span className='has-text-danger'>*</span></label>
                        <div className="control">
                            <input value={lastName} className={`input`} type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email <span className='has-text-danger'>*</span></label>
                        <div className="control">
                            <input disabled value={email} className={`input`} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    {
                        message && (
                            <Message message={message} />
                        )
                    }
                    <button className='button is-success mt-4' onClick={() => updateDetails()}>Update details</button>
                </div>
            </div>
        </div>
    )
}

export default Details;