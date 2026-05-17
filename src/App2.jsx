import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import WallScene from './components/WallScene'
import { loadGraffitiFonts } from './lib/loadFonts'

export default function App2() {
    
    useEffect(() => {
        loadGraffitiFonts()
    }, [])

    return (
        <div className='w-screen h-screen overflow-hidden'>

            <Canvas
                camera={{
                    position: [0, 0, 12],
                    fov: 45,
                }}
            >

                <WallScene />

            </Canvas>

        </div>
    )
}