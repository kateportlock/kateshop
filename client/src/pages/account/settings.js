import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/currentUser";
import Message from "../../components/global/Message";
import AccountMenu from "../../components/account/AccountMenu";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import bcrypt from 'bcryptjs';
import axios from "axios";

const Settings = (props) => {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [email, setEmail] = useState(Object.keys(currentUser).length !== 0 ? currentUser.email : '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [message, setMessage] = useState('');
    const [isModal, setIsModal] = useState(false);

    const location = useLocation();

    const updateEmail = () => {

        if (!email) {
            setMessage('Please complete all mandatory fields!');
        } else {
            if (email === currentUser.email) {
                setMessage('This email is already in use');
            } else {

                axios.patch(`/api/users/${currentUser._id}`, {
                    email: email
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            setCurrentUser({ ...currentUser, email: email })
                            localStorage.setItem('loggedUser', JSON.stringify({ ...currentUser, email: email }));
                            setMessage('');
                        }
                    })
                    .catch(function (error) {
                        setMessage('This account already exists');
                        console.log(error);
                    });
            }
        }

    }

    const resetPassword = () => {

        if (!currentPassword) {
            setMessage('Please provide current password to change it!');
        } else {

            if (!newPassword || !passwordRepeat) {
                setMessage('Please complete all mandatory fields!');
            } else {
                if (newPassword !== passwordRepeat) {
                    setMessage('Passwords don\'t match!');
                } else {

                    const doesPasswordMatch = bcrypt.compareSync(currentPassword, currentUser.password)

                    if (!doesPasswordMatch) {
                        setMessage('Current password is incorrect');
                    } else {

                        const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync());

                        axios.patch(`/api/users/${currentUser._id}`, {
                            password: hashedPassword
                        })
                            .then(function (response) {
                                if (response.status === 200) {
                                    setNewPassword('')
                                    setCurrentPassword('')
                                    setPasswordRepeat('')
                                    setMessage('');
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                }
            }

        }
    }

    const deleteAccount = () => {

        axios.delete(`/api/users/${currentUser._id}`, {})
            .then(function (response) {

                if (response.status === 204) {
                    setIsModal(false);
                    setCurrentUser({});
                    navigate('/');
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div>
            <AccountMenu activeTab={location.pathname} />
            <div className="subSection">
                <div className='pb-4 pt-4 has-text-left m-auto width30'>
                    <div className="box mt-3 has-text-centered">
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-left">
                                    <EmailIcon />
                                </span>
                            </p>
                        </div>
                        <button className='button is-success mt-4' onClick={() => updateEmail()}>Update email</button>
                    </div>
                    <div className="box mt-6 has-text-centered">
                        <div className="field">
                            <p className="control has-icons-left">
                                <input className="input" type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                <span className="icon is-small is-left">
                                    <PasswordIcon />
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input className="input" type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                <span className="icon is-small is-left">
                                    <LockOpenIcon />
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input className="input" type="password" placeholder="Repeat New Password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
                                <span className="icon is-small is-left">
                                    <LockIcon />
                                </span>
                            </p>
                        </div>
                        {
                            message && (
                                <Message message={message} />
                            )
                        }
                        <button className='button is-warning mt-4' onClick={() => resetPassword()}>Reset current password</button>
                    </div>

                    <div className={isModal ? 'modal is-active' : 'modal'}>
                        <div className="modal-background"></div>
                        <div className="modal-content">
                            <div className="box">
                                <p>Are you sure you would like to delete your account?</p>
                                <div className='is-flex is-justify-content-center mt-5'>
                                    <button className='button is-info' onClick={() => setIsModal(false)}>Cancel</button>
                                    <button className='button is-danger ml-4' onClick={() => deleteAccount()}>Delete</button>
                                </div>
                            </div>
                        </div>
                        <button className="modal-close is-large" aria-label="close"></button>
                    </div>

                    <div className="box mt-6 has-text-centered">
                        <button className='button is-danger' onClick={() => setIsModal(true)}><DeleteForeverIcon /> Delete account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;