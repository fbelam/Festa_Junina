import { useEffect, useState } from 'react'
import Header from './components/Header'
import DishList from './components/DishList'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <DishList />
      </main>
    </div>
  )
}

export default App
