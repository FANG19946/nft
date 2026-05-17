import React, { useRef } from 'react'

import { OrbitControls } from '@react-three/drei'

import WallPlane from './WallPlane'
import GraffitiLayer from './GraffitiLayer'

export default function WallScene() {

    const wallRef = useRef()

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
            <GraffitiLayer wallMesh={wallRef} />

            {/* CONTROLS (MUST ALWAYS BE MOUNTED) */}
            <OrbitControls
                enableDamping
                dampingFactor={0.08}
                enablePan={false}
            />

        </>
    )
}