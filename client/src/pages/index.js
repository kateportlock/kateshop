import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../contexts/cart';
import ProductList from '../components/products/ProductList';
import Pagination from '../components/global/Pagination';
import Search from '../components/forms/Search';
import CartSlider from '../components/cart/CartSlider';
import axios from "axios";

const HomePage = (props) => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useContext(CartContext);
    const [searchVal, setSearchVal] = useState('');
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 12;
    const endOffset = itemOffset + itemsPerPage;
    const [pageCount, setPageCount] = useState(Math.ceil(products.length / itemsPerPage));
    const [currentProducts, setCurrentProducts] = useState(products.slice(itemOffset, endOffset));
    const [curPage, setCurPage] = useState(null);
    const [openSlider, setOpenSlider] = useState(false);

    useEffect(() => {

        axios.get('/api/products', {
        })
            .then(function (response) {

                if (response.status === 200) {
                    const data = response.data.sort((a, b) => a['index'] - b['index'])
                    setProducts(data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [setProducts]);

    useEffect(() => {

        const newArr = products.filter(item => (item.title.toLocaleLowerCase()).indexOf(searchVal.toLocaleLowerCase()) !== -1).filter(item => item.totalStock > 0);
        setCurrentProducts(newArr.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(newArr.length / itemsPerPage));
        setCurPage((endOffset / itemsPerPage) - 1);

    }, [searchVal, products, itemOffset, endOffset]);


    useEffect(() => {

        if (searchVal) {
            setCurPage(0);
            setItemOffset(0);
        }

    }, [searchVal]);

    const addToCart = (item) => {

        const newArr = [...cart];
        const existingItem = cart.find(el => el._id === item._id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            newArr.push({ ...item, quantity: 1 });
        }

        setOpenSlider(true);
        setCart(newArr);
        localStorage.setItem('cartHistory', JSON.stringify(newArr));

    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    const clearSearch = () => {
        setSearchVal('');
        setCurPage(0);
        setItemOffset(0);
    }

    return (
        <div className="wave-container">
            <div className='section'>
                <CartSlider openSlider={openSlider} setOpenSlider={setOpenSlider} cart={cart} />
                <Search clearSearch={clearSearch} searchVal={searchVal} setSearchVal={setSearchVal} />
                <ProductList currentProducts={currentProducts} addToCart={addToCart} cart={cart} searchVal={searchVal} />
                <Pagination handlePageClick={handlePageClick} itemsPerPage={itemsPerPage} pageCount={pageCount} curPage={curPage} />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F3F4F5" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
    );
};

export default HomePage;