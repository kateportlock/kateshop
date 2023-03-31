import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menu';
import axios from "axios";
import AddProduct from '../../../components/admin/products/add';

const AdminProductAddPage = (props) => {

    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const [visibility, setVisibility] = useState('true');


    const addProduct = async () => {

        axios.post(`/api/product`, {
            params: {
                img: imageUrl,
                title: title,
                desc: description,
                price: Number(price),
                totalStock: Number(totalStock),
                visibility: Boolean(visibility)
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    navigate(`/admin/products`);

                }
            })
            .catch(function (error) {
                console.log('Product not found')
            });

    }

    return (
        <div className='section p-6'>
            <div className='is-flex'>
                <Menu />
                <AddProduct
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    price={price}
                    setPrice={setPrice}
                    totalStock={totalStock}
                    setTotalStock={setTotalStock}
                    visibility={visibility}
                    setVisibility={setVisibility}
                    addProduct={addProduct}
                />
            </div>
        </div>
    );
};

export default AdminProductAddPage;