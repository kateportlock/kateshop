import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/currentUser';

const OrderConfirmation = (props) => {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    return (
        <div className='section has-text-centered viewHeight'>
            <p className='is-size-5 mb-4'>Thank you for your order!</p>
            <p>Order confirmation has been sent to your email</p>
            {
                Object.keys(currentUser).length !== 0 && (
                    <button className='button mt-3' onClick={() => navigate('/account/orders')}>Go to my orders</button>
                )
            }
        </div>
    )
}

export default OrderConfirmation;