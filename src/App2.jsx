import React from 'react'

import { Canvas } from '@react-three/fiber'

import WallScene from './components/WallScene'

export default function App2() {

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