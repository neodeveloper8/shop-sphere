import React from 'react'
import { useCartStore } from '@modules/cart/store/useCartStore'
import { Link } from 'react-router-dom'
import { useState } from 'react'

interface ProductCardProps {
  id: number
  title: string
  price: number
  thumbnail: string
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, thumbnail }) => {
  const addToCart = useCartStore(state => state.addItem)
  const [adding, setAdding] = useState(false)

  return (
  <div className="border rounded-lg p-4 transition hover:shadow-lg|">
    <Link to={`/product/${id}`}>
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover rounded-md"
      />

      <h3 className="mt-3 font-semibold text-gray-800 line-clamp-2">{title}</h3>

      <p className="mt-2 text-blue-600 font-bold text-lg">${price}</p>
    </Link>

    <button
      disabled={adding}
      onClick={() =>{
        setAdding(true)
        addToCart({
          id,
          title,
          price,
          thumbnail,
          quantity: 1,
        })
        setTimeout(() => setAdding(false),300)
      }}
      className={`mt-3 w-full py-1 px-3 rounded transition
    ${
      adding
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  `}
    >
      {adding ? 'Añadiendo...' : 'Añadir al carrito'}
    </button>
  </div>
)
}

export default ProductCard
