import './App.css';
import Adddiscount from './components/adddiscount/Adddiscount';
import AddCategory from './components/addcategory/AddCategory';
import Addproduct from './components/addproduct/Addproduct';

import Products from './layout/Products';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import ContextProvider from './context/ContextProvider';
import ProtectedRoutes from './components/Authentication/helper/ProtectedRoutes'
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <ContextProvider>
        <ProtectedRoutes path='/home' exact component={Products}/>
        <ProtectedRoutes path='/addproducts' exact component={Addproduct} />
        <ProtectedRoutes path='/addcategory' exact component={AddCategory} />
        <ProtectedRoutes path='/adddiscount' exact component={Adddiscount} />
        </ContextProvider>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
