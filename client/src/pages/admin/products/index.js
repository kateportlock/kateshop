import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Menu from '../../../components/admin/menu';
import SearchAdmin from '../../../components/forms/SearchAdmin';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from "axios";

const AdminProductsPage = (props) => {

    const navigate = useNavigate();

    const [stock, setStock] = useState([]);
    const [currentStock, setCurrentStock] = useState(stock);
    const [searchVal, setSearchVal] = useState('');

    const stockColumns = [
        {
            name: '',
            selector: row => row.img,
            width: '100px',
            format: (row) => {
                return (
                    <img onError={e => { e.currentTarget.src = 'https://teddytennis.com/cyprus/wp-content/uploads/sites/76/2017/11/placeholder.png' }}
                        style={{ width: '50px' }}
                        src={row.img}
                        alt={`product${row._id}`}
                    />
                )
            }
        },
        {
            name: 'Title',
            selector: row => row.title,
            width: '200px',
            wrap: true
        },
        {
            name: 'Description',
            selector: row => row.desc,
            width: '290px'
        },
        {
            name: 'Price',
            selector: row => row.price,
            width: '150px',
            format: row => {
                return (
                    <p>£{row.price.toFixed(2)}</p>
                )
            }
        },
        {
            name: 'Total in stock',
            selector: row => row.totalStock,
            width: '120px',
        },
        {
            name: 'Visibility',
            width: '100px',
            selector: row => row.visibility ? <VisibilityIcon className='has-text-success' /> : <VisibilityOffIcon className='has-text-warning' />,
        },
        {
            name: 'Action',
            width: 'fit-content',
            selector: row => row._id,
            format: row => {
                return (
                    <div className='is-flex is-align-items-center'>
                        <button className="button is-small" onClick={() => viewProduct(row._id)}>View/Edit</button>
                        <button className="button is-small" onClick={() => deleteProduct(row._id)}>Delete</button>
                        <button className="button is-small" onClick={() => cloneProduct(row._id)}>Clone</button>
                        <div className='is-flex is-flex-direction-column ml-3'>
                            {
                                row.index !== 0 && (
                                    <ArrowDropUpIcon className="has-text-grey is-clickable is-size-3" onClick={() => updateIndex(row._id, row.index, 'up')} />
                                )
                            }
                            {
                                row.index !== stock.length - 1 && (
                                    <ArrowDropDownIcon className="has-text-grey is-clickable is-size-3" onClick={() => updateIndex(row._id, row.index, 'down')} />
                                )
                            }
                        </div>
                    </div>
                )
            }
        },
    ];

    const cloneProduct = async (id) => {
        await axios.patch(`/api/products/clone/id`, {
            params: {
                id: id
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    navigate(`/admin/products/${response.data}`);

                }
            })
            .catch(function (error) {
                console.log("This product couldn't be cloned")
            });
    }

    const deleteProduct = async (id) => {
        await axios.delete(`/api/products/delete`, {
            params: {
                id: id
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    setStock(response.data)

                }
            })
            .catch(function (error) {
                console.log("This product couldn't be deleted")
            });
    }

    const viewProduct = (id) => {

        navigate(`/admin/products/${id}`);

    }

    const updateIndex = async (id, index, direction) => {

        await axios.patch(`/api/products/index/${id}`, {
            params: {
                id: id,
                index: index,
                direction: direction
            }
        })
            .then(function (response) {

                if (response.data) {
                    const stock = response.data.sort((a, b) => a['index'] - b['index'])
                    setStock(stock)
                }

            })
            .catch(function (error) {
                console.log('Cant update index of this product')
            });

    }

    useEffect(() => {

        axios.get(`/api/products`, {
            params: {
                type: 'admin'
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    const stock = response.data;
                    stock.sort((a, b) => a['index'] - b['index'])
                    setStock(stock);

                }
            })
            .catch(function (error) {
                console.log('User list is not found')
            });

    }, []);

    useEffect(() => {

        if (searchVal) {
            const newArr = stock.filter(item => (item.title.toLocaleLowerCase()).indexOf(searchVal.toLocaleLowerCase()) !== -1);
            setCurrentStock(newArr);
        } else {
            setCurrentStock(stock);
        }

    }, [searchVal, stock]);

    return (
        <div className='section p-6'>
            <div className='is-flex'>
                <Menu />
                <div className='ml-6 width100'>
                    <SearchAdmin searchVal={searchVal} setSearchVal={setSearchVal} />
                    <DataTable
                        columns={stockColumns}
                        data={currentStock}
                        pagination={true}
                        paginationPerPage={10}
                        responsive={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminProductsPage;