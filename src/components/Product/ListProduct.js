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
        const user_data = await JSON.parse(localStorage.getItem('login-cred'));
        console.log(user_data._id);
        const Products = await fetchContext.get(`/products/${user_data._id}`);
        console.log(Products)
        setProducts(Products);
    }

    useEffect(() => {
        loadAllProducts();
    }, [])
    //load searched products

    
    useEffect(() => {
        if (fetchContext.selectedState.searched && fetchContext.selectedState.isSearched)
        fetchSearch();
    }, [fetchContext.selectedState.searched,fetchContext.selectedState.isSearched]);

    useEffect(() => {
        const newArray = [...products];
        console.log(fetchContext.selectedState.category);
        setSelectedProducts(newArray.filter(item => item.category.category_name === fetchContext.selectedState.category))
    }, [fetchContext.selectedState.category,fetchContext.selectedState.isCategorySelected]);


    const fetchSearch = async () => {
        const searchedFor = fetchContext.selectedState.searched;
        fetchContext.cache.clear();
        console.log(searchedFor);
        const user_data = await JSON.parse(localStorage.getItem('login-cred'));
        const SearchedProducts = await fetchContext.get(`/products/${searchedFor}/${user_data._id}`);
        console.log(SearchedProducts);
        setSearchedProducts(SearchedProducts);
    }

    const loadProductsForm = () => {
        
        return (  <div className='listwarpper'>
           
            {
                fetchContext.selectedState.isAll ? (<p>Available products</p>) : <p>Results
                    {fetchContext.selectedState.isSearched && <span>for {fetchContext.selectedState.searched}</span>}
                    {fetchContext.selectedState.isCategorySelected && <span>for {fetchContext.selectedState.category }</span>}
                </p>
               
            }

            <div className="loadproduct">
               
           
                
                {
                    fetchContext.selectedState.isAll ?
                        products.length > 0 && products.map(product => (
                            <ProductItem status='all' products={products} setProduct={setProducts} key={product._id} state={product} temp={temp} />
                        )
                    ) : fetchContext.selectedState.isSearched ?
                    
                    searchedProducts.length > 0 && searchedProducts.map(product =>
                       (
                        <ProductItem status='search' products={searchedProducts} setSearchedProducts={setSearchedProducts} key={product._id} state={product} />
                        )
                   )
                    : <></>
                }

                    
                
                {
                    fetchContext.selectedState.isCategorySelected ?
                        (selectedProducts.length > 0 && selectedProducts.map(product =>
                                    (
                                        <ProductItem status='all'  products={products} setProduct={setProducts} key={product._id} state={product} />
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
