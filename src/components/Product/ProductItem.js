import { InformationCircleIcon } from '@heroicons/react/solid'
function ProductItem({state}) {
    return (
        <div className="productItemwrapper">
            <div> <span className='sno'> </span>{state.product_name}</div>
            <div className='sellingdetail'>
                <span> Stock: {state.stock}</span>
                {state.discount!==0 ? (<span>
                    MRP: {state.discounted_mrp}<span>({state.discount}%)</span>
                </span>) :
                 <span>MRP: {state.mrp}rs</span>
                }
               
            </div>
            <div className='btnwrapper'>
                <button>Info</button>
                <button>Edit</button>
                <button>Delete</button>

            </div>
        </div>
    )
}

export default ProductItem
