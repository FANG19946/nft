import React from 'react'
import Book from './Book'
import { Environment } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { cameraPositionAtom } from '../lib/atoms'
import CameraRig from './CameraRig'


export default function Studio() {

    const PAGE_WIDTH = 1.28;
    const { viewport } = useThree()
    const left = -viewport.width/2 + PAGE_WIDTH + 0.5

    return (
        <group>
            <CameraRig/>
            <Book position={[left, 0, 0]} />
            <Environment preset="city"></Environment>
            <directionalLight
                position={[2, 5, 2]}
                intensity={2.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
            />
        </group>
    )
}
