import { useNavigate } from 'react-router-dom';
import style from './../../../styles/modules/admin/Layout.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const EditProduct = ({ product, imageUrl, setImageUrl, title, setTitle, description, setDescription, price, setPrice, totalStock, setTotalStock, visibility, setVisibility, updateProduct }) => {

    const navigate = useNavigate();

    return (
        <div className='is-flex width100'>
            <div className="mr-6">
                <div className='is-flex is-flex-direction-column'>
                    <p className='is-size-7 is-uppercase is-align-self-flex-start'><strong>Image preview:</strong></p>
                    <img className={`${style.image}`} src={imageUrl ? imageUrl : 'https://teddytennis.com/cyprus/wp-content/uploads/sites/76/2017/11/placeholder.png'} alt={`product${product._id}`} />
                </div>
                <div>
                    <p className='is-pulled-left is-size-7 is-uppercase mt-4'><strong>Image url:</strong></p>
                    <input className="input" type="text" placeholder="" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
            </div>
            <div className={`${style.container} ml-6 width100`}>
                <div>
                    <p className='is-pulled-left is-size-7 is-uppercase'><strong>Title:</strong></p>
                    <input className="input" type="text" placeholder="" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <p className='is-pulled-left is-size-7 is-uppercase mt-4'><strong>Description:</strong></p>
                    <textarea className="textarea" placeholder="" onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
                </div>
                <div className='is-flex'>
                    <div className='is-flex is-flex-direction-column mt-4'>
                        <p className='is-align-self-flex-start is-pulled-left is-size-7 is-uppercase'><strong>Price:</strong></p>
                        <input className={`${style.input} input`} type="number" placeholder="" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className='is-flex is-flex-direction-column ml-6 mt-4'>
                        <p className='is-align-self-flex-start is-pulled-left is-size-7 is-uppercase'><strong>Total Stock:</strong></p>
                        <input className={`${style.input} input`} type="number" placeholder="" value={totalStock} onChange={(e) => setTotalStock(e.target.value)} />
                    </div>
                </div>
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
                        <div className="select is-normal ml-2">
                            <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                                <option value='true'>Published</option>
                                <option value='false'>Hidden</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='is-flex is-justify-content-end'>
                    <button className="button" onClick={() => updateProduct()}>Save</button>
                    <button className="button ml-2" onClick={() => navigate(`/admin/products`)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;