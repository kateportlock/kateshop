import React from "react";

const Message = ({ message }) => {

    return (
        <div className='m-3'>
            <p className="has-text-danger">{message}</p>
        </div>
    )
}

export default Message;