import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/currentUser";

const Greeting = (props) => {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    useEffect(() => {

        if (Object.keys(currentUser).length === 0) {
            navigate('/account/login')
        }

    }, [])

    return (
        <div className='mb-6 has-text-centered'>
            <p className='has-text-dark is-size-6 has-text-weight-bold mt-3'>Account Summary</p>
            {
                Object.keys(currentUser).length !== 0 && currentUser.name && (
                    <p>Hello, {currentUser.name}!</p>
                )
            }
        </div>
    )
}

export default Greeting;