import { useNavigate, useLocation } from 'react-router-dom';
import style from './../../styles/modules/admin/Menu.module.scss';

const Menu = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div>
            <aside className={`${style.leftMenu} "menu has-text-left`}>
                <p className="menu-label">
                    Products
                </p>
                <ul className="menu-list">
                    <li onClick={() => navigate(`/admin/products`)}><a className={currentPath === '/admin/products' ? 'is-active has-background-grey-light' : ''}>View all</a></li>
                    <li onClick={() => navigate(`/admin/products/add`)}><a className={currentPath === '/admin/products/add' ? 'is-active has-background-grey-light' : ''}>Add new</a></li>
                </ul>
                <p className="menu-label">
                    Users
                </p>
                <ul className="menu-list">
                    <li onClick={() => navigate(`/admin/users`)}><a className={currentPath === '/admin/users' ? 'is-active has-background-grey-light' : ''}>View all</a></li>
                </ul>
                <p className="menu-label">
                    Discounts
                </p>
                <ul className="menu-list">
                    <li onClick={() => navigate(`/admin/discounts`)}><a className={currentPath === '/admin/discounts' ? 'is-active has-background-grey-light' : ''}>View all</a></li>
                    <li onClick={() => navigate(`/admin/discounts/add`)}><a className={currentPath === '/admin/discounts/add' ? 'is-active has-background-grey-light' : ''}>Add new</a></li>
                </ul>
                <p className="menu-label">
                    Orders
                </p>
                <ul className="menu-list">
                    <li onClick={() => navigate(`/admin/orders`)}><a className={currentPath === '/admin/orders' ? 'is-active has-background-grey-light' : ''}>View all</a></li>
                </ul>
                <p className="menu-label">
                    Site Messages
                </p>
                <ul className="menu-list">
                    <li onClick={() => navigate(`/admin/messages`)}><a className={currentPath === '/admin/messages' ? 'is-active has-background-grey-light' : ''}>View all</a></li>
                    <li onClick={() => navigate(`/admin/messages/add`)}><a className={currentPath === '/admin/messages/add' ? 'is-active has-background-grey-light' : ''}>Add new</a></li>
                </ul>
            </aside>
        </div>
    )
}

export default Menu;