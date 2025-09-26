import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SeriesProvider from './context/SeriesContext'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Favourites from './pages/Favourites'
import './App.css'

function App() {
  return (
  <SeriesProvider>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/favourites' element={<Favourites/>} />
    </Routes>
  </BrowserRouter>
</SeriesProvider>
  )
}

export default App
