import React from 'react'
import Book from './Book'
import { Environment, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
// import { cameraPositionAtom } from '../lib/atoms'
// import CameraRig from './CameraRig'
import BackgroundPlane from './BackgroundPlane'
import StickyNote from './StickyNote'
import Paper from './Paper'
import { inFocusAtom } from '../lib/atoms'
import { useAtom } from 'jotai'


export default function Studio() {

    const PAGE_WIDTH = 1.28;
    const { viewport } = useThree()
    const left = -viewport.width / 2
    const [inFocus, setInFocus] = useAtom(inFocusAtom)


    return (
        <group>
            <BackgroundPlane />
            {/* <CameraRig /> */}
            <Book
                position={inFocus ? [0, 0, 1] : [left, 0, 0]}
                 />
            <Paper front="Roadmap" back="Empty Page" position={[-1, 0, 0]} />
            {/* <Paper front="Roadmap" back="Empty Page" position={[0,1,0]}/> */}

            <StickyNote position={[0.3 - 1, -0.2, 0]} />
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
