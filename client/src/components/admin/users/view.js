import style from './../../../styles/modules/admin/Layout.module.scss';
import { useNavigate } from 'react-router-dom';

const ViewUser = ({ name, lastName, email }) => {

    const navigate = useNavigate();

    return (
        <div className={`${style.container} ml-6 width100`}>
            <div className='is-flex'>
                <div>
                    <p className='is-pulled-left is-size-7 is-uppercase'><strong>Name:</strong></p>
                    <input className="input" type="text" placeholder="" value={name} readOnly />
                </div>
                <div className='ml-5'>
                    <p className='is-pulled-left is-size-7 is-uppercase'><strong>Last Name:</strong></p>
                    <input className="input" type="text" placeholder="" value={lastName} readOnly />
                </div>
                <div className='ml-5'>
                    <p className='is-pulled-left is-size-7 is-uppercase'><strong>Email:</strong></p>
                    <input className="input" type="text" placeholder="" value={email} readOnly />
                </div>
            </div>
            <div className='mt-4 widthFitContent'>
                <p className='is-pulled-left is-size-7 is-uppercase'><strong>Role:</strong></p>
                <input className="input" type="text" placeholder="" value={'Admin'} readOnly />
            </div>
            <div className='is-flex is-justify-content-end'>
                <button className="button ml-2" onClick={() => navigate(`/admin/users`)}>Back to all users</button>
            </div>
        </div>
    )
}

export default ViewUser;