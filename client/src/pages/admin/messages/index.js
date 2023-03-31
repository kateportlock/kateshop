import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Menu from '../../../components/admin/menu';
import SearchAdmin from '../../../components/forms/SearchAdmin';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";

const AdminMessagesPage = (props) => {

    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [searchVal, setSearchVal] = useState('');

    const messageColumns = [
        {
            name: 'Type',
            selector: row => row.type,
            width: '150px'
        },
        {
            name: 'Text Color',
            selector: row => row.textColor,
            width: '150px'
        },
        {
            name: 'Text Position',
            selector: row => row.textPosition,
            width: '150px'
        },
        {
            name: 'Text Weight',
            selector: row => row.textPosition,
            width: '150px'
        },
        {
            name: 'Content',
            selector: row => row.content,
            width: '250px'
        },
        {
            name: 'Visibility',
            width: '100px',
            selector: row => row.visibility ? <VisibilityIcon className='has-text-success' /> : <VisibilityOffIcon className='has-text-warning' />,
        },
        {
            name: 'Action',
            width: 'fit-content',
            selector: row => row._id,
            format: row => {
                return (
                    <div className='is-flex is-align-items-center'>
                        <button className="button is-small" onClick={() => viewMessage(row._id)}>View/Edit</button>
                        <button className="button is-small" onClick={() => deleteMessage(row._id)}>Delete</button>
                    </div>
                )
            }
        },
    ];

    const deleteMessage = async (id) => {
        await axios.delete(`/api/messages/delete`, {
            params: {
                id: id
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    setMessages(response.data);

                }
            })
            .catch(function (error) {
                console.log("This message couldn't be deleted")
            });
    }

    const viewMessage = async (id) => {

        navigate(`/admin/messages/${id}`);

    }

    useEffect(() => {

        axios.get(`/api/messages`, {
        })
            .then(function (response) {

                if (response.status === 200) {

                    const messages = response.data;
                    setMessages(messages);

                }
            })
            .catch(function (error) {
                console.log('Message list is not found!')
            });

    }, []);

    useEffect(() => {

        if (searchVal) {
            const newArr = messages.filter(item => (item.content.toLocaleLowerCase()).indexOf(searchVal.toLocaleLowerCase()) !== -1);
            setCurrentMessages(newArr);
        } else {
            setCurrentMessages(messages);
        }

    }, [searchVal, messages]);

    return (
        <div className='section p-6'>
            <div className='is-flex'>
                <Menu />
                <div className='ml-6 width100'>
                    <SearchAdmin searchVal={searchVal} setSearchVal={setSearchVal} />
                    <DataTable
                        columns={messageColumns}
                        data={currentMessages}
                        pagination={true}
                        paginationPerPage={10}
                        responsive={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminMessagesPage;