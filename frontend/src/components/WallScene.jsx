import React, { useRef } from 'react'

import { OrbitControls } from '@react-three/drei'

import WallPlane from './WallPlane'
import GraffitiLayer from './GraffitiLayer'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchPosts } from '../lib/fetchAndCreate'
import CreatePostButton from './CreatePostButton'
import CreatePostPanel from './CreatePostPanel'



export default function WallScene() {

    const wallRef = useRef()
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false)
    async function loadPosts() {

        const data = await fetchPosts()

        setPosts(data)
    }
    useEffect(() => {



        loadPosts()

    }, [])

    return (
        <>

            {/* LIGHTING (always mounted) */}
            <ambientLight intensity={0.5} />

            <directionalLight
                position={[5, 5, 5]}
                intensity={2}
            />

            <directionalLight
                position={[-5, 2, 5]}
                intensity={1}
                color="#00ffff"
            />

            <directionalLight
                position={[5, -2, 5]}
                intensity={1}
                color="#ff00ff"
            />

            {/* WALL (always mounted) */}
            <WallPlane ref={wallRef} />

            {/* GRAFFITI (internally waits for matrix) */}
            <GraffitiLayer wallMesh={wallRef} posts={posts} />

            {/* CONTROLS (MUST ALWAYS BE MOUNTED) */}
            <OrbitControls
                enableDamping
                dampingFactor={0.08}
                enablePan={false}
            />
           

        </>
    )
}