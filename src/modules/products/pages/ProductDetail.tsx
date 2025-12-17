import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '@modules/products/services/products.api'
import { useCartStore } from '@modules/cart/store/useCartStore'
import { useState } from 'react'
import { useRelatedProducts } from '@modules/products/hooks/useRelatedProducts'
import ProductCard from '@modules/products/components/ProductCard'
import Breadcrumbs from '@ui/components/BreadCrumbs'
import StarRating from '@ui/components/StarRating'
import { useNavigate } from 'react-router-dom'
const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const addToCart = useCartStore(state => state.addItem)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  // 1. Hook principal del producto
  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(Number(id)),
  })

  // 2. NO USAR HOOKS DESPUÉS DE RETURNS ❌
  // Por eso hacemos esto:
  const category = data?.category || ""
  const relatedQuery = useRelatedProducts(category)
  const navigate = useNavigate()

  // 3. Returns (ya es seguro porque los hooks ya se ejecutaron antes)
  if (isLoading) return <div className="p-10">Cargando...</div>
  if (isError) return <div className="p-10 text-red-500">Error cargando el producto</div>

  const mainImage = activeImage || data.thumbnail

  
  return (
    <div className="p-10 max-w-3xl mx-auto">
        <Breadcrumbs category={category} title={data.title} />

        <button
            onClick={() => navigate(-1)}
            className="mb-6 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
  ← Volver atrás
</button>
      <img
        src={mainImage}
        className="w-full h-64 object-cover rounded-lg shadow"
        alt={data.title}
      />

      <div className="flex gap-3 mt-4 overflow-x-auto">
  {data.images.map((img: string, index: number) => (
    <img
      key={index}
      src={img}
      onClick={() => setActiveImage(img)}
      className={`
        w-20 h-20 object-cover rounded-md border cursor-pointer transition
        ${activeImage === img ? 'border-blue-500 scale-105' : 'border-gray-300'}
      `}
      alt="thumbnail"
    />
  ))}
</div>

      <h1 className="text-3xl font-bold mt-6">{data.title}</h1>
      
      <StarRating rating={data.rating} />

      <p className="text-gray-600 mt-2">{data.description}</p>

      <p className="text-blue-600 text-2xl font-bold mt-4">${data.price}</p>

      <button
        onClick={() =>
          addToCart({
            id: data.id,
            title: data.title,
            price: data.price,
            thumbnail: data.thumbnail,
            quantity: 1
          })
        }
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Añadir al carrito
      </button>
      <hr className="my-10" />

{category && (
  <>
    <h2 className="text-xl font-bold mb-4 mt-10">Productos relacionados</h2>

    {relatedQuery.isLoading && <p>Cargando relacionados...</p>}
    {relatedQuery.isError && <p className="text-red-500">Error cargando relacionados.</p>}
  </>
)}


{category && relatedQuery.data?.products && (
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {relatedQuery.data?.products
    ?.filter((p: any) => p.id !== data.id) // evitar el mismo producto
    .slice(0, 6) // máximo 6 relacionados
    .map((p: any) => (
      <ProductCard
        key={p.id}
        id={p.id}
        title={p.title}
        price={p.price}
        thumbnail={p.thumbnail}
      />
    ))}
</div>
)}
    </div>
  )
}

export default ProductDetail
