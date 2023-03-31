import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menu';
import axios from "axios";
import style from './../../../styles/modules/admin/Layout.module.scss';
import AddDiscount from '../../../components/admin/discounts/add';

const AdminDiscountAddPage = (props) => {

    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountType, setDiscountType] = useState('');
    const [minimumSpend, setMinimumSpend] = useState(30);
    const [isUnique, setIsUnique] = useState('true');
    const [notes, setNotes] = useState('');


    const addDiscount = async () => {

        axios.post(`/api/discounts`, {
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
                console.log("Couldn't add this discount")
            });

    }

    return (
        <div className='section p-6'>
            <div className='is-flex'>
                <Menu />
                <div className={`boxShadow ml-6 is-flex p-6 ${style.displayColumn}`}>
                    <AddDiscount
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
                        addDiscount={addDiscount}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDiscountAddPage;