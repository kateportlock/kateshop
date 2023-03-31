import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/currentUser";
import Message from "../../components/global/Message";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import bcrypt from 'bcryptjs';

const Register = (props) => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    const register = () => {

        if (name && lastName && email && password && passwordRepeat) {

            if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {

                if (password.length >= 6) {

                    if (password === passwordRepeat) {

                        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

                        axios.post('/api/user', {
                            name,
                            lastName,
                            email,
                            password: hashedPassword,
                            role: 'user'
                        })
                            .then(function (response) {

                                if (response.status === 200) {

                                    setCurrentUser(response.data);
                                    localStorage.setItem('loggedUser', JSON.stringify(response.data));
                                    navigate('/');

                                }
                            })
                            .catch(function (error) {
                                setMessage('This account already exists');
                            });

                    } else {
                        setMessage('Passwords don\'t match!');
                    }

                } else {
                    setMessage('Password should be 6 or more characters!');
                }

            } else {
                setMessage('You have entered an invalid email format')
            }

        } else {
            setMessage('Please complete all mandatory fields!');
        }

    }

    return (
        <div className="pt-6 has-text-centered m-auto width30 viewHeight">
            <p className='has-text-dark is-size-6 has-text-weight-bold mb-3'>Register a new account</p>
            <div className="field">
                <div className="control">
                    <input value={name} className={`input`} type="text" placeholder="First Name" onChange={(e) => setName(e.target.value)} />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input value={lastName} className={`input`} type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                </div>
            </div>
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
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className="icon is-small is-left">
                        <LockOpenIcon />
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input" type="password" placeholder="Repeat Password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
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
            <div className="field mt-4">
                <p className="control">
                    <button className="button is-success" onClick={register}>
                        Register
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Register;