import { useNavigate } from 'react-router-dom';

const Buttons = ({ clearCart }) => {

    const navigate = useNavigate();

    return (
        <div>
            <div className='is-flex is-justify-content-center mt-6'>
                <button className='button mr-1 is-light' onClick={() => navigate('/')}>Continue shopping</button>
                <button className='button ml-1 is-dark' onClick={() => navigate('/cart/checkout')}>Checkout</button>
            </div>
            <div className='is-flex is-justify-content-end mt-3'>
                <button className='button' onClick={clearCart}>Clear cart</button>
            </div>
        </div>
    )
}

export default Buttons;