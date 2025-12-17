import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../services/products.api'

export const useProducts = (limit = 12) => {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: () => productsApi.getAll(limit),
    staleTime: 1000 * 60 * 2, // 2 minutos
    retry: 1
  })
}
