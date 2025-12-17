import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../services/products.api'

export const useRelatedProducts = (category: string | undefined) => {
  return useQuery({
    queryKey: ['related', category],
    queryFn: () => productsApi.getByCategory(category!),
    enabled: !!category, // solo si existe la categoría
  })
}
