

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse border rounded-lg p-4">
      <div className="h-40 bg-gray-300 rounded mb-4" />

      <div className="h-4 bg-gray-300 rounded mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />

      <div className="h-8 bg-gray-300 rounded" />
    </div>
  )
}

export default ProductCardSkeleton