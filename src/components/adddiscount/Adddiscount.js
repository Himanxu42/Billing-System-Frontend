import Header from "../header/Header";
import ProductSidebar from "../Product/ProductSidebar";
import Searchbar from "../searchbar/Searchbar";
import './adddiscount.css'
import AddDiscountList from "./AddDiscountList";
import { useContext, useState, useEffect } from 'react'
import FetchContext from '../../context/create-context';
import Select from 'react-select';
function Adddiscount() {
    const fetchContext = useContext(FetchContext);
    const [category, setCategory] = useState([]);
    const [options, setoptions] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const retrieveCategory = async () => {

        const categories = await fetchContext.get('/categories');
        setCategory(categories)
    }

    const loadAllProducts = async () => {
        const Products = await fetchContext.get('/products');
        setProducts(Products);
    }
    useEffect(() => {
        retrieveCategory();
        loadAllProducts();
    }, [])
    //use effect to load options into select element
    useEffect(() => {
        const newArray = []
        newArray.push({
            value: {
            category_name:'All Product' 
            },
            label:'All Product'
        })
        category && category.forEach(item => {
            let newObject = { value: item, label: item.category_name }
            newArray.push(newObject)
        })
        setoptions(newArray);
    }, [category])
    
    //useEffect to search from searchbar 
    useEffect(() => {
        fetchSearch();
    }, [fetchContext.selectedState.searched]);

    //useEffect to load products by selecting 
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
    const handleChange = (data) => {
        const cat = data.value.category_name;
        if (cat === 'All Product') {
            fetchContext.dispatch({ type: 'All' });
            return;
        }
        else {
            fetchContext.dispatch({ type: 'category-selected', payload: cat });
        }
    }

    const AddDiscountForm = () => {
        return (
            <div className='loaddiscountwrapper'>
                <Searchbar />
                <div className="loaddiscountwrapperinner">
                    <div className='selectcategorywrapper'>
                        <p style={{ textAlign: 'center', padding: '5px', fontWeight: '500' }}>Select Category</p>
                        <Select
                            className="select"
                            required
                            onChange={handleChange}
                            options={options}
                        />
                    </div>
                    <div className='discountloadproduct'>
                        <p className='headerproduct'>
                            Products
                        </p>

                        <div className="loadproductlistcontainer">
                        {
                    fetchContext.selectedState.isAll ?
                        products.length > 0 && products.map(product => (
                            <AddDiscountList key={product._id} state={product} />
                        )
                    ) : fetchContext.selectedState.isSearched ?
                    
                    searchedProducts.length > 0 && searchedProducts.map(product =>
                       (
                            <AddDiscountList key={product._id} state={product} />
                        )
                   )
                    : <></>
                }

                    
                
                {
                    fetchContext.selectedState.isCategorySelected ?
                        (selectedProducts.length > 0 && selectedProducts.map(product =>
                                    (
                                        <AddDiscountList key={product._id} state={product} />
                                    )
                                )
                            ):<></>
                 }



                        </div>
                        
                    
                </div>
            </div>


            </div >
        )
}
return (
    <>
        <Header />

        <ProductSidebar />



        {AddDiscountForm()}



    </>
)
}

export default Adddiscount
