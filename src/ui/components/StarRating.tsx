interface StarRatingProps {
  rating: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const maxStars = 5
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = maxStars - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      {/* Estrellas llenas */}
      {Array(fullStars).fill(0).map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400 text-xl">★</span>
      ))}

      {/* Media estrella (opcional) */}
      {hasHalf && <span className="text-yellow-400 text-xl">⭐</span>}

      {/* Estrellas vacías */}
      {Array(emptyStars).fill(0).map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300 text-xl">☆</span>
      ))}

      {/* Número */}
      <span className="ml-2 text-gray-700 text-sm">
        {rating.toFixed(1)} / 5
      </span>
    </div>
  )
}

export default StarRating
