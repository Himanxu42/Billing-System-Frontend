import './innernav.css'
function InnerNav() {
    return (
        <div style={{
            display: 'flex',
            marginTop: '10px',
            justifyContent:'space-evenly'
        }}>
            <button className='btninnernav'>Receipt</button>
            <button className='btninnernav'>Orders</button>
        </div>
    )
}

export default InnerNav
