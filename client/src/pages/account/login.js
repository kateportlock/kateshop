import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/currentUser';
import Message from '../../components/global/Message';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";

const Login = (props) => {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = () => {

        if (email && password) {

            axios.post(`/api/login`, {
                params: {
                    email: email,
                    password: password
                },
                withCredentials: true
            })
                .then(function (response) {

                    if (response.status === 200) {

                        const user = response.data.user;

                        if (Object.keys(user).length !== 0) {
                            setCurrentUser(user);
                            navigate('/');
                            localStorage.setItem('loggedUser', JSON.stringify(user));
                        }

                    }
                })
                .catch(function (error) {
                    setMessage('User is not found!');
                });

        } else {
            setMessage('Please complete all mandatory fields!');
        }

    }

    return (
        <div className='pt-6 m-auto has-text-centered width30 viewHeight'>
            <p className='has-text-dark is-size-6 has-text-weight-bold mb-3'>Login to your account</p>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input is-medium" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                    <input className="input is-medium" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
            <p className='is-underlined is-size-6 has-text-info is-clickable'>Forgot your password?</p>
            <div className="field mt-4">
                <p className="control">
                    <button className="button is-success" onClick={login}>
                        Login
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Login;