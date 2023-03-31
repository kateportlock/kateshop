import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from '../../../components/admin/menu';
import SlidingPane from "react-sliding-pane";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import "react-sliding-pane/dist/react-sliding-pane.css";
import axios from "axios";
import style from './../../../styles/modules/admin/PreviewSiteMessage.module.scss';
import EditMessage from '../../../components/admin/messages/edit';

const AdminMessagePage = (props) => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({});

    const [type, setType] = useState('info');
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [textColor, setTextColor] = useState('dark');
    const [textPosition, setTextPosition] = useState('left');
    const [textWeight, setTextWeight] = useState('normal');
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState(false);

    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {

        if (id) {

            setLoading(true);

            axios.get(`/api/messages/${id}`, {})
                .then(function (response) {

                    if (response.status === 200) {

                        const message = response.data;
                        setMessage(message);
                        setType(message.type);
                        setBackgroundUrl(message.backgroundUrl);
                        setTextColor(message.textColor);
                        setTextPosition(message.textPosition);
                        setTextWeight(message.textWeight);
                        setContent(message.content);
                        setVisibility(String(message.visibility));
                        setLoading(false);

                    }
                })
                .catch(function (error) {
                    console.log('Site message is not found')
                });

        } else {
            navigate(`/admin/messages`);
        }

    }, [id]);

    const updateMessage = async () => {

        axios.patch(`/api/message/edit/${id}`, {
            params: {
                type: type,
                backgroundUrl: backgroundUrl,
                textColor: textColor,
                textPosition: textPosition,
                textWeight: textWeight,
                content: content,
                visibility: visibility
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    navigate(`/admin/messages`);

                }
            })
            .catch(function (error) {
                console.log('Site message is not found')
            });

    }

    return (
        <div className='section p-6'>
            <SlidingPane
                isOpen={showPreview}
                from="bottom"
                width="100%"
                hideHeader
                className={`${style.previewMessage}`}
                onRequestClose={() => setShowPreview(false)}
            >
                {
                    type === 'custom' ? (
                        <div style={{ background: `url(${backgroundUrl})` }} className={`p-3`}>
                            <p className={`${textWeight === 'bold' ? 'has-text-weight-bold' : ''} ${textColor === 'light' ? 'has-text-white-ter' : 'has-text-grey-darker'} ${textPosition === 'center' ? 'has-text-centered' : (textPosition === 'right' ? 'has-text-right' : '')}`}>{content}</p>
                        </div>
                    ) : (
                        <div className={`${type === 'info' ? 'has-background-warning' : 'has-background-danger'} p-3`}>
                            <p className={`${textWeight === 'bold' ? 'has-text-weight-bold' : ''} ${textColor === 'light' ? 'has-text-white-ter' : 'has-text-grey-darker'} ${textPosition === 'center' ? 'has-text-centered' : (textPosition === 'right' ? 'has-text-right' : '')}`}>{content}</p>
                        </div>
                    )
                }
            </SlidingPane>
            <div className='is-flex'>
                <Menu />
                <div className={`boxShadow ml-6 is-flex p-6 ${style.displayColumn}`}>

                    {
                        loading ? (
                            <p>Loading...</p>
                        ) : (
                            <EditMessage
                                content={content}
                                setContent={setContent}
                                type={type}
                                setType={setType}
                                textColor={textColor}
                                setTextColor={setTextColor}
                                textPosition={textPosition}
                                setTextPosition={setTextPosition}
                                textWeight={textWeight}
                                setTextWeight={setTextWeight}
                                backgroundUrl={backgroundUrl}
                                setBackgroundUrl={setBackgroundUrl}
                                visibility={visibility}
                                setVisibility={setVisibility}
                                setShowPreview={setShowPreview}
                                updateMessage={updateMessage}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminMessagePage;