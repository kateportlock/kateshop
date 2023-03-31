import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/currentUser";
import Message from "../../components/global/Message";
import bcrypt from 'bcryptjs';
import axios from "axios";

const Checkout = ({ cartValue, placeOrder }) => {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [checked, setChecked] = useState(false);
    const [name, setName] = useState(Object.keys(currentUser).length !== 0 ? currentUser.name : '');
    const [lastName, setLastName] = useState(Object.keys(currentUser).length !== 0 ? currentUser.lastName : '');
    const [email, setEmail] = useState(Object.keys(currentUser).length !== 0 ? currentUser.email : '');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [message, setMessage] = useState('');

    const createAccount = (user) => {

        axios.post('/api/user', {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        })
            .then(function (response) {

                if (response.status === 200) {

                    setCurrentUser(user);
                    localStorage.setItem('loggedUser', JSON.stringify(user));

                    placeOrder({
                        name,
                        lastName,
                        email
                    });

                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const createUser = () => {

        if (checked) {

            if (!password || !passwordRepeat || !name || !lastName || !email) {

                setMessage('Please complete all mandatory fields!');

            } else {

                if (password.length >= 6) {

                    if (password !== passwordRepeat) {

                        setMessage('Passwords don\'t match!');

                    } else {

                        if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {

                            setMessage('');
                            const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

                            let user = {
                                name,
                                lastName,
                                email,
                                password: hashedPassword,
                                role: 'user'
                            }

                            createAccount(user);

                        } else {

                            setMessage('You have entered an invalid email format')

                        }

                    }

                } else {
                    setMessage('Passwords should be 6 or more characters!');
                }

            }

        } else {

            if (!name || !lastName || !email) {
                setMessage('Please complete all mandatory fields!');
            } else {

                if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {

                    setMessage('');

                    let user = {
                        name,
                        lastName,
                        email
                    }

                    placeOrder(user);

                } else {

                    setMessage('You have entered an invalid email format')

                }

            }

        }


    }

    return (
        <div className="p-6 has-text-centered viewHeight">
            <p>Checkout</p>
            <div className='has-text-centered m-auto width30'>
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
                        <input value={email} className={`input`} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                {
                    checked && (
                        <>
                            <div className="field">
                                <label className="label">Password <span className='has-text-danger'>*</span></label>
                                <div className="control">
                                    <input value={password} className={`input`} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Repeat Password <span className='has-text-danger'>*</span></label>
                                <div className="control">
                                    <input value={passwordRepeat} className={`input`} type="password" placeholder="Repeat Password" onChange={(e) => setPasswordRepeat(e.target.value)} />
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    Object.keys(currentUser).length === 0 && (
                        <label className="checkbox">
                            <input className='mr-1' type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                            <span>Create an account</span>
                        </label>
                    )
                }
            </div>
            {
                message && (
                    <Message message={message} />
                )
            }
            <div className='mt-4 mb-6 has-text-centered'>
                <p>Cart total: <strong>£{cartValue.toFixed(2)}</strong></p>
            </div>
            <div className='is-flex is-justify-content-center'>
                <button className='button is-warning mr-2' onClick={() => navigate('/cart')}>Return to cart</button>
                <button className='button is-success ml-2' onClick={() => createUser()}>Place order</button>
            </div>
        </div>
    )
}

export default Checkout;