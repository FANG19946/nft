import React, { forwardRef } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const WallPlane = forwardRef((props, ref) => {

    const colorMap = useTexture(
        '/textures/brick/white_sandstone_blocks_02_diff_1k.jpg'
    )

    colorMap.wrapS = THREE.RepeatWrapping
    colorMap.wrapT = THREE.RepeatWrapping

    colorMap.repeat.set(6, 3)

    return (
        <mesh
            ref={ref}
            {...props}
        >

            {/* IMPORTANT */}
            {/* using boxGeometry instead of planeGeometry */}
            {/* decals work much better on geometry with thickness */}

            <boxGeometry args={[25, 16, 0.3]} />

            <meshStandardMaterial
                map={colorMap}
                roughness={1}
                color="white"
            />

        </mesh>
    )
})

export default WallPlane