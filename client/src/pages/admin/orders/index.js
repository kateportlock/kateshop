import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import SearchAdmin from '../../../components/forms/SearchAdmin';
import Menu from '../../../components/admin/menu';
import dateFormat from '../../../functions/dateFormat';
import axios from "axios";

const AdminOrdersPage = (props) => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [searchVal, setSearchVal] = useState('');

    const orderColumns = [
        {
            name: 'Order Number',
            selector: row => row.orderNumber,
        },
        {
            name: 'Timestamp',
            selector: row => row.timestamp,
            format: row => {
                return (
                    <p>{dateFormat({ date: row.timestamp, format: 'with time' })}</p>
                )
            }
        },
        {
            name: 'Total paid',
            selector: row => row.cartValue,
            format: row => {
                return (
                    <p>£{row.cartValue.toFixed(2)}</p>
                )
            }
        },
        {
            name: 'Discounts',
            selector: row => row.discountsVal,
            format: row => {
                return (
                    <p>£{row.discountsVal.toFixed(2)}</p>
                )
            }
        },
        {
            name: 'Refunds',
            selector: row => row.refunded,
            format: row => {
                return (
                    <p>£{row.refunded.toFixed(2)}</p>
                )
            }
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Customer',
            selector: row => row.user.email
        },
        {
            name: 'Is registered',
            selector: row => row.user._id ? 'Yes' : 'No'
        },
        {
            name: 'Action',
            width: 'fit-content',
            selector: row => row._id,
            format: row => {
                return (
                    <div className='is-flex is-align-items-center'>
                        <button className="button is-small" onClick={() => viewOrder(row._id)}>View</button>
                    </div>
                )
            }
        },
    ];

    const viewOrder = async (id) => {

        navigate(`/admin/orders/${id}`);

    }

    useEffect(() => {

        axios.get(`/api/orders`, {
        })
            .then(function (response) {

                if (response.status === 200) {

                    const orders = response.data;
                    setOrders(orders);

                }
            })
            .catch(function (error) {
                console.log('Orders list is not found!')
            });

    }, []);

    useEffect(() => {

        if (searchVal) {
            const newArr = orders.filter(item => (item.user.email.toLocaleLowerCase()).indexOf(searchVal.toLocaleLowerCase()) !== -1);
            setCurrentOrders(newArr);
        } else {
            setCurrentOrders(orders);
        }

    }, [searchVal, orders]);

    return (
        <div className='section p-6'>
            <div className='is-flex'>
                <Menu />
                <div className='ml-6 width100'>
                    <SearchAdmin searchVal={searchVal} setSearchVal={setSearchVal} />
                    <DataTable
                        columns={orderColumns}
                        data={currentOrders}
                        pagination={true}
                        paginationPerPage={10}
                        responsive={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminOrdersPage;