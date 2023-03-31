import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from "../../contexts/cart";
import { CurrentUserContext } from "../../contexts/currentUser";
import Checkout from "./checkout";
import CartItem from "../../components/cart/CartItem";
import PromoInput from "../../components/cart/PromoInput";
import Buttons from "../../components/cart/Buttons";
import DiscountMessage from "../../components/cart/DiscountMessage";
import EmptyCart from "../../components/cart/EmptyCart";
import axios from "axios";
import style from './../../styles/modules/elements/Cart.module.scss';

const CartPage = (props) => {

    const location = useLocation();
    const currentPath = location.pathname;

    const navigate = useNavigate();

    const [currentPromos, setCurrentPromos] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useContext(CartContext);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [usedDiscounts, setUsedDiscounts] = useState([]);
    const [promoMessage, setPromoMessage] = useState({});
    const [promoValue, setPromoValue] = useState('');
    const [cartValue, setCartValue] = useState(0);
    const [discountsVal, setDiscountsVal] = useState(0);
    const [discountedCart, setDiscountedCart] = useState(cart);
    const [refunded, setRefunded] = useState(0);

    useEffect(() => {

        axios.get('/api/discounts', {
        })
            .then(function (response) {

                if (response.status === 200) {
                    setCurrentPromos(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [setCurrentPromos]);

    useEffect(() => {

        axios.get('/api/products', {
        })
            .then(function (response) {

                if (response.status === 200) {
                    setProducts(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [setProducts]);

    useEffect(() => {

        const value = cart.length > 0 && cart.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0);
        setCartValue(value);

    }, [cart]);

    useEffect(() => {

        if (promoValue === '' && Object.keys(promoMessage).length !== 0 && promoMessage.type === 'error') {
            setPromoMessage({});
        }

    }, [promoValue, promoMessage]);

    useEffect(() => {

        if (cart.length > 0 && usedDiscounts.length > 0) {

            const value = cart.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0);
            const allDiscounts = [];
            let newCartVal = value;

            usedDiscounts.map(discount => {

                if (discount.discountType === '%') {
                    const newDiscount = value * discount.discount / 100;

                    const newCart = discountedCart.map(item => item = {...item, price: item.price - (item.price * discount.discount / 100)});
                    setDiscountedCart(newCart);

                    return allDiscounts.push(newDiscount);
                } else {

                    let quantity = 0;

                    for (let i = 0; i < cart.length; i++){
                        quantity += cart[i].quantity 
                    }

                    const newCart = discountedCart.map(item => item = {...item, price: item.price - (discount.discount / quantity)});
                    setDiscountedCart(newCart);

                    return allDiscounts.push(discount.discount)
                }

            })

            newCartVal -= allDiscounts.reduce((a, b) => a + b);
            setDiscountsVal(allDiscounts.reduce((a, b) => a + b));
            setCartValue(newCartVal);

        }

    }, [cart, usedDiscounts]);

    const clearCart = () => {
        setCart([]);
        setPromoMessage({});
        setPromoValue('');
        setUsedDiscounts([]);
        localStorage.removeItem('cartHistory');
    }

    const removeDiscount = (discount) => {
        const value = cart.length > 0 && cart.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0);
        setCartValue(value);
        setUsedDiscounts(usedDiscounts.filter(item => item !== discount));
    }

    const handleKeyPress = (key) => {
        if (key.charCode === 13) {
            applyPromos();
        }
    }

    const applyPromos = () => {

        const successfullyApplied = (code) => {
            setUsedDiscounts([...usedDiscounts, code]);
            setPromoValue('');
        }

        const validCode = currentPromos.find(el => el.code === promoValue);

        if (validCode) {

            if (usedDiscounts.find(el => el.code === promoValue)) {

                setPromoMessage({
                    type: 'error',
                    message: 'This discount has already been applied!'
                })

            } else if ((validCode.isUnique && usedDiscounts.length > 0) || usedDiscounts.some(el => el.isUnique)) {

                setPromoMessage({
                    type: 'error',
                    message: 'This discount cannot be used in conjuction with applied discount!'
                })

            } else if (promoValue && !usedDiscounts.find(el => el.code === promoValue)) {

                if (validCode.minimumSpend <= cartValue) {

                    successfullyApplied(validCode);

                } else {

                    setPromoMessage({
                        type: 'error',
                        message: 'Your cart total is lower than the required minimum spent!'
                    })

                }

            }

        } else {

            setPromoMessage({
                type: 'error',
                message: 'This promo code is not recognised!'
            })

        }

    }

    const placeOrder = (user) => {

        const timestamp = Date.now();

        const newOrder = {
            cart: discountedCart,
            cartValue,
            refunded,
            usedDiscounts,
            discountsVal,
            timestamp,
            orderNumber: `123${Math.floor(Math.random() * 90000) + 10000}`,
            status: 'Placed',
            user: Object.keys(currentUser).length !== 0 ? currentUser : user
        }

        axios.post('/api/orders', {
            params: {
                newOrder: newOrder,
                userType: Object.keys(currentUser).length !== 0 ? 'registered' : 'guest'
            }
        })
            .then(function (response) {

                if (response.data._id) {
                    localStorage.setItem('loggedUser', JSON.stringify(response.data));
                    setCurrentUser(response.data);
                }
                localStorage.removeItem('cartHistory');
                clearCart();
                navigate('/order/processing');

            })
            .catch(function (error) {
                console.log(error);
            });


    }

    return (
        <div>
            {
                currentPath === '/cart/checkout' ? (
                    <Checkout placeOrder={placeOrder} cartValue={cartValue} />
                ) : (
                    <div className='viewHeight'>
                        {cart.length > 0 ? (
                            <div className={`${style.cart}`}>
                                {
                                    cart.map((item) => {

                                        return (
                                            <CartItem key={item._id} item={item} usedDiscounts={usedDiscounts} />
                                        )
                                    })
                                }
                                <div className='mt-5 mb-6 has-text-centered'>
                                    <p>Cart total: <strong>£{cartValue.toFixed(2)}</strong></p>
                                </div>
                                <PromoInput promoValue={promoValue} setPromoValue={setPromoValue} handleKeyPress={handleKeyPress} applyPromos={applyPromos} />
                                <DiscountMessage promoMessage={promoMessage} usedDiscounts={usedDiscounts} removeDiscount={removeDiscount} />
                                <Buttons clearCart={clearCart} cartValue={cartValue} placeOrder={placeOrder} />
                            </div>
                        ) : (
                            <EmptyCart />
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default CartPage;