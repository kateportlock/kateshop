import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../contexts/cart';
import CartSlider from '../../components/cart/CartSlider';
import axios from "axios";
import style from './../../styles/modules/page/Product.module.scss';

const ProductPage = (props) => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({});
    const [cart, setCart] = useContext(CartContext);
    const [openSlider, setOpenSlider] = useState(false);

    useEffect(() => {

        axios.get(`/api/products/${id}`, {
        })
            .then(function (response) {

                if (response.status === 200) {

                    setProduct(response.data[0]);
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    const addToCart = () => {

        const newArr = [...cart];
        const existingItem = cart.find(el => el._id === product._id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            newArr.push({ ...product, quantity: 1 });
        }

        setOpenSlider(true);
        setCart(newArr);
        localStorage.setItem('cartHistory', JSON.stringify(newArr));

    }

    return (
        <div className={`section m-auto viewHeight ${style.productContainer}`}>
            <CartSlider openSlider={openSlider} setOpenSlider={setOpenSlider} cart={cart} />
            {
                Object.keys(product).length !== 0 && (
                    <div>
                        <button className='button mb-6' onClick={() => navigate('/')}>Back to all products</button>
                        <div className={`boxShadow is-flex p-6 is-justify-content-center seconderyBg`}>
                            <img className={`${style.image}`} src={product.img} alt={`product${product._id}`} />
                            <div className='ml-6 width50'>
                                <p className='mb-4'><strong>{product.title}</strong></p>
                                <p>{product.desc}</p>
                                <p className='mt-6 is-flex is-justify-content-end'><strong>£{product.price.toFixed(2)}</strong></p>
                                {
                                    cart.find(el => el._id === product._id) && cart.find(el => el._id === product._id).quantity >= product.totalStock ? (
                                        <p className='button is-warning' disabled>Out of stock</p>
                                    ) : (
                                        <button className='button is-warning' onClick={() => addToCart()}>Add to cart</button>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductPage;