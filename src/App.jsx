import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Experience } from './components/Experience'
import Studio from './components/Studio'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
    <>
      <div className='w-screen h-screen overflow-hidden'>
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Canvas
          className="absolute top-0 left-0 w-full h-full"
          camera={{ position: [0, 0, 5], fov: 45 }}
        >
          <Suspense fallback={null}>
            
            {/* TODO: Add your 3D content here */}

            <Studio/>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            

          </Suspense>
        </Canvas>

      </div>


    </>
  )
}

export default App
