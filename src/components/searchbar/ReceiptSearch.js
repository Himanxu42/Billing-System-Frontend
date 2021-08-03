import SearchIcon from '@material-ui/icons/Search'
import './Searchbar.css'
import { useContext,useState } from 'react';
import context from '../../context/create-context';
function ReceiptSearch() {
   
    return (
   
        <form className='searchbarwrapper'>
            <input type="text" placeholder="Search Product..." />
            <button><SearchIcon className='searchicon' /></button>
           </form>

       
    )
}

export default ReceiptSearch
