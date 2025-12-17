import React from 'react'
import Header from '@ui/components/Header'
import MiniCart from '@ui/components/MiniCart'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <MiniCart />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto p-4 text-sm text-gray-500">© {new Date().getFullYear()} ShopSphere</div>
      </footer>
    </div>
  )
}

export default MainLayout
