import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderProcessing = (props) => {

    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            navigate('/order/confirmation');
        }, 2000);

    }, [navigate]);

    return (
        <div className='section has-text-centered viewHeight'>
            <p className='is-size-5 mb-4'>Processing your order...</p>
            <div className='m-auto width50'>
                <progress className="progress is-small is-primary" max="100">15%</progress>
            </div>
        </div>
    )
}

export default OrderProcessing;