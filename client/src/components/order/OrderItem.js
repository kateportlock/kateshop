import { useNavigate } from 'react-router-dom';
import dateFormat from '../../functions/dateFormat';
import TagIcon from '@mui/icons-material/Tag';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const OrderItem = ({ order }) => {

    const navigate = useNavigate();

    return (
        <div key={order.orderNumber} className='width80 is-flex is-justify-content-space-between is-align-items-center m-5'>
            <div className='width20'>
                <div className='is-flex is-justify-content-space-between'>
                    <div className='is-flex p-1'>
                        <TagIcon className='mr-1' />
                        <p><strong>Order</strong></p>
                    </div>
                    <p>{order.orderNumber}</p>
                </div>
                <div className='is-flex is-justify-content-space-between'>
                    <div className='is-flex p-1'>
                        <CalendarMonthIcon className='mr-1' />
                        <p><strong>Order Date</strong></p>
                    </div>
                    <p>{dateFormat({ date: order.timestamp, format: 'short' })}</p>
                </div>
                <div className='is-flex is-justify-content-space-between'>
                    <div className='is-flex p-1'>
                        <LocalAtmIcon className='mr-1' />
                        <p><strong>Total</strong></p>
                    </div>
                    <p>£{order.cartValue.toFixed(2)}</p>
                </div>
            </div>
            <div className='has-text-centered width50'>
                {
                    (order.cart).slice(0, 3).map((item, i) => {
                        return (
                            <img key={i} className='m-2' width='150' src={item.img} alt={`product${item._id}`} />
                        )
                    })
                }
            </div>
            <div className='width30'>
                <button className='button' onClick={() => navigate(`/orders/${order._id}`)}>View Order</button>
            </div>
        </div>
    )
}

export default OrderItem;