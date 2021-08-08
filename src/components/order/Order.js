import Header from "../header/Header";
import InnerNav from "../innernav/InnerNav";
import { useState, useContext } from 'react';
import {useHistory,useLocation} from 'react-router-dom'
import OrderItem from "./OrderItem";
export default function Order() {
    const location = useLocation();
    const history = useHistory();
    console.log(location.state);
    const [search, setSearch] = useState('');
    return ( 
        <div>
            <Header/>
            <InnerNav />
            <OrderItem setSearch={setSearch} history={history} search={search}/>
        </div>
    )
}
