import style from './../../../styles/modules/admin/Layout.module.scss';
import dateFormat from '../../../functions/dateFormat';

const EditOrder = ({ cartValue, discountsVal, cart, issueRefund, cancelOrder, status, customer, orderNumber, timestamp, refunded }) => {


    return (
        <div className={`boxShadow ml-6 is-flex p-6 ${style.displayColumn}`}>
            <div className='is-flex width100'>
                <div className='mb-6 mt-3 is-flex is-flex-direction-column is-align-items-start'>
                    <div className='is-flex p-1'>
                        <p><strong>Order Summary:</strong></p>
                    </div>
                    <div className='is-flex p-1'>
                        <p><strong>Subtotal:</strong> £{(cartValue + discountsVal).toFixed(2)}</p>
                    </div>
                    <div className='is-flex p-1'>
                        <p><strong>Discounts:</strong> {discountsVal !== 0 && '-'}£{discountsVal.toFixed(2)}</p>
                    </div>
                    <div className='is-flex p-1'>
                        <p><strong>Grant Total: £{cartValue.toFixed(2)}</strong></p>
                    </div>
                    {
                        (status === 'Cancelled' || status === 'Partially refunded' || status === 'Refunded') && (
                            <div className='is-flex p-1 mt-4'>
                                <p className='has-text-danger'>Total Refunded: £{refunded.toFixed(2)}</p>
                            </div>
                        )
                    }
                    <p className='mt-4'><strong>Order items:</strong></p>
                    <div className='mt-3'>
                        {
                            cart.map(item => {
                                return (
                                    <div key={item._id} className='is-flex is-justify-content-space-between is-align-items-center mb-5'>
                                        <img className='m-2' width='50' src={item.img} alt={`product${item._id}`} />
                                        <p className='ml-3'>{item.title}</p>
                                        <p className='ml-4'><strong>Price:</strong> £{item.price.toFixed(2)}</p>
                                        <p className='ml-4'><strong>Quantity:</strong> {item.quantity}</p>
                                        {
                                            (status === 'Cancelled' || item.refunded) && (
                                                <p className='ml-4 has-text-danger'>Refunded: {item.refunded} out of {item.quantity}</p>
                                            )
                                        }
                                        {
                                            ((item.refunded < item.quantity) || !item.refunded) && status !== 'Cancelled' && (
                                                <button className='button is-small ml-4' onClick={() => issueRefund(item._id)}>Refund Item</button>  
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        (status === 'Placed' || status === 'Partially refunded') && <button className='button is-danger' onClick={() => cancelOrder()}>Cancel order</button>
                    }
                </div>
                <div className='mb-6 mt-3 is-flex is-flex-direction-column is-align-items-start ml-6'>
                    <div className='is-flex p-1'>
                        <p><strong>Order Number:</strong> {orderNumber}</p>
                    </div>
                    <div className='is-flex p-1'>
                        <p><strong>Order Date:</strong> {dateFormat({ date: timestamp, format: 'long' })}</p>
                    </div>
                    <div className='is-flex p-1'>
                        <p><strong>Order Status: </strong><span className={(status === 'Cancelled' || status === 'Refunded') ? 'has-text-danger is-italic' : ((status === 'Partially refunded') ? 'has-text-warning is-italic' : 'has-text-success is-italic')}>{status}</span></p>
                    </div>
                </div>
                <div className='mb-6 mt-3 is-flex is-flex-direction-column ml-6'>
                    <div className='is-flex p-1'>
                        <p><strong>Customer information: </strong></p>
                    </div>
                    <div className='is-flex p-1'>
                        <p><strong>Name: </strong>{customer.name}</p>
                        <p className='ml-4'><strong>Last Name: </strong>{customer.lastName}</p>
                    </div>
                    <div className='is-flex p-1'>
                        <p><strong>Email: </strong>{customer.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOrder;