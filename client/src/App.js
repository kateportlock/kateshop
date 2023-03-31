import { React, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/cart';
import { CurrentUserProvider } from './contexts/currentUser';
import Navbar from './components/global/Navbar';
import SiteMessage from './components/messages';
import HomePage from './pages';
import NotFoundPage from './pages/404';
import CartPage from './pages/cart';
import OrderPage from './pages/account/orders/[id]';
import Orders from './pages/account/orders';
import OrderConfirmation from './pages/order/confirmation';
import OrderProcessing from './pages/order/processing';
import Details from './pages/account/details';
import Settings from './pages/account/settings';
import Login from './pages/account/login';
import Register from './pages/account/register';
import ProductPage from './pages/products/[id]';
import AdminProductsPage from './pages/admin/products';
import AdminProductPage from './pages/admin/products/[id]';
import AdminProductAddPage from './pages/admin/products/add';
import AdminUsersPage from './pages/admin/users';
import AdminUserPage from './pages/admin/users/[id]';
import AdminUserViewOnlyPage from './pages/admin/users/viewOnly';
import AdminOrdersPage from './pages/admin/orders';
import AdminDiscountsPage from './pages/admin/discounts';
import AdminDiscountPage from './pages/admin/discounts/[id]';
import AdminDiscountAddPage from './pages/admin/discounts/add';
import AdminOrderPage from './pages/admin/orders/[id]';
import AdminMessagesPage from './pages/admin/messages';
import AdminMessagePage from './pages/admin/messages/[id]';
import AdminMessageAddPage from './pages/admin/messages/add';
import './styles/globals/global.scss';
import 'bulma/css/bulma.min.css';
import axios from "axios";

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    axios.get(`/api/messages`, {
    })
      .then(function (response) {

        if (response.status === 200) {

          const messages = response.data.filter(item => item.visibility === true);
          setMessages(messages);

        }
      })
      .catch(function (error) {
        console.log('No active messages')
      });

  }, []);

  return (
    <CurrentUserProvider>
      <CartProvider>
        <div className="App">
          {
            messages.length > 0 && messages.map(message => {
              return (
                <SiteMessage key={message._id} message={message} />
              )
            })
          }
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/cart" element={<CartPage />} />
            <Route exact path="/cart/checkout" element={<CartPage />} />
            <Route exact path="/order/processing" element={<OrderProcessing />} />
            <Route exact path="/order/confirmation" element={<OrderConfirmation />} />
            <Route exact path="/orders/:id" element={<OrderPage />} />
            <Route exact path="/products/:id" element={<ProductPage />} />
            <Route exact path="/account/login" element={<Login />} />
            <Route exact path="/account/register" element={<Register />} />
            <Route exact path="/account/orders" element={<Orders />} />
            <Route exact path="/account/details" element={<Details />} />
            <Route exact path="/account/settings" element={<Settings />} />
            <Route exact path="/admin/products" element={<AdminProductsPage />} />
            <Route exact path="/admin/products/:id" element={<AdminProductPage />} />
            <Route exact path="/admin/products/add" element={<AdminProductAddPage />} />
            <Route exact path="/admin/users" element={<AdminUsersPage />} />
            <Route exact path="/admin/user/:id" element={<AdminUserPage />} />
            <Route exact path="/admin/user/view/:id" element={<AdminUserViewOnlyPage />} />
            <Route exact path="/admin/discounts" element={<AdminDiscountsPage />} />
            <Route exact path="/admin/discounts/add" element={<AdminDiscountAddPage />} />
            <Route exact path="/admin/discounts/:id" element={<AdminDiscountPage />} />
            <Route exact path="/admin/orders" element={<AdminOrdersPage />} />
            <Route exact path="/admin/orders/:id" element={<AdminOrderPage />} />
            <Route exact path="/admin/messages" element={<AdminMessagesPage />} />
            <Route exact path="/admin/messages/add" element={<AdminMessageAddPage />} />
            <Route exact path="/admin/messages/:id" element={<AdminMessagePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </CartProvider>
    </CurrentUserProvider>
  );
}

export default App;