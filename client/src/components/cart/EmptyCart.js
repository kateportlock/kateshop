const EmptyCart = (props) => {

    return (
        <div className={`width50 m-auto pt-6`}>
            <article className="column message is-dark m-3">
                <div className="message-body">
                    Your cart is currently empty
                </div>
            </article>
        </div>
    )
}

export default EmptyCart;