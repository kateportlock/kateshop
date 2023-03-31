import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../../contexts/cart";
import { CurrentUserContext } from "../../contexts/currentUser";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";
import style from './../../styles/modules/elements/Navbar.module.scss';

const Navbar = (props) => {

    const navigate = useNavigate();
    const [cart] = useContext(CartContext);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    const logout = () => {

        axios.post(`/api/logout`, {
            params: {
                userId: currentUser._id
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    setCurrentUser({});
                    navigate('/');
                    localStorage.removeItem('loggedUser');

                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div className='navbar'>
            <div className="navbar-start">
                <img src="/logo.png" className={`${style.logo} is-clickable`} alt="logo" onClick={() => navigate('/')} />
                <div className='navbar-item is-clickable ml-5 is-uppercase' onClick={() => navigate('/')}>
                    <StorefrontIcon className='mr-2' />
                    <p>All products</p>
                </div>
                {
                    currentUser && Object.keys(currentUser).length !== 0 && (currentUser.role === 'staff' || currentUser.role === 'admin') && (
                        <div className='navbar-item is-clickable is-uppercase' onClick={() => navigate('/admin/products')}>
                            <AddBusinessIcon className='mr-2' />
                            <p>Manage shop</p>
                        </div>
                    )
                }
                {
                    currentUser && Object.keys(currentUser).length !== 0 && (
                        <div className='navbar-item is-clickable is-uppercase' onClick={() => navigate('/account/orders')}>
                            <AccountCircleIcon className='mr-2' />
                            <p>My account</p>
                        </div>
                    )
                }
                <div className='navbar-item is-clickable is-uppercase' onClick={() => navigate('/cart')}>
                    <ShoppingBasketIcon className='mr-2' />
                    <p>Cart</p>
                    {
                        cart.length > 0 && (
                            <div className={`${style.cartCount}`}>{cart.map(item => item.quantity).reduce((a, b) => a + b, 0)}</div>
                        )
                    }
                </div>
            </div>
            <div className="navbar-end">
                {
                    currentUser && Object.keys(currentUser).length !== 0 ? (
                        <div className='is-flex is-align-items-center'>
                            <p className='is-uppercase'>Hi, {currentUser.name}!</p>
                            <div className='is-flex navbar-item is-uppercase' onClick={logout}>
                                <button className={`${style.navbarBtn} button is-light is-small is-uppercase`}><LogoutIcon className='mr-1' /> Logout</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='is-flex navbar-item is-uppercase' onClick={() => navigate('/account/login')}>
                                <button className={`${style.navbarBtn} button is-light is-small is-uppercase`}><LoginIcon className='mr-1' /> Login</button>
                            </div>
                            <div className='is-flex navbar-item is-uppercase' onClick={() => navigate('/account/register')}>
                                <button className={`${style.navbarBtn} button is-light is-small is-uppercase`}>Register</button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;