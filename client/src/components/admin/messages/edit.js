import { useNavigate } from 'react-router-dom';
import style from './../../../styles/modules/admin/PreviewSiteMessage.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const EditMessage = ({ content, setContent, type, setType, textColor, setTextColor, textPosition, setTextPosition, textWeight, setTextWeight, backgroundUrl, setBackgroundUrl, visibility, setVisibility, setShowPreview, updateMessage }) => {

    const navigate = useNavigate();

    return (
        <div className={`${style.container} ml-6 width100`}>
            <div>
                <p className='is-pulled-left is-size-7 is-uppercase mt-4'><strong>Content:</strong></p>
                <textarea className="textarea" placeholder="" onChange={(e) => setContent(e.target.value)}>{content}</textarea>
            </div>
            <div className='is-flex'>
                <div className='is-flex is-flex-direction-column mt-4 widthFitContent'>
                    <p className='is-align-self-flex-start is-size-7 is-uppercase'><strong>Message type:</strong></p>
                    <div className='is-flex is-align-items-center'>
                        <div className="select is-normal">
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value='info'>Info</option>
                                <option value='alert'>Alert</option>
                                <option value='custom'>Custom</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='is-flex'>
                <div className='is-flex is-flex-direction-column mt-4 widthFitContent'>
                    <p className='is-align-self-flex-start is-size-7 is-uppercase'><strong>Text Color:</strong></p>
                    <div className='is-flex is-align-items-center'>
                        <div className="select is-normal">
                            <select value={textColor} onChange={(e) => setTextColor(e.target.value)}>
                                <option value='light'>Light</option>
                                <option value='dark'>Dark</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='is-flex is-flex-direction-column mt-4 ml-6 widthFitContent'>
                    <p className='is-align-self-flex-start is-size-7 is-uppercase'><strong>Text Position:</strong></p>
                    <div className='is-flex is-align-items-center'>
                        <div className="select is-normal">
                            <select value={textPosition} onChange={(e) => setTextPosition(e.target.value)}>
                                <option value='left'>Left</option>
                                <option value='center'>Center</option>
                                <option value='right'>Right</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='is-flex is-flex-direction-column mt-4 ml-6 widthFitContent'>
                    <p className='is-align-self-flex-start is-size-7 is-uppercase'><strong>Text Weight:</strong></p>
                    <div className='is-flex is-align-items-center'>
                        <div className="select is-normal">
                            <select value={textWeight} onChange={(e) => setTextWeight(e.target.value)}>
                                <option value='normal'>Normal</option>
                                <option value='bold'>Bold</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {
                type === 'custom' && (
                    <div className='mt-4'>
                        <p className='is-pulled-left is-size-7 is-uppercase'><strong>Background Url:</strong></p>
                        <input className="input" type="text" placeholder="" value={backgroundUrl} onChange={(e) => setBackgroundUrl(e.target.value)} />
                    </div>
                )
            }
            <div className='is-flex is-flex-direction-column mt-4 widthFitContent'>
                <p className='is-align-self-flex-start is-size-7 is-uppercase'><strong>Visibility:</strong></p>
                <div className='is-flex is-align-items-center'>
                    {
                        visibility === 'true' ? (
                            <VisibilityIcon className='has-text-success' />
                        ) : (
                            <VisibilityOffIcon className='has-text-warning' />
                        )
                    }
                    <div class="select is-normal ml-2">
                        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                            <option value='true'>Visible on website</option>
                            <option value='false'>Hidden from website</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='is-flex is-justify-content-end mt-6'>
                <button className="button" onClick={() => setShowPreview(true)}>Preview</button>
                <button className="button ml-2" onClick={() => updateMessage()}>Save</button>
                <button className="button ml-2" onClick={() => navigate(`/admin/messages`)}>Cancel</button>
            </div>
        </div>
    )
}

export default EditMessage;