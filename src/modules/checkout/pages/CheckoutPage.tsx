import { useCartStore } from "@modules/cart/store/useCartStore"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const CheckoutPage: React.FC = () => {

    const items = useCartStore(state => state.items)

    const total = useCartStore(state =>
    state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )
)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
})

const navigate = useNavigate()
const clearCart = useCartStore(state => state.clearCart)

const handleSubmit = () => {
  if (!form.name || !form.email || !form.address) {
    alert('Por favor completa todos los campos')
    return
  }

  // Simulación de compra exitosa
  setIsSubmitting(true)

  setTimeout(() => {
    clearCart()
    alert('¡Compra realizada con éxito! 🎉')
    navigate('/')
  }, 1500)
}

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target
  setForm(prev => ({ ...prev, [name]: value }))
}
  return (
  <><><div className="p-10 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          {items.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl mb-4">🛒</p>
                <p className="text-gray-600 mb-6">
                    Tu carrito está vacío
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Volver a la tienda
                </button>
            </div>
          ) : (
              <>
                  <div className="space-y-4">
                      {items.map(item => (
                          <div
                              key={item.id}
                              className="flex justify-between items-center border-b pb-3"
                          >
                              <div>
                                  <p className="font-semibold">{item.title}</p>
                                  <p className="text-sm text-gray-600">
                                      Cantidad: {item.quantity}
                                  </p>
                              </div>

                              <div className="text-right">
                                  <p className="text-sm">
                                      ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>

                  <div className="mt-6 flex justify-between font-bold text-xl">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                  </div>
              </>
          )}
      </div><hr className="my-10" /><h2 className="text-2xl font-bold mb-4">Datos del comprador</h2><form className="space-y-4">
              <div>
                  <label className="block text-sm font-medium">Nombre</label>
                  <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full border p-2 rounded" />
              </div>

              <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border p-2 rounded" />
              </div>

              <div>
                  <label className="block text-sm font-medium">Dirección</label>
                  <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      className="w-full border p-2 rounded"
                      rows={3} />
              </div>
          </form>
          
          </>
          
          <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`mt-6 w-full py-3 rounded transition
    ${
      isSubmitting
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-700 hover:bg-blue-800 text-white'
    }
  `}
>
              {isSubmitting ? 'Procesando...' : 'Realizar pedido'}
          </button></>
)
}



export default CheckoutPage
