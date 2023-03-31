import ProductItem from './ProductItem';
import style from './../../styles/modules/elements/ProductList.module.scss';

const ProductList = ({ currentProducts, addToCart, cart, searchVal }) => {

    return (
        <div className={`${style.productGrid} is-flex is-flex-wrap-wrap is-justify-content-center pt-6`}>
            {
                currentProducts.length > 0 ? currentProducts.map((item) => {
                    return (
                        <ProductItem key={item._id} addToCart={addToCart} cart={cart} item={item} />
                    )
                }) : 
                    searchVal ? (
                        <p>No products found for <strong>{searchVal}</strong></p>
                    ) : (
                        <p>No products found!</p>
                    )
            }
        </div>
    )
}

export default ProductList;