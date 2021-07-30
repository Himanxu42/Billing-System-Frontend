import ProductItem from "./ProductItem";
import { useContext,useEffect,useState } from 'react';
import context from '../../context/create-context';

function ListProduct() {
    const fetchContext = useContext(context);
    const [products, setProducts] = useState([]);
    const [temp, settemp] = useState('')
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const loadAllProducts = async () => {
        const Products = await fetchContext.get('/products');
        setProducts(Products);
    }

    useEffect(() => {
        loadAllProducts();
    }, [])
    //load searched products

    
    useEffect(() => {
        console.log('dd')
        fetchSearch();
    }, [fetchContext.selectedState.searched]);

    useEffect(() => {
        const newArray = products;
        console.log(fetchContext.selectedState.category);
        setSelectedProducts(newArray.filter(item => item.category.category_name === fetchContext.selectedState.category))
    }, [fetchContext.selectedState.category]);


    const fetchSearch = async () => {
        const searchedFor = fetchContext.selectedState.searched;
        fetchContext.cache.clear();
        console.log(searchedFor);
        const SearchedProducts = await fetchContext.get(`/products/${searchedFor}`);
        setSearchedProducts(SearchedProducts);
    }

    const loadProductsForm = () => {
        
        return (  <div className='listwarpper'>
           
            {
                fetchContext.selectedState.isAll ? (<p>Available products</p>): (<p>Searched for {fetchContext.selectedState.searched}</p>) 
               
            }

            <div className="loadproduct">
               
           
                
                {
                    fetchContext.selectedState.isAll ?
                        products.length > 0 && products.map(product => (
                            <ProductItem key={product._id} state={product} temp={temp} />
                        )
                    ) : fetchContext.selectedState.isSearched ?
                    
                    searchedProducts.length > 0 && searchedProducts.map(product =>
                       (
                            <ProductItem key={product._id} state={product} />
                        )
                   )
                    : <></>
                }

                    
                
                {
                    fetchContext.selectedState.isCategorySelected ?
                        (selectedProducts.length > 0 && selectedProducts.map(product =>
                                    (
                                        <ProductItem key={product._id} state={product} />
                                    )
                                )
                            ):<></>
                 }
     
           </div>
    </div>)
    
    }
    
  

    
    return (
        <>
           
            {loadProductsForm()}
        </>
    )
}

export default ListProduct
