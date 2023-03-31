import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import style from './../../styles/modules/elements/Search.module.scss';

const Search = ({ clearSearch, searchVal, setSearchVal }) => {

    return (
        <div className={`${style.searchMain} field is-flex is-justify-content-center is-align-items-center`}>
            <p className="control has-icons-left">
                <input value={searchVal} className="input is-medium searchMain" type="text" placeholder="Search for products" onChange={(e) => setSearchVal(e.target.value)} />
                <span className={`${style.iconSpan} icon is-medium is-left`}>
                    <SearchIcon />
                </span>
            </p>
            {
                searchVal && (
                    <HighlightOffIcon className='ml-2 is-clickable' onClick={() => clearSearch()} />
                )
            }
        </div>
    )
}

export default Search;