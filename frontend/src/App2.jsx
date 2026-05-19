import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import WallScene from './components/WallScene'
import { loadGraffitiFonts } from './lib/loadFonts'
import { useState } from 'react'
import CreatePostButton from './components/CreatePostButton'
import CreatePostPanel from './components/CreatePostPanel'
import { fetchPosts } from './lib/fetchAndCreate'

export default function App2() {

    useEffect(() => {
        loadGraffitiFonts()
    }, [])

    const [open, setOpen] = useState(false)

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

            <CreatePostButton
                onClick={() => setOpen(!open)}
            />
            <CreatePostPanel
                open={open}
                onClose={() => setOpen(false)}
                fetchPosts={fetchPosts}
            />

        </div>
    )
}