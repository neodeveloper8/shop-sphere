import React from 'react'
import { useCartStore } from '@modules/cart/store/useCartStore'
import { useUIStore } from '@ui/store/useUIStore'
import { useNavigate } from 'react-router-dom'


const MiniCart: React.FC = () => {
//   const { items, removeItem, clearCart } = useCartStore()
//   const isOpen = useUIStore(state => state.isCartOpen)
//   const closeCart = useUIStore(state => state.closeCart)
// const total = useCartStore(state => state.total)

const items = useCartStore(state => state.items)
const removeItem = useCartStore(state => state.removeItem)
const clearCart = useCartStore(state => state.clearCart)
const total = useCartStore(state =>
  state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
)
const navigate = useNavigate()
const isOpen = useUIStore(state => state.isCartOpen)
const closeCart = useUIStore(state => state.closeCart)

  if (!isOpen) return null

  return (
    <div className="absolute right-4 top-16 bg-white shadow-lg border rounded-lg w-80 p-4 z-50">
      <h3 className="text-lg font-bold mb-4">Carrito</h3>

      {items.length === 0 && (
        <p className="text-center text-gray-500 py-6">Tu carrito está vacío 🛒</p>
      )} 
        <div className="flex flex-col gap-4">
          {items.map(item => (  
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">x{item.quantity}</p>
              </div>

              <div className="text-sm text-gray-700">
                ${(item.price * item.quantity).toFixed(2)}
            </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                eliminar
              </button>
            </div>
          ))}

            <div className="mt-4 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => {
                closeCart()
                navigate('/checkout')
              }}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Ir al checkout
            </button>


          <button
            onClick={clearCart}
            className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
          >
            Vaciar carrito
          </button>
        </div>
      

      <button
        onClick={closeCart}
        className="mt-4 w-full bg-gray-200 hover:bg-gray-300 py-1 rounded"
      >
        Cerrar
      </button>
    </div>
  )
}

export default MiniCart
