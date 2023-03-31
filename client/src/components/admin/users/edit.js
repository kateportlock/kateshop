import style from './../../../styles/modules/admin/Layout.module.scss';
import dateFormat from './../../../functions/dateFormat';
import { useNavigate } from 'react-router-dom';


const EditUser = ({ name, setName, lastName, setLastName, email, setEmail, role, setRole, orderHistory, currentUser, updateUser }) => {

    const navigate = useNavigate();

    return (
        <div className={`${style.container} ml-6 width100`}>
            <div className='is-flex'>
                <div>
                    <p className='is-pulled-left is-size-7 is-uppercase'><strong>Name:</strong></p>
                    <input className="input" type="text" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='ml-5'>
                    <p className='is-pulled-left is-size-7 is-uppercase'><strong>Last Name:</strong></p>
                    <input className="input" type="text" placeholder="" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='ml-5'>
                    <p className='is-pulled-left is-size-7 is-uppercase'><strong>Email:</strong></p>
                    <input className="input" type="text" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div className='is-flex is-flex-direction-column mt-4 widthFitContent'>
                <p className='is-align-self-flex-start is-size-7 is-uppercase'><strong>Role:</strong></p>
                <div className='is-flex is-align-items-center'>
                    <div className="select is-normal">
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value='user'>User</option>
                            <option value='staff'>Staff</option>
                            {
                                currentUser.role === 'admin' && (
                                    <option value='admin'>Admin</option>
                                )
                            }
                        </select>
                    </div>
                </div>
            </div>
            <p className='is-pulled-left is-size-7 is-uppercase mt-4'><strong>Order History:</strong></p>
            {
                orderHistory.length ? (
                    orderHistory.map((order, i) => {
                        return (
                            <div>
                                <div key={order.orderNumber} className='is-flex is-justify-content-space-between is-align-items-center m-5 width100'>
                                    <div className='is-flex'>
                                        <div className='p-1'>
                                            <p className='is-pulled-left is-size-7 is-uppercase'><strong>Order Number:</strong></p>
                                            <p>{order.orderNumber}</p>
                                        </div>
                                        <div className='p-1'>
                                            <p className='is-pulled-left is-size-7 is-uppercase'><strong>Order Date:</strong></p>
                                            <p>{dateFormat({ date: order.timestamp, format: 'short' })}</p>
                                        </div>
                                        <div className='p-1'>
                                            <p className='is-pulled-left is-size-7 is-uppercase'><strong>Total:</strong></p>
                                            <p>£{order.cartValue.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className='width50'>
                                        {
                                            (order.cart).slice(0, 3).map((item, i) => {
                                                return (
                                                    <img key={i} className='m-2' width='50' src={item.img} alt={`product${item._id}`} />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='width25'>
                                        <button className='button is-small' onClick={() => navigate(`/admin/orders/${order._id}`)}>View/Edit</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className='mt-6'>
                        This user hasn't placed any orders yet
                    </div>
                )
            }
            <div className='is-flex is-justify-content-end'>
                <button className="button" onClick={() => updateUser()}>Save</button>
                <button className="button ml-2" onClick={() => navigate(`/admin/users`)}>Cancel</button>
            </div>
        </div>
    )
}

export default EditUser;