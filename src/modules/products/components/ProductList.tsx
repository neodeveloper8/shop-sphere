import React from 'react'
import { useProducts } from '@modules/products/hooks/useProducts'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

const ProductList: React.FC = () => {
  const { data, isLoading, isError } = useProducts(12)

  if (isLoading) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
  if (isError) return <div className="p-10 text-center text-red-500">Error al cargar los productos.</div>

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Catálogo</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((p: any) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            thumbnail={p.thumbnail}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList
