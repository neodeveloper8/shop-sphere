import React from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '@modules/cart/store/useCartStore'
import { useUIStore } from '@ui/store/useUIStore'


const Header: React.FC = () => {
  const totalItems = useCartStore((state) => state.items.length)
  const toggleCart = useUIStore((state) => state.toggleCart)

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">ShopSphere</Link>

        <nav className="flex items-center gap-6 text-gray-700">
          <Link to="/" className="hover:text-gray-900">Catálogo</Link>

          {/* MiniCart */}
          <div
            className="relative flex items-center cursor-pointer"
            onClick={toggleCart}
          >
            <div className="flex items-center gap-2 hover:text-gray-900">
              🛒 <span>Carrito</span>
            </div>

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
