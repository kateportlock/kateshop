import { useNavigate } from 'react-router-dom';
import style from './../../styles/modules/elements/ProductCard.module.scss';

const ProductItem = ({ cart, item, addToCart }) => {

    const navigate = useNavigate();

    return (
        <div key={item._id} className={`boxShadow ${style.productCard}`}>
            <img className='is-clickable is-flex m-auto' src={item.img} alt={`product${item._id}`} onClick={() => navigate(`/products/${item._id}`)}/>
            <div className="p-5">
                <p className='mt-2 mb-2 has-text-centered is-uppercase'><strong>{item.title}</strong></p>
                <p className={`${style.productDesc}`}>{item.desc}</p>
                <div className='is-flex is-justify-content-space-between mt-4 is-align-items-center'>
                    <p>£{item.price.toFixed(2)}</p>
                    {
                        cart.find(el => el._id === item._id) && cart.find(el => el._id === item._id).quantity >= item.totalStock ? (
                            <p className='button is-warning' disabled>Out of stock</p>
                        ) : (
                            <p className='button is-warning' onClick={() => addToCart(item)}>Add to cart</p>
                        )
                    }
                </div>
                {
                    item.totalStock <= 3 && !(cart.find(el => el._id === item._id) && cart.find(el => el._id === item._id).quantity >= item.totalStock) && (
                        <p className='is-size-7 has-text-danger is-flex is-flex-direction-column is-align-items-baseline'>Only {item.totalStock} {item.totalStock === 1 ? 'item' : 'items'} left in stock</p>
                    )
                }
            </div>
        </div>

    )
}

export default ProductItem;