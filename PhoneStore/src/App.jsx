import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header'
import SignUpPage from './components/SignUpSection/SignUpPage'
import SignInPage from './components/SignInPage/SignInPage';
import CatalogPage from './components/CatalogPage/CatalogPage';
import { CartProvider } from './components/CartContext';
import CartPage from './components/CartPage/CartPage';
import { UserProvider } from './components/UserContext';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProductManagerPage from './components/ProductManagerPage/ProductManagerPage'
import UserManagerPage from './components/UserManagerPage/UserManagerPage'
import OrderManagerPage from './components/OrderMangerPage/OrderManagerPage';
import ProductAddPage from './components/ProductManagerPage/ProductAddPage';
import ProductUpdatePage from './components/ProductManagerPage/ProductUpdatePage';
import ProductPage from './components/ProductPage/ProductPage';
import OrderDetailPage from './components/OrderDetailPage/OrderDetailPage';



function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Header/>
          <main>
            <Routes>
              <Route path="/" element={<CatalogPage />}/>
              <Route path="/catalog/:id" element={<ProductPage/>}/>
              <Route path="login" element={<SignInPage />} />
              <Route path='signup' element={<SignUpPage/>}/>
              <Route path='cart' element={<CartPage />} />
              <Route path='profile' element={<ProfilePage/>}/>
              <Route path='productmanager' element={<ProductManagerPage/>}/>
              <Route path='usermanager' element={<UserManagerPage/>}/>
              <Route path='ordermanager' element={<OrderManagerPage/>}/>
              <Route path='productmanager/add' element={<ProductAddPage/>}/>
              <Route path="productmanager/update/:id" element={<ProductUpdatePage/>}/>
              <Route path='profile/orderDetails/:id' element={<OrderDetailPage/>}/>
            </Routes>
          </main>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
    
    
  )
}

export default App
