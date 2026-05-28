import { useEffect, useState } from 'react'
import Header from './components/Header'
import DishList from './components/DishList'
import AdminLoginModal from './components/AdminLoginModal'
import './App.css'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <div className="app-container">
      <Header 
        isAdmin={isAdmin} 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onLogout={() => setIsAdmin(false)} 
      />
      <main className="main-content">
        <DishList isAdmin={isAdmin} />
      </main>

      {isLoginModalOpen && (
        <AdminLoginModal 
          onLoginSuccess={() => {
            setIsAdmin(true);
            setIsLoginModalOpen(false);
          }}
          onCancel={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App
