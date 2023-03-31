import { useContext } from "react";
import { CartContext } from "../../contexts/cart";
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import style from './../../styles/modules/elements/Cart.module.scss';

const CartItem = ({ item, usedDiscounts }) => {

    const [cart, setCart] = useContext(CartContext);

    const navigate = useNavigate();

    const changeQuantity = (item, operation) => {

        let newArr = [];

        if (operation === 'add') {
            newArr = cart.map(el => el._id === item._id ? (el.quantity === el.totalStock ? el : { ...el, quantity: el.quantity += 1 }) : el);
        } else {
            newArr = cart.map(el => el._id === item._id ? (el.quantity === 1 ? { ...el, quantity: 1 } : { ...el, quantity: el.quantity -= 1 }) : el);
        }

        setCart(newArr);
        localStorage.setItem('cartHistory', JSON.stringify(newArr));

    }

    const deleteCartItem = (item) => {
        const newArr = cart.filter(el => el._id !== item._id);
        setCart(newArr);
        localStorage.setItem('cartHistory', JSON.stringify(newArr));
    }

    return (
        <div key={item._id} className={`${style.cartCard} is-flex is-justify-content-space-between mb-2 is-align-items-center`}>
            <img className='is-clickable' src={item.img} alt={`product${item._id}`} onClick={() => navigate(`/products/${item._id}`)} />
            <p className='ml-3'>{item.title}</p>
            <p><span className={usedDiscounts.length > 0 ? style.discountedPrice : ''}>£{item.price.toFixed(2)}</span></p>
            <div>
                <p>Quantity: <strong>{item.quantity}</strong></p>
                {
                    item.totalStock <= 3 && (
                        <p className='is-size-7 has-text-danger is-flex is-flex-direction-column is-align-items-baseline'>Only {item.totalStock} {item.totalStock === 1 ? 'item' : 'items'} left in stock</p>
                    )
                }
            </div>
            <AddIcon className='is-clickable' onClick={() => changeQuantity(item, 'add')} />
            <RemoveIcon className='is-clickable' onClick={() => changeQuantity(item, 'reduce')} />
            <DeleteForeverIcon className='is-clickable' onClick={() => deleteCartItem(item)} />
        </div>
    )
}

export default CartItem;