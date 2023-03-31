import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/currentUser";
import Greeting from "./Greeting";
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const AccountMenu = ({ activeTab }) => {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    useEffect(() => {

        if (Object.keys(currentUser).length === 0) {
            navigate('/account/login')
        }

    }, [])

    return (
        <div>
            <Greeting />
            <div className="tabs is-centered is-boxed mb-0">
                <ul>
                    <li className={activeTab === '/account/orders' ? 'is-active' : ''} onClick={() => navigate('/account/orders')}>
                        <a>
                            <ListIcon className='mr-1' />
                            <span>My orders</span>
                        </a>
                    </li>
                    <li className={activeTab === '/account/details' ? 'is-active' : ''} onClick={() => navigate('/account/details')}>
                        <a>
                            <span className="icon is-small"><ManageAccountsIcon className='mr-1' /></span>
                            <span>My details</span>
                        </a>
                    </li>
                    <li className={activeTab === '/account/settings' ? 'is-active' : ''} onClick={() => navigate('/account/settings')}>
                        <a>
                            <span className="icon is-small"><SettingsIcon className='mr-1' /></span>
                            <span>Account settings</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AccountMenu;