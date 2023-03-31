import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import SearchAdmin from '../../../components/forms/SearchAdmin';
import Menu from '../../../components/admin/menu';
import axios from "axios";

const AdminDiscountsPage = (props) => {

    const navigate = useNavigate();

    const [discounts, setDiscounts] = useState([]);
    const [currentDiscounts, setCurrentDiscounts] = useState([]);
    const [searchVal, setSearchVal] = useState('');

    const discountColumns = [
        {
            name: 'Code',
            width: '200px',
            selector: row => row.code,
        },
        {
            name: 'Notes',
            width: '300px',
            selector: row => row.notes,
        },
        {
            name: 'Discount amount',
            width: '200px',
            selector: row => row.discount,
            format: row => {
                return (
                    row.discountType === '£' ? <p>£{row.discount.toFixed(2)}</p> : <p>{row.discount}%</p>
                )
            }
        },
        {
            name: 'Minimum Spend',
            width: '200px',
            selector: row => row.minimumSpend,
            format: row => {
                return (
                    <p>£{row.minimumSpend.toFixed(2)}</p>
                )
            }
        },
        {
            name: 'Is unique',
            width: '200px',
            selector: row => row.isUnique === true ? 'Yes' : 'No',
        },
        {
            name: 'Action',
            width: 'fit-content',
            selector: row => row._id,
            format: row => {
                return (
                    <div className='is-flex is-align-items-center'>
                        <button className="button is-small" onClick={() => viewDiscount(row._id)}>View/Edit</button>
                        <button className="button is-small" onClick={() => deleteDiscount(row._id)}>Delete</button>
                    </div>
                )
            }
        },
    ];

    const deleteDiscount = async (id) => {
        await axios.delete(`/api/discounts/delete`, {
            params: {
                id: id
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    setDiscounts(response.data)

                }
            })
            .catch(function (error) {
                console.log("This product couldn't be deleted")
            });
    }

    const viewDiscount = async (id) => {

        navigate(`/admin/discounts/${id}`);

    }

    useEffect(() => {

        axios.get(`/api/discounts`, {
        })
            .then(function (response) {

                if (response.status === 200) {

                    const discounts = response.data;
                    setDiscounts(discounts);

                }
            })
            .catch(function (error) {
                console.log('User list is not found!')
            });

    }, []);

    useEffect(() => {

        if (searchVal) {
            const newArr = discounts.filter(item => (item.code.toLocaleLowerCase()).indexOf(searchVal.toLocaleLowerCase()) !== -1);
            setCurrentDiscounts(newArr);
        } else {
            setCurrentDiscounts(discounts);
        }

    }, [searchVal, discounts]);

    return (
        <div className='section p-6'>
            <div className='is-flex'>
                <Menu />
                <div className='ml-6 width100'>
                    <SearchAdmin searchVal={searchVal} setSearchVal={setSearchVal} />
                    <DataTable
                        columns={discountColumns}
                        data={currentDiscounts}
                        pagination={true}
                        paginationPerPage={10}
                        responsive={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDiscountsPage;