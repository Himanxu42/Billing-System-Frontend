import './Header.css';
import { useState,useEffect } from 'react';
import { Redirect,Link} from 'react-router-dom'
function Header() {
    const [redirect, setRedirect] = useState(false)
    const [store, setStore] = useState('');
    
    return (
        <nav>
           {redirect && <Redirect to='/'/> }  
            <ul>
                <li> <Link to='/home'><button>Products</button></Link> </li>
            </ul>
            <p>Billing System</p>
            <ul className='end-section-nav ' >
                <li className='hover-btn'> <button>{localStorage.getItem('login-cred') &&JSON.parse(localStorage.getItem('login-cred')).store_name }</button> </li>
                <li className='hover-btn'> <Link to='/receipt'><button>Sale Product</button></Link> </li>
                <li className='hover-btn'> <button onClick={e => { localStorage.clear('login-cred'); setRedirect(true) }} >Logout</button> </li>
            </ul>

        </nav>
    )
}

export default Header
