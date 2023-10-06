import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './compents/home/Home';
import Navbar from './compents/header/Navbar';
import Footer from './compents/footer/Footer';
import FormRegister from './compents/register/FormRegister';
import Login from './compents/login/Login';
import { ToastContainer } from 'react-toastify';
import Protect from './compents/privateRoutes/Protect';
import DashBoard from './compents/dashBoard/DashBoard';
import ListProducts from './compents/listAllProduct/ListProducts';
import SingleProduct from './compents/singleProduct/SingleProduct';
import Missing from './compents/missing/Missing';
import ProtectLoginCheck from './compents/privateRoutes/loginCheck/ProtectLoginCheck';
// editable components
import EditDashBoard from './editableComponents/editDashBoard/EditDashBoard';
import EditListProducts from './editableComponents/editlistproducts/editlistprocts/EditListProducts';
import AddProduct from './editableComponents/addproduts/AddProduct';
import EditProduct from './editableComponents/productEdit/EditProduct';
import AddToCart from './compents/addToCart/AddToCart';

function App() {

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<ProtectLoginCheck />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route path='/register' element={<ProtectLoginCheck />}>
          <Route path='/register' element={<FormRegister />} />
        </Route>
        <Route path='/dashBoard' element={<Protect />} >
          <Route index element={<DashBoard />} />
        </Route>
        <Route path='/listProducts' element={<Protect />}>
          <Route index element={<ListProducts />} />
          <Route path='product/:id' element={<SingleProduct />} />
        </Route>
        <Route path='/addToCart' element={<Protect />} >
          <Route index element={<AddToCart />} />
        </Route>
        <Route path='*' element={<Missing />} />

        {/* Editabale Components */}
        <Route path='/editDashBoard' element={<Protect />}>
          <Route index element={<EditDashBoard />} />
        </Route>
        <Route path='/viewListProducts' element={<Protect />}>
          <Route index element={<EditListProducts />} />
          <Route path='edit/:id' element={<EditProduct />} />
        </Route>
        <Route path='/addProducts' element={<Protect />}>
          <Route index element={<AddProduct />} />
        </Route>
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
