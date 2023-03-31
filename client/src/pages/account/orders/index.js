import { useState, useEffect, useContext } from 'react'
import { CurrentUserContext } from '../../../contexts/currentUser';
import { useLocation } from 'react-router-dom';
import EmptyHistory from '../../../components/order/EmptyHistory';
import OrderItem from '../../../components/order/OrderItem';
import Pagination from '../../../components/global/Pagination';
import AccountMenu from '../../../components/account/AccountMenu';

const Orders = (props) => {

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    const endOffset = itemOffset + itemsPerPage;
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [pageCount, setPageCount] = useState(Math.ceil(currentUser.orderHistory.length / itemsPerPage));
    const [currentOrders, setCurrentOrders] = useState(currentUser.orderHistory.slice(itemOffset, endOffset));

    const location = useLocation();

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % currentUser.orderHistory.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {

        setCurrentOrders(currentUser.orderHistory.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(currentUser.orderHistory.length / itemsPerPage));

    }, [currentUser.orderHistory, itemOffset, endOffset]);

    return (
        <div>
            <AccountMenu activeTab={location.pathname} />
            <div className='subSection'>
                <div className='is-flex is-flex-direction-column is-align-items-center pb-4 viewHeight'>
                    {
                        currentOrders.length > 0 ? currentOrders.map((order, i) => {
                            return (
                                <OrderItem key={i} order={order} />
                            )
                        }
                        ) : (
                            <EmptyHistory />
                        )
                    }
                    <Pagination handlePageClick={handlePageClick} itemsPerPage={itemsPerPage} pageCount={pageCount} />
                </div>
            </div>
        </div>
    )
}

export default Orders;