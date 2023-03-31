const SiteMessage = ({ message }) => {

    return (
        <div className={`${message.type === 'info' ? 'has-background-warning' : 'has-background-danger'} p-3`}>
            <p className={`${message.textColor === 'light' ? 'has-text-white-ter' : 'has-text-grey-darker'} ${message.textPosition === 'center' ? 'has-text-centered' : (message.textPosition === 'right' ? 'has-text-right' : '')}`}>{message.content}</p>
        </div>
    )
}

export default SiteMessage;