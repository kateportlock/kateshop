import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Menu from '../../../components/admin/menu';
import axios from "axios";
import EditOrder from '../../../components/admin/orders/edit';

const AdminOrderPage = (props) => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({});

    const [orderNumber, setOrderNumber] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [cartValue, setCartValue] = useState(0);
    const [discountsVal, setDiscountsVal] = useState(0);
    const [status, setStatus] = useState('');
    const [customer, setCustomer] = useState({});
    const [cart, setCart] = useState([]);
    const [refunded, setRefunded] = useState(0);

    useEffect(() => {

        if (id) {

            setLoading(true);

            axios.get(`/api/order/${id}`, {})
                .then(function (response) {

                    if (response.status === 200) {

                        const order = response.data[0];
                        setOrder(order);
                        setOrderNumber(order.orderNumber);
                        setTimestamp(order.timestamp);
                        setCartValue(order.cartValue);
                        setDiscountsVal(order.discountsVal);
                        setStatus(order.status);
                        setCustomer(order.user);
                        setCart(order.cart);
                        setRefunded(order.refunded);
                        setLoading(false);

                    }
                })
                .catch(function (error) {
                    console.log('Order not found')
                });

        } else {
            navigate(`/admin/orders`);
        }

    }, [id]);

    const cancelOrder = async () => {

        axios.patch(`/api/order/cancel/${id}`, {
            params: {
                status: 'Cancelled',
                userId: customer._id,
                orderNumber: orderNumber,
                cartValue: cartValue
            }
        })
            .then(function (response) {

                console.log(response.data)

                if (response.status === 200) {

                    setStatus(response.data.status);
                    setCart(response.data.cart)
                    setRefunded(response.data.refunded);

                }
            })
            .catch(function (error) {
                console.log('Order not found')
            });

    }

    const issueRefund = async (itemId) => {

        if (cart.length === 1 && cart.quantity === 1) {
            cancelOrder();
        } else {

            axios.patch(`/api/order/refund/item/${id}`, {
                params: {
                    userId: customer._id,
                    orderNumber: orderNumber,
                    itemId: itemId,
                    cartValue: cartValue
                }
            })
                .then(function (response) {

                    if (response.status === 200) {

                        setStatus(response.data.status);
                        setCart(response.data.cart)
                        setRefunded(response.data.refunded);

                    }
                })
                .catch(function (error) {
                    console.log('Order not found')
                });

        }

    }

    return (
        <div className='section p-6'>
            <div className='is-flex'>
                <Menu />
                <EditOrder
                    cartValue={cartValue}
                    discountsVal={discountsVal}
                    cart={cart}
                    issueRefund={issueRefund}
                    cancelOrder={cancelOrder}
                    status={status}
                    customer={customer}
                    orderNumber={orderNumber}
                    timestamp={timestamp}
                    refunded={refunded}
                />
            </div>
        </div>
    );
};

export default AdminOrderPage;