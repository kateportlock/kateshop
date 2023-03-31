import { useNavigate } from 'react-router-dom';
import style from './../../../styles/modules/admin/Layout.module.scss';

const EditDiscount = ({ code, setCode, discountAmount, setDiscountAmount, discountType, setDiscountType, minimumSpend, setMinimumSpend, notes, setNotes, isUnique, setIsUnique, updateDiscount  }) => {

    const navigate = useNavigate();

    return (
        <div className={`${style.container} ml-6 width100`}>
            <div>
                <p className='is-pulled-left is-size-7 is-uppercase'><strong>Discount code:</strong></p>
                <input className="input" type="text" placeholder="" value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
            <div className='is-flex'>
                <div className='is-flex is-flex-direction-column mt-4 mr-6'>
                    <p className='is-align-self-flex-start is-pulled-left is-size-7 is-uppercase'><strong>Discount amount:</strong></p>
                    <input className={`${style.input} input`} type="number" placeholder="" value={discountAmount} onChange={(e) => setDiscountAmount(e.target.value)} />
                </div>
                <div className='is-flex is-flex-direction-column mt-4 widthFitContent'>
                    <p className='is-align-self-flex-start is-size-7 is-uppercase'><strong>Discount type:</strong></p>
                    <div className='is-flex is-align-items-center'>
                        <div className="select is-normal">
                            <select value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                                <option value='£'>£</option>
                                <option value='%'>%</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='is-flex is-flex-direction-column mt-4 ml-6'>
                    <p className='is-align-self-flex-start is-pulled-left is-size-7 is-uppercase'><strong>Minimum spend:</strong></p>
                    <input className={`${style.input} input`} type="number" placeholder="" value={minimumSpend} onChange={(e) => setMinimumSpend(e.target.value)} />
                </div>
            </div>
            <div>
                <p className='is-pulled-left is-size-7 is-uppercase mt-4'><strong>Internal notes:</strong></p>
                <textarea className="textarea" placeholder="" onChange={(e) => setNotes(e.target.value)}>{notes}</textarea>
            </div>
            <div className='is-flex is-flex-direction-column mt-4 widthFitContent'>
                <p className='is-align-self-flex-start is-size-7 is-uppercase'><strong>Is unique:</strong></p>
                <div className='is-flex is-align-items-center'>
                    <div className="select is-normal">
                        <select value={isUnique} onChange={(e) => setIsUnique(e.target.value)}>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='is-flex is-justify-content-end'>
                <button className="button" onClick={() => updateDiscount()}>Save</button>
                <button className="button ml-2" onClick={() => navigate(`/admin/discounts`)}>Cancel</button>
            </div>
        </div>
    )
}

export default EditDiscount;