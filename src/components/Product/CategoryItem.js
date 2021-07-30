import { useContext } from 'react';
import context from '../../context/create-context';

function CategoryItem({ state }) {
    const contextStore = useContext(context); 
    const handleClick = () => {
        if (state.category_name === 'All Product') {
            contextStore.dispatch({ type: 'All' });
            return;
        }
        contextStore.dispatch({ type: 'category-selected', payload: state.category_name });
    }

    return (
        <>
            <div onClick={handleClick} className='categoryItemWrapper'>
                <div className="categoryItem">
                    <p>{state.category_name}</p>
                </div>
            </div>



        </>

    )
}

export default CategoryItem
