const PromoInput = ({ promoValue, setPromoValue, handleKeyPress, applyPromos }) => {

    return (
        <div className='is-flex is-justify-content-center is-align-items-flex-end'>
            <div className={`width50`}>
                <p className='has-text-left is-size-7 has-text-weight-bold'>Enter Promo Code:</p>
                <input className="input is-outlined" value={promoValue} onChange={(e) => setPromoValue(e.target.value)} type="text" placeholder="" onKeyPress={(e) => handleKeyPress(e)}></input>
            </div>
            <button className='button is-outlined' onClick={() => applyPromos()}>Apply</button>
        </div>
    )
}

export default PromoInput;