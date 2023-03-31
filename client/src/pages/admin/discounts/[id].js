import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Menu from '../../../components/admin/menu';
import axios from "axios";
import style from './../../../styles/modules/admin/Layout.module.scss';
import EditDiscount from '../../../components/admin/discounts/edit';

const AdminDiscountPage = (props) => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [discount, setDiscount] = useState({});

    const [code, setCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountType, setDiscountType] = useState('');
    const [minimumSpend, setMinimumSpend] = useState(0);
    const [isUnique, setIsUnique] = useState('');
    const [notes, setNotes] = useState('');


    useEffect(() => {

        if (id) {

            setLoading(true);

            axios.get(`/api/discount/${id}`, {})
                .then(function (response) {

                    if (response.status === 200) {

                        const discount = response.data[0];
                        setDiscount(discount);
                        setCode(discount.code);
                        setDiscountAmount(discount.discount);
                        setDiscountType(discount.discountType);
                        setMinimumSpend(discount.minimumSpend);
                        setIsUnique(discount.isUnique);
                        setNotes(discount.notes);
                        setLoading(false);

                    }
                })
                .catch(function (error) {
                    console.log('Discount code not found')
                });

        } else {
            navigate(`/admin/discounts`);
        }

    }, [id]);

    const updateDiscount = async () => {

        axios.patch(`/api/discount/edit/${id}`, {
            params: {
                code: code,
                discountAmount: discountAmount,
                discountType: discountType,
                minimumSpend: minimumSpend,
                isUnique: isUnique,
                notes: notes
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    navigate(`/admin/discounts`);

                }
            })
            .catch(function (error) {
                console.log('Discount code not found')
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
                            <EditDiscount
                                code={code}
                                setCode={setCode}
                                discountAmount={discountAmount}
                                setDiscountAmount={setDiscountAmount}
                                discountType={discountType}
                                setDiscountType={setDiscountType}
                                minimumSpend={minimumSpend}
                                setMinimumSpend={setMinimumSpend}
                                notes={notes}
                                setNotes={setNotes}
                                isUnique={isUnique}
                                setIsUnique={setIsUnique}
                                updateDiscount={updateDiscount}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminDiscountPage;