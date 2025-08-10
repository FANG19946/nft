import React from 'react'
import Book from './Book'
import { Environment, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { cameraPositionAtom } from '../lib/atoms'
import CameraRig from './CameraRig'
import BackgroundPlane from './BackgroundPlane'
import Roadmap from './Roadmap'
import StickyNote from './StickyNote'


export default function Studio() {

    const PAGE_WIDTH = 1.28;
    const { viewport } = useThree()
    const left = -viewport.width / 2

    return (
        <group>
            <BackgroundPlane />
            <CameraRig />
            <Book position={[left, 0, 0]} />
            <Roadmap front="Roadmap" back="Empty Page" />
            <StickyNote position={[0.3, -0.2, 0]} />
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
