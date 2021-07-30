import CategoryItem from "./CategoryItem";
import FetchContext from '../../context/create-context';
import { useState, useEffect, useContext } from 'react';
function LoadCategories() {
    const fetchContext = useContext(FetchContext);
    const [categories, setCategories] = useState([]);
    
    const loadCategories = async () => {
        const returnedCategories = await fetchContext.get('/categories');
        setCategories(returnedCategories);
    }
    useEffect(() => {
        loadCategories();
    }, [])

    

    return (
        <div className="categorieswrapper">
            <div className='categorylogo'>
                <p>Browse Categories</p>
            </div>
            <div className='loadcategories'>
            <CategoryItem  state={{category_name:'All Product'}} />
                {categories && categories.map(category => (
                    <CategoryItem key={category._id} state={category} />
                    
                ))}
               
               
            </div>
        </div>
    )
}

export default LoadCategories
