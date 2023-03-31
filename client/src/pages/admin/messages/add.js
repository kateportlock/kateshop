import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../components/admin/menu';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import axios from "axios";
import style from './../../../styles/modules/admin/PreviewSiteMessage.module.scss';
import AddMessage from '../../../components/admin/messages/add';

const AdminMessageAddPage = (props) => {

    const navigate = useNavigate();

    const [type, setType] = useState('info');
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [textColor, setTextColor] = useState('dark');
    const [textPosition, setTextPosition] = useState('left');
    const [textWeight, setTextWeight] = useState('normal');
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState(false);

    const [showPreview, setShowPreview] = useState(false);

    const addMessage = async () => {

        axios.post(`/api/messages`, {
            params: {
                type: type,
                backgroundUrl: backgroundUrl,
                textColor: textColor,
                textPosition: textPosition,
                textWeight: textWeight,
                content: content,
                visibility: Boolean(visibility)
            }
        })
            .then(function (response) {

                if (response.status === 200) {

                    navigate(`/admin/messages`);

                }
            })
            .catch(function (error) {
                console.log("Couldn't add this message")
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
                <AddMessage
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
                    addMessage={addMessage}
                />
            </div>
        </div>
    );
};

export default AdminMessageAddPage;