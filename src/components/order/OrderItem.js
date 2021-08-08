import SearchIcon from '@material-ui/icons/Search';
import PdfIcon from '@material-ui/icons/PictureAsPdf'
import context from '../../context/create-context';
import { useState,useContext,useEffect } from 'react'
import jsPdf from 'jspdf';
import './order.css';
export default function OrderItem({
    setSearch,
    search,
    history 
}) 
{
    const fetchContext = useContext(context);
   
    const getOrderById = async () => {
        const id = await JSON.parse(localStorage.getItem('login-cred'))._id;
        fetchContext.cache.clear();
        const responseFromBackend = await fetchContext.get(`/order/${id}/${search}`);
        if (fetchContext.response.ok) {
            if (responseFromBackend) {
                const location = {
                    pathname: '/order',
                    state: responseFromBackend
                }
                history.replace(location)
            }
            return;
        }
         alert('Order not Found')
        }
        
      
    

    useEffect(() => {
        
        if (search === '') {
            return;
        }
        getOrderById();
      
    }, [search])
    const generatePdf = () => {
        
        const receipt = document.getElementById('receipt');
        const widhtInPx = parseInt(receipt.getBoundingClientRect().width);
        const heightInPx = parseInt(receipt.getBoundingClientRect().height);
        const widhtInMm = Math.floor(widhtInPx * 0.264583);
        const heightInMm = Math.floor(heightInPx * 0.264583)*2;
        const pdf = new jsPdf('l', 'mm', [heightInMm, widhtInMm]);
        pdf.fromHTML(receipt, 15, 10)
        pdf.save(`order-${history.location.state._id}.pdf`);
        console.log(widhtInPx, heightInPx);
        
   }
    function ReceiptSearch({ setSearch }) {
        const [input, setInput] = useState('');
      
        function handleSubmit(e) {
            e.preventDefault();
            setSearch(input)
       }
        return (
       
            <form className='searchbarwrapper' onSubmit={handleSubmit}>
                <input type="text" placeholder="Order id..." onChange={e=>{setInput(e.target.value)}} />
                <button><SearchIcon className='searchicon' /></button>
               </form>
        )
    }

    function LoadReceiptForm({ state }) {
        if(state===undefined) return null ; 
        return (
            <div>
            <div className='loadreceipt-container' id='receipt'>
                  <div  style={{
                         textAlign: 'center'
                     }}>
                    <span
                        style={{
                            fontFamily: 'Roboto Slab',
                            fontWeight: 'bold',
                            marginBottom: '5px',
                        }}
                    >
                            Order Successful :&nbsp; {state._id}
                        </span>
                    </div>
                {
                  
                     state.orders.map((item) => (
                        <div class='innerItemStyle'>
                             <span
                                 style={{
                                    fontWeight:'bold'
                                }}
                             >{item.item.product_name}</span>
                            
                             {item.item.discounted_mrp
                                ? <span>Price: Rs{item.item.discounted_mrp}</span>
                                 : <span>Price: Rs{item.item.mrp}</span>
                             }
                             <span>
                                 Purchased: {item.select}x
                            </span>
                        </div>
                    ))
                }
                <div
                    style={{
                        textAlign: 'center',
                        fontFamily: 'Raleway',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        marginTop:'10px'
                 }}
                >
                    Total : &nbsp;Rs {state.total}
                 </div>   
                </div>
                <button className='pdfdownload'
                 onClick ={generatePdf}
                >
                    <span className='pdficonn'> <PdfIcon /></span>
                    Download
                </button>
            </div>
        )
    }

    return (
        <div style={{ display:'flex',flexDirection:'column'}}>
            <ReceiptSearch setSearch={setSearch} />
            <LoadReceiptForm state={history.location.state !== undefined ? history.location.state : undefined}/>
        </div>
    )
}
