import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Menu from '../../../components/admin/menu';
import axios from "axios";
import style from './../../../styles/modules/admin/Layout.module.scss';
import EditProduct from '../../../components/admin/products/edit';

const AdminProductPage = (props) => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});

    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const [visibility, setVisibility] = useState('');

    useEffect(() => {

        if (id) {

            setLoading(true);

            axios.get(`/api/products/${id}`, {})
                .then(function (response) {

                    if (response.status === 200) {

                        const product = response.data[0];
                        setProduct(product);
                        setImageUrl(product.img);
                        setTitle(product.title);
                        setDescription(product.desc);
                        setPrice(product.price);
                        setTotalStock(product.totalStock);
                        setVisibility(String(product.visibility));
                        setLoading(false);

                    }
                })
                .catch(function (error) {
                    console.log('Product not found')
                });

        } else {
            navigate(`/admin/products`);
        }

    }, [id]);

    const updateProduct = async () => {

        axios.patch(`/api/products/edit/${id}`, {
            params: {
                img: imageUrl,
                title: title,
                desc: description,
                price: Number(price),
                totalStock: Number(totalStock),
                visibility: visibility
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
                <div className={`boxShadow ml-6 is-flex p-6 ${style.displayColumn}`}>
                    {
                        loading ? (
                            <p>Loading...</p>
                        ) : (
                            <EditProduct
                                product={product}
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
                                updateProduct={updateProduct}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminProductPage;