import './Header.css';
import { useState,useEffect } from 'react';
import { Redirect} from 'react-router-dom'
function Header() {
    const [redirect, setRedirect] = useState(false)
    const [store, setStore] = useState('');
    const grabStoreName = async () => {
        return await JSON.parse(localStorage.getItem('login-cred'));
    }
    useEffect(() => {
        setStore(grabStoreName().store_name);
    }, [])
    return (
        <nav>
           {redirect && <Redirect to='/'/> }  
            <ul>
                <li> <button>Product</button> </li>
            </ul>
            <p>Billing System</p>
            <ul className='end-section-nav ' >
                <li className='hover-btn'> <button>{localStorage.getItem('login-cred') && JSON.parse(localStorage.getItem('login-cred')).store_name}</button> </li>
                <li className='hover-btn'> <button>Bill Generate</button> </li>
                <li className='hover-btn'> <button onClick={e => { localStorage.clear('login-cred'); setRedirect(true) }} >Logout</button> </li>
            </ul>

        </nav>
    )
}

export default Header
