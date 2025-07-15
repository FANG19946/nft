import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
    <>
      <div className='w-screen h-screen overflow-hidden'>
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      </div>

    </>
  )
}

export default App
