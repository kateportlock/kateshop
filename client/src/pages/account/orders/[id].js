import { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../../contexts/currentUser';
import dateFormat from '../../../functions/dateFormat';
import TagIcon from '@mui/icons-material/Tag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";

const OrderPage = (props) => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (Object.keys(currentUser).length === 0) {

            navigate('/account/login');

        } else {
            axios.get(`/api/orders/${id}`, {
            })
                .then(function (response) {

                    if (response.status === 200) {

                        const order = response.data[0];

                        if (Object.keys(order).length !== 0) {

                            if (currentUser._id !== order.user._id) {
                                navigate('/account/login'); //check if this order belongs to currently logged in user
                            } else {
                                setOrder(order);
                                setLoading(false);
                            }

                        }
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }, []);

    return (
        <div>
            {
                loading ? <p>loading</p> : <div>

                    {
                        Object.keys(order).length !== 0 && (
                            <div className='has-text-centered'>
                                <button className='button mb-4 mt-6' onClick={() => navigate('/account/orders')}>Back to my orders</button>
                                <div className='is-flex is-flex-direction-column is-align-items-center p-6 seconderyBg'>
                                    <div className='is-flex is-justify-content-space-between'>
                                        <div className='mb-6 mt-3 is-flex is-flex-direction-column is-align-items-start width70'>
                                            <div className='is-flex p-1'>
                                                <TagIcon className='mr-1' />
                                                <p><strong>Order:</strong> {order.orderNumber}</p>
                                            </div>
                                            <div className='is-flex p-1'>
                                                <CalendarMonthIcon className='mr-1' />
                                                <p><strong>Order Date:</strong> {dateFormat({ date: order.timestamp, format: 'long' })}</p>
                                            </div>
                                            <div className='is-flex p-1'>
                                                <ContentPasteSearchIcon className='mr-1' />
                                                <p><strong>Order Status: </strong><span className={(order.status === 'Cancelled' || order.status === 'Refunded') ? 'has-text-danger is-italic' : ((order.status === 'Partially refunded') ? 'has-text-warning is-italic' : 'has-text-success is-italic')}>{order.status}</span></p>
                                            </div>
                                            <p className='mt-4'><strong>Order items:</strong></p>
                                        </div>
                                        <div className='mb-6 mt-3 is-flex is-flex-direction-column'>
                                            <div className='is-flex p-1'>
                                                <p><strong>Customer information: </strong></p>
                                            </div>
                                            <div className='is-flex p-1'>
                                                <PersonIcon className='mr-1' />
                                                <p><strong>Name: </strong>{order.user.name} {order.user.lastName}</p>
                                            </div>
                                            <div className='is-flex p-1'>
                                                <EmailIcon className='mr-1' />
                                                <p><strong>Email: </strong>{order.user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-3 width50'>
                                        {
                                            order.cart.map(item => {
                                                return (
                                                    <div key={item._id} className='is-flex is-justify-content-space-between is-align-items-center mb-5'>
                                                        <img className='m-2' width='150' src={item.img} alt={`product${item._id}`} />
                                                        <p>{item.title}</p>
                                                        <div className='has-text-left'>
                                                            <p><strong>Price:</strong> £{item.price.toFixed(2)}</p>
                                                            <p><strong>Quantity:</strong> {item.quantity}</p>
                                                            {
                                                                (order.status === 'Cancelled' || item.refunded) && (
                                                                    <p className='ml-4 has-text-danger'>Refunded: {item.refunded} out of {item.quantity}</p>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='has-text-left'>
                                        <p className='mb-3'><strong>Order Summary</strong></p>
                                        <p><strong>Subtotal:</strong> £{(order.cartValue + order.discountsVal).toFixed(2)}</p>
                                        <p><strong>Discounts:</strong> {order.discountsVal !== 0 && '-'}£{order.discountsVal.toFixed(2)}</p>
                                        <div className='is-flex p-1 is-align-items-end'>
                                            <LocalAtmIcon className='mr-1' />
                                            <p className='mt-4'><strong>Grant Total: £{order.cartValue.toFixed(2)}</strong></p>
                                        </div>
                                        {
                                            (order.status === 'Cancelled' || order.status === 'Partially refunded' || order.status === 'Refunded') && (
                                                <div className='is-flex p-1 mt-4'>
                                                    <p className='has-text-danger'>Total Refunded: £{order.refunded.toFixed(2)}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            }
        </div>
    )
}

export default OrderPage;