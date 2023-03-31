import { useNavigate } from 'react-router-dom';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import style from './../../styles/modules/elements/Slider.module.scss';

const CartSlider = ({ openSlider, setOpenSlider, cart }) => {

    const navigate = useNavigate();

    return (
        <SlidingPane
            className={`${style.cartSlider}`}
            overlayClassName="some-custom-overlay-class"
            isOpen={openSlider}
            onRequestClose={() => {
                setOpenSlider(false);
            }}
        >
            {
                cart.length && cart.map((item, i) => {
                    return (
                        <div key={i} className="is-flex is-justify-content-space-around is-align-items-center m-4">
                            <img className={`${style.cartImg}`} src={item.img} alt={`product${item._id}`} />
                            <div>
                                <p>{item.title}</p>
                                <p><strong>£{item.price.toFixed(2)}</strong></p>
                            </div>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    )
                })
            }
            <div className="mt-6 has-text-centered" onClick={(() => navigate('/cart'))}>
                <button className="button">Checkout</button>
            </div>
        </SlidingPane>
    )
}

export default CartSlider;