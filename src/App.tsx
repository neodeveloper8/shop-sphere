import { Routes, Route } from 'react-router-dom'
import MainLayout from '@ui/layout/MainLayout'
import ProductList from '@modules/products/components/ProductList'
import ProductDetail from '@modules/products/pages/ProductDetail'
import CheckoutPage from '@modules/checkout/pages/CheckoutPage'

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </MainLayout>
  )
}

export default App
