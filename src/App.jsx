import Navbar from './Component/Navbar/Navbar'
import Home from './Component/Home/Home'
import Cart from './Component/Cart/Cart'
import ProductDetail from './Component/Produtct Detail/ProductDetail'
import { Route, Routes } from 'react-router-dom'
 
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
      </Routes>
    </>
  )
}

export default App
