import { apiClient } from '@services/apiClient'

export const productsApi = {
  async getAll(limit = 20) {
    const res = await apiClient.get(`/products?limit=${limit}`)
    return res.data
  },

  async getById(id: number) {
    const res = await apiClient.get(`/products/${id}`)
    return res.data
  },

  getByCategory: async (category: string) => {
  const res = await apiClient.get(`/products/category/${category}`)
  return res.data
}


}
