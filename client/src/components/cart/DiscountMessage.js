import ClearIcon from '@mui/icons-material/Clear';

const DiscountMessage = ({ promoMessage, usedDiscounts, removeDiscount }) => {

    return (
        <div>
            {
                promoMessage && Object.keys(promoMessage).length !== 0 && (
                    <div className='is-flex is-justify-content-center is-align-items-center'>
                        <p className='m-3 messageError'>{promoMessage.message}</p>
                    </div>
                )
            }
            {
                usedDiscounts && Object.keys(usedDiscounts).length !== 0 && usedDiscounts.map((discount, i) => (
                    <div key={i} className='is-flex is-justify-content-center is-align-items-center'>
                        <p className={`messageSuccess m-3`}>Successfully applied <strong>{discount.code}</strong>!</p>
                        <ClearIcon className='is-clickable has-text-danger' onClick={() => removeDiscount(discount)} />
                    </div>
                ))
            }
        </div>
    )
}

export default DiscountMessage;